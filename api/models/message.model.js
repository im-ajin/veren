import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    message: {
        type: String,
        required: true
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
