const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
  
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decodedToken) => {
            if (err) {
                // we have token but it is not valid
               
                // not logged in yet so will ask user to login 
                return res.json({
                    message: err.message,
                    isAuthenticated: false
                });
            }
            else {
                // setting id
                req.userDecodedJWT = decodedToken;
                
                next();
            }
        
        });
    }
    else {
        // we don't have token
        
        // not logged in yet so will ask user to login 
        return res.json({
            message: 'No Token',
            isAuthenticated: false
        })
    }
};



module.exports = {
    requireAuth
}