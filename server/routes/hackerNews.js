const express = require( 'express' );
const router  = express.Router();
const axios   = require( 'axios' );
const cheerio = require( 'cheerio' );


router.get( '/', ( req, res ) => {
    axios.get('https://news.ycombinator.com/item?id=16492994')
         .then( result => {
            const $ = cheerio.load( result.data );
            let map = []
            $('.c00').each( ( i, el ) => map.push( { item: $(el).text() } ) )
            res.pipe( map.filter( i => i.item.toLowerCase().includes('angular')) )
         } )
         .catch( error => console.log( error ) )
} )



module.exports = router;
