require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const querystring = require('querystring')
const isLoggedIn=require('./auth')
const axios =require('axios');
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const PORT = 8081;
const async = require('express-async-await')
const redirect_uri='http://localhost:8081/callback'
const spotify_auth_uri = 'https://accounts.spotify.com/authorize?';

app.use(cors())
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

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
            show_dialog: true
        }))
});

async function getAUth() {



}



app.get('/callback', async(request, response)=>{
    //getAuth(request.query.code).then(response => console.log(response)).catch(err => console.log(err.message))
    //response.end('end')

    const auth_code = request.query.code;
    //response.send(auth_code)
    const data = querystring.stringify({
            'grant_type': "authorization_code",
            'code': auth_code,
            'redirect_uri': redirect_uri,
    })

    try{
      const res =  await axios.post('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
            },
           data: data
        })
        const result = await res.data;
        return result;
    }
   catch (e){
       console.log(e.message)
   }
   })
   // response.redirect('/')

app.listen(PORT, ()=>console.log(`listening on ${PORT}`));