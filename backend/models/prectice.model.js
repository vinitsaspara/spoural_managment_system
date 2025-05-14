import mongoose from 'mongoose';

const practiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    practiceDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    venue:  {
      type: String,
      required: true,
      enum: ['Charusat Main Ground', 'ARIP Ground', 'Sport Complex', 'Central Loan']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

const Practice = mongoose.model('Practice', practiceSchema);

export default Practice;