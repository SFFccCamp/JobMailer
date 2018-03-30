const mongoose = require( 'mongoose' );
const Users    = require( '../models/users' );
const router   = require( 'express' ).Router();
const mailer   = require( 'nodemailer' );
const smtpTransport = require( 'nodemailer-smtp-transport' );

const { escapeChars } = require( '../helpers/sanitize' );


const transporter = mailer.createTransport( smtpTransport( {
    service: 'gmail',
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPass
  }
} ) )


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


router.post( '/send', async( req, res ) => {
    const { id } = req.headers;
    const { from, to, title, content } = req.body;

    try {

        const user = await Users.findById( id );
        if( !user ) throw new Error( 'No User Found' );

        await transporter.sendMail( {
            from,
            to,
            subject: title, 
            text   : content
        } );

        res.status(200).json( { status: 'OK' } );

    } catch( err ) {
        res.status(400).json(err);
    }
} )


module.exports = router;