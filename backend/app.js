const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const toyRoutes = require('./api/toys/toy.controller')
// const userRoutes = require('./api/users/user.controller')

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors()); 

app.use('/api/toy', toyRoutes)
// app.use('/api/user', userRoutes)



app.listen(3030, () => {
    console.log('Listening on port 3030');
})