const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser');
// const bodyCookie = require('body-parser');
// const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const routes = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
// app.use(cookieParser.json());

routes(app);


app.get('/', (req, res) => {
    return res.send('Hello world');
})

mongoose.connect(`mongodb+srv://dungtakhmtk21:${process.env.MONGO_DB}@cluster0.9l34wfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() =>{
    console.log('Connect Db success');
})
.catch((error) =>{
    console.log(error);
})


app.listen(port, () =>{
    console.log('Server is running in port: ', + port);
})