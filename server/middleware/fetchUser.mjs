
import Jwt from "jsonwebtoken";

export const fetchUser = async (req, res, next) => {
    try {
        const token = await req.header('authorized-user-token');
        if (!token) {
            return res.status(401).json({ status: false, error: "Invalid token" })
        }
        const user = Jwt.verify(token, process.env.SECRET_KEY);
        req._id = user.id
        next()
    } catch (error) {
        return res.status(401).json({ status: false, error: "Internal server error!", errorType: error.message })
    }
}