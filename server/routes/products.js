const express = require("express");
const router = express.Router();
const multer = require("multer");
const Products = require("../models/productModel");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "/Web Development/FinalProject/client/public/images/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// REQUEST GET ALL PRODUCTS
router.get("/buy", (req, res) => {
  Products.find()
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// REQUEST GET ALL PRODUCTS
router.get("/sell/:id", async (req, res, next) => {
  try {
    const products = await Products.find({ users: { $ne: req.params.id } }).select([
      "title",
      "product",
      "authorname",
      "_id",
      "productImage",
      "users",
      "sender"
    ]);
    return res.json(products);
    
  } catch (ex) {
    next(ex);
  }
});

// REQUEST ADD NEW PRODUCTS
router.post("/add", upload.single("productImage"), (req, res) => {
  const newProduct = new Products({
    title: req.body.title,
    product: req.body.product,
    authorname: req.body.authorname,
    productImage: req.file.originalname,
    users: req.body.users,
    sender: req.body.users,
  });

  newProduct
    .save()
    .then(() => res.json("New Product posted!"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// REQUEST FIND PRODUCT BY ID
router.get("/product/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// REQUEST FIND PRODUCT BY ID AND UPDATE
router.put("/update/:id", upload.single("productImage"), (req, res) => {
  Products.findById(req.params.id).then((product) => {
    product.title = req.body.title;
    product.product = req.body.product;
    product.authorname = req.body.authorname;
    product.productImage = req.file.originalname;
    // product.users = req.body.users;
    // product.sender = req.body.users;
    product
      .save()
      .then(() => res.json("Product UPDATED!!!"))
      .catch((err) => res.status(400).json(`Error ${err}`));
  });
});

// REQUEST FIND PRODUCT BY ID AND DELETE
router.delete("/delete/:id", (req, res) => {
  Products.findByIdAndDelete(req.params.id)
  .then(() => res.json("The product is DELETED!!"))
  .catch(err => res.status(400).json(`Error ${err}`));
})

module.exports = router;
