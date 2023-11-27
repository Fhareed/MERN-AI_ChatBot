import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch(err) {
        console.log(err);
        throw new Error("Error connecting to Database")
    }
}
async function disconnectFromDatabase() {
    try{
        await disconnect();
    } catch(err) {
        console.log(err);
        throw new Error("Could not Disconnect from MongoDB")
    }
}

export { connectToDatabase, disconnectFromDatabase }