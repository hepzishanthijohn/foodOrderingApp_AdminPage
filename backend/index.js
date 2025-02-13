const express = require('express');
require('dotenv').config();
const connectDB = require('./db');
const productRoute = require('./routes/productRoute')
const uploadRoute = require('./routes/routeUpload');


require("dotenv").config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const cors = require('cors');
app.use(cors());

//the route 
app.use("/api/users" , uploadRoute);
app.use("/api/products", productRoute);



//posrt connection 
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

//cloudinary account:  https://cloudinary.com/signup