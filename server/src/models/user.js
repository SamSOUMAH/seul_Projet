const { MAILGUM } = require("../config/mailGun")

class User{
    constructor(
               email='',
               password='',
               firstname='',
               lastname='', 
               avatar_url='',
               token="",
               expirationDate=new Date(),
               isVerified=false,
               id=null){ 
                  this.email=email
                  this.password=password
                  this.firstname=firstname
                  this.lastname=lastname
                  this.avatar_url=avatar_url
                  this.id=id
                  this.token=token
                  this.expirationDate=expirationDate
                  this.isVerified = isVerified
              }
    }
exports.User=User
