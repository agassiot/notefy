
import { Router } from "express"
import { getNote, saveNote } from "./helpers/filesUtil.js"
import path from 'path'

import express from 'express'
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname,'/public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname,'./public/notes.html'))
);




app.get("/api/notes", async (req,res) => {
    let data = await getNote("../db/db.json");
    return res.json(JSON.parse(data))
})

app.post("/notes", (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: req.body.id 
    }
    console.log( '\n new note from request',newNote)
    saveNote("../db/db.json",newNote)
    const response = {
        status: "sucess",
        body: newNote,
    }
    
    
    res.json(response)
    
})



    app.listen(PORT, () =>
  console.log(`App listening at ${PORT}🚀`)
);