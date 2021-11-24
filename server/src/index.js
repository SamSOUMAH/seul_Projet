//importer les fichiers vers index
const express = require("express")
const { API_URL } = require("./config/api")
const { DB } = require("./config/mysql")
const {User} = require("./models/user")

//creation de  app
const app = express()
//activer l'écoute du serveur http 
app.listen('9000', (req, resp) => {
    console.log("Server is runing on port 9000...")
})

//utilisateurs/tous 
app.get(`${API_URL.user}/all`, (httpReq, httpResp) => {
    DB.query(`SELECT * FROM USERS`, (err, resQ) => {
        if (err) throw err
        else {
            console.log(resQ)
            httpResp.send('Users Fetched...') // la partie qui s'affiche apres la commande:http://localhost:9000/api/users/all
        }
    })

})

//users/1/todos/all(utilisateurs/1/todos/all ) : toutes les taches de l'utilisateur id=1
app.get(`${API_URL.user}/:userId/todos/all`, (req, resp) => {
    let userId = req.params.userId
    //verifier l'existance de l'utilisateur
    DB.query(`SELECT id FROM USERS WHERE id=${userId}`,
        (err, resQ) => {
            if (err) throw err
            else {
                // console.log(resQ)
                if (resQ.length === 0) {
                    resp.send("<h1 style='color:red'>user not found</h1>")
                } else {
                    let query = `
                        SELECT * FROM TODOS
                        WHERE userId=${userId}
                    `
                    DB.query(query,(err,resQ)=>{
                        if(err) throw err 
                        else{
                            console.log(resQ)
                            resp.send("We have "+resQ.length+" todo,happy coding ^_^ !!")
                        }
                    })
                }
            }
        })


})

 // user api for register(API utilisateur pour s'inscrire )
 app.get("/api/auth/register",(req, resp)=>{

    //fetch data(récupérer des données)
    let newUser=new User(
        'MBAfYEYYY',
        'abuii',
        'bgdop',
        'Passe1234',
       'avatar145')

      //password
        let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/
        if (!passwordPattern.test(newUser.password)){
           resp.send("<h1 style='color:green'>Le mot de passe doit comporter au moins 8 caractères et au maximum 12 et contenir au moins un numéro un en majuscule et en minuscule😅 !!</h1>")
           return
        }
       //username
      let usernamePattern = /^.{4,30}$/
     if (!usernamePattern.test(newUser.username)){
      resp.send("<h1 style='color:red'>Username Should be at least 4 characters & maximum 30 😅 !!</h1>")
      return 
           }
       //firstname
       let firstnamePattern = /^.{4,12}$/
       if (!firstnamePattern.test(newUser.firstname)){
           resp.send("<h1 style='color:red'>FirstName Should be at least 4 characters & maximum 12 😅 !!</h1>")
           return 
       }
       
       //lastname
       let lastnamePattern = /^.{4,12}$/
       if (!lastnamePattern.test(newUser.lastname)){
           resp.send("<h1 style='color:red'>LastName Should be at least 4 characters & maximum 12 😅 !!</h1>")
           return 
       }

       //verifier est ce que username existe
       DB.query(` SELECT * FROM USERS WHERE UserName='${newUser.username}'`,(err,resQ)=>{
        if(err) throw err
        else{
            console.log(resQ);
            if(resQ.length===0){

                DB.query(` INSERT INTO users (username, password, firstname, lastname, avatar_url) VALUES ('${newUser.username}','${newUser.password}','${newUser.firstname}','${newUser.lastname}','${newUser.avatar_url}')`,
                 (err,resQ)=>{
                     if(err)throw err
                     else {
                         console.log(resQ)
                            resp.send("<h1 style='color:green'>utilisateur ajoutées avec succees </h1>")
                     }
                 })
            }else{
                resp.send("<h1 style='color:red'>already exist </h1>")
            }
        }
       })


    })







    // if(newUser.firstname.length<4 || newUser.firstname.length>20)
    // {
    //     resp.send('<h1 style="color:red">FistName Ici false</h1>')
    //     return
    // }
    // console.log('FistName si cest True')



//      if(newUser.lastname.length<4 || newUser.lastname.length>20)
//      {
//       resp.send('<h1 style="color:green">LastName ici false </h1>')
//        return
//      }
//    console.log('lastName si cest True')


//      if(newUser.password.length<8 || newUser.password.length>20)
//      {
//          resp.send('<h1 style="color:yellow">password ici false </h1>')
//         return
//      }
//      console.log('password si c\'est True')



 











//  const express = require("express")
//  //creat out app
//  const app= express()
//  const { API_URL } = require("./config/api")
//  const { DB } = require("./config/mysql")
//  //enable listening server
//  app.listen('9000', (req, resp)=>{
//      console.log( "server is running on port 9000...")  
//  })

//    app.get(`${API_URL.user}/all`, // trouve DANS LE FICHIER api.js LA CONST API_URL,Si tu trouve user tu l'affiche sil nya pas d'erreur 
//    (httpReq,httpResp)=>{
//        DB.query(`SELECT * FROM USERS`,(err, resQ)=>{
//           if(err) throw err
//          else{
//               console.log(resQ)    
//               httpResp.send("HELLO")
//           }
//       })
//  })

//  app.get(`${API_URL.todo}/all`,(httpReq, httpResp)=>{
//       DB.query(`SELECT * FROM TASK`,(err, resQ)=>{
//           if(err) throw err
//           else{
//              console.log(resQ)
//              httpResp.send("WORD444")
//          }
//       })
//   })
//    app.get(`${API_URL.tooot}/all`,(httpReq, httpResp)=>{
//    DB.query(`SELECT * FROM TOOT`,(err, resQ)=>{
//          if(err) throw err
//          else{
//          console.log(resQ)    
//           httpResp.send("BONJOUR LE MONDE")}
//     })})