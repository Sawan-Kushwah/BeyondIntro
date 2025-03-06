import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    id: String, // number
    username: { type: String, required: true },
    avtar: Image,
    email: { type: String, required: true },
});

export default mongoose.model('User', userSchema);