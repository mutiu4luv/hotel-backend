const mongoose = require("mongoose")

// var mongoURL = (process.env.MONGO_URL )

// mongoose.connect(mongoURL , { useUnifiedTopology: true , useNewUrlParser:true})

// var connection = mongoose.Connection







// connection.on("error" ,  ()=>{
//     console.log("mongo db not connected")
// })

// connection.on("connected" , () =>{
//     console.log("mongo db connected")
// })



// Replace `<YOUR_MONGODB_CONNECTION_STRING>` with your actual MongoDB connection string
   mongoose.connect((process.env.MONGO_URL ), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

module.exports = mongoose