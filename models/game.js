const mongoose = require('mongoose');

// Define Schemes
const gameSchema = new mongoose.Schema({
    key: {type: String},
    name: { type: String },
    hint1: { type: String },
    hint2: { type: String },
    hint3: { type: String },
    hint4: { type: String },
    mynum: {type: Number},
    tnum: {type: Number},
    cnum: {type: Number}
},
{
  timestamps: true
});
// Create new game document
gameSchema.statics.create = function (payload) {
    // this === Model
    const game = new this(payload);
    // return Promise
    return game.save();
  };
  
  // Find All
  gameSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
  };
  
  // Find One by gameid
  gameSchema.statics.findOneBykey = function (key) {
    return this.findOne({ key });
  };
  // Find One by cnum
  gameSchema.statics.findOneBymynum = function (mynum) {
    return this.findOne({ mynum });
  };


  // Update by gameid
  gameSchema.statics.updateBymynum = function (tnum, mytnum) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.updateMany({tnum: tnum} , {tnum: mytnum});
  };
  // Update by hunting2
  gameSchema.statics.updateBymynum2 = function (tnum, mytnum) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.updateMany({tnum: tnum} , {cnum: mytnum});
  };


  // Update by name
  gameSchema.statics.updateByname = function (name, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ name }, payload, { new: true });
  };
  // Update by name
  gameSchema.statics.updateByphonenumber = function (phonenumber, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ phonenumber }, payload, { new: true });
  };
  
  // Delete by gameid
  gameSchema.statics.deleteBygameid = function (gameid) {
    return this.remove({ gameid });
  };

// Create Model & Export
module.exports = mongoose.model('game', gameSchema);