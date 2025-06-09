const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user"); // Make sure path matches your file

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback", // Must match Google Console
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('Google Profile:', profile); // Debug log
        
        try {
          // Check if user already exists with this Google ID
          let user = await User.findOne({ googleId: profile.id });
          
          if (user) {
            // Update user's profile data
            user.name = profile.displayName || profile.name.givenName;
            user.picture = profile.photos?.[0]?.value;
            user.authProvider = 'google';
            await user.save();
            console.log('Updated existing user:', user);
            return done(null, user);
          }
          
          // Check if user exists with same email
          user = await User.findOne({ email: profile.emails[0].value });
          
          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            user.authProvider = 'google';
            user.picture = profile.photos?.[0]?.value;
            await user.save();
            console.log('Linked existing user:', user);
            return done(null, user);
          }
          
          // Create new user - THIS IS THE CRITICAL PART
          const newUser = new User({
            googleId: profile.id,
            name: profile.displayName || profile.name.givenName,
            email: profile.emails[0].value,
            picture: profile.photos?.[0]?.value,
            authProvider: 'google'
            // NO PASSWORD FIELD - this was causing validation errors
          });
          
          const savedUser = await newUser.save();
          console.log('Created new user:', savedUser);
          done(null, savedUser);
          
        } catch (err) {
          console.error('Passport Strategy Error:', err);
          done(err, null);
        }
      }
    )
  );

  // Since you're using JWT and session: false, you don't need these
  // But they're required by passport, so keep them minimal
  passport.serializeUser((user, done) => {
    done(null, user.id || user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};