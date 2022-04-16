const jwt = require("jsonwebtoken");
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require("./../models/userModel");


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
  
const createSendToken = (user, statusCode, res) => {
  
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true
    }
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  
    res.cookie("jwt", token, cookieOptions);
    user.password = undefined;
  
    res.status(statusCode).json({
      status: "success",
      data: {
        user
      }
    });
  
};


exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });
  
    createSendToken(newUser, 201, res);
  
});
  
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) return next(new AppError("Please enter an email and password", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user || !await user.correctPassword(password, user.password)) return next(new AppError("Incorrect email or password!", 401));
  
    createSendToken(user, 200, res);
  
});

exports.logout = (req, res) => {
    res.cookie("jwt", "loggedOut", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({
      status: "success"
    });
};


exports.protect = catchAsync(async (req, res, next) => {

    if(process.env.NODE_ENV === "development") {
        req.user = await User.findById(process.env.TEST_USER_ID);
        return next();
    }
    let token = "";

    if (req.cookies.token) token = req.cookies.token;

    if (!token) return next(new AppError("Please log in to gain access!", 401));
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) return next(new AppError("This user no longer exists!", 401));

    req.user = user;
    next();
});


//returns user || null
exports.isLoggedIn = catchAsync(async (req, res, next) => {

    if(process.env.NODE_ENV === "development") {
      const user = await User.findById(process.env.TEST_USER_ID);
      return res.status(200).json({
        status: "success",
        user
      });;
    };
  
    let token = "";
    if (req.cookies.token) token = req.cookies.token;
  
    if (!token) {
      return res.status(200).json({
        status: "success",
        user: null,
      });
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
    const user = await User.findById(decoded.id);
  
    if (!user) return next(new AppError("User no longer exists!", 400));
  
    user.password = undefined;
  
    res.status(200).json({
      status: "success",
      user
    });
});