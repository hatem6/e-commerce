const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});


const ClientModel = mongoose.model("clients", ClientSchema);
module.exports = ClientModel;