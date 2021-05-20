let arrNotes = [],
    form = document.dwsForm;

function prClick() {
    let priority = form.priority.value;
    let text = form.message.value;
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

    let save = document.createElement("button") 
    save.innerHTML = "сохранить";
    save.addEventListener('click',ClickOnSave);
    let newEl = document.createElement("textarea");

     function ClickOnSave() {
        if(!newEl.value) return;
        noteText.textContent = newEl.value;
        newEl.replaceWith(noteText);
    }
      
    let edit = document.createElement("button")
    edit.innerHTML = "изменить";
    edit.addEventListener('click',ClickOnEdit);

      function ClickOnEdit() {
        newEl.textContent = noteText.textContent;
        noteText.replaceWith(newEl);
    }            

    let deletebtn = document.createElement("button")
    deletebtn.innerHTML = "удалить";
    deletebtn.addEventListener('click',ClickOnDeletebtn);

     function ClickOnDeletebtn() { 
        noteText.remove();
    }
    
    box.appendChild(noteId);
    box.appendChild(noteText);
    box.appendChild(notePrioritet);
    box.appendChild(noteDate);
    box.appendChild(save);
    box.appendChild(edit);
    box.appendChild(deletebtn);
    let contentArea = document.getElementById("contentArea");
    contentArea.appendChild(box); 
}