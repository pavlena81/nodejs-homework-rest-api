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

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

module.exports = {
  Contact
  // listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
}
