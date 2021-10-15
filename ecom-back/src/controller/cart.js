const Cart = require("../model/Cart");

exports.addItemsToCart = (req, res) => {
  Cart.findOne({ user: req.user.id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition , update;

     
      if (item) {
        condition = { user: req.user.id, "cartItems.product": product };
        update = {
          "$set": {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quatity,
            },
          },
        };
      } else {
        condition = { user: req.user.id}
        update =  {
          "$push": {
            "cartItems": req.body.cartItems,
          },
        }
      }
      Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart : _cart });
        }
      })
    } else {
      const cart = new Cart({
        user: req.user.id,
        cartItems: [req.body.cartItems],
      });

      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};