const LocalStategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport) {
  // function is authenticate Users
  const authenticateUsers = async (email, password, done) => {
    // user by email
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { massage: "no user found with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return donr(null, user);
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.user(new LocalStategy({ usernameField: "email" }));
  passport.seralizUser((user, done) => {});
  passport.deseralizUser((done, user) => {});
}
