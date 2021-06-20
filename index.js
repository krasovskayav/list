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
        xhrPut.send(JSON.stringify(noteText));
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

    
    xhrDelete.send(JSON.stringify(noteText));
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
    const FilteredNotes = arrNotes.filter((arrNote) => ArrayOfCheckedCheckbox.includes(arrNote.prioritet));
    FilteredNotes.forEach(function(note){
       Otrisovka(note);
    });
}


let url = 'http://127.0.0.1:3000/items';

let xhrGet = new XMLHttpRequest(); // Создаём локальную переменную XHR, которая будет объектом XMLHttpRequest
xhrGet.open('GET', url, true); // Задаём метод запроса и URL  запроса
xhrGet.responseType = 'json'; //тип ответа - json
xhrGet.onload = function() { // Используем обработчик событий onload, чтобы поймать ответ сервера XMLHttpRequest
  //let responseObj = xhrGet.response;
  console.log(xhrGet.response) // Выводим в консоль содержимое ответа сервера. Это строка!
  //console.log(JSON.parse(xhrGet.response))//Выводим в консоль содержимое ответа сервера. Метод JSON.parse() разбирает строку JSON на объект.
};
xhrGet.onerror = function() {
  alert("Запрос не удался");
};
xhrGet.send(); // Инициирует запрос. Посылаем запрос на сервер.



let xhrPost = new XMLHttpRequest();
xhrPost.open('POST', url, true);
//post-запрос происходит при нажатии на кнопку "add note", за действия которой отвечает функция prClick(), поэтому в той функции мы и пишем продолжение кода post-запроса.
xhrPost.setRequestHeader('Content-type', 'application/json; charset=utf-8');// Идентификатор файла, чтобы сервер знал, что мы загружаем
//Устанавливает заголовок запроса с именем name и значением value. 
//Без этой строчки в консоль выведется массив, состоящий только из id-шников.

let xhrPut = new XMLHttpRequest();
xhrPut.open('PUT', url+'/:itemId');
xhrPut.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhrPut.onload = function() { 
    Otrisovka(note);
};

let xhrDelete = new XMLHttpRequest;
xhrDelete.open('DELETE', url+'/:itemId');
xhrDelete.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhrDelete.onload = function() { 
    Otrisovka(note);
};