import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // Extract receiverId from request params
    const senderId = req.user._id; // Extract senderId from authenticated user

    // Find an existing conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create and save the new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    await newMessage.save(); // Save the message to the database

    // Add the message to the conversation's messages array and save it
    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(),newMessage.save()])

    // Respond with the created message
    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage controller", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages= async(req,res)=>{
    try{
        const{id:userToChatId}=req.params;
        const senderId= req.user._id;

        const conversation= await Conversation.findOne({
            participants: { $all : [senderId,userToChatId]},
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);
        const messages=conversation.messages;
        res.status(200).json(messages)
    }
    catch (err) {
        console.log("Error in sendMessage controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
}
