const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const notificationSchema = new Schema(
  {
    reason: {
      type: String,
      required: true,
      trim: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isViewed: {
        type: Boolean, 
        default: false
    }, 
    referencedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreated: {
        type: Date, 
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
  },
);

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
