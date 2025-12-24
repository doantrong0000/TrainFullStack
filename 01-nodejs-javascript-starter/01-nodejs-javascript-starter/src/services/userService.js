require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {

        const user = await User.findOne({ email });
        if (user) {
            console.log(`>>> user exist ${email}`);
            return null;
        }

        const hashPassword = await bcrypt.hash(password, saltRounds);

        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "customer"
        })
        if (result) {
            console.log(">>> Tạo mới user thành công cho email:", email);
        }
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email1, password) => {
    try {
        const user = await User.findOne({ email: email1 });
        if (user) {
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                console.log(">>> Đăng nhập thất bại: Sai mật khẩu cho email", email1);
                return {
                    EC: 1,
                    EM: "Email/Password not valid!!"
                }
            }
            else {
                const payload = {
                    email: user.email,
                    name: user.name
                }
                const access_token = jwt.sign(payload,
                    process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                }
                )
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }
        }
        else {
            console.log(">>> Đăng nhập thất bại: Không tìm thấy email", email1);
            return {
                EC: 1,
                EM: "Email/Password not valid!!"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}


const getUserService = async () => {
    try {
        let result = await User.find({}).select("-password");
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService, loginService, getUserService
}