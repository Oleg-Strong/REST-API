const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find();
  res.json({
    contacts,
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    contact,
  });
};

const add = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    newContact,
  });
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const remoteContact = await Contact.findByIdAndRemove(contactId);
  if (!remoteContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
    remoteContact,
  });
};

const putById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    updatedContact,
  });
};

const putchById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  console.log(updatedContact);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    updatedContact,
  });
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  deleteById: controllerWrapper(deleteById),
  putById: controllerWrapper(putById),
  putchById: controllerWrapper(putchById),
};
