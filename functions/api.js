const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http")
const authRoute =  require("./routes/auth")
const usersRoute = require("./routes/users")
const moviesRoute = require("./routes/movies")
const listsRoute = require("./routes/lists")
const cors = require("cors");

const router = express.Router()


dotenv.config();
const app = express();

// cross-origin 
app.use(cors({
    origin: "*",
    methods : ["GET", "POST","DELETE","PUT"],
    credentials: true
}))


main().catch(err => console.log(err))


async function main(){
    mongoose.set("strictQuery", false)
    await mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology : true})
    .then(()=> console.log("DataBase is running!"))
    .catch(err => console.log(err))
}

app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/movies", moviesRoute)
app.use("/api/lists", listsRoute)
router.get("/",(req,res)=>{
    res.send("API is running")
})
app.get("*", function(req, res) {
    res.send("App works!!!!!");
 })
app.use("/",router)

module.exports.handler = serverless(app);



// app.listen(process.env.PORT, ()=>{
//     console.log("The server is running !!")
// })




