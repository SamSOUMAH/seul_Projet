class User{
    constructor(
               username='',
               firstname='',
               lastname='',
               password='',
              avatar_url='',
              id=null){ 
                  this.username=username
                  this.firstname=firstname
                  this.lastname=lastname
                  this.password=password
                  this.avatar_url=avatar_url
                  this.id=id
              }
}

exports.User=User
