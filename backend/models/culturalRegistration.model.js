const mongoose = require('mongoose');

const culturalRegistrationSchema = new mongoose.Schema({
    cultural: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cultural',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    remarks: {
        type: String,
        default: ''
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Ensure a student can only register once for a cultural event
culturalRegistrationSchema.index({ cultural: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('CulturalRegistration', culturalRegistrationSchema); 