export default {
    secret: process.env.JWT_SECRET || "minhaChaveSecreta",
    expiresIn: "1d"
};
