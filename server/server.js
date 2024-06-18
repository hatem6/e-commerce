const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const ProductModel = require("./models/Products");
const EmployeeModel = require("./models/Employees");
const ClientModel = require("./models/Clients");


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


//Products routes


const getNextId = async () => {
  const lastProduct = await ProductModel.findOne().sort({ productId: -1 });
  return lastProduct ? lastProduct.productId + 1 : 1;
};

// Route handler for upload
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




// Employees Routes
const getNextEmployeeId = async () => {
  const lastEmployee = await EmployeeModel.findOne().sort({ id: -1 });
  return lastEmployee ? lastEmployee.id + 1 : 1;
};

app.post('/employees/signup', authenticate, upload.single('file'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const existingEmployee = await EmployeeModel.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res.json({ success:false,error: 'Email already exists' });
    }
    const nextId = await getNextEmployeeId();

    const fileBuffer = req.file.buffer;
    // Logging for debugging
    console.log('File received:', req.file);
    // Upload the file to Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (err, result) => {
      if (err) {
        console.error('Cloudinary upload error:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }
      console.log('Cloudinary upload result:', result);
      const employee = new EmployeeModel({
        id:nextId,
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
        image: result.secure_url, // Cloudinary URL
      });
      try {
        await employee.save();
        res.json({ success: true, employee });
        console.log('Employee saved successfully');
      } catch (err) {
        console.error('MongoDB save error:', err);
        res.status(500).json({ error: 'Error saving employee' });
      }
    }).end(fileBuffer);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/employees/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const employee = await EmployeeModel.findOne({ email });
    if (!employee) {
      return res.json({ success:false,error: 'Invalid email or password' });
    }
    // Verify password  
    if (password!=employee.password) {
      return res.json({ success:false, error: 'Invalid email or password' });
    }

    // Check if role is administrator
    const isAdmin = employee.role === 'administrator';

    res.json({
      employee: employee,
      success: true,
      isAdmin: isAdmin,
      // token: token // Include token if you are using JWT
    });
  } catch (err) {
    console.error('Error during sign in:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put("/employees/:id", authenticate, upload.single('file'), async (req, res) => {
  const id = req.params.id;

  try {
    // Find the product by its productId
    const employee = await EmployeeModel.findOne({ id });

    if (!employee) {
      return res.json({ success:false, error: 'Employee not found' });
    }

    // Update the product fields
    employee.name = req.body.name || employee.name;
    employee.role = req.body.role || employee.role;
    employee.password = req.body.password || employee.password;

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
        employee.image = result.secure_url;
        // Save the updated product
        await employee.save();
        res.json({ success: true, employee });
        console.log("Employee updated successfully with new image");
      }).end(fileBuffer);
    } else {
      // If no new image is uploaded, save the product with existing URL
      await employee.save();
      res.json({ success: true, employee });
      console.log("Employee updated successfully");
    }
  } catch (err) {
    console.error('Error updating Employee:', err);
    res.status(500).json({ error: 'Error updating employee' });
  }
});



app.delete("/employees/:id", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedEmployee = await EmployeeModel.findOneAndDelete({ id: id });
    if (!deletedEmployee) {
      return res.json({ success:false,error: `Employee with id ${id} not found` });
    }
    res.json({ success: true, deletedEmployee });
    console.log(`Employee with id ${id} deleted successfully`);
  } catch (err) {
    console.error('Error deleting Employee:', err);
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/*
app.get('/employees/:id',authenticate,async (req, res) => {
  const id  = req.params.id;
  try {
    const employee = await EmployeeModel.findOne({id:id});
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/

// customers Routes

app.post('/customers/signup', authenticate, async (req, res, next) => {
  try {
    const existingEmployee = await ClientModel.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res.json({ success:false,error: 'Email already exists' });
    }
      const customer = new ClientModel({
        fullname: req.body.fullname,
        adress: req.body.adress,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        image: "",
      });
      try {
        await customer.save();
        res.json({ success: true, customer });
        console.log('Customer saved successfully');
      } catch (err) {
        console.error('MongoDB save error:', err);
        res.status(500).json({ error: 'Error saving customer' });
      }
    } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/customers/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const customer = await ClientModel.findOne({ email });
    if (!customer) {
      return res.json({ success:false,error: 'Invalid email or password' });
    }
    // Verify password  
    if (password!=customer.password) {
      return res.json({ success:false, error: 'Invalid email or password' });
    }
    res.json({
      customer: customer,
      success: true,
    });
  } catch (err) {
    console.error('Error during sign in:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put("/customers/update", authenticate, upload.single('file'), async (req, res) => {
  const { email } = req.body;
  try {
    const customer = await ClientModel.findOne({ email: email });
    if (!customer) {
      return res.json({ success: false, error: 'Customer not found' });
    }

    customer.fullname = req.body.fullname || customer.fullname;
    customer.adress = req.body.adress || customer.adress;
    customer.phone = req.body.phone || customer.phone;
    customer.password = req.body.password || customer.password;

    // If a new image is uploaded, update the image URL
    if (req.file) {
      const fileBuffer = req.file.buffer;
      // Upload the new image to Cloudinary
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (err, result) => {
        if (err) {
          console.error('Cloudinary upload error:', err);
          return res.status(500).json({ error: 'Error uploading file' });
        }
        customer.image = result.secure_url;
        await customer.save();
        res.json({ success: true, customer });
        console.log("Customer updated successfully with new image");
      }).end(fileBuffer);
    } else {
      // If no new image is uploaded, save the customer with existing URL
      await customer.save();
      res.json({ success: true, customer });
      console.log("Customer updated successfully");
    }
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ error: 'Error updating customer' });
  }
});


app.get('/customers', async (req, res) => {
  try {
    const customers = await ClientModel.find();
    res.json(customers);
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete("/customers/delete", authenticate, async (req, res) => {
  const { email } = req.body;
  try {
    const deletedCustomer = await ClientModel.findOneAndDelete({ email:email});
    if (!deletedCustomer) {
      return res.json({ success:false,error: `Customer not found` });
    }
    res.json({ success: true, deletedCustomer });
    console.log(`Customer deleted successfully`);
  } catch (err) {
    console.error('Error deleting Customer:', err);
    res.status(500).json({ error: 'Error deleting employee' });
  }
});



app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Start the server
app.listen(port, () => {
  console.log("Server is running perfectly!");
});
