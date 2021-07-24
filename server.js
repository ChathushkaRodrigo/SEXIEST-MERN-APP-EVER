const express =require('express');
const mongoose =require('mongoose');
const bodyParser =require('body-parser');
const cors = require('cors');





const app = express();
//import routes
const postsRoutes = require('./routes/posts');

//APP middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(postsRoutes);



const PORT = 8000;

const DB_URL  = 'mongodb+srv://Chathushka:chathu123@mernapp.qbwjq.mongodb.net/mernCRUD?retryWrites=true&w=majority';

mongoose.connect(DB_URL,{ useNewUrlParser: true ,useUnifiedTopology: true} ).then(()=>{
    console.log("DB connected");
   
}).catch((err)=>{
console.log("DB error",err);
})

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
} );




