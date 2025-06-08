const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

// Middleware to hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password was changed
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = model("User", UserSchema);
module.exports = User;
