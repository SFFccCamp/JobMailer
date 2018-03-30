const mongoose = require( 'mongoose' );

const userSchema = mongoose.Schema( {
    username: { type: String, required: true },
    applications: [
        { type: String }
    ],
    emails: [
        { 
            title  : { type: String, required: true },
            content: { type: String, required: true }
        }
    ]
} );

const Users = mongoose.model( 'User', userSchema );

module.exports = Users;