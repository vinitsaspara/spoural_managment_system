const mongoose = require('mongoose');

const culturalSelectionSchema = new mongoose.Schema({
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
        enum: ['selected', 'not_selected'],
        required: true
    },
    performance: {
        type: String,
        enum: ['excellent', 'good', 'average', 'poor'],
        required: true
    },
    remarks: {
        type: String,
        default: ''
    },
    selectedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Ensure a student can only be selected once for a cultural event
culturalSelectionSchema.index({ cultural: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('CulturalSelection', culturalSelectionSchema); 