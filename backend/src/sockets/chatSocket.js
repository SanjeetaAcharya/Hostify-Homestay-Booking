const jwt = require('jsonwebtoken');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

function initChatSocket(io) {
  // Authenticate every socket connection using the same JWT from cookies/auth
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('No token provided'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.userId);

    socket.on('joinConversation', async (conversationId) => {
      try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) return;

        const isParticipant =
          conversation.guest.toString() === socket.userId ||
          conversation.host.toString() === socket.userId;

        if (!isParticipant) return; // silently ignore unauthorized join attempts

        socket.join(conversationId);
      } catch (err) {
        console.error('joinConversation error:', err.message);
      }
    });

    socket.on('sendMessage', async ({ conversationId, text, propertyId }) => {
      try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) return;

        const isParticipant =
          conversation.guest.toString() === socket.userId ||
          conversation.host.toString() === socket.userId;

        if (!isParticipant) return;

        const message = await Message.create({
          conversation: conversationId,
          sender: socket.userId,
          text,
          property: propertyId || undefined,
        });

        conversation.lastMessage = text;
        conversation.lastMessageAt = new Date();
        await conversation.save();

        const populated = await message.populate('property', 'name image');

        io.to(conversationId).emit('newMessage', populated);
      } catch (err) {
        console.error('sendMessage error:', err.message);
      }
    });

    socket.on('typing', (conversationId) => {
      socket.to(conversationId).emit('userTyping', socket.userId);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.userId);
    });
  });
}

module.exports = initChatSocket;