"use strict";

const newForm = new UserForm();
newForm.loginFormCallback = data =>  {
     let login = data.login;
     let password = data.password;
     ApiConnector.login({login, password}, response =>{
          if(response.success){
               location.reload();
          } else {
               alert("Ошибка!")
          }
     })
} 

const registerForm = new UserForm();
registerForm.registerFormCallback = data => {
     console.log(data);
     let login = data.login;
     let password = data.password;
     ApiConnector.register({login, password}, response => {
          if(response.success){
               location.reload();
          } else {
               alert("Ошибка!")
          }
     })
} 