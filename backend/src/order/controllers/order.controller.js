// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try {
    const {
      shippingInfo,
      orderedItems,
      paymentInfo,
      paidAt,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!shippingInfo || !orderedItems || !paymentInfo) {
      return next(new ErrorHandler(400, "Please provide all required order details"));
    }

    const order = await createNewOrderRepo({
      shippingInfo,
      orderedItems,
      paymentInfo,
      paidAt: paidAt || Date.now(),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};
