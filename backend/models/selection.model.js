import mongoose from "mongoose";

const SelectionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  selectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // StudentCoordinator
  forwardedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // FacultyCoordinator
  selectionStatus: {
    type: String,
    enum: ['Finalized', 'Pending'],
    default: 'Pending'
  },
  selectedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


export const Selection = mongoose.model("Selection", SelectionSchema);