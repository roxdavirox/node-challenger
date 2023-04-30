const PaymentTypeRepository = require('../repositories/PaymentTypeRepository');

exports.getAllPaymentTypes = async (req, res) => {
  try {
    const paymentTypes = await PaymentTypeRepository.getAll();
    res.json(paymentTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getPaymentTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const paymentType = await PaymentTypeRepository.getById(id);
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
    const paymentType = await PaymentTypeRepository.create({ type });
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
    const foundPaymentType = await PaymentTypeRepository.getById(id);
    if (foundPaymentType) {
      const paymentType = await PaymentTypeRepository.update(id , { type });
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
    const findedPaymentType = await PaymentTypeRepository.getById(id);

    if (findedPaymentType) {
      await PaymentTypeRepository.deleteEntityAndAssociations(id, ['expenses']);
      res.json({ message: `PaymentType with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `PaymentType with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
