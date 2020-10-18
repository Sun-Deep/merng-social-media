const { AuthenticationError }= require('apollo-server')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')

module.exports = (context) => {
    const auth_header = context.req.headers.authorization
    if(auth_header){
        const token = auth_header.split('Bearer ')[1]
        if(token){
            try {
                const user = jwt.verify(token, SECRET_KEY)
                return user
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired Token')
            }
        }
        throw new Error('AUthentication token must be Bearere [token')
    }
    throw new Error('Authentication header must be provided')
}