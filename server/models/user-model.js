const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const createModel = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false
  },
  teams: 
  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
 
});

// This method is used to bcrypt the password
createModel.pre("save", async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(user.password, saltRound);
    user.password = hash_pass;
  } catch (err) {
    console.log(err);
  }
  next();
});

// This method is called in router.js file and returns the bcrypt password comparison
createModel.methods.comparePass = async function (password) {
  return await bcrypt.compare(password, this.password);
}

// This method is used to generate the JWT Token
createModel.methods.generateToken = async function () {
  try {
    return jwt.sign({
      // Payload
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
    // Signature
    process.env.SECRET_KEY,
    {
      expiresIn: '30d'
    })  // SECRET_KEY is accessed from the .env file
  } catch (err) {
    console.log(err);
  }
}


const userRegister = mongoose.model("Signup", createModel);

module.exports = userRegister;
