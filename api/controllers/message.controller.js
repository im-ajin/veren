import Message from '../models/message.model.js';

export const sendmessage = async (req, res, next) => {
    try {
        const { userId, name, email, message } = req.body; 
        
        const newMessage = new Message({
            userId,
            name,
            email,
            message
        });

        const savedMessage = await newMessage.save();

        res.status(201).json(savedMessage); 
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};

export const getmessages = async (req, res, next) => {
    try{ 
        const data = await Message.find();
        res.status(200).json(data);
    }catch(error){
        res.status(400).json({"message": "error occured"});
        console.log(error.messages);
    }
}

export const deletemessage = async (req, res, next) => {
    const id = req.params.id;
    try {
        const message = await Message.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting message:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
};
