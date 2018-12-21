const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exhbs = require('express-handlebars');


//Load User Model
require('./models/User');

// Passport config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

// Load keys
const keys = require('./config/keys');

mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(keys.mongoURI(), {
    useNewUrlParser: true
}).then(()=>{
    console.log("Mongo Connected");
}).catch(err => console.log(err));

const app = express();

// Handlebars Middleware
app.engine('handlebars', exhbs({
    defaultLayout: 'main'
}));
app.set('view engine','handlebars');


app.use(cookieParser());
app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// set Gloabl vars
app.use((req,res,next) => {
    res.locals.user = req.user || null,
    next();
})

app.use(express.static(path.join(__dirname,'public')));


// Use Routes
app.use('/',index);
app.use('/auth',auth);
app.use('/stories',stories);



const port = process.env.PORT || 4002;

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});






