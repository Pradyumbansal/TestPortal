const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const flash = require('connect-flash');
const session = require('express-session');

const mongoose = require('mongoose');
const passport = require('passport');
const app = express();

// Passport config
require('./config/passport')(passport);

//config mongodb
const db =require('./config/keys').MongoURI;

// connnect mongoose
mongoose.connect(db, { useNewUrlParser : true })
.then(()=> console.log(' MongoDB connected...'))
.catch( err=> console.log(err));

//EJS 
app.use(expressLayouts);
app.set('view engine','ejs');

//Body parser
app.use(express.urlencoded({ extended : false }));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());  
// Global vars
app.use((req,res ,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');    
    next();
})

// Router
app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));


PORT = process.env.PORT || 5000;

app.listen(PORT , console.log(`The server is running on ${PORT} `));