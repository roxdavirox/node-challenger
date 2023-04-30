const Repository = require('./Repository');

class PaymentTypeRepository extends Repository {
  constructor() {
    super('payment_types');
  }
}

module.exports = new PaymentTypeRepository();
