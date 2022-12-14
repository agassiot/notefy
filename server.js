
import { getNote, saveNote, saveafterDel } from "./helpers/filesUtil.js"
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


//reg paths
app.route('/notes')                                             //get
.get((req, res)=> {
    res.sendFile(path.join(__dirname,'./public/notes.html'))
})


.post((req, res)=> {                                            //post
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

//api routes
app.route('/api/notes') 

.get( async (req,res)=> {
    let data = await getNote("../db/db.json");
    return res.json(JSON.parse(data))
})


app.delete("/notes/:id", async (req, res)=> {
    console.log(req.params.id)
    let data = await getNote("../db/db.json");
    let parsedData = JSON.parse(data);
    let newData = parsedData.filter(note=>note.id !==req.params.id);
    console.log('\n log from controller',newData)
    saveafterDel("../db/db.json",newData);

    
    res.json(`Note deleted successfully 🚀`);

});




app.listen(PORT, () =>
console.log(`App listening at ${PORT}🚀`)
);