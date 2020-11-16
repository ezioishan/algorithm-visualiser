const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('./passport');

const app = express();
const port = 5000;
const User = require('./models/User');

require('./config/passport')(passport);

/*=================================================================
DB Connection
====================================================================
*/

const db = require('./config/keys').MongoURI;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

/*
=======================================================================
Middlewares
=======================================================================
*/
app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());



/*
=========================================================================
Routes
========================================================================
*/
// app.get('/login', (req, res) => {
//     res.json({ 'status': 'not okay' });
// });

// app.get('/home', (req, res) => {
//     res.json({ 'status': 'okay' });
// })

// app.post('/login', cors(), (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/home',
//         failureRedirect: '/login',
//     })(req, res, next);
// });

// app.post('/register', cors(), (req, res) => {
//     console.log(req.body);
//     const { email, password, conf_password } = req.body;
//     // let errors = [];
//     // if (!email || !password || !conf_password) {
//     //     errors.push({ message: 'Please fill in all fields!' });
//     // }
//     // if (password != conf_password) {
//     //     errors.push({ message: 'Password do not match!' });
//     // }
//     // if (password.length < 6) {
//     //     errors.push({ message: 'Password length should be atleast 5 characters!' });
//     // }
//     //res.json({ 'status': 'okay' });
//     // User.findOne({ email: email})
//     // .then(user => {
//     //     if(user){
//     //         //user exists
//     //     }
//     // })
//     const newUser = new User({
//         email,
//         password,
//     });
//     bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err)
//             throw err;
//         newUser.password = hash;
//         newUser.save()
//             .then(user => {
//                 res.json({ 'isRegistered': true });
//             })
//             .catch(err => console.log(err))
//     }));
//     console.log('User Registered!');
// });
app.post('/', (req, res) => {
    console.log('User Registration');
    const { email, password, conf_password } = req.body;
    console.log(req.body)
    User.findOne({email: email}, (err, user) => {
        console.log('MongoDB data retrieved: ', user);
        if (err) {
            //some error
            console.log('User.js post error: ', err)
        } 
        else if (user) {
            //user already exist
            res.json({
                error: `Sorry, already a user with the email: ${email}`
            });
        }
        else {
            //otherwise create a new user
            const newUser = new User({
                email,
                password,
            });
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    });
});
app.post('/login', (req, res) => {
    console.log('server.js, login, req.body: ');
    console.log(req.body);
    // passport.authenticate('local', function (err, user, info){
    //     if(err){
    //         return res.status(401).json(err);
    //     }
    //     if(user){
    //         console.log('logged in', req.user);
    //         var userInfo = {
    //             email: req.user.email
    //         };
    //         res.send(userInfo);
    //     }
    //     console.log(user);
    // });
    const { email, password } = req.body;
    User.findOne({email: email, password: password}, (err, user) => {
        console.log('MongoDB data retrieved: ', user);
        if (err) {
            //some error
            console.log('server.js post error: ', err)
        } 
        else if (user) {
            //user already exist
            console.log('User exists!', user);
            var userInfo = {
                email: user.email
            };
            res.send(userInfo);
        }

    });
});

app.get('/login', (req, res) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
});

// app.post('/logout', (req, res) => {
//     if (req.user) {
//         req.logout()
//         res.send({ msg: 'logging out' })
//     } else {
//         res.send({ msg: 'no user to log out' })
//     }
// });

app.listen(port, () => console.log(`Server running at ${port}`));