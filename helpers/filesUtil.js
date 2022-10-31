import {readFile, writeFile} from 'fs/promises'
import express from 'express'
import path from 'path'
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export async function getNote(file) {
    let note = await readFile(path.join(__dirname,file),'utf-8')
    return note;
} 


export async function saveNote(file, freshNote) {
    let oldNote= await getNote(file);
    let parsedNote = JSON.parse(oldNote);
    parsedNote.push(freshNote);
    console.log('\n old note',oldNote,'\n parse old',parsedNote);
  await writeFile(path.join(__dirname,file), JSON.stringify(parsedNote), (err) =>
    err ? console.error(err) : console.info(`\n written to ${file}`)
  )
}

export async function deleteNote(file,staleNote) {
 let dbnotes = await getNote(file);
 let savedNotes = JSON.parse(dbnotes);
  
  for (let key in savedNotes){
    if(key.id == staleNote){
      let redact = savedNotes.indexOf(key);
      historyL.insertAdjacentHTML('afterbegin',btnL);
      let updatedNotes = savedNotes.splice(redact,1);
    await writeFile(path.join(__dirname,file), JSON.stringify(updatedNotes), 
    (err) => err ? console.error(err) : console.info(`\n written to ${file}`)

    )}
  }
}


