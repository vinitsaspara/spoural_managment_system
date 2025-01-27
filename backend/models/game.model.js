import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  gameName: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration"
    }
  ],
}, { timestamps: true });

export const Game = mongoose.model("Game", GameSchema);
