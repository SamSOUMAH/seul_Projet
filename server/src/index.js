
// const express = require("express")
// const { addTodo } = require("./api/todo")
// const { register, login } = require("./api/user")
// const { API_URL } = require("./config/api")
// const { db } = require("./config/mysql")

// const { TaskStatusEnum } = require("./data/enum/TaskStatus")

// //Connect
// db.connect((err) => {
//     if (err) throw err
//     console.log("Mysql connected...")
// })

// const app = express()

// app.listen('9000', () => {
//     console.log('Server started on port 9000 😇');
// })

// //user api
// app.get(`/${API_URL.user}/register`,register)
// app.get(`/${API_URL.user}/login`,login)

// // todo api
// app.get(`/${API_URL.user}/:userId/${API_URL.todo}/add`,addTodo)







 const express = require("express")
 //creat out app
 const app= express()
 const { API_URL } = require("./config/api")
 const { DB } = require("./config/mysql")
 //enable listening server
 app.listen('9000', (req, resp)=>{
     console.log( "server is running on port 9000...")  
 })

   app.get(`${API_URL.user}/all`, // trouve DANS LE FICHIER api.js LA CONST API_URL,Si tu trouve user tu l'affiche sil nya pas d'erreur 
   (httpReq,httpResp)=>{
       DB.query(`SELECT * FROM USERS`,(err, resQ)=>{
          if(err) throw err
         else{
              console.log(resQ)    
              httpResp.send("HELLO")
          }
      })
 })

 app.get(`${API_URL.todo}/all`,(httpReq, httpResp)=>{
      DB.query(`SELECT * FROM TASK`,(err, resQ)=>{
          if(err) throw err
          else{
             console.log(resQ)
             httpResp.send("WORD444")
         }
      })
  })
   app.get(`${API_URL.tooot}/all`,(httpReq, httpResp)=>{
   DB.query(`SELECT * FROM TOOT`,(err, resQ)=>{
         if(err) throw err
         else{
         console.log(resQ)    
          httpResp.send("BONJOUR LE MONDE")}
    })})