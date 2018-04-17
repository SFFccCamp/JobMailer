const mongoose = require( 'mongoose' );

const applicationSchema = mongoose.Schema( { 
    name        : { type: String, required: true },
    phoneScreen : { type: Boolean },
    onSite      : { type: Boolean },
    offer       : { type: Boolean },  
} ); 

const userSchema = mongoose.Schema( {
    username: { type: String, required: true },
    applications: [ applicationSchema ],
    emails: [
        { 
            title  : { type: String, required: true },
            content: { type: String, required: true }
        }
    ]
} );

const Users = mongoose.model( 'User', userSchema );

module.exports = Users;