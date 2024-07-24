import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
let PORT = 3000;


// Exercise 1
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

const addToCart = (cart, productId, name, price, quantity) => {
  cart.push({productId, name, price, quantity})
  return cart
}

app.get('/cart/add',(req, res) => {
  let productId = parseInt(req.query.productId)
  let name = req.query.name
  let price = parseFloat(req.query.price)
  let quantity = parseInt(req.query.quantity)
  let result = addToCart(cart, productId, name, price, quantity)
  res.json({ cartItems: result })
})


//Exercise 2
const editByQuantity = (cart, productId, quantity) => {
  for(let i=0; i < cart.length; i++){
    if(cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart
}

app.get('/cart/edit',(req, res) => {
  let productId = parseInt(req.query.productId)
  let quantity = parseInt(req.query.quantity)
  let result = editByQuantity(cart, productId, quantity)
  res.json({ cartItems:  result})
})


//Exercise 3
app.get('/cart/delete',(req, res) => {
  let productId = parseInt(req.query.productId)
  let result = cart.filter((item)=> item.productId != productId)
  res.json({ cartItems: result })
})


//Exercise 4
app.get('/cart',(req, res) => {
  res.json({ cartItems: cart })
})


//Exercise 5
const totalQuantity = (cart) => {
  let total = 0;
  for(let i=0; i < cart.length; i++){
    total = total + cart[i].quantity
  }
  return total;
}

app.get('/cart/total-quantity',(req, res) => {
  let result = totalQuantity(cart)
  res.json({ totalQuantity: result })
})


//Exercise 6
const totalPrice = (cart) => {
  let total = 0;
  for(let i=0; i < cart.length; i++){
    total = total + (cart[i].price * cart[i].quantity)
  }
  return total;
}

app.get('/cart/total-price',(req, res) => {
  let result = totalPrice(cart)
  res.json({ totalPrice: result })
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});