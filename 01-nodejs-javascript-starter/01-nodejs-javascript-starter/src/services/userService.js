const User = require("../models/user");

const createUserService = async (name, email, password) => {
    try {
        let result = await User.create({
            name: name,
            email: email,
            password: password,
            role: "customer"
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}


module.exports = {
    createUserService,
}