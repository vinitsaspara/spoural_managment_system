import express from 'express';
import { 
    createCultural, 
    getCulturals, 
    getCultural, 
    updateCultural, 
    deleteCultural,
    registerForCultural,
    getRegistrations,
    updateRegistrationStatus,
    selectParticipants,
    getSelections
} from '../controllers/cultural.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { isAdmin, isFaculty, isStudentCoordinator } from '../middlewares/role.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getCulturals);
router.get('/:id', getCultural);

// Protected routes
router.use(isAuthenticated);

// Student routes
router.post('/:id/register', registerForCultural);

// Admin and Faculty routes
router.post('/', isAdmin, createCultural);
router.put('/:id', isAdmin, updateCultural);
router.delete('/:id', isAdmin, deleteCultural);

// Admin, Faculty, and Student Coordinator routes
router.get('/:id/registrations', [isAdmin, isFaculty, isStudentCoordinator], getRegistrations);
router.put('/:id/registrations/:registrationId', [isAdmin, isFaculty, isStudentCoordinator], updateRegistrationStatus);
router.post('/:id/selections', [isAdmin, isFaculty], selectParticipants);
router.get('/:id/selections', [isAdmin, isFaculty], getSelections);

export default router; 