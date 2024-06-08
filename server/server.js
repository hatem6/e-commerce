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
app.use(cors());  // Ensure CORS is before any routes
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
  // Logic to verify token (e.g., decode and validate)
  // If token is valid, call next() to proceed to the next middleware/route
  next();
};

// Apply authentication middleware to routes that require authentication
app.use('/protected-route', authenticate, (req, res) => {
  // This route is protected and will only be accessible with a valid token
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


// Route handler for /upload
app.post("/upload",authenticate,upload.single('file'),(req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileBuffer = req.file.buffer;

  cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
    if (err) {
      console.error('Cloudinary upload error:', err);
      return res.status(500).json({ error: 'Error uploading file' });
    }

    const product = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      url: result.secure_url, // Cloudinary URL
      genre: req.body.genre,
      type: req.body.type
    });

    product.save().then(() => {
      res.json({ success: true, product });
      console.log("Product saved successfully");
    }).catch(err => {
      console.error('MongoDB save error:', err);
      res.status(500).json({ error: 'Error saving product' });
    });
  }).end(fileBuffer);
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

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Start the server
app.listen(port, () => {
  console.log("Server is running perfectly!");
});
