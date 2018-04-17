const router     = require( 'express' ).Router();
const Users      = require( '../models/users' );
const isLoggedIn = require( '../helpers/isLoggedIn' );


/**
 * Adds application to user's DB
 * Expects : 
 *      1) application name from headers
 *      2) user id from headers
 */
router.post( '/', isLoggedIn, async( req, res ) => {
    const { name, id  } = req.headers;
    if( !name || !id ) {
        return res.status(400).json( { error: 'Missing Fields' } )
    }

    try {
        const updatedUser = await Users.findByIdAndUpdate( 
            id, 
            { $push: { applications: { name, phoneScreen: false, onSite: false, offer: false } } },
            { new: true }
        );
        await updatedUser.save();
    
        res.status(200).json( { status: 'OK' } ) ;
    } catch( err ) {
        res.status(400).json(err);
    }
} );


module.exports = router;
