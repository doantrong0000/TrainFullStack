require("dotenv").config();

const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const whiteList = ["/", "/login", "/register"];

    if (whiteList.includes(req.path)) {
        next();
    }
    else {
        if (req?.headers?.authorization?.split(' ')[1]) {
            const token = req.headers.authorization.split(' ')[1];

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(">>> check token:", decoded)
                next();
            } catch (error) {
                message: "Token khong hop le"
            }


        }
        else {
            return res.status(401).json({
                message: "Bạn chưa truyền Access Token"
            })
        }

    }
}
module.exports = auth;