const arrNotes = [];
    form = document.dwsForm;
const newEl = document.createElement("textarea");
const select = document.createElement("select");
const option = document.createElement('option');
const FilterState =[];
 const contentArea = document.getElementById("contentArea");
const date = new Date();
console.log(date.getMonth()+1);

function ClickOnEdit(noteText,notePrioritet) {
    newEl.textContent = noteText.textContent;
    noteText.replaceWith(newEl);

    notePrioritet.replaceWith(select);
    option.textContent = "Completed";
    select.appendChild(option);


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
    save.innerHTML = "сохранить";
    save.addEventListener('click',function(){
        ClickOnSave(noteText);
    });
     
    const edit = document.createElement("button");
    edit.innerHTML = "изменить";
    edit.addEventListener('click', function() {
        ClickOnEdit(noteText,notePrioritet);
    });

    const deletebtn = document.createElement("button");
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
    const priority = form.priority.value;
    const text = form.message.value;
    //todo добавить флаг для филтрации
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
    console.log(event.target.checked);
    console.log(event.target.id);
    if (event.target.checked) FilterState.push(event.target.id);
    else {
        FilterState.splice(FilterState.indexOf(event.target.id),1);
    }
    console.log(FilterState);
    //const FilterPrioritet = arrNotes.filter(function (arrNote){
    //return FilterState.includes(arrNote.prioritet);
    //});
    const FilterPrioritet = arrNotes.filter((arrNote) => FilterState.includes(arrNote.prioritet));
    console.log(FilterPrioritet);
    FilterPrioritet.forEach(function(note){
       Otrisovka(note);
    });
    console.log(contentArea);
}



//todo обработка события смены значения чекбокса
// document.getElementById('Completed').addEventListener('change', function (event) {
//    ClickOnPr(event);
// });
//todo оставить только одну функцию, какой приоритет выбран определять через event.target
//todo не забудь поменять id в шаблоне