const mongoose = require("mongoose");



const MovieSchema = new mongoose.Schema({
    title : {type : String, require : true, unique: true},
    desc : {type : String},
    img : {type: String},
    imgTitle : {type : String},
    imgSmall : {type : String},
    trailer : {type : String},
    duration : {type:String, default : ""},
    video : {type : String},
    year : {type : Number},
    Agelimit : {type : Number},
    genre : {type: String},
    isSeries : {type : Boolean, default: true}
},
{timestamps : true})

module.exports = mongoose.model("Movie", MovieSchema);