import Stripe from 'stripe';

const stripe = new Stripe(
	'sk_test_51PR3mLBCP0bsacktkKakg6zaJkE2QeRvtZiK0FLPfwlYszOPoknZccAboU4UWUsNQwsYKa0UIM2aRTnmSKx5fTz200ZyjgxMBB',
);

async function create(amount: number) {
	return await stripe.paymentIntents.create({
		amount: amount,
		currency: 'usd',
		automatic_payment_methods: {
			enabled: true,
		},
	});
}

async function refund(payment_intent_id: string) {
	return await stripe.refunds.create({
		payment_intent: payment_intent_id,
	});
}

async function confirm(payment_intent_id: string) {
	return await stripe.paymentIntents.confirm(payment_intent_id, {
		payment_method: 'pm_card_visa',
		return_url: 'https://google.com',
	});
}

export const PaymentService = {
	create,
	refund,
	confirm,
};
