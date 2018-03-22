require('dotenv').config()

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const path       = require('path');
const port       = process.env.PORT || 8000;
const app        = express();


// ===== MONGOOSE ===== //
mongoose.Promise = global.Promise;
// mongoose.connect()


app.use(bodyParser.json( {} ));
app.use(bodyParser.urlencoded( { extended: true } ));


app.get( '/test', ( req, res ) => {
    res.json( { 'Test': 'success' } );
} );


app.listen( port );

