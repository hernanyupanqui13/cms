const express = require("express");
const router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contact");

//------------------------------
// READ
//------------------------------
router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find().populate("group");
    console.log(contacts);
    res.status(200).json({
      message: "Contacts fetched successfully!",
      contacts: contacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred!",
      error: error.message,
    });
  }
});

//------------------------------
// CREATE
//------------------------------
router.post("/", (req, res, next) => {
  const maxContactsId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactsId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });

  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: "Contact added successfully",
        createdContact: createdContact,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error.message,
      });
    });
});

//------------------------------
// UPDATE
//------------------------------
router.put("/:id", async (req, res, next) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true } // returns the new updated model
    );

    return res.status(204).json({
      message: "Contact updated successfully",
      updatedContact: updatedContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
});

//------------------------------
// DELETE
//------------------------------
router.delete("/:id", (req, res, next) => {
  Contact.findOneAndDelete({ id: req.params.id })
    .then((deletedContact) => {
      res.status(204).json({
        message: "Contact deleted successfully",
        deletedContact: deletedContact,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "An error occurred",
        error: error.message,
      });
    });
});

module.exports = router;
