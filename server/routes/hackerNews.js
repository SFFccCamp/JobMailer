const express = require( 'express' );
const router  = express.Router();
const axios   = require( 'axios' );


const handleHttpChunk = ( res, array, num ) => {

    if( array.length === 0 ) return res.end();
    let subArr = array.splice( 0, 20 );
    return Promise.all( subArr.map( kid  => {
        return axios.get( `https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty` )
    } ) )
    .then( data => {
        res.write( JSON.stringify( data.map( d => d.data ) ) )
        handleHttpChunk( res, array, num ++ );
    } )
}

router.get( '/search', ( req, res ) => {
    axios.get('https://news.ycombinator.com/item?id=16492994')
         .then( result => {
             const $ = cheerio.load( result.data );
            let map = []
            $('.c00').each( ( i, el ) => map.push( { item: $(el).text() } ) )
            res.send( map.filter( i => i.item.toLowerCase().includes('angular')) )
         } )
         .catch( error => console.log( error ) )
} )


router.get( '/search/:hnId', async ( req, res ) => {
   
    const { hnId } = req.params;
    axios.get( `https://hacker-news.firebaseio.com/v0/item/${hnId}.json?print=pretty`)
         .then( result => {
             const kids = result.data.kids;
             res.setHeader( 'Content-Type', 'application/json' );
             handleHttpChunk( res, kids, 0 )
         } )
         .catch( err => console.log(err) )
} );


module.exports = router;