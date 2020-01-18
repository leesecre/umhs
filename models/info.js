const mongoose = require('mongoose');

// Define Schemes
const infoSchema = new mongoose.Schema({
  infoid: { type: String, required: [true,"ID is required!!"], unique: true },
  pw: { type: String, required: [true,"Password is required!!"] }
},
{
  timestamps: true
});
// Create new info document
infoSchema.statics.create = function (payload) {
    // this === Model
    const info = new this(payload);
    // return Promise
    return info.save();
  };
  
  // Find All
  infoSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
  };
  
  // Find One by infoid
  infoSchema.statics.findOneByinfoid = function (infoid) {
    return this.findOne({ infoid });
  };
   // Find One by _id
   infoSchema.statics.findOneBy_id = function (_id) {
    return this.findOne({ _id });
  };
  // Update by infoid
  infoSchema.statics.updateByinfoid = function (infoid, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ infoid }, payload, { new: true });
  };
  
  // Delete by infoid
  infoSchema.statics.deleteByinfoid = function (infoid) {
    return this.remove({ infoid });
  };

// Create Model & Export
module.exports = mongoose.model('info', infoSchema);