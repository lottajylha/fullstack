const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url =
  `mongodb+srv://Lotta:Lotta24@test-j7i1t.mongodb.net/bloglist-testdb?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const userSchema = mongoose.Schema({
    username: {
      type: String,
      unique: true
    },
    name: String,
    passwordHash: String,
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

const user = new User({
    username: 'username',
    name: 'name',
    password: 'password',
    notes: []
})

user.save().then(response => {
    console.log('saved to db');
    mongoose.connection.close();
})
