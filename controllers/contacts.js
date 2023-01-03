const { Contact, listContacts, getContactById}  = require('../models/contact')

const { HttpError, ctrlWrapper } = require('../helpers')

const getAll = async (req, res) => {
  const result = await listContacts();
  
    res.json(result)
}

const getById = async (req, res) => {
    const { id } = req.params;

  const result = await getContactById(id);
    if (!result) {        
       throw HttpError(404)
    }
  res.json(result)
}

const add = async (req, res) => {
  const {name, email, phone, favorite } = req.body; 
    const newContact = await Contact.create(req.body);
  res.status(201).json({
    name: newContact.name,
    email: newContact.email,
    phone: newContact.phone,
    favorite: newContact.favorite,
    })
}

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404)
  }
    res.json(result)
}

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
     throw HttpError(404)
  }
  res.json({
    message: 'Delete success'
  })
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateContact: ctrlWrapper(updateContact),
    removeById: ctrlWrapper(removeById),    
}