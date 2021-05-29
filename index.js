let arrNotes = [];
    form = document.dwsForm;
//todo используй let/const в тех местах, где это нужно
//todo для хранения состояния фильтра используй доп.массив
    let newEl = document.createElement("textarea");
function ClickOnEdit(noteText) {
    newEl.textContent = noteText.textContent;
    noteText.replaceWith(newEl);
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
    save.addEventListener('click',ClickOnSave);
     function ClickOnSave() {
        if(!newEl.value) return;
        noteText.textContent = newEl.value;
        newEl.replaceWith(noteText);
    }
      
    let edit = document.createElement("button");
    edit.innerHTML = "изменить";
    //todo таким образом можно пробросить контекст. задаётся неименованная функция,
    // в ней вызывается уже нормальная функция с привязанным контекстом
    edit.addEventListener('click', function() {
        ClickOnEdit(noteText);
    });


    let deletebtn = document.createElement("button");
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

//функция нажатия на флажок приоритета для фильтрации(пока просто вывод значения выбранного флажка, без фильтра массива)
    function onclickPrioritet(e){
       let NewContentArea = document.getElementById("NewContentArea");
       let priority = e.target.value;
       let note = document.getElementById("note");
       NewContentArea.textContent = priority+note;
    }
    for (var i = 0; i < prioritetForm.priority.length; i++) {
     prioritetForm.priority[i].addEventListener("click", onclickPrioritet);
    }

//что-то про фильтр
    let KnopkaTallFilter = document.createElement("button")
    KnopkaTallFilter.innerHTML = "высокий приоритет фильтрация";

    KnopkaTallFilter.addEventListener('click',ClickOnKnopkaTallFilter);//при нажатии на кнопку фильтра 
    function ClickOnKnopkaTallFilter(){//происходит функция
    let arrNotesTallprioritet = note.prioritet.filter (
        function(TallPrioritet) {
         return notePrioritet="1 приоритет";
         note.remove();
         //вывод нового массива
        }
        );
    }

}
