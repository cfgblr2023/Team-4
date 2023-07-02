const express = require('express');
require('dotenv').config()
const cookieSession = require('cookie-session');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
const Item = require('./models/Item');
// Passport Config
require('./config/passport')(passport);
const Content = require('./models/Content')

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//Routes
app.use('/', require('./routes/index.js'));
// app.get('/', (req, res) => {
//   res.render('./views/index2');
// })
app.use('/users', require('./routes/users.js'));
app.use('/admin', require('./routes/admin.js'));



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));