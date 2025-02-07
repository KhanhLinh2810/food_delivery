import { Counter } from '../counter.model';

export const getNextSequence = async (sequence_name: string) => {
	const sequence = await Counter.findOne({ sequence_name });
	if (sequence) {
		sequence.value = sequence.value + 1;
		await sequence.save();
		return sequence.value;
	}
	await Counter.create({ sequence_name, value: 1 });
	return 1;
};

export const CounterService = {
	getNextSequence,
};
