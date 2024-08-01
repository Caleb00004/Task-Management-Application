const mongoose = require('mongoose')

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: true
        })

        console.log('connected to database')
    } catch (error) {
        console.log(error)
        console.log(`error occured: ${error.message}`)
        process.exit()
    } 
}
 
module.exports = connectDB;
