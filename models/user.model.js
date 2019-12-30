const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  vote: {
    vote_1: { type: String, default: '' },
    vote_2: { type: String, default: '' },
    vote_3: { type: String, default: '' },
    vote_4: { type: String, default: '' },
    vote_5: { type: String, default: '' },
    vote_6: { type: String, default: '' },
    vote_7: { type: String, default: '' }
  }
});

UserSchema.pre('save', async function(next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
