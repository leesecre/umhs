const mongoose = require('mongoose');

// Define Schemes
const contactSchema = new mongoose.Schema({
    contactid: {type: String},
  name: { type: String },
  phonenumber: { type: String }
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
    return this.find({ contactid });
  };

 

   // Find One by contactid and name
   contactSchema.statics.findOneByidname = function (payload) {
       let query = {
           contactid : payload.contactid,
           name: payload.name,
       }

    return this.findOne(query);
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

  // Update by name
  contactSchema.statics.updateByname = function (name, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ name }, payload, { new: true });
  };
  // Update by name
  contactSchema.statics.updateByphonenumber = function (phonenumber, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ phonenumber }, payload, { new: true });
  };
  
  // Delete by contactid
  contactSchema.statics.deleteBycontactid = function (contactid) {
    return this.remove({ contactid });
  };

// Create Model & Export
module.exports = mongoose.model('contact', contactSchema);