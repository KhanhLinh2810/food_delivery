import mongoose from 'mongoose';

export interface CounterAttrs {
	sequence_name: string;
	value?: number;
}

export interface CounterDoc extends mongoose.Document {
	sequence_name: string;
	value: number;
}

interface CounterModel extends mongoose.Model<CounterDoc> {
	build(attrs: CounterAttrs): CounterDoc;
}

export const counterSchema = new mongoose.Schema<CounterDoc>(
	{
		sequence_name: {
			type: String,
			unique: true,
			required: true,
		},
		value: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: false,
		collection: 'counter',
	},
);

counterSchema.statics.build = function (attrs: CounterAttrs) {
	return new Counter(attrs);
};

const Counter = mongoose.model<CounterDoc, CounterModel>(
	'Counter',
	counterSchema,
);

export { Counter };
