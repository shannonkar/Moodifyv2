const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
require('dotenv').config();

passport.serializeUser((user, done) =>
    done(null, user));
passport.deserializeUser((user,done)=>
    done(null, user))

passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL:'http://localhost:8888/auth/spotify/callback'
},
(accessToken, refreshToken, profile,done) =>
     done(null,profile)
))
