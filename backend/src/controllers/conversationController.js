const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

// Start a conversation, or return the existing one for this guest+host pair
exports.startConversation = async (req, res) => {
  try {
    const { hostId, propertyId, text } = req.body;

    if (!hostId || !text) {
      return res.status(400).json({ message: 'hostId and text are required' });
    }

    const host = await User.findById(hostId);
    if (!host || host.role !== 'host') {
      return res.status(404).json({ message: 'Host not found' });
    }

    if (req.user.role !== 'guest') {
      return res.status(403).json({ message: 'Only guests can start a conversation with a host' });
    }

    let conversation = await Conversation.findOne({ guest: req.user._id, host: hostId });
    if (!conversation) {
      conversation = await Conversation.create({ guest: req.user._id, host: hostId });
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: req.user._id,
      text,
      property: propertyId || undefined,
    });

    conversation.lastMessage = text;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    res.status(201).json({ conversation, message });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// List all conversations for the logged-in user (guest or host)
exports.getConversations = async (req, res) => {
  try {
    const filter = req.user.role === 'host' ? { host: req.user._id } : { guest: req.user._id };

    const conversations = await Conversation.find(filter)
      .populate('guest', 'name email')
      .populate('host', 'name email')
      .sort({ lastMessageAt: -1 });

    res.json({ conversations });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Load message history for one conversation
exports.getMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) return res.status(404).json({ message: 'Conversation not found' });

    const isParticipant =
      conversation.guest.toString() === req.user._id.toString() ||
      conversation.host.toString() === req.user._id.toString();

    if (!isParticipant) {
      return res.status(403).json({ message: 'Not part of this conversation' });
    }

    const messages = await Message.find({ conversation: req.params.id })
      .populate('property', 'name image')
      .sort({ createdAt: 1 });

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};