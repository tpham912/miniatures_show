const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  miniatures: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Miniature'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
