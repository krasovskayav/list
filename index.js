let arrNotes = [];
    form = document.dwsForm;
const newEl = document.createElement("textarea");
const ArrayOfCheckedCheckbox =[];
 const contentArea = document.getElementById("contentArea");

function ClickOnEdit(noteText) {
    newEl.value = noteText.textContent;
    noteText.replaceWith(newEl);
}

function ClickOnDeletebtn(save, edit, deletebtn, noteText, note, noteId, notePrioritet, noteDate) { 
        noteText.remove();
        noteId.remove();
        noteDate.remove();
        notePrioritet.remove();
        save.remove();
        edit.remove();
        deletebtn.remove();
        deleteFromServer(note.id, note);

    }

function ClickOnSave(noteText, note) {
        if(!newEl.value) return;
        noteText.textContent = newEl.value;
        note.text=newEl.value;
        updateNote(note.id, note);
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
        ClickOnSave(noteText, note);
    });
     
    const edit = document.createElement("button");
    edit.innerHTML = "edit";
    edit.addEventListener('click', function() {
        ClickOnEdit(noteText);
    });

    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = "delete";
    deletebtn.addEventListener('click',function(){
        ClickOnDeletebtn(noteText, note, noteId, notePrioritet, noteDate);
    });
    
    box.appendChild(noteId);
    box.appendChild(noteText);
    box.appendChild(notePrioritet);
    box.appendChild(noteDate);
    box.appendChild(save);
    box.appendChild(edit);
    box.appendChild(deletebtn);
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

    form.reset();

xhrPost.open('POST', url, true);
xhrPost.setRequestHeader('Content-type', 'application/json; charset=utf-8');// Идентификатор файла, чтобы сервер знал, что мы загружаем
xhrPost.send(JSON.stringify(note));//тип ответа json нравится больше,поэтому используем JSON.stringify и отправляем данные как строку. 
    //JSON- глобальная автоматическая переменная с автоматическим свойством stringify, которая форматирует переменную в строку. 
    //Нам же нужно отформатировать объект note в строку и отправить на post серверу.
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
    if (ArrayOfCheckedCheckbox.length == 0) {
        arrNotes.forEach(function(note){
       Otrisovka(note);
    });
    }
    const FilteredNotes = arrNotes.filter((arrNote) => ArrayOfCheckedCheckbox.includes(arrNote.prioritet));
    FilteredNotes.forEach(function(note){
       Otrisovka(note);
    });
}

const url = 'http://127.0.0.1:3000/items';

const xhrGet = new XMLHttpRequest(); // Создаём локальную переменную XHR, которая будет объектом XMLHttpRequest
xhrGet.open('GET', url, true); // Задаём метод запроса и URL запроса
xhrGet.responseType = 'json'; //тип ответа - json
xhrGet.onload = function() { // Используем обработчик событий onload, чтобы поймать ответ сервера XMLHttpRequest
arrNotes = xhrGet.response;
xhrGet.response.forEach((item) => {
 Otrisovka(item);
});
 console.log(xhrGet.response) // Выводим в консоль содержимое ответа сервера. Это строка!
  //console.log(JSON.parse(xhrGet.response))//Выводим в консоль содержимое ответа сервера. Метод JSON.parse() разбирает строку JSON на объект.
};
xhrGet.onerror = function() {
  alert("Запрос не удался");
};
xhrGet.send(); // Инициирует запрос. Посылаем запрос на сервер.

const xhrPost = new XMLHttpRequest();
xhrPost.onload = function (argument) {
    const note = JSON.parse(xhrPost.response);
    console.log(xhrPost.response);
    arrNotes.push(note);
    Otrisovka(note);
}

const xhrPut = new XMLHttpRequest();
function updateNote(itemId, note){
    xhrPut.open('PUT', url+"/"+ itemId.toString());
    xhrPut.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhrPut.send(JSON.stringify(note));
}

const xhrDelete = new XMLHttpRequest;
function deleteFromServer(itemId, note){
   const nullObject = null;
   xhrDelete.open('DELETE', url+"/"+itemId.toString());
   xhrDelete.setRequestHeader('Content-type', 'application/json; charset=utf-8');
   xhrDelete.send(nullObject);
  }