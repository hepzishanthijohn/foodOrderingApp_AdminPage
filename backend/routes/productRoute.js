const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const Product = require("../models/productModel")

// POST route to upload an image along with additional fields
router.post('/upload', upload.single('image'), async (req, res) => {
    // Extract additional fields from the request body
    const { title, category, price, quantity } = req.body;
  
    // Check if required fields are present
    if (!title || !category || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
  
    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'Restaurant_management' });
      // Generate id
      let products = await Product.find({}).sort({ id: -1 }).limit(1);
      let id = 1;
      if (products.length > 0) {
          id = products[0].id + 1;
      }
      // Create a new product document
      const newProduct = new Product({
        id:id,
        title,
        category,
        price,
        quantity,
        image_url: result.secure_url
      });
  
      // Save the product to the database
      await newProduct.save();
  
      // Respond with success
      res.status(200).json({
        success: true,
        message: "Image uploaded and product saved successfully",
        data: newProduct
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error uploading image or saving product"
      });
    }
  });

  router.get('/getAllProducts', async (req, res) => {
    try {
      const data = await Product.find();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post('/removeproduct', async(req, res) =>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed")
    res.json({
        success: true,
        name: req.body.name
    })
})


//Edit


router.put('/editproduct/:id', upload.single('image'), async (req, res) => {
  const { title, category, price, quantity } = req.body;
  const productId = req.params.id;

  // Check if required fields are provided
  if (!title && !category && !price && !quantity && !req.file) {
      return res.status(400).json({
          success: false,
          message: 'No fields to update'
      });
  }

  try {
      // Find the product by ID
      const product = await Product.findOne({ id: productId });
      
      if (!product) {
          return res.status(404).json({
              success: false,
              message: 'Product not found'
          });
      }

      // Update the product details (only the fields that were provided)
      if (title) product.title = title;
      if (category) product.category = category;
      if (price) product.price = price;
      if (quantity) product.quantity = quantity;

      // If a new image is uploaded, update the image URL
      if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path, { folder: 'Restaurant_management' });
          product.image_url = result.secure_url;
      }

      // Save the updated product to the database
      await product.save();

      // Respond with the updated product
      res.status(200).json({
          success: true,
          message: 'Product updated successfully',
          data: product
      });

  } catch (err) {
      console.log(err);
      res.status(500).json({
          success: false,
          message: 'Error updating product'
      });
  }
});

// GET route to fetch a product by ID
router.get('/getProductById/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the product by ID
    const product = await Product.findOne({ id: productId });

    // If the product is not found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Respond with the product data
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});
// GET route to fetch the product count
router.get('/count', async (req, res) => {
  try {
    // Count the number of products in the database
    const count = await Product.countDocuments(); // Count the documents in the Product collection

    // Respond with the product count
    res.status(200).json({
      success: true,
      data: { count }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error fetching product count'
    });
  }
});


module.exports = router;