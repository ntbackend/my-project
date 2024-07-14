const { Schema, model } = require("mongoose")

const guideSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  notify: {
    type: Boolean,
    default: false
  }
});

const Guide = model('Guide', guideSchema);

module.exports = Guide;
