const BASE_URL = "../public/routes.json";
const API_URL = "http://localhost:3000";

let tableRowCount = 1;

handleEvent = (event) => {
   event.preventDefault();
}


clearInputs = () => {
   document.getElementById("placeFromInput").value = "";
   document.getElementById("placeToInput").value = "";
   document.getElementById("dateFromInput").value = "";
   document.getElementById("fioInput").value = "";
}


addData = () => {
   let placeFrom = document.getElementById("placeFromInput").value;
   let placeTo = document.getElementById("placeToInput").value;
   let dateFrom = new Date(document.getElementById("dateFromInput").value);
   let fio = document.getElementById("fioInput").value;
   let dateTo = new Date(dateFrom)
   dateTo.setDate(dateTo.getDate() + 7)
   dateTo = dateTo.toLocaleDateString();

   if (placeFrom === "" || placeTo === "" || fio === "") {
      alert("Заполните все поля!");
      return;
   }
   insertData(placeFrom, placeTo, dateFrom.toLocaleDateString(), dateTo, fio);
}

getTrackNumber = () => {
   return Date.now();
}

insertData = (placeFrom, placeTo, dateFrom, dateTo, fio, number = null) => {
   let table = document.getElementById("table");
   let newRow = table.insertRow(table.rows.length);

   newRow.insertCell(0).innerHTML = tableRowCount;
   newRow.insertCell(1).innerHTML = placeFrom;
   newRow.insertCell(2).innerHTML = placeTo;
   newRow.insertCell(3).innerHTML = number ? number : getTrackNumber();
   newRow.insertCell(4).innerHTML = dateFrom;
   newRow.insertCell(5).innerHTML = dateTo;
   newRow.insertCell(6).innerHTML = fio;
   newRow.insertCell(7).innerHTML =
   '<button class="button button_edit" onclick="editData(this)">Изменить</button>' +
   '<button class="button button_delete" onclick="deleteData(this)">Удалить</button>'
    ;

   tableRowCount++;
   clearInputs();
}

deleteData = (button) => {
   let row = button.parentNode.parentNode;
   row.parentNode.removeChild(row);
   tableRowCount--;
}

editData = (button) => { 
            
   let row = button.parentNode.parentNode; 
   
   let placeFrom = row.cells[1]; 
   let placeTo = row.cells[2]; 
   let dateFrom = row.cells[4]; 
   let fio = row.cells[6]; 
   
   let placeFromInput = 
       prompt("Введите новое место отправления:", 
         placeFrom.innerHTML); 
   let placeToInput = 
       prompt("Введите новое место назначения:", 
         placeTo.innerHTML); 
   let dateFromInput = 
       prompt("Введите дату отправления:", 
         dateFrom.innerHTML 
       ); 
   let fioInput = 
      prompt("Введите новое ФИО пассажира:", 
         fio.innerHTML 
      ); 

   placeFrom.innerHTML = placeFromInput; 
   placeTo.innerHTML = placeToInput; 
   dateFrom.innerHTML = dateFromInput; 
   dateTo.innerHTML = dateToInput; 
   fio.innerHTML = fioInput; 
} 

fetchDataAsync = async (url) => {
   let response = await fetch(url);
   let data = await response.json();

   data.forEach(element => {
      insertData(element.placeFrom, element.placeTo, element.dateFrom, element.dateTo, element.fio, element.number)
   });

   return data;
}

postData = (route) =>{
   let options = { 
      method: 'POST', 
      headers: { 
       'Content-Type': 'application/json;charset=utf-8' 
      }, 
      body: JSON.stringify(route) 
     } 
   
   let response = fetch(API_URL, options); 
      response.then(res => 
      res.json()).then(d => { 
             console.log(d) 
      }) 
}


let form = document.getElementById("form");
form.addEventListener("submit", handleEvent);
fetchDataAsync(BASE_URL)