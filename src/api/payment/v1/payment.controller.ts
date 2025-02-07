import { PaymentService } from './payment.service';

export class PaymentController {
	create = async () => {
		return await PaymentService.create(100);
	};
	refund = async (payment_intent_id: string) => {
		return await PaymentService.refund(payment_intent_id);
	};
	confirm = async (payment_intent_id: string) => {
		return await PaymentService.confirm(payment_intent_id);
	};
}
