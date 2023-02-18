const jwt = require("jsonwebtoken")
const { secretOrKey } = require("./keys")

module.exports = (data) =>{
    return jwt.sign(data, secretOrKey, {expiresIn: '7d'});
};