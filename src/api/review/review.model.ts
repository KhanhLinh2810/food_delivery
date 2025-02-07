import mongoose, { Schema } from 'mongoose';

export interface ReviewAttrs {
	item_id: mongoose.Schema.Types.ObjectId;
	user_id: mongoose.Schema.Types.ObjectId;
	order_id: mongoose.Schema.Types.ObjectId;
	score: number;
	desciption?: string;
}

export interface ReviewDoc extends mongoose.Document {
	item_id: mongoose.Schema.Types.ObjectId;
	user_id: mongoose.Schema.Types.ObjectId;
	order_id: mongoose.Schema.Types.ObjectId;
	score: number;
	desciption?: string;
	created_at: Date;
	updated_at: Date;
}

export const reviewSchema = new mongoose.Schema<ReviewDoc>(
	{
		item_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		order_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		score: {
			type: Number,
			required: true,
		},
		desciption: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
);

interface ReviewModel extends mongoose.Model<ReviewDoc> {
	build(attrs: ReviewAttrs): ReviewDoc;
}

const Review = mongoose.model<ReviewDoc, ReviewModel>('Review', reviewSchema);

reviewSchema.statics.build = function (attrs: ReviewAttrs) {
	return new Review();
};

export { Review };
