import mongoose from "mongoose"

const connectToDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("Already connected")
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Connected to DB")
    } catch (error) {
        console.log("Error in connection to database", error);
    }
}

export default connectToDB;
