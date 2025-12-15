async function GetProductUserAndIndex(userId, productId) {
    const user = await UserModel.findOne({ _id: userId })
    const product = await productModel.findOne({ _id: productId }).lean()
    const idx = user.CartItems.findIndex(item => item.product.toString() === product._id.toString());
    return { user, product, idx }
}
async function QuantityHandler(action, idx, user) {
  const productInCart = user.CartItems[idx];

  if (action === 'increase') {
    productInCart.quantity += 1;
  } else if (action === 'decrease') {
    productInCart.quantity -= 1;

    if (productInCart.quantity < 1) {
      user.CartItems.splice(idx, 1);
      await user.save();
      return { removed: true, user };
    }
  }
  user.CartItems[idx] = productInCart;
  await user.save();
  return { removed: false, user };
}
module.exports = { GetProductUserAndIndex, QuantityHandler };