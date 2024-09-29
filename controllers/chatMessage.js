import ChatMessage from "../models/ChatMessage.js";

export const createMessage = async (req, res) => {
  const newMessage = new ChatMessage({
    chatRoomId: req.body.chatRoomId,
    sender: req.body.sender,
    message: req.body.message,
    isRead: false, 
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

export const markMessagesAsRead = async (req, res) => {
  const { chatRoomId } = req.params;

  try {
    const updatedMessages = await ChatMessage.updateMany(
      { chatRoomId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({
      message: `${updatedMessages.nModified} messages marked as read.`,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
