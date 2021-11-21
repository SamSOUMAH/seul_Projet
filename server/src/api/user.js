
const { db } = require("../config/mysql");
const { Credentials } = require("../models/credential");
const { UserModel } = require("../models/user");

//register user
exports.register = (req, resp) => {

    //fetch data from req
    let newUser = new UserModel(
        "saytama",
        "yamagi",
        "http://assets.stickpng.com/images/58582c01f034562c582205ff.png",
        "ddddd",
        "Pass1234"
    )
    
    //validate data
    //password
    let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,12}$/
    if (
        !passwordPattern.test(newUser.password)
    ) {
        resp.send("<h1 style='color:red'>Password Should be at least 8 characters & maximum 12 and contains at least one number one uppercase and lowercase😅 !!</h1>")
        return
    }
    //username
    let usernamePattern=/^.{4,12}$/
    if (!usernamePattern.test(newUser.username)) {
        resp.send("<h1 style='color:red'>Username Should be at least 4 characters & maximum 12 😅 !!</h1>")
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
    //verify if the username already exist 
    db.query(
            `
                SELECT * FROM USERS 
                WHERE username ='${newUser.username}'    
        `, (err, resQ) => {
        if (err) throw err
        else {
            console.log(resQ);
            if (resQ.length > 0) {
                resp.send("<h1 style='color:red'> Username Already exist 😅 !!</h1>")
            } else {
                //Insert sql query
                let query = `INSERT INTO USERS SET ?`

                //work with db 
                db.query(query, newUser, (err, resQ) => {
                    if (err) throw err
                    else {
                        console.log(resQ)
                        resp.send("Hello and Welcome " + newUser.firstname + " 😄 !!")
                    }
                })
            }
        }
    })




}
exports.login = (req,resp)=>{

    let credentials = new Credentials(
        "yassine.rassy1@gmail.com",
        "Pass1234"
    )

    //search user by username and password 
    let query = `
        SELECT * 
        FROM USERS
        WHERE username='${credentials.username}'
        AND password='${credentials.password}'`
        
    //apply query
    db.query(query,(err,resQ)=>{
        if(err) throw err
        else {
            console.log(resQ)
            //result 
            if(resQ.length===0) 
            resp.send("user Not Found Try to register...")
            else
            resp.send("hello & welcome "+resQ[0]["FIRSTNAME"])
        }
    })
}