import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    id: String, // number
    name: { type: String, required: true },
    image: String,
    email: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User