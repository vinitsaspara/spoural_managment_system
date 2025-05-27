import mongoose from "mongoose";

const culturalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Dance', 'Music', 'Drama', 'Art', 'Literature', 'Other']
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    registrationDeadline: {
        type: Date,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    coordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export const Cultural = mongoose.model('Cultural', culturalSchema); 