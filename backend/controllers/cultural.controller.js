const Cultural = require('../models/cultural.model');
const CulturalRegistration = require('../models/culturalRegistration.model');
const CulturalSelection = require('../models/culturalSelection.model');
const User = require('../models/user.model');
const { validateObjectId } = require('../utils/validation');

// Create a new cultural event
exports.createCultural = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            maxParticipants,
            registrationDeadline,
            eventDate,
            venue,
            requirements,
            coordinator
        } = req.body;

        if (!validateObjectId(coordinator)) {
            return res.status(400).json({ message: 'Invalid coordinator ID' });
        }

        const coordinatorUser = await User.findById(coordinator);
        if (!coordinatorUser || coordinatorUser.role !== 'studentCoordinator') {
            return res.status(400).json({ message: 'Invalid coordinator' });
        }

        const cultural = new Cultural({
            name,
            description,
            category,
            maxParticipants,
            registrationDeadline,
            eventDate,
            venue,
            requirements,
            coordinator,
            createdBy: req.user._id
        });

        await cultural.save();
        res.status(201).json(cultural);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all cultural events with filters
exports.getCulturals = async (req, res) => {
    try {
        const { category, status, search } = req.query;
        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const culturals = await Cultural.find(query)
            .populate('coordinator', 'name email')
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.json(culturals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific cultural event
exports.getCultural = async (req, res) => {
    try {
        const cultural = await Cultural.findById(req.params.id)
            .populate('coordinator', 'name email')
            .populate('createdBy', 'name email');

        if (!cultural) {
            return res.status(404).json({ message: 'Cultural event not found' });
        }

        res.json(cultural);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a cultural event
exports.updateCultural = async (req, res) => {
    try {
        const cultural = await Cultural.findById(req.params.id);

        if (!cultural) {
            return res.status(404).json({ message: 'Cultural event not found' });
        }

        if (cultural.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this event' });
        }

        Object.assign(cultural, req.body);
        await cultural.save();

        res.json(cultural);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a cultural event
exports.deleteCultural = async (req, res) => {
    try {
        const cultural = await Cultural.findById(req.params.id);

        if (!cultural) {
            return res.status(404).json({ message: 'Cultural event not found' });
        }

        if (cultural.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await cultural.remove();
        res.json({ message: 'Cultural event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Register for a cultural event
exports.registerForCultural = async (req, res) => {
    try {
        const cultural = await Cultural.findById(req.params.id);

        if (!cultural) {
            return res.status(404).json({ message: 'Cultural event not found' });
        }

        if (cultural.status !== 'active') {
            return res.status(400).json({ message: 'Registration is not open for this event' });
        }

        if (new Date(cultural.registrationDeadline) < new Date()) {
            return res.status(400).json({ message: 'Registration deadline has passed' });
        }

        const existingRegistration = await CulturalRegistration.findOne({
            cultural: cultural._id,
            student: req.user._id
        });

        if (existingRegistration) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        const registration = new CulturalRegistration({
            cultural: cultural._id,
            student: req.user._id
        });

        await registration.save();
        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get registrations for a cultural event
exports.getRegistrations = async (req, res) => {
    try {
        const registrations = await CulturalRegistration.find({ cultural: req.params.id })
            .populate('student', 'name email')
            .populate('approvedBy', 'name email');

        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve/reject registration
exports.updateRegistrationStatus = async (req, res) => {
    try {
        const { status, remarks } = req.body;
        const registration = await CulturalRegistration.findById(req.params.registrationId);

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        registration.status = status;
        registration.remarks = remarks;
        registration.approvedBy = req.user._id;

        await registration.save();
        res.json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Select participants for cultural event
exports.selectParticipants = async (req, res) => {
    try {
        const { selections } = req.body;
        const cultural = await Cultural.findById(req.params.id);

        if (!cultural) {
            return res.status(404).json({ message: 'Cultural event not found' });
        }

        const results = await Promise.all(
            selections.map(async (selection) => {
                const culturalSelection = new CulturalSelection({
                    cultural: cultural._id,
                    student: selection.studentId,
                    status: selection.status,
                    performance: selection.performance,
                    remarks: selection.remarks,
                    selectedBy: req.user._id
                });

                await culturalSelection.save();
                return culturalSelection;
            })
        );

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get selections for a cultural event
exports.getSelections = async (req, res) => {
    try {
        const selections = await CulturalSelection.find({ cultural: req.params.id })
            .populate('student', 'name email')
            .populate('selectedBy', 'name email');

        res.json(selections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 