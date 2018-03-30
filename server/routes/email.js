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
         transporter.sendMail( {
            from: address1,
            to: address2,
            subject: title, 
            text: content
        }, function( err, response ) {
            if( err ) console.log( err )
            console.log( response)
        } );

        res.status( 200 ).json( { status: 'OK' } );

    } catch ( error ) {
        res.status( 400 ).json( error );
    }
} );


module.exports = router;