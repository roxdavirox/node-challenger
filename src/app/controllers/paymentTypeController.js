const PaymentType = require('../models/PaymentType');

exports.getAllPaymentTypes = async (req, res) => {
  try {
    const paymentTypes = await PaymentType.findAll();
    res.json(paymentTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getPaymentTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const paymentType = await PaymentType.findByPk(id);
    if (paymentType) {
      res.json(paymentType);
    } else {
      res.status(404).json({ message: `PaymentType with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createPaymentType = async (req, res) => {
  const { type } = req.body;
  try {
    const paymentType = await PaymentType.create({ type });
    res.json(paymentType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updatePaymentType = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  try {
    const paymentType = await PaymentType.findByPk(id);
    if (paymentType) {
      await paymentType.update({ type });
      res.json(paymentType);
    } else {
      res.status(404).json({ message: `PaymentType with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deletePaymentType = async (req, res) => {
  const { id } = req.params;
  try {
    const paymentType = await PaymentType.findByPk(id);
    if (paymentType) {
      await paymentType.destroy();
      res.json({ message: `PaymentType with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `PaymentType with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
