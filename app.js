require("dotenv").config();

const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const {connectMongoDb} = require("./connect");
const cookieParser = require("cookie-parser");
const {checkForAuthenticationCookie} = require("./middlewares/authentication");
const Blog = require("./models/blog");


const app = express();

const PORT = process.env.PORT ||  8001;

connectMongoDb(process.env.MONGO_URL);

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({}).populate("createdBy");
    console.log(req.user);

    return res.render("home",{
        user: req.user,
        blogs: allBlogs,
    });
});

app.use("/user",userRouter);
app.use("/blog",blogRouter);

// Export the app for serverless handlers (Vercel) and local runners.
module.exports = app;