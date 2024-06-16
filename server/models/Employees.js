const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

const EmployeeModel = mongoose.model("Employees", EmployeeSchema);
module.exports = EmployeeModel;
