const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    check:(role) => {
        return async (req, res, next)=>{

            console.log("authorization level",role);
            // Token un let token then we slice the token bearer
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (!!token && token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
    
            console.log(token);
            // Decoding and verification of the token with the secret key
            if (token) {
                jwt.verify(token, SECRET_KEY, (err, decoded) => {
                    if (err) {
                        logger.warn('token_not_valid');
                        return res.status(401).json('token_not_valid');
                    } else {
                        req.decoded = decoded;
                        
    
                        // Setting a lifespan on the token
                        const expiresIn = 24 * 60 * 60;
                        // Creating a new token
                        const newToken  = jwt.sign({
                            user : decoded.user
                        },
                        SECRET_KEY,
                        {
                            expiresIn: expiresIn
                        });
                        // Setting up the header
                        res.header('Authorization', 'Bearer ' + newToken);
    
                        console.log("authorization level",role);
                        console.log("my role",decoded.user.role);

                        const roleAuth = role.includes(decoded.user.role)
                        console.log(roleAuth);
                        // Check of permissions
                        if (roleAuth) {
                            next();
                        }else {
                            console.log('not valid ------------');
<<<<<<< HEAD
                            logger.warn('Auth_not_valid');
=======
>>>>>>> 4d7bb1be7d1ce48dc529d88152e1e0714259e480
                            return res.status(403).json('Auth_not_valid');
                        }

                        
                    }
                });
            } else {
                return res.status(401).json('token_required');
            }
            
        }
    }

}