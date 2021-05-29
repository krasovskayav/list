const arrNotes = [];
    form = document.dwsForm;
//todo используй let/const в тех местах, где это нужно
//todo для хранения состояния фильтра используй доп.массив
let newEl = document.createElement("textarea");

function ClickOnEdit(noteText) {
    newEl.textContent = noteText.textContent;
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

function prClick() {
    let priority = form.priority.value;
    let text = form.message.value;
    //todo добавить флаг для филтрации
    let note = {
        id:arrNotes.length+1,
        prioritet:priority,
        text:text,
        date:new Date(),
    };
    arrNotes.push(note);

    form.reset();
    let box = document.createElement("div");
    box.id = note.id;
    let noteDate = document.createElement("div");
    noteDate.innerHTML = note.date;
    let noteId = document.createElement("div");
    noteId.innerHTML = note.id;
    let notePrioritet = document.createElement("div");
    notePrioritet.innerHTML = note.prioritet;
    let noteText = document.createElement("div");
    noteText.innerHTML = note.text;

    let save = document.createElement("button");
    save.innerHTML = "сохранить";
    save.addEventListener('click',function(){
        ClickOnSave(noteText);
    });
     
    let edit = document.createElement("button");
    edit.innerHTML = "изменить";
    edit.addEventListener('click', function() {
        ClickOnEdit(noteText);
    });

    let deletebtn = document.createElement("button");
    deletebtn.innerHTML = "удалить";
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

function ClickOnPr1(priority1) {
    let priority =  document.getElementById(priority1);
    let ArrNoteWithFilter =  arrNotes.filter(function(arrNote) {
    return arrNote.prioritet == "Completed";
    });  
    console.log(ArrNoteWithFilter);
}

function ClickOnPr2(priority2) {
    let priority =  document.getElementById(priority2);
    let ArrNoteWithFilter =  arrNotes.filter(function(arrNote) {
    return arrNote.prioritet == "High";
    });  
    console.log(ArrNoteWithFilter);
}
function ClickOnPr3(priority3) {
    let priority =  document.getElementById(priority3);
    let ArrNoteWithFilter =  arrNotes.filter(function(arrNote) {
    return arrNote.prioritet == "Medium";
    });  
    console.log(ArrNoteWithFilter);
}

function ClickOnPr4(priority4) {
    let priority =  document.getElementById(priority2);
    let ArrNoteWithFilter =  arrNotes.filter(function(arrNote) {
    return arrNote.prioritet == "Low";
    });  
    console.log(ArrNoteWithFilter);
}