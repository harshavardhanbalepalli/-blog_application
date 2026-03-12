const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");
const {generateUserToken} = require('../utils/auth');

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/defaultProfile.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  
  const salt = randomBytes(16).toString();     // random string attached to the user password
  const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static('matchedPasswordAndGenerateToken', async function(email, password){
  
  const user = await this.findOne({email});
  if(!user) throw new Error('User not found');
  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = createHmac('sha256', salt).update(password).digest("hex");
  if (hashedPassword === userProvidedHash){
    //(always return the data using toObject() or toJSON() period. returning using ...user is not preferred becauese ...user returns a complex mongoose document object, which might lead to data leaks)
    //  return {...user, password : undefined, salt : undefined}

    // const userObj = user.toObject();
    // delete userObj.password;
    // delete userObj.salf;
    // return userObj;

    const token = generateUserToken(user);
    return token;
  }else{
    return null;
  }
})

const User = model("User", userSchema);

module.exports = User;
