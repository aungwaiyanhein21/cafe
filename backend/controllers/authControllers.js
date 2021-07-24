const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// const transporter = require('../middlewares/nodemailer');

// 3 days * 24 hrs * 60 mins * 60 s => will give in seconds
const maxAge = 3 * 24 * 60 * 60;
// const maxAge = 10;



// creating a token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: maxAge
    });
};

/*** for signup ***/
const signUp = async (req, res) => {
    const data = req.body;
    try {
        
        const user = await User.create({ ...data });
        
        // send email confirmation

        jwt.sign(
            { id: user._id }, 
            process.env.CONFIRMATION_TOKEN_KEY, 
            {
                expiresIn: '1h'
            },
            (err, emailToken) => {
                const url = `${req.protocol}://${req.get('host')}/confirmation/${emailToken}`;
                console.log("confirm url: " + url);
                
                console.log(process.env.EMAIL);
                console.log(user.email);


               

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASS
                    }
                });

                // send mail
                let mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: "Email Confirmation",
                    html: `<h1>Verify your email</h1><br /><a href='${url}'>Click here to confirm your email</a>`
                };

                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        console.log("Error: " + err);
                    }
                    else {
                        console.log('Email has been sent');
                    }
                });
            }
        );
        
        
        // const token = createToken(user._id);

        // // set in cookie
        // // note: maxAge in milliseconds
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        
        res.status(201).json({ 
            user: {id: user._id, firstName: user.firstName, lastName: user.lastName}, 
            message: "Email has been sent" 
        });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

/*** for login ***/
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // using a static method that we define in User
        const user = await User.login(email, password);

        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.cookie('name', user.firstName + " " + user.lastName, {maxAge: maxAge * 1000 });
        res.cookie('id', user._id.toString(), {maxAge: maxAge * 1000 });

        res.status(200).json({ 
            user: {id: user._id, firstName: user.firstName, lastName: user.lastName}
        });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

/*** for email confirmation ***/
const confirmation = (req, res) => {
    const token = req.params.token;
    console.log(token);


    try {
        jwt.verify(token, process.env.CONFIRMATION_TOKEN_KEY, async (err, decodedToken) => {
            if (err) {
                // we have token but it is not valid
                console.log(err.message);
            }
            else {
                // token is valid so confirmed
                // update user data
                try {
                    // update confirmed field
                    const id = decodedToken.id;

                    const updatedUser = await User.findByIdAndUpdate(id, {confirmed: true}, { new: true });
                    
                    // auto login the user
                    const token = createToken(updatedUser._id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

                    res.cookie('name', updatedUser.firstName + " " + updatedUser.lastName, {maxAge: maxAge * 1000 });
                    res.cookie('id', updatedUser._id.toString(), {maxAge: maxAge * 1000 });

                    // res.status(200).json({ 
                    //     user: {id: updatedUser._id, firstName: updatedUser.firstName, lastName: updatedUser.lastName}, 
                    // });


                    // temporary measure
                    res.redirect(process.env.CUSTOMER_APP_URL);
                }
                catch (err) {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while updating a user'
                    });
                }

            }
        });
    }
    catch (err) {
        res.json({
            'message': err.message || 'Some error occurred'
        })
    }

};

/*** for logout ***/
const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('name', '', {maxAge: 1 });
    res.cookie('id', '', {maxAge: 1 });

    res.json({
        hasLoggedOut: true
    });
};



/*** handle errors ***/
const handleErrors = (err) => {
    let errors = { email: "", password: "", confirmed: ""};

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === "incorrect password") {
        errors.password = 'That password is incorrect';
    }

    // unconfirmed yet
    if (err.message === "email unconfirmed") {
        errors.confirmed = 'Email has not been confirmed yet';
    }

    // duplicate error
    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};




module.exports = {
    signUp,
    login,
    logout,
    confirmation
};
