import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true
  },
  gameCatagory: {
    type: String,
    required: true,
    enum: ['Outdoor Sports', 'Indoor Games', 'E-Sports', 'Fun & Casual Games']
  },
  gameName: { type: String, required: true, unique: true },
  description: { type: String },
  skills: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
    enum: ['Charusat Main Ground', 'ARIP Ground', 'Sport Complex', 'Central Loan']
  },
  createdAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration"
    }
  ],
}, { timestamps: true });

export const Game = mongoose.model("Game", GameSchema);
