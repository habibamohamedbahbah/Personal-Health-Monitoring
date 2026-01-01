const Service = require('../models/Service');
const User = require('../models/User');

// الحصول على جميع الخدمات
exports.getAllServices = async (req, res) => {
    try {
        const { category, availability } = req.query;
        const filter = { isActive: true };

        if (category) filter.category = category;
        if (availability) filter.availability = availability;

        const services = await Service.find(filter)
            .populate('therapistId', 'fullName profileImage')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: services.length,
            services
        });

    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching services'
        });
    }
};

// الحصول على خدمة محددة
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
            .populate('therapistId', 'fullName profileImage phone email')
            .populate('reviews.userId', 'fullName profileImage');

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.json({
            success: true,
            service
        });

    } catch (error) {
        console.error('Get service error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching service'
        });
    }
};

// إنشاء خدمة جديدة (للمعالجين والأدمن)
exports.createService = async (req, res) => {
    try {
        const { name, description, category, price, duration, features, requirements } = req.body;

        // التحقق من أن المستخدم معالج أو أدمن
        const user = await User.findById(req.userId);
        if (!['therapist', 'admin'].includes(user.userType)) {
            return res.status(403).json({
                success: false,
                message: 'Only therapists and admins can create services'
            });
        }

        const service = await Service.create({
            name,
            description,
            category,
            price,
            duration,
            therapistId: req.userId,
            features: features || [],
            requirements: requirements || []
        });

        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            service
        });

    } catch (error) {
        console.error('Create service error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating service'
        });
    }
};

// تحديث خدمة
exports.updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // التحقق من الصلاحيات
        const user = await User.findById(req.userId);
        if (user.userType !== 'admin' && service.therapistId.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this service'
            });
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Service updated successfully',
            service: updatedService
        });

    } catch (error) {
        console.error('Update service error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating service'
        });
    }
};

// حذف خدمة
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // التحقق من الصلاحيات
        const user = await User.findById(req.userId);
        if (user.userType !== 'admin' && service.therapistId.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this service'
            });
        }

        // Soft delete (تغيير الحالة فقط)
        service.isActive = false;
        await service.save();

        res.json({
            success: true,
            message: 'Service deleted successfully'
        });

    } catch (error) {
        console.error('Delete service error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting service'
        });
    }
};

// إضافة مراجعة للخدمة
exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // التحقق إذا كان المستخدم قد أضاف مراجعة مسبقاً
        const existingReview = service.reviews.find(
            review => review.userId.toString() === req.userId
        );

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this service'
            });
        }

        await service.addReview(req.userId, rating, comment);

        res.json({
            success: true,
            message: 'Review added successfully',
            reviews: service.reviews,
            rating: service.rating
        });

    } catch (error) {
        console.error('Add review error:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding review'
        });
    }
};

// الحجز المبدئي للخدمة
exports.bookService = async (req, res) => {
    try {
        const { serviceId, date, time, notes } = req.body;
        
        const service = await Service.findById(serviceId);
        
        if (!service || !service.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Service not available'
            });
        }

        // هنا يمكن إضافة منطق الحجز
        // مثلاً: إنشاء سجل حجز في قاعدة بيانات منفصلة
        // إرسال إشعارات للمستخدم والمعالج
        // إرسال بريد إلكتروني للتأكيد

        res.json({
            success: true,
            message: 'Service booking request sent successfully',
            bookingDetails: {
                service: service.name,
                date,
                time,
                therapistId: service.therapistId,
                notes
            }
        });

    } catch (error) {
        console.error('Book service error:', error);
        res.status(500).json({
            success: false,
            message: 'Error booking service'
        });
    }
};