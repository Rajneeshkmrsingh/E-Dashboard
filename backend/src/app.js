const express = require("express");
const cors = require("cors");
require("./db/conn");
const User = require("./models/user");
const Product = require("./models/product");
const { findOneAndDelete } = require("./models/user");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("App is working Properly..");
});
app.post("/register", async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ message: "Email already exist" });
    } else {
      if (name && phone && email && password) {
        let user = new User(req.body);
        let userData = await user.save();
        userData = userData.toObject();
        delete userData.password;
        delete userData.phone;
        res.status(201).send(userData);
      } else {
        res.status(400).send({ Result: "You have missed something" });
      }
    }
  } catch (error) {
    res.send("Error", error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await User.findOne({ email, password }).select("-password");
      if (user) {
        res.status(200).send(user);
      } else {
        res
          .status(400)
          .send({ Error: "You have entered wrong user Id and password" });
      }
    } else {
      res.send({ message: "you have missed something" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send({ Error: "Error in fetching Product" });
  }
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ error: "No product found" });
  }
});
app.delete("/deleteproduct/:productid", async (req, res) => {
  const _id = req.params.productid;
  try {
    await Product.findOneAndDelete({ _id });
    res.send({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
app.get("/updateproduct/:productid", async (req, res) => {
  const _id = req.params.productid;
  try {
    const updateProduct = await Product.findOne({ _id });
    //console.log(updateProduct)
    res.send(updateProduct);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
app.put("/updateproduct/:productid", async (req, res) => {
  const { name, category, company, price } = req.body;

  try {
    const product = await Product.updateOne(
      { _id: req.params.productid },
      { name, category, company, price }
    );
    console.log(product);
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ Error: error });
  }
});
app.get("/search/:key",async(req,res)=>{
 try {
   
  let result = await Product.find({
    "$or":
      [
        {name:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
        {category:{$regex:req.params.key}}
      ]
  })
  res.status(200).send(result)
 } catch (error) {
   res.status(400).send(error)
   
 }
})

app.listen(port, () => console.log(`app is running at port ${port}`));
