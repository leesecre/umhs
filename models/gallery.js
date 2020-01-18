const mongoose = require('mongoose');

// Define Schemes
const contactSchema = new mongoose.Schema({
    id: {type: String},
  name: { type: String },
  phonenumber: { type: String },
},
{
  timestamps: true
});
// Create new contact document
contactSchema.statics.create = function (payload) {
    // this === Model
    const contact = new this(payload);
    // return Promise
    return contact.save();
  };
  
  // Find All
  contactSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
  };
  
  // Find One by contactid
  contactSchema.statics.findOneBycontactid = function (contactid) {
    return this.findOne({ contactid });
  };
   // Find One by _id
   contactSchema.statics.findOneBy_id = function (_id) {
    return this.findOne({ _id });
  };
  // Update by contactid
  contactSchema.statics.updateBycontactid = function (contactid, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ contactid }, payload, { new: true });
  };
  
  // Delete by contactid
  contactSchema.statics.deleteBycontactid = function (contactid) {
    return this.remove({ contactid });
  };

// Create Model & Export
module.exports = mongoose.model('contact', contactSchema);