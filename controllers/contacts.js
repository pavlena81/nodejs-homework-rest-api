const { Contact, listContacts, getContactById}  = require('../models/contact')

//const { HttpError, ctrlWrapper } = require('../helpers')

// const getAll = async (req, res) => {
//     const contacts = await Contact.find();
//     res.json(contacts)
// }

// const getById = async (req, res) => {
//     const { id } = req.params;

//     const result = await Contact.findById(id)
//     if (!result) {        
//        throw HttpError(404)
//     }
//     res.json(result)
// }
const getAll = async (req, res, next) => {
  try {
    const results = await listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getContactById(id);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: {contact: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const add = async (req, res) => {
  const {name, email, phone, favorite } = req.body; 
    const newContact = await Contact.create(req.body);
  res.status(201).json({
    name: newContact.name,
    email: newContact.email,
    phone: newContact.phone,
    })
}

module.exports = {
    getAll,
    getById,
    add,
    // getAll:ctrlWrapper(getAll),
    // getById:ctrlWrapper(getById),
}