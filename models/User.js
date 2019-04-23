import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, index: true },
  OAuth: Boolean,
  name: String,
  avatarUrl: String,
  githubId: Number,
  googleId: Number
});

// serial deserial을 username을 이용해서 하기 때문에 custom 을 만든다.
UserSchema.statics.serializeUser = function() {
  return function(user, cb) {
    cb(null, user.id);
  };
};

UserSchema.statics.deserializeUser = function() {
  var self = this;

  return function(id, cb) {
    self.findOne(id, cb);
  };
};
UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  errorMessages: {
    MissingPasswordError: "No password was given",
    // AttemptTooSoonError: "Account is currently locked. Try again later",
    // TooManyAttemptsError:
    //   "Account locked due to too many failed login attempts",
    // NoSaltValueStoredError: "Authentication not possible. No salt value stored",
    IncorrectPasswordError: "Password is incorrect",
    IncorrectUsernameError: "username is incorrect",
    MissingUsernameError: "No username was given",
    UserExistsError:
      "A user with the given username or email is already registered"
  }
});

const model = mongoose.model("User", UserSchema);

export default model;
