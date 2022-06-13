const express = require("express");
const router = express.Router();
const multer = require("multer");
const Products = require("../models/productModel");
const app = express();

// Storage file
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "/Web Development/FinalProject/client/public/images/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

// upload file
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
    }
  },
});

// REQUEST GET ALL PRODUCTS
router.get("/buy", (req, res) => {
  Products.find()
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// REQUEST GET ALL PRODUCTS
router.get("/sell/:id", async (req, res, next) => {
  try {
    const products = await Products.find({ users: req.params.id }).select([
      "title",
      "product",
      "price",
      "_id",
      "productImage",
      "users",
      "sender",
      "postDate",
      "updatedAt",
      "userImage",
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
    price: req.body.price,
    productImage: req.file.originalname,
    users: req.body.users,
    sender: req.body.users,
    username: req.body.username,
    userImage: req.body.userImage,
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
    product.price = req.body.price;
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
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// multer error
app.use((err, req, res, next) => {
  if(err){
    if(err instanceof multer.MulterError){
      res.status(500).send("There was an upload error!");
    }else{
      res.status(500).send(err.message);
    }
  }else{
    res.send("success");
  }
})

module.exports = router;
