const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    email: {type: String, unique: true, match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "Please enter valid email"]},
    password: {type: String},
    isAdmin: { type: Boolean, default: false },
    role: {type: String, default: 'visitor'},
    approvedBy: {type: String}
},{ timestamps: true })

// midlleware before saving
UserSchema.pre('save', async function () {
    //generating random bytes 
    const salt = await bcrypt.genSalt(10)
    //referencing the password from the above schema and hashing it using bcrypt library
    this.password = await bcrypt.hash(this.password, salt)
})

//instance method, here this keyword signifies the instance of the calling object
UserSchema.methods.comparePassword = async function (secondpartypassword) {
    const isMatch = await bcrypt.compare(secondpartypassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)