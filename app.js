const express = require("express")
const errorMiddleware = require("./middleware/error")
const app = express();
const role = require("./routes/roleRoute");
const user = require("./routes/userRoute");
const community = require("./routes/communityRoute")
const member = require("./routes/memberRoute");

const cookieParser = require("cookie-parser");

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/v1", role);
app.use("/v1", user);

app.use("/v1", community);
app.use("/v1", member);

//  MiddleWare For Error
app.use(errorMiddleware);

module.exports = app;