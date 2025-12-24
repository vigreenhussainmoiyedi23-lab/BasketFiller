const express = require('express')
const Router = express.Router()
const { UserCanAcces } = require('../middlewares/AuthenticationMiddleware.js')
const { isadmin } = require('../middlewares/AdminMiddleware.js')
const UserModel = require('../models/user.model.js')
const productModel = require('../models/product.model.js')
const orderModel = require('../models/order.model.js')
const { OrderValidator, validate } = require("../utils/express-validator.js")
// order routes
Router.get("/stateEnum", async (req, res) => {
  const enumValues = orderModel.schema.path("state").enumValues
  res.status(200).json({ enumValues, message: "Succesfully fetched the enum values" })
})


Router.get("/more/:orderId", UserCanAcces, async (req, res) => {
  const order = await orderModel.findOne({ _id: req.params.orderId }).populate("products.product")
  return res.status(200).json({ messgae: "every detail of the order", order })
})
Router.get("/admin/:orderId", isadmin, async (req, res) => {
  const order = await orderModel.findOne({ _id: req.params.orderId }).populate("products.product")
  return res.status(200).json({ messgae: "every detail of the order", order })
})
Router.get("/", async (req, res) => {
  const orders = await orderModel.find().populate("products.product")
  return res.status(200).json({ messgae: "all orders", orders })
})
Router.get("/user", UserCanAcces, async (req, res) => {
  const user = await UserModel.findById(req.user._id).populate("Orders.order")
  return res.status(200).json({ messgae: "all orders of the user", orders: user.Orders })
})


// User checks out and creates an order
Router.post('/create', UserCanAcces, OrderValidator, validate, async (req, res) => {
  const { paymentOption, fullName, state, city, street, phoneNumber, paymentStatus } = req.body
  if (paymentStatus == "failed") return res.status(400).json({ message: "Payment Failed Please Try Again" })
  const user = await UserModel.findOne({ _id: req.user._id }).populate("CartItems.product")
  const { CartItems } = user
  if (CartItems.length === 0) {
    return res.status(400).json({ message: "User Must Have Something In the cart" })
  }
  // a property of the order is products where the finalprice quantity and everything is stored
  const products = await CartItems.map(n => {
    const finalPrice = n.product.finalPrice;
    const quantity = n.quantity
    const totalPrice = finalPrice * quantity
    const productId = n.product._id
    n = { finalPrice, quantity, totalPrice, product: productId }
    return n
  })

  // calculating the total amount or the total bill
  const totalAmount = await products.reduce((acc, val) => {
    return acc += val.totalPrice;
  }, 0)

  // creating the order
  const orderCreated = await orderModel.create({
    user: user._id,
    street,
    city,
    state,
    phoneNumber,
    fullName,
    products,
    paymentOption,
    totalAmount
  })

  // decreasing the stock left value by the value of the quantity ordered by user
  const UpdateProducts = await Promise.all(CartItems.map(async (n) => {
    const product = await productModel.findOne({ _id: n.product._id })
    const stock = product.stock - n.quantity
    product.stock = stock
    await product.save()
    return "success"
  }))

  // removing every product from the cart
  user.CartItems = []
  user.Orders.unshift({ order: orderCreated._id, status: "checkedOut" })
  await user.save()
  res.status(200).json({ message: "order created succcessfully" })
})
Router.post('/cancel/:orderId', UserCanAcces, async (req, res) => {
  const order = await orderModel.findOne({ _id: req.params.orderId })
  if (!order) return res.status(400).json({ message: "Order Id Is Wrong" })
  // increasing the stock left value by the value of the quantity ordered by user
  const UpdateProducts = await Promise.all(order.products.map(async (n) => {
    const product = await productModel.findOne({ _id: n.product })
    const stock = product.stock + n.quantity
    product.stock = stock
    await product.save()
    return "success"
  }))
  order.OrderStatus = "cancelled"
  order.paymentStatus = "pending"
  await order.save()
  res.status(200).json({ message: "order created succcessfully" })
})
Router.post('/refund/:orderId', UserCanAcces, async (req, res) => {
  const order = await orderModel.findOne({ _id: req.params.orderId })
  if (!order) return res.status(400).json({ message: "Order Id Is Wrong" })
  if(!order.OrderStatus == "cancelled")return res.status(400).json({ message: "Order is not cancelled" })
  order.paymentStatus = "pending"
  await order.save()
  res.status(200).json({ message: "Money Refunded Successfully" })
})

// Admin updates order status
Router.post('/update/:orderid/:status', isadmin, async (req, res) => {
  try {
    const { orderid, status } = req.params;

    // ✅ Validate incoming status
    const validStatuses = ["placed", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }
    if (status == "delivered") {
      const order = await orderModel.findOneAndUpdate(
        { _id: orderid },
        { orderStatus: status, paymentStatus: "paid" },
        { new: true } // return the updated document
      );
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

    } else {
      const order = await orderModel.findOneAndUpdate(
        { _id: orderid },
        { orderStatus: status },
        { new: true } // return the updated document
      );
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
    }
    return res.status(200).json({
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error("Order update error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});


module.exports = Router 