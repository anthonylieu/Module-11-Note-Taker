const { json } = require('express/lib/response');
const fs = require('fs');
const util = require('util');

const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

router.get('/notes', (req, res) => {
  readFileAsync('./db/db.json', 'utf-8')
    .then((data) => {
      res.json(JSON.parse(data));
    })
    .catch((err) => {
      throw err;
    });
});

router.post('/notes', (req, res) => {
  const noteBody = req.body;
  noteBody.id = uuidv4();

  readFileAsync('./db/db.json', 'utf-8')
    .then((data) => {
      const oldNotes = JSON.parse(data);
      oldNotes.push(noteBody);

      writeFileAsync('db/db.json', JSON.stringify(oldNotes));
    })
    .catch((err) => {
      throw err;
    });
  res.json(noteBody);
});

router.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  readFileAsync('./db/db.json', 'utf-8')
    .then((data) => {
      const oldNotes = JSON.parse(data);
      for (let i = 0; i < oldNotes.length; i++) {
        let noteId = oldNotes[i].id;
        if (noteId === id) {
          oldNotes.splice(i, 1);
        }
      }

      writeFileAsync('db/db.json', JSON.stringify(oldNotes));
      res.json(oldNotes);
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
