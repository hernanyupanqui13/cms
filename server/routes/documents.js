var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Document = require("../models/document");

//------------------------------
// READ
//------------------------------
router.get("/", async (req, res, next) => {
  try {
    const documents = await Document.find();
    res.status(200).json({
      message: "Documents fetched successfully!",
      documents: documents,
    });
  } catch (error) {
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
  const maxDocumentId = sequenceGenerator.nextId("documents");

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  document
    .save()
    .then((createdDocument) => {
      res.status(201).json({
        message: "Document added successfully",
        document: createdDocument,
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
    const updatedDocument = await Document.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    return res.status(204).json({
      message: "Document updated successfully",
      document: updatedDocument,
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
  Document.findOneAndDelete({ id: req.params.id })
    .then((document) => {
      console.log(document);
      res.status(204).json({
        message: "Document deleted successfully",
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
