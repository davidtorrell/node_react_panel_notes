const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
}

notesCtrl.createNote = async (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new Note({title, content, date, author});
    await newNote.save();
    // console.log(newNote);
    res.json({ message: 'Note: saved!' })
}

notesCtrl.updateNote = async (req, res) => {
    const { title, content, author} = req.body;
    await Note.findOneAndUpdate({ _id: req.params.id}, {title, content, author});
    // console.log(req.params.id, req.body);
    res.json({ message: 'Note: updated' });
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note: deleted' });
};

notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    // console.log(note);
    res.json(note);
};

module.exports = notesCtrl;