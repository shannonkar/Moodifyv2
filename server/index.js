const express = require('express')
const app = express()
const cookieSession = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
const isLoggedIn=require('./auth')
require('./passport')
const PORT = 8888

app.use(cors())
app.use(cookieSession({
  name: 'sotify-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/spotify', passport.authenticate('spotify'), function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });
app.get('/',isLoggedIn, (req, res) =>
  res.send(`Hello ${req.user.displayName}`)
)
app.get(
  '/auth/spotify',
    passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true
  }),
  function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  }
);

  app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('http://localhost:3000');
    }
  );
  app.get('/logout', (req,res)=>{
    req.session=null;
    req.logout();
    res.redirect('/');
  })

app.listen(PORT, () => console.log(  `listening on port ${PORT}`))