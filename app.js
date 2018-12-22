const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverRide = require('method-override');


//Load User Model
require('./models/User');
require('./models/Story');

// Passport config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

// Load keys
const keys = require('./config/keys');

// Handlebars Helpers

const {truncate, stripTags, formatDate, select,editIcon} = require('./helpers/hbs');

mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
}).then(()=>{
    console.log("Mongo Connected");
}).catch(err => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// mehtod Override Middleware
app.use(methodOverRide('_method'));

// Handlebars Middleware
app.engine('handlebars', exhbs({
    helpers : {
      truncate : truncate,
      stripTags : stripTags,
      formatDate : formatDate,
      select: select,
      editIcon : editIcon
    },
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






