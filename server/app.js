require('dotenv').config()

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const path       = require('path');
const port       = process.env.PORT || 9000;
const app        = express();

const axios = require('axios');
const cheerio = require('cheerio');

// ===== MONGOOSE ===== //
mongoose.Promise = global.Promise;
// mongoose.connect()


app.use(bodyParser.json( {} ));
app.use(bodyParser.urlencoded( { extended: true } ));


app.get( '/test', ( req, res ) => {
    res.json( { 'Test': 'success' } );
} );


app.use( '/hackernews', require( './routes/hackerNews' ));


app.post( '/search', ( req, res ) => {
    axios.get('https://news.ycombinator.com/item?id=16492994')
         .then( result => {
             const $ = cheerio.load( result.data );
            let map = []
            $('.c00').each( ( i, el ) => map.push( { item: $(el).text() } ) )
            res.send( map.filter( i => i.item.toLowerCase().includes('angular')) )
         } )
         .catch( error => console.log( error ) )
} )

app.listen( port );

