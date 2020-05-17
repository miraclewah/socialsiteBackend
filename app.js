const express = require('express')
const app = express()
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config()


//db connection
mongoose.connect(
    process.env.MONGODB_URI || process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
)
  .then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

//bring in routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
// apiDocs
app.get('/',(req,res)=> {
  fs.readFile('docs/apiDocs.json',(err,data)=> {
    if (err){
      res.status(400).json({
        error : err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })
})

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: "Unauthorized!"});
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('react-front/build'));

  app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname,'react-front','build','index.html'))
  })
}


//localhost:8080
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`)
}); 