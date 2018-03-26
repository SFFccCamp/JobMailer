const router = require( 'express' ).Router();
const passport = require( 'passport' );



router.get( '/login', passport.authenticate( 'auth0' ) );
router.get( '/login/callback', 
            passport.authenticate( 'auth0', { failureRedirect: 'http://localhost:3000/'} ),
            ( req, res, next ) => {
                // ===== successful login ===== //
                res.redirect( 'http://localhost:3000/' );
            }
        );
        
router.get( '/logout', ( req, res ) => {
    req.logOut();
    res.redirect( 'http://localhost:3000/')
} )

router.get( '/verify', ( req, res ) => {
    if( !req.user ) {
        res.status(400).json( { error: 'No User Found'} )
    } else {
        res.status(200).json( { username: req.user.username, _id: req.user._id } );
    }
} )


module.exports = router;