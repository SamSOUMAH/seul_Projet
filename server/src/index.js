//importer les fichiers vers index
const express = require("express")
const { API_URL } = require("./config/api")
const { MAILGUM } = require("./config/mailGun")
const { DB } = require("./config/mysql")
const { User } = require("./models/user")
const randomstring = require("randomstring");
const nodemailer = require("nodemailer")


//test 
// console.log(Date.now());

//creation de  app, on demande a express pour communiquer avec http(get, post,update)
const app = express()
//activer l'écoute du serveur http (listen=Ecoutez)
app.listen('9000', (req, resp) => {
    console.log("Server is runing on port 9000...")  //"Sever s'exceute sur le port 9000..."
})


//utilisateurs/tous 
app.get(`${API_URL.user}/all`, (httpReq, httpResp) => {
    DB.query(`SELECT * FROM USERS`, (err, resQ) => {
        if (err) throw err
        else {
            console.log(resQ)
            httpResp.send('Users Fetched...') // utilisateur recuperer
        }
    })

})

//users/1/todos/all(utilisateurs/1/todos/all ) : toutes les taches de l'utilisateur id=1

app.get(`${API_URL.user}/:userId/todos/all`, (req, resp) => {
    let userId = req.params.userId
    DB.query(`SELECT ID FROM USERS WHERE id=${userId}`, (err, resQ) => {
        if (err) throw err
        else {
            // console.log(resQ)
            if (resQ.length === 0) {
                resp.send("<h1 style='color:red'>user not found</h1>")
            } else {
                let query = `SELECT * FROM TODOS WHERE userId=${userId}`
                DB.query(query, (err, resQ) => {
                    if (err) throw err
                    else {
                        console.log(resQ)
                        resp.send("We have " + resQ.length + " todo,happy coding ^_^ !!")
                    }
                })
            }
        }
    })
})

// user api for register(API utilisateur pour s'inscrire )
app.get("/api/auth/register", (req, resp) => {

    //fetch data(récupérer des données)
    let newUser = new User(
        'sam86soumah@gmail.com',
        'Passe1234',
        'bgdKI',
        'PasS',
        'avatar145')

    //password
    let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/
    if (!passwordPattern.test(newUser.password)) {
        resp.send("<h1 style='color:green'>Le mot de passe doit comporter au moins 8 caractères et au maximum 12 et contenir au moins un numéro un en majuscule et en minuscule😅 !!</h1>")
        return
    }
    //username
    let usernamePattern = /^.{4,30}$/
    if (!usernamePattern.test(newUser.username)) {
        resp.send("<h1 style='color:red'>Username Should be at least 4 characters & maximum 30 😅 !!</h1>")
        return
    }
    //firstname
    let firstnamePattern = /^.{4,12}$/
    if (!firstnamePattern.test(newUser.firstname)) {
        resp.send("<h1 style='color:red'>FirstName Should be at least 4 characters & maximum 12 😅 !!</h1>")
        return
    }

    //lastname
    let lastnamePattern = /^.{4,12}$/
    if (!lastnamePattern.test(newUser.lastname)) {
        resp.send("<h1 style='color:red'>LastName Should be at least 4 characters & maximum 12 😅 !!</h1>")
        return
    }

    //verifier est ce que username existe
    DB.query(` SELECT * FROM USERS WHERE email='${newUser.email}'`, (err, resQ) => {
        if (err) throw err
        else {

            if (resQ.length === 0) { // si username n'existe pas, tu ajoute le nouveau

                console.log(resQ);

                let tokenn = randomstring.generate()
                newUser.token = tokenn
                newUser.isVerified = false
                newUser.expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
                //create the endpoint ( le lien )
                let { email, token } = newUser
                let endPoint = `http://localhost:9000/api/verify-email/${email}/code/${token}`

                //send email
                let transporter = nodemailer.createTransport({
                    host: "smtp.mailgun.org",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: MAILGUM.Username, // generated ethereal user
                        pass: MAILGUM.Default_password, // generated ethereal password
                    },
                    tls: { rejectUnauthorized: false }
                });

                // Message pour lui dire de consulter
                let message = {
                    from: 'support@TodoApp.com',     // sender address
                    to: newUser.email,                     // list of receivers
                    subject: "Hello from Gomycode ✔",    // Subject line      // plain text body
                    html: `
                            <h1>Tanks for your enregistrement</h1>
                            Clik the link befor to verify you Email
                            <a href='${endPoint}> Verifiy</a>
                            the link will be expired after 24 hours`,  // html body
                };

                // Send email
                transporter.sendMail(message, (err, info) => {
                    if (err) throw err
                    else {
                        console.log(info)
                    }
                })

                DB.query(` INSERT INTO users set ?`,newUser, (err, resQ) => {
                    if (err) throw err
                    else {
                        console.log(resQ)
                        resp.send("<h1 style='color:green'>Veuillez verifier votre boite mail  </h1>")
                    }
                })
            } else { // username existe deja dans la base de donnee
                resp.send("<h1 style='color:red'>already exist </h1>")
            }
        }
    })


})


app.get("/api/verify-email/:email/code/:token", (req, resp) => {
    console.log(req.params)
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