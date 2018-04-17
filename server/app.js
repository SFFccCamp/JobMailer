require('dotenv').config()

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const path       = require('path');
const cors       = require('cors');
const port       = process.env.PORT || 9000;
const app        = express();
const Users      = require( './models/users' );

const axios = require('axios');
const cheerio = require('cheerio');

// ===== MONGOOSE ===== //
mongoose.Promise = global.Promise;
mongoose.connect( process.env.DB_URL );


app.use(cors());
app.use(bodyParser.json( {} ));
app.use(bodyParser.urlencoded( { extended: true } ));
app.use( require( './passport-config' ) );


app.get( '/test', ( req, res ) => {
    res.json( { 'Test': 'success' } );
} );


app.use( '/searchHn', require( './routes/hackerNews' ) );
app.use( '/email', require( './routes/email' ) );
app.use( '/auth', require( './routes/authentication') );
app.use( '/applications', require( './routes/application' ) );


app.listen( port );

