
const { verifyUserToken } = require('../utils/auth');

function checkForAuthenticationCookie(cookieName){
    return (req, res, next)=>{
        const tokenValue = req.cookies[cookieName];

        if(!tokenValue){
            return next();
        }
        try{
            const userPayload = verifyUserToken(tokenValue);
            req.user = userPayload;
            res.locals.user = userPayload;
        }catch(error){}
        next();
    }
}

module.exports = {checkForAuthenticationCookie };