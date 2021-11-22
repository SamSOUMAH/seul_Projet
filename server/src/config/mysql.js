const mysql = require("mysql")

//create mysql cnx 
const cnx = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"todos_base_donnee"
})

//connect to the database 
cnx.connect((err,res)=>{
    if(err) throw err 
    console.log("mysql is runing...")
    console.log(res)
})
exports.DB=cnx 



