import {users} from "../db/db.js";

$("#loginBtn").on('click',()=>{
   
   event.preventDefault();
   
   var user_nameF = $("#usernameField").val();
   var passwordF = $("#passwordField").val();
   var idF = "1";


   const UserDTO = {
    "id":1,
    "name" : "Amo",
    "password" : "123"
}

   console.log(UserDTO);
   const userJSON = JSON.stringify(UserDTO);

   const http = new XMLHttpRequest();
   http.onreadystatechange =() =>{
       //check state
       if (http.readyState == 4){
           if (http.status == 200){

        //     const data = JSON.parse(http.responseText);
        //     data.forEach((item) => {
        //       if(item.user_name == user_nameF && item.password == passwordF){

               window.location.assign('MainWindow.html');
        //       }
        //     }
        // )
           }else {
               console.error("Failed");
               console.error("Status Received" , http.status);
               console.error("Processing Stage" , http.readyState);
           }
       }else{
           console.log("Processing stage", http.readyState);
       }
   }

        http.open("GET","http://localhost:8080/inventory/login",true);
        http.setRequestHeader("Content-Type","application/json");
        http.send(UserDTO);

      
});