import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
    message: { type: String, required: true },
    isAnswered: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    category: { type: String, required: true },
    upVote: { type: Number, default: 0 },
    downVote: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;