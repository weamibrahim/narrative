import mongoose from 'mongoose'

const connectMongo =  () => {
    try{
        const mongoURI = process.env.MONGO_URI
        mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        mongoose.connection.on("connected", () => {
            console.log("Connected to the database");
          });

}catch(e){
    console.log(e)
}


}
export default connectMongo