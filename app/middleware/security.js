const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    check:(role) => {
        return async (req, res, next)=>{

            console.log("authorization level",role);
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (!!token && token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
    
            console.log(token);
            if (token) {
                jwt.verify(token, SECRET_KEY, (err, decoded) => {
                    if (err) {
                        logger.warn('token_not_valid');
                        return res.status(401).json('token_not_valid');
                    } else {
                        req.decoded = decoded;
                        
    
        
                        const expiresIn = 24 * 60 * 60;
                        const newToken  = jwt.sign({
                            user : decoded.user
                        },
                        SECRET_KEY,
                        {
                            expiresIn: expiresIn
                        });
        
                        res.header('Authorization', 'Bearer ' + newToken);
    
                        console.log("authorization level",role);
                        console.log("my role",decoded.user.role);

                        const roleAuth = role.includes(decoded.user.role)
                        console.log(roleAuth);
                        if (roleAuth) {
                            next();
                        }else {
                            console.log('not valid ------------');
                            logger.warn('Auth_not_valid');
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