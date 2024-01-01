// Creating Token Save in Cookies
const sendToken = (user, stausCode, res) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIES_EXPIRE * 24 * 60 * 60 * 1000
        )
        ,
        httpOnly: true,

    };

    res.status(stausCode).cookie("token", token, options).json(
        {
            status: true,
            content: {
                data: {
                    user
                },
                meta: {
                    "access_token": token
                }
            }
        }
    )
};

module.exports = sendToken