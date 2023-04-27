//jshint esversion:6
const express = require("express");
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;



const app = express(); 
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(
    "mongodb://127.0.0.1:27017/keeperDB",
    {
      useNewUrlParser: true,
    },
    console.log("connected to mongoDB")
  );

  const noteSchema = new mongoose.Schema({
    title: String, 
    content: String
  }); 

const Note = new mongoose.model("Note", noteSchema);


// HTTP REQUESTS

app.get('/notes', async(req, res) => {
    try {
        const notes = await Note.find({});
        res.send(notes); 
    } catch (error) {
        console.log(error);
    }
});

app.post('/insert', async(req, res) => {
        const title = req.body.title
        const content = req.body.content
    
        const formData = new Note({
            title: title,
            content: content
        })
    
        try {
            await formData.save();
            res.send("inserted data..")
        } catch(err) {
            console.log(err)
        }
    });

app.delete('/notes/:id', async(req,res) => {
    try {
        const deletedNote = await Note.deleteOne({_id: req.params.id}); 
        console.log(req.params.id);
        res.send(deletedNote);
    } catch (error) {
        res.send(error);
    }
//    try {
//     Note.findByIdAndRemove(req.params.id);
//    } catch (error) {
//     console.log(error);
//    }
});

app.listen(8000, ()=>{
    console.log("Connected to port 8000");
});