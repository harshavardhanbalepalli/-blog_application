const JWT = require('jsonwebtoken');

const secret = 'Harsha';

function generateUserToken(user){
    const payload = {
        _id : user._id,
        fullName :user.fullName,
        email : user.email,
        profileImageUrl : user.profileImageUrl,
        role : user.role
    };

    return JWT.sign(payload, secret);
}

function verifyUserToken(token){
    return JWT.verify(token, secret);
}

module.exports = {
    generateUserToken,
    verifyUserToken
};