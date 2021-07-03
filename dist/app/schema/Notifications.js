"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const NotificationSchema = new _mongoose2.default.Schema({
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

  exports. default = _mongoose2.default.model('Notifications', NotificationSchema)