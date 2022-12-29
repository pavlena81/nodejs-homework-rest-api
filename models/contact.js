// const fs = require('fs/promises')

const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
    {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
)

const Contact = model('contact', contactSchema);

const listContacts = async () => {
  return Contact.find();
 }

const getContactById = async (id) => {
   return Contact.findOne(id);
 }

// const removeContact = async (contactId) => {}



// const updateContact = async (contactId, body) => {}

module.exports = {
  Contact,
   listContacts,
   getContactById,
  // removeContact,
   
  // updateContact,
}
