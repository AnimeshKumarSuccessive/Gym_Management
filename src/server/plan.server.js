/**
 * I have to make teo method of payment that will be the status of the payment. 
 * whether it will be paid or unpaid.
 */
const listPlan = () => {
    // For 1 month 
    app.post('/payment_one', async(req,res) => {
        const { paymentMethodType, currency } = req.body;
        try {
            const payment = await stripe.paymentIntents.create({
                amout: 1999,
                currency: currency,
                payment_method_types: [paymentMethodType],
            });
            res.json({ clientSecret: paymentIntents.client_secret});
        } catch (error) {
            res.status(400).json({
                error: { message: error.message }
            })
        }  
    })
    // For 3 month 
    app.post('/payment_two', async(req,res) => {
        const { paymentMethodType, currency } = req.body;
        try {
            const payment_two = await stripe.paymentIntents.create({
                amout: 3000,
                currency: currency,
                payment_method_types: [paymentMethodType],
            });
            res.json({ clientSecret: paymentIntents.client_secret});
        } catch (error) {
            res.status(400).json({
                error: { message: error.message }
            })
        }  
    })
    // For 6 month 
    app.post('/payment_three', async(req,res) => {
        const { paymentMethodType, currency } = req.body;
        try {
            const payment_three = await stripe.paymentIntents.create({
                amout: 6000,
                currency: currency,
                payment_method_types: [paymentMethodType],
            });
            res.json({ clientSecret: paymentIntents.client_secret});
        } catch (error) {
            res.status(400).json({
                error: { message: error.message }
            })
        }  
    })
    // For 1 year 
    app.post('/payment_four', async(req,res) => {
        const { paymentMethodType, currency } = req.body;
        try {
            const payment_four = await stripe.paymentIntents.create({
                amout: 10000,
                currency: currency,
                payment_method_types: [paymentMethodType],
            });
            res.json({ clientSecret: paymentIntents.client_secret});
        } catch (error) {
            res.status(400).json({
                error: { message: error.message }
            })
        }  
    })
}

export default listPlan;
