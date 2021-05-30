//todo используй let/const в тех местах, где это нужно
const arrNotes = [];
    form = document.dwsForm;
let newEl = document.createElement("textarea");
let box = document.createElement("div");
const FilterState =[];

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

function Otrisovka(note){
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
    if (event.target.checked){
        FilterState.push(event.target.id);
    } 
    else {
        FilterState.shift(event.target.id)
    }
    console.log(FilterState);
}

//todo обработка события смены значения чекбокса
// document.getElementById('Completed').addEventListener('change', function (event) {
//    ClickOnPr(event);
// });
//todo оставить только одну функцию, какой приоритет выбран определять через event.target
//todo не забудь поменять id в шаблоне