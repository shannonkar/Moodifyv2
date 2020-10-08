require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const querystring = require('querystring')
const isLoggedIn=require('./auth')
const axios =require('axios');
const fetch = require('node-fetch');
const PORT = 8081
const redirect_uri='http://localhost:8081/callback'
const spotify_auth_uri = 'https://accounts.spotify.com/authorize?';

app.use(cors())
    .use(express.json())
    .use(express.urlencoded({extended:false}))

app.get('/', (request, response)=>
    response.send('Hello')
)
app.get('/login',(request,response)=>{
    const scope = 'user-read-private user-read-private';
    response.redirect(spotify_auth_uri+
        querystring.stringify({
            client_id: process.env.CLIENT_ID,
            response_type: 'code',
            redirect_uri: redirect_uri,
            scope:scope,
        }))



});
app.get('/callback', (request, response)=>{
    getAuth(request.query.code).then(response => console.log(response)).catch(err => console.log(err.message))
})
 function getAuth(auth_code) {
   return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic' + new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
        },
        body:{
            "grant_type": "authorization_code",
            "code": auth_code,
            "redirect_uri": redirect_uri,
        }
    })
}


app.listen(PORT, ()=>console.log(`listening on ${PORT}`));