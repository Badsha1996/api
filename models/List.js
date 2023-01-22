const mongoose = require("mongoose");


const ListSchema = new mongoose.Schema({
    title : {type : String, require : true, unique: true}, // 2022 movies
    type :{type : String},
    genre : {type: String},
    content : {type : Array} // array of movie/series _id
},
{timestamps : true})

module.exports = mongoose.model("List", ListSchema);