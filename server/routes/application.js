const router     = require( 'express' ).Router();
const Users      = require( '../models/users' );
const isLoggedIn = require( '../helpers/isLoggedIn' );


router.get( '/', isLoggedIn, async( req, res ) => {

    const { _id } = req.user;
    try {
        const user = await Users.findById( _id )
        res.status(200).json( { apps: user.applications } )
    } catch( err ) {
        res.status(400).json(err)
    }
} )


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

    const newApp = { name, phoneScreen: false, onSite: false, offer: false } 
    try {
        const updatedUser = await Users.findByIdAndUpdate( 
            id, 
            { $push: { applications: newApp } },
            { new: true }
        );
        await updatedUser.save();
    
        res.status(200).json( { status: 'OK', newApp } ) ;
    } catch( err ) {
        res.status(400).json(err);
    }
} );


module.exports = router;
