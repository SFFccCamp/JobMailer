const express = require( 'express' );
const router  = express.Router();
const axios   = require( 'axios' );


router.get( '/search/:hnId', ( req, res ) => {
   
    const { hnId } = req.params;
    axios.get( `https://hacker-news.firebaseio.com/v0/item/${hnId}.json?print=pretty`)
         .then( result => {
             const kids = result.data.kids.slice(0,20);
             return Promise.all( kids.map( kid => {
                 return axios.get( `https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`);
             } ) )
         } )
         .then( allComments => {
             const filtered = allComments.filter( kid => kid['data'].text.toLowerCase().includes('angular') );
             res.json( filtered[0].data)
         } )
         .catch( err => console.log(err) )
} );


module.exports = router;