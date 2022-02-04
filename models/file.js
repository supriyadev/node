const mongoose = require("mongoose");
const Joi = require("joi");

const fileSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5,
  },
  image: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5,
  },

});

const File = mongoose.model("File", fileSchema);

function validateFile(file) {
  const schema = Joi.object({
    tokenId: Joi.number().required(),
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(5).max(255).required(),
    image: Joi.string().min(5).max(255).required(),
  });
  return (validate = schema.validate(file));
}

exports.File = File;
exports.validate = validateFile;
