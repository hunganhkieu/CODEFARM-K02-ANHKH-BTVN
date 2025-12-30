import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: true }
);

const Todo = mongoose.model("Todos", todoSchema);

export default Todo;
