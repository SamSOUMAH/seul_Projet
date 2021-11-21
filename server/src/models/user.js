
class UserModel {
    constructor(
        firstname = "",
        lastname = "",
        avatar_url = "",
        username = "",
        password = "",
        id = null) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.avatar_url = avatar_url
        this.username = username
        this.password = password
    }
}

exports.UserModel = UserModel