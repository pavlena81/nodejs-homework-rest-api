const { Contact } = require('../models/contact')

const {HttpError, ctrlWrapper} = require('../helpers')

const getAll = async (req, res) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result)
}

const getById = async (req, res) => {
    const { id } = req.params;

    const result = await Contact.findById(id)
    if (!result) {
        throw HttpError (404)
    }
    res.json(result)
}


module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById)
}