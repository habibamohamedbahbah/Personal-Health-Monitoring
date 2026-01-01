const User = require('../models/User');
const fs = require('fs').promises;
const path = require('path');

// =======================================
// Helper: Get user from req
const getUser = async (req) => {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error('User not found');
    return user;
};

// =======================================
// Get profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -loginHistory');
        if (!user) throw new Error('User not found');

        res.json({ success: true, user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(404).json({ success: false, message: error.message || 'Error fetching profile' });
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const { fullName, phone } = req.body;
        const updates = {};
        if (fullName) updates.fullName = fullName;
        if (phone) updates.phone = phone;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) throw new Error('User not found');

        res.json({ success: true, message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(404).json({ success: false, message: error.message || 'Error updating profile' });
    }
};

// Update profile image
exports.updateProfileImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No image provided' });

        const user = await getUser(req);

        // Delete old image if exists and not default
        if (user.profileImage && user.profileImage !== 'default-avatar.jpg') {
            const oldImagePath = path.join(__dirname, '..', 'uploads', 'profile-images', user.profileImage);
            try { await fs.unlink(oldImagePath); } catch (err) {}
        }

        user.profileImage = req.file.filename;
        await user.save();

        res.json({ success: true, message: 'Profile image updated', profileImage: user.profileImage });
    } catch (error) {
        console.error('Update profile image error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error updating profile image' });
    }
};

// Delete profile image
exports.deleteProfileImage = async (req, res) => {
    try {
        const user = await getUser(req);

        if (user.profileImage && user.profileImage !== 'default-avatar.jpg') {
            const imagePath = path.join(__dirname, '..', 'uploads', 'profile-images', user.profileImage);
            try { await fs.unlink(imagePath); } catch (err) {}
        }

        user.profileImage = 'default-avatar.jpg';
        await user.save();

        res.json({ success: true, message: 'Profile image deleted', profileImage: user.profileImage });
    } catch (error) {
        console.error('Delete profile image error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error deleting profile image' });
    }
};

// Update mental health sessions
exports.updateMentalHealthSessions = async (req, res) => {
    try {
        const { sessions } = req.body;
        const user = await getUser(req);

        user.mentalHealthSessions = sessions ?? (user.mentalHealthSessions + 1);
        user.updateWellnessScore();
        await user.save();

        res.json({ success: true, message: 'Mental health sessions updated', mentalHealthSessions: user.mentalHealthSessions, wellnessScore: user.wellnessScore });
    } catch (error) {
        console.error('Update mental health error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error updating mental health sessions' });
    }
};

// Update physical health progress
exports.updatePhysicalHealthProgress = async (req, res) => {
    try {
        const { progress } = req.body;
        if (progress < 0 || progress > 100) return res.status(400).json({ success: false, message: 'Progress must be between 0 and 100' });

        const user = await getUser(req);
        user.physicalHealthProgress = progress;
        user.updateWellnessScore();
        await user.save();

        res.json({ success: true, message: 'Physical health progress updated', physicalHealthProgress: user.physicalHealthProgress, wellnessScore: user.wellnessScore });
    } catch (error) {
        console.error('Update physical health error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error updating physical health progress' });
    }
};

// Update sign language hours
exports.updateSignLanguageHours = async (req, res) => {
    try {
        const { hours } = req.body;
        const user = await getUser(req);

        user.signLanguageHours = hours ?? (user.signLanguageHours + 1);
        user.updateWellnessScore();
        await user.save();

        res.json({ success: true, message: 'Sign language hours updated', signLanguageHours: user.signLanguageHours, wellnessScore: user.wellnessScore });
    } catch (error) {
        console.error('Update sign language error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error updating sign language hours' });
    }
};

// Goals
exports.addGoal = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ success: false, message: 'Goal text is required' });

        const user = await getUser(req);
        user.goals.push({ text, completed: false, createdAt: new Date() });
        await user.save();

        res.json({ success: true, message: 'Goal added', goals: user.goals });
    } catch (error) {
        console.error('Add goal error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error adding goal' });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const { completed } = req.body;

        const user = await getUser(req);
        const goal = user.goals.id(goalId);
        if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });

        goal.completed = completed;
        await user.save();

        res.json({ success: true, message: 'Goal updated', goal });
    } catch (error) {
        console.error('Update goal error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error updating goal' });
    }
};

// Mood
exports.recordMood = async (req, res) => {
    try {
        const { mood, notes } = req.body;
        if (!mood) return res.status(400).json({ success: false, message: 'Mood is required' });

        const user = await getUser(req);
        user.moodHistory.push({ mood, notes, date: new Date() });
        if (user.moodHistory.length > 30) user.moodHistory = user.moodHistory.slice(-30);

        await user.save();
        res.json({ success: true, message: 'Mood recorded', moodHistory: user.moodHistory });
    } catch (error) {
        console.error('Record mood error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error recording mood' });
    }
};

exports.getMoodHistory = async (req, res) => {
    try {
        const { days = 7 } = req.query;
        const user = await getUser(req);

        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const recentMoods = user.moodHistory.filter(m => m.date >= cutoffDate);

        res.json({ success: true, moodHistory: recentMoods });
    } catch (error) {
        console.error('Get mood history error:', error);
        res.status(500).json({ success: false, message: error.message || 'Error fetching mood history' });
    }
};
