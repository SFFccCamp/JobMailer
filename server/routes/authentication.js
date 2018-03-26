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


module.exports = router;