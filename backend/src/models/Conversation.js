const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  guest: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastMessage: { type: String },
  lastMessageAt: { type: Date },
}, { timestamps: true });

conversationSchema.index({ guest: 1, host: 1 }, { unique: true });

module.exports = mongoose.model('Conversation', conversationSchema);