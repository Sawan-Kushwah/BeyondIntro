import mongoose from 'mongoose';
const { Schema } = mongoose;

const replySchema = new Schema({
    message: { type: String, required: true }, //
    createdAt: { type: Date, default: Date.now },
    upVote: { type: Number, default: 0 },
    downVote: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }, //
    postID: { type: Schema.Types.ObjectId, ref: 'Post' } //
});

export default mongoose.model('Reply', replySchema);