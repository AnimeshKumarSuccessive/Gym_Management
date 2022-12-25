import PaymentService from '../server/payment.server';

app.use('payments', new PaymentService(), {
    events: ['status']
  });
