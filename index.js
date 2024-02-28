var express = require('express');
var createHttpError = require('http-errors');
var morgan = require('morgan');
var ejs = require('ejs');
var mongoose = require('mongoose');
require('dotenv').config();
var path = require('path');
var app = express();
var session = require('express-session');
var connectFlash = require('connect-flash');
var passport = require('passport');
var connectMongo = require('connect-mongo');
var{ ensureLoggedIn } = require('connect-ensure-login');
const { roles } = require('./utils/constants');

// Initialization
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"))
app.set("views","./views")
app.set("view engine", "ejs");

app.use('/css',express.static(path.join(__dirname, "public/css")));
app.use('/js',express.static(path.join(__dirname, "public/js")));
app.use('/images',express.static(path.join(__dirname, "public/images")));

const MongoStore = connectMongo(session);
// Init Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// For Passport JS Authentication
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport.auth');

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Connect Flash
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// Routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));
app.use(
  '/user',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  require('./routes/user.route')
);
app.use(
  '/admin',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureAdmin,
  require('./routes/admin.route')
);
app.use(
  '/teacher',
  ensureLoggedIn({ redirectTo: '/auth/login' }),
  ensureTeacher,
  require('./routes/teacher.route')
);

// 404 Handler
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error Handler
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render('error_40x', { error });
});

// Setting the PORT
const PORT = process.env.PORT || 3000;

// Making a connection to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('CONNECTION ESTABLISHED...');
    // Listening for connections on the defined PORT
    app.listen(PORT, () => console.log(`🚀 SERVER IS LISTENING ON:${PORT}`));
  })
  .catch((err) => console.log(err.message));

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/auth/login');
//   }
// }

function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    req.flash('warning', 'you are not Authorized to see this route');
    res.redirect('/');
  }
}

function ensureTeacher(req, res, next) {
  if (req.user.role === roles.teacher) {
    next();
  } else {
    req.flash('warning', 'you are not Authorized to see this route');
    res.redirect('/');
  }
}
