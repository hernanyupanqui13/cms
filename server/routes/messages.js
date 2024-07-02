const express = require("express");
const router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");

//------------------------------
// READ
//------------------------------
router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.find();
    console.log(messages);
    res.status(200).json({
      message: "Messages fetched successfully!",
      messages: messages,
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
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  message
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        message: "Message added successfully",
        createdMessage: createdMessage,
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
    const updatedMessage = await Message.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true } // returns the new updated model
    );

    return res.status(204).json({
      message: "Message updated successfully",
      updatedMessage: updatedMessage,
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
  Message.findOneAndDelete({ id: req.params.id })
    .then((deletedMessage) => {
      res.status(204).json({
        message: "Message deleted successfully",
        deletedMessage: deletedMessage,
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
