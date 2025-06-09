const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password only required for local auth users
      },
    },
    picture: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetCode: {
      type: String,
      default: null,
    },
    resetCodeExpires: {
      type: Date,
      default: null,
    },
    googleId: {
      type: String,
      required: false,
      sparse: true,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  { timestamps: true }
);

// Hash password before saving (only for local auth users)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = model("User", UserSchema);
module.exports = User;
