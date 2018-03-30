const mongoose = require( 'mongoose' );
const Users    = require( '../models/users' );
const router   = require( 'express' ).Router();

const { escapeChars } = require( '../helpers/sanitize' );


router.post( '/', async ( req, res ) => {

    const { id } = req.headers;
    const { title, content } = req.body;
    
    try {

        const user = await Users.findByIdAndUpdate( 
            id,
            { $push: { emails : { title, content } } },
            { new: true }
        );
        if( !user ) throw new Error( 'No User Found' );
        res.status( 200 ).json( { status: 'OK' } );

    } catch ( error ) {
        res.status( 400 ).json( error );
    }
} );


module.exports = router;