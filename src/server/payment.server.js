class PaymentService {
    async create(data,params) {
        const customer = await createStripeCustomer (params.user);
        this.emit('status', {status: 'created'});

        const payment = await createPayment(data);
        this.emit('status', {status: 'completed'});

        return payment;
    }
}

export default PaymentService;
