let mongoose = require('mongoose');

let documentSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   description: { type: String },
   url: { type: String },
   children:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
});

module.exports = mongoose.model('Document', documentSchema);