import ChatMessage from "../models/ChatMessage.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({
      chatRoomId: req.params.chatRoomId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const createMessage = async (req, res) => {
  const newMessage = new ChatMessage({
    chatRoomId: req.body.chatRoomId,
    sender: req.body.sender,
    message: req.body.message,
    isRead: false, // Set to false initially
  });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

// Mark messages as read
export const markMessagesAsRead = async (req, res) => {
  try {
    await ChatMessage.updateMany(
      { chatRoomId: req.params.chatRoomId},
      { $set: { isRead: true } }
    );
    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

