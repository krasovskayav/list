const arrNotes = [];
    form = document.dwsForm;
const newEl = document.createElement("textarea");
const ArrayOfCheckedCheckbox =[];
 const contentArea = document.getElementById("contentArea");

function ClickOnEdit(noteText) {
    newEl.value = noteText.textContent;
    noteText.replaceWith(newEl);
}

function ClickOnDeletebtn(noteText) { 
        noteText.remove();
    }

function ClickOnSave(noteText) {
        if(!newEl.value) return;
        noteText.textContent = newEl.value;
        newEl.replaceWith(noteText);
    }

function Otrisovka(note){
    const box = document.createElement("div");
    box.id = note.id;
    const noteDate = document.createElement("div");
    noteDate.innerHTML = note.date;
    const noteId = document.createElement("div");
    noteId.innerHTML = note.id;
    const notePrioritet = document.createElement("div");
    notePrioritet.innerHTML = note.prioritet;
    const noteText = document.createElement("div");
    noteText.innerHTML = note.text;

    const save = document.createElement("button");
    save.innerHTML = "save";
    save.addEventListener('click',function(){
        ClickOnSave(noteText);
    });
     
    const edit = document.createElement("button");
    edit.innerHTML = "edit";
    edit.addEventListener('click', function() {
        ClickOnEdit(noteText);
    });

    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = "delete";
    deletebtn.addEventListener('click',function(){
        ClickOnDeletebtn(noteText);
    });
    
    box.appendChild(noteId);
    box.appendChild(noteText);
    box.appendChild(notePrioritet);
    box.appendChild(noteDate);
    box.appendChild(save);
    box.appendChild(edit);
    box.appendChild(deletebtn);

    const contentArea = document.getElementById("contentArea");
    contentArea.appendChild(box);
}

function prClick() {
    const priority = form.priority.value;
    const text = form.message.value;
    const note = {
        id:arrNotes.length+1,
        prioritet:priority,
        text:text,
        date:new Date(),
    };
    arrNotes.push(note);

    form.reset();
    
    Otrisovka(note);
}

document.getElementById("Completed").addEventListener("change", function(event){
ClickonPr(event);
});

document.getElementById("Medium").addEventListener("change", function(event){
ClickonPr(event);
});

document.getElementById("High").addEventListener("change", function(event){
ClickonPr(event);
});

document.getElementById("Low").addEventListener("change", function(event){
ClickonPr(event);
});

function ClickonPr(event){
    contentArea.innerHTML = "";
    if (event.target.checked) ArrayOfCheckedCheckbox.push(event.target.id);
    else {
        ArrayOfCheckedCheckbox.splice(ArrayOfCheckedCheckbox.indexOf(event.target.id),1);
    }
    //const FilteredNotes = arrNotes.filter(function (arrNote){
    //return ArrayOfCheckedCheckbox.includes(arrNote.prioritet);
    //});
    const FilteredNotes = arrNotes.filter((arrNote) => ArrayOfCheckedCheckbox.includes(arrNote.prioritet));
    FilteredNotes.forEach(function(note){
       Otrisovka(note);
    });
}

const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.json({
        message: 'Привет, мир!'
    })
})

app.listen(3000, function () {  
    console.log('Сервер запущен!');
})