import mongoose from 'mongoose';

// you can manage env and secret vaues with the æconfig" package. it gives you some flexibility on how to store adn retrieve them

const connectDB = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log('MongoDB connected successfully');
    } catch(error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;

// This code connects to a MongoDB database using Mongoose.