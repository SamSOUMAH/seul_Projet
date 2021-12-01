const mysql = require("mysql")

//create mysql cnx (créer  la connection )
const cnx = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"todos_base_donnee"
})

//connect to the database( se connecter à la base de donnée) 
cnx.connect((err,res)=>{
    if(err) throw err 
    console.log("mysql is runing..")
    console.log(res)
})
exports.DB=cnx 



