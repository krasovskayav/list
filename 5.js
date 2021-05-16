let day = "",       // приоритет
    text = "",      // Текст
    i = 1,          // счетчик
    arrNotes = [],  // массив заметок
    form = document.dwsForm;

function prClick() {
    day = form.days.value;
    text = form.message.value;
    arrNotes.push("" + i +  " " + text + " " + day.bold() + "<hr></td>");
    i++;
    form.reset();
    const diary = document.getElementById('diary');
    diary.innerHTML="<table>" + arrNotes.join('') + "</table>";
}

 $(function(){
        $("#diary").on('blur', function(){
            $("#textarea").val($(this).text());
        });
    })
 