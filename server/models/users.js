const mongoose = require( 'mongoose' );

const userSchema = mongoose.Schema( {
    username: { type: String, required: true },
    applications: [
        { type: String }
    ]
} );

const Users = mongoose.model( 'User', userSchema );

module.exports = Users;