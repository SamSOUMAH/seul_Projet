
// const mysql = require("mysql")

// //create the connection
// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:''
// })


// exports.db = db


 const mysql=require("mysql")
 const cox=mysql.createConnection({
     host:'Localhost', // si server recuperer le lien , sil ya un server connecter copier le lien du server en lieu et place 'locolhost'
     user:'root',  //compte utilisateur
     password:'',
     database: 'todos_base_donnee',

 })

 //connexion avec la base de donnée
 //sil ya une erreur affiche sur le terminal sinon affiche mysql

 cox.connect((err, res)=>{
     if(err) throw err
     else console.log('MySQl is runing...');
     console.log(res)
 })

 exports.DB=cox;