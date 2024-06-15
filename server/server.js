const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const ProductModel = require("./models/Products");

dotenv.config();
const port = process.env.PORT || 3001;
const mongodb_url = process.env.MONGODB_URL;


// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middleware to verify authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization; // Example: Bearer <token>
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  next();
};

// Apply authentication middleware to routes that require authentication
app.use('/protected-route', authenticate, (req, res) => {
  res.json({ message: 'Access granted to protected route' });
});


// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

// MongoDB connection
mongoose.connect(mongodb_url);
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const getNextId = async () => {
  const lastProduct = await ProductModel.findOne().sort({ productId: -1 });
  return lastProduct ? lastProduct.productId + 1 : 1;
};


// Route handler for /upload
app.post("/upload", authenticate, upload.single('file'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const nextId = await getNextId();
    const fileBuffer = req.file.buffer;

    cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (err, result) => {
      if (err) {
        console.error('Cloudinary upload error:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }

      const product = new ProductModel({
        productId: nextId,
        name: req.body.name,
        price: req.body.price,
        url: result.secure_url, // Cloudinary URL
        genre: req.body.genre,
        type: req.body.type,
        description:req.body.description,
      });

      try {
        await product.save();
        res.json({ success: true, product });
        console.log("Product saved successfully");
      } catch (err) {
        console.error('MongoDB save error:', err);
        res.status(500).json({ error: 'Error saving product' });
      }
    }).end(fileBuffer);
  } catch (err) {
    console.error('Error getting next ID:', err);
    res.status(500).json({ error: 'Error getting next ID' });
  }
});



app.get("/products", authenticate,(req, res) => {
  ProductModel.find()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Error fetching products' });
    });
});



// Route handler for updating a product by its productId
app.put("/products/:productId", authenticate, upload.single('file'), async (req, res) => {
  const productId = req.params.productId;

  try {
    // Find the product by its productId
    const product = await ProductModel.findOne({ productId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product fields
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.genre = req.body.genre || product.genre;
    product.type = req.body.type || product.type;
    product.description = req.body.description || product.description;

    // If a new image is uploaded, update the image URL
    if (req.file) {
      const fileBuffer = req.file.buffer;
      // Upload the new image to Cloudinary
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (err, result) => {
        if (err) {
          console.error('Cloudinary upload error:', err);
          return res.status(500).json({ error: 'Error uploading file' });
        }
        // Update the product's URL with the new secure URL
        product.url = result.secure_url;
        // Save the updated product
        await product.save();
        res.json({ success: true, product });
        console.log("Product updated successfully with new image");
      }).end(fileBuffer);
    } else {
      // If no new image is uploaded, save the product with existing URL
      await product.save();
      res.json({ success: true, product });
      console.log("Product updated successfully");
    }
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Error updating product' });
  }
});




// Route handler for deleting a product by productId
app.delete("/products/:productId", authenticate, async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await ProductModel.findOneAndDelete({ productId: productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: `Product with productId ${productId} not found` });
    }

    res.json({ success: true, deletedProduct });
    console.log(`Product with productId ${productId} deleted successfully`);
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Error deleting product' });
  }
});






app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Start the server
app.listen(port, () => {
  console.log("Server is running perfectly!");
});
