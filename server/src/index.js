const express = require("express")
const { API_URL } = require("./config/api")
const { DB } = require("./config/mysql")
const {User} = require("./models/user")

//create our app
const app = express()

//enable listening http server
app.listen('9000', (req, resp) => {
    console.log("Server is runing on port 9000...")
})

//users/all
app.get(`${API_URL.user}/all`, (httpReq, httpResp) => {
    DB.query(`SELECT * FROM USERS`, (err, resQ) => {
        if (err) throw err
        else {
            console.log(resQ)
            httpResp.send('Users Fetched...')
        }
    })

})

//users/1/todos/all : toutes les taches de l'utilisateur id=1
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

 // user api for register
 app.get("/api/auth/register",(req, resp)=>{

    //fetch data
    let newUser=new User(
        username='lordayarda@vusra.com',
        firstname='ab',
        lastname='bgdojju',
        password='pass1234',
       avatar_url='https://th.bing.com/th/id/OIP.QDOmzOh-mruIm3MlC7aezgHaE8?pid=ImgDet&rs=1'   
    )
    if(newUser.firstname.length<4 || newUser.firstname.length>20 )
    {
        resp.send('<h1>saaaaluut</h1>')
        return
    }
    console.log('ppppppp')
 })











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