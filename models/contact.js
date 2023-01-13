// const fs = require('fs/promises')

const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const contactSchema = new Schema(
    {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
  }, { versionKey: false, timestamps: true }
)

contactSchema.post('save', handleMongooseError)

const addSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
    }),

    phone: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
    
    
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Contact = model('contact', contactSchema);


module.exports = {
  Contact,
  schemas,  
}
