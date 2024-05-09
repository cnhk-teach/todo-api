const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET

function verifyUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ err: 'Access denies, no token' })
        }

        jwt.verify(token, SECRET_KEY, (err, data)=>{
            if(err){
                return res.status(403).json({ err: 'Access denied: '+err })
            }
            req.user = data;
            next()
        })
    } catch (error) {
        return res.status(500).json({ err: 'Internal error in JWT verification, error:'+error })
    }
    
}

module.exports = verifyUser