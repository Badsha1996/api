const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    username : {type : String, require : true, unique: true},
    email : {type : String, require : true, unique: true},
    password : {type : String, require : true},
    profilePic : {type: String, default: "https://wallpapers-clan.com/wp-content/uploads/2022/07/anime-default-pfp-2.jpg"},
    isAdmin : {type: Boolean, default: false}
},
{timestamps : true})

module.exports = mongoose.model("User", UserSchema);