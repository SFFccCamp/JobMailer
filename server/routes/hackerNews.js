const express = require( 'express' );
const router  = express.Router();
const axios   = require( 'axios' );

const { zip } = require( 'rxjs/Observable' );
const { Observable } = require( 'rxjs' );


const obsHttp = ( url ) => {
    return Observable.create( obs => {
            return axios.get( url )
                        .then( result => {
                            obs.next( result.data );
                        } )
                        .catch( err => console.log( err ) )
    } );
}


const obs = Observable.create( obs => obs.next( 1 ) )


const handleHttpChunk = ( res, array, num ) => {

    if( array.length === 0 ) return res.end();
    let subArr = array.splice( 0, 20 );

    return Observable.zip.apply( null, subArr.map( kid => {
        return obsHttp( `https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`)
    } ) )
    .subscribe( data => {
        res.write( JSON.stringify( data ) )
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