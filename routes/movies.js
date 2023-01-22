const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../varification")

// CREATE METHOD 
router.post("/", verify ,async(req, res)=>{
    if(req.user.isAdmin){
        // new movie 
        const newMovie =  new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You are not allowed to Add anything")
    }
})

// UPADATE METHOD 
router.put("/:id", verify ,async(req, res)=>{
    if(req.user.isAdmin){
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,
            {$set : req.body},
            {new : true});
            res.status(200).json(updatedMovie)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You are not allowed to update")
    }
})

// DELETE METHOD
router.delete("/:id", verify ,async(req, res)=>{
    if(req.user.isAdmin){
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Anime Deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You are not allowed to delete")
    }
})

// FIND METHOD 
router.get("/find/:id", verify ,async(req, res)=>{
        try {
            const movie = await Movie.findById(req.params.id,);
            res.status(200).json(movie)
        } catch (error) {
            res.status(500).json(error)
        }
})

// RANDOM 
router.get("/random", verify ,async(req, res)=>{
    const type = req.query.type;
    let movie; 
    try {
        if(type==="series"){
            movie = await Movie.aggregate([
                { $match : {isSeries : true}},
                { $sample : {size : 1}}
            ])
        }else{
            movie = await Movie.aggregate([
                { $match : {isSeries : false}},
                { $sample : {size : 1}}
            ])
        }

        res.status(201).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND ALL MOVIES 
router.get("/", verify ,async(req, res)=>{
    if(req.user.isAdmin){
        try {
            const movies = await Movie.find()
            res.status(201).json(movies.reverse())
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You are not allowed")
    }
})
module.exports = router;