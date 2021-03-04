
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//connection creation and creating a new DB
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017/bookStore", { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true, useCreateIndex: true })
    .then(() => console.log("mongoDB connected for users"))
    .catch((err) => console.log(err))

//schema
//A Mongoose Schema defines the structure of the document, default values, validations, etc.

const UserSchema = new mongoose.Schema({
    user_id: { type: String, unique: true, required: true },

    password: {
        type: String,
        required: true,
        // lowercase: true,
        minlength: [6, "Length should be 6 or greater"],
        //maxlength: 15,
        validate(value) {
            if (value === 'password')
                throw new Error("'password' cannot be a name of a password")
        }


    },
    tokens: [{
        token: {
            type: String,
            required: true,

        }
    }]


});


UserSchema.methods.generateAuthToken = async function () {
    try {

        console.log("hey id: " + this._id.toString())

        const token = jwt.sign({ _id: this._id.toString() }, "thisismysecretkeytoencryptthistoken")
        // console.log(token);

        this.tokens = this.tokens.concat({ token: token });
        //await this.save();
        return token;
    } catch (error) {
        console.log("error in token generation " + error);
        return null;
    }

}



//Collection creation
const User = new mongoose.model('User', UserSchema);





const checkUser = async (userInfo) => {
    try {
        // console.log(userInfo);

        const user = await User.findOne({ user_id: userInfo.user_id });

        console.log("user details:" + user);

        const isMatch = await bcrypt.compare(userInfo.password, user.password);

        console.log("Is match : " + isMatch);

        if (isMatch) {
            const token = await user.generateAuthToken();
            return { info: "Valid User", token };
        }
        else
            return { info: "Invalid User or Password 'try again'", token: null };

        // if (user) {
        //     const token = await user.generateAuthToken();
        //     return { info: "Valid User", token };
        // }
        // else
        //     return { info: "Invalid User or Password 'try again'", token: null };

    } catch (err) {
        console.log(err);
    }
}

const registerUser = async (userInfo) => {
    try {
        // console.log(userInfo);


        const securePassword = await bcrypt.hash(userInfo.password, 10);

        console.log("registered Pass:" + securePassword);

        const registerUser = new User({ user_id: userInfo.user_id, password: securePassword });

        const token = await registerUser.generateAuthToken();


        const user = await registerUser.save();
        if (user) {
            return { info: "User Registered", token };
        }
        else
            return { info: "User Not Registered 'try again'", token: null };

    } catch (err) {
        console.log(err);
        return { info: err.message, token: null };
    }
}


const auth = async (req, res, next) => {
    try {
        console.log("Middleware");
        const token = req.cookies.loginjwt;
        console.log(token);
        const verifyUser = jwt.verify(token, "thisismysecretkeytoencryptthistoken");
        console.log("user Verification :" + verifyUser);


        const user = await User.findOne({ _id: verifyUser._id });
        console.log("verified user details :" + user);

        next();

    } catch (error) {
        console.log(error.message);
        res.status(401).send(error);


    }

}


module.exports = {
    checkUser: checkUser,
    registerUser: registerUser,
    auth: auth
}