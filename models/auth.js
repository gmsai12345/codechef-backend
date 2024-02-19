// // databasse schema for user database
// const mongoose = require('mongoose')
// const userSchema = mongoose.Schema({
//     name: {type: string, require:true},
//     email: {type: string, require:true},
//     password: {type: string, require:true},
//     about: {type: string},
//     tags: {type: string},
//     joinedOn: {type:string,default:Date.now}

// })
// export default mongoose.model("User",userSchema)
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String },
    tags: {type: [String] },
    joinedOn: {type: Date, default: Date.now }
})

module.exports = mongoose.model("User", userSchema)