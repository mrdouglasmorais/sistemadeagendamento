import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestarmps: true,
  })

  export default mongoose.model('Notifications', NotificationSchema)