const { Schema, model } = require("mongoose")

const todoSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  guide_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Guide'
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Todos = model('Todos', todoSchema);

module.exports = Todos;
