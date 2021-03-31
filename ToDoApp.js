let todoItems = [];
let html_for_choices = `<label for="Choice">Notes:</label>
  <select name="choice" id="id_notes_choice" onchange="renderTodo_New()">
    <option value="SeeNotes">See Notes</option>
    <option value="UpdateNotes">Update Notes</option>
  </select>`;




function addTodo(text) {
  var mynewdate = new Date();
      hours = mynewdate.getHours();
    minutes = mynewdate.getUTCMinutes();
    seconds = mynewdate.getSeconds();
    timeString = hours.toString().padStart(2, '0') +
        ':' + minutes.toString().padStart(2, '0') +
        ':' + seconds.toString().padStart(2, '0');


    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;




    const todo = {
        id: Date.now(),
        datefull: mynewdate,
        datelogged: mynewdate.getMonth() + '/' + mynewdate.getDate() + '/' + mynewdate.getFullYear() + ' @ ' + strTime,
        checked: false,
        taskItem: text,
        taskNotes: "",


    };

    todoItems.push(todo);
    console.log(todoItems);
    //renderTodo(todo);
    renderTodo_New();
}




function EnterToDo() {


    console.log('Print Me');
    let new_todo_item = document.getElementById("id_todo").value;
    new_todo_item=new_todo_item.trim();
    console.log(new_todo_item);
    console.log('Length of New Item:' , new_todo_item.length);
    
    if(new_todo_item.length>0) {
        addTodo(new_todo_item);
        document.getElementById("id_todo").value='';

    }else{

        console.log("String Length is Too Small, value not entered");
    }
   



}


function renderTodo_New() {
    let temp_html = '';
    let Todo_Count = 0;
    let temp_html2 = '';
    let mychoice_val=document.getElementById('id_notes_choice').value;

    console.log('renderToDo_New Fired OFf');
    console.log('Length of Todo Array', todoItems.length);
    console.log(mychoice_val);


    let table_header_html = `<div style="overflow-x:auto;"><table class="styled-table" id="id_tbl_taskslist">
    <tr>
      <th>Delete</th>
      <th>Logged</th>
      <th>Task Desc</th>
      <th>Notes</th>
      <th>Update Notes</th>
    </tr>`;


    for (i = 0; i < todoItems.length; i++) {

        if (todoItems[i].checked === false) {
            Todo_Count = Todo_Count + 1;


            temp_html2 = temp_html2 +
                `
                 <tr><td><button onclick="DeleteTodo(${todoItems[i].id})" class="button1">Delete Task</button></td>
                 <td>${todoItems[i].datelogged}</td>
                 <td><strong>${todoItems[i].taskItem}</strong></td>` ;  

                 if(mychoice_val==="SeeNotes"){
                temp_html2 = temp_html2 +`<td>${todoItems[i].taskNotes}</td>` ;
                 }
                 else{
                     temp_html2 = temp_html2 +`<td><textarea id="txt_area_${todoItems[i].id}" rows="2" cols="70">${todoItems[i].taskNotes}</textarea></td>` ;
                 }

                 temp_html2 = temp_html2 + `<td><button onclick="UpDateTodoNotes(${todoItems[i].id})" class="button1">Update Notes</button></td>
                 </tr>
                
                 `;



        }





    }


    

    //let counter_html = `  <br></br><h4> Search: BI</h4>
      //   <input id = "id_WhatAreYouLookingFor"></input><button onclick=" search_table()" class="button1">   Search</button><br></br>`;
    console.log(temp_html);

    //document.getElementById("col3").innerHTML=counter_html;
    document.getElementById("id_main_div").innerHTML = table_header_html + temp_html2 + '</table></div>';
    document.getElementById("this_test").innerHTML = `<h4>Current Tasks ${Todo_Count}</h4>`;

    console.log(JSON.stringify(todoItems));
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));


 if(mychoice_val!="SeeNotes"){

    for (i = 0; i < todoItems.length; i++) {

        if (todoItems[i].checked === false) {
            document.getElementById('txt_area_' + todoItems[i].id).value = todoItems[i].taskNotes;



        }





    }
 }










    if (Todo_Count == 0) {

        document.title = `ToDo: All Complete`;

    } else {

        document.title = `ToDo(${Todo_Count})`;
    }


}


function DeleteTodo(taskId) {

    //Cycles Throught the Todo Items and when it finds the value that matches, and when it finds one, it check the check value to true
    //Then it calls the RenderTo Functions which cycles through the todo list. 
    for (i = 0; i < todoItems.length; i++) {

        if (todoItems[i].id === taskId) {

            //todoItems[i].checked = true;
            todoItems.splice(i, 1);

        }



    }


    renderTodo_New();

}


function search_table() {
    // Declare variables 
    var input, filter, table, tr, td, i;
    input = document.getElementById("id_WhatAreYouLookingFor");
    filter = input.value.toUpperCase();
    table = document.getElementById("id_tbl_taskslist");
    tr = table.getElementsByTagName("tr");
   

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
   
        for (j = 0; j < td.length; j++) {
            let tdata = td[j];
   
            if (tdata) {
                if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}





function UpDateTodoNotes(taskId) {

    //Cycles Throught the Todo Items and when it finds the value that matches, and when it finds one, it check the check value to true
    //Then it calls the RenderTo Functions which cycles through the todo list. 
    for (i = 0; i < todoItems.length; i++) {

        if (todoItems[i].id === taskId) {

            todoItems[i].taskNotes = document.getElementById('txt_area_' + taskId).value;


        }



    }


    renderTodo_New();

}





var input = document.getElementById("id_todo");

input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("my_button").click();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
        todoItems = JSON.parse(ref);
        //todoItems.forEach(t => {
        //renderTodo(t);
        //}

        renderTodo_New();

    }
});
