const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🔹 إنشاء التوكن JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// 🔹 تسجيل حساب جديد
exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    // تحقق إذا كان البريد موجود بالفعل
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const user = await User.create({ fullName, email, password, phone });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error signing up'
    });
  }
};

// 🔹 تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect email or password'
      });
    }

    // تحديث سجل الدخول
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip || req.connection.remoteAddress;

    user.lastLogin = Date.now();
    user.loginHistory.push({ date: Date.now(), ipAddress, userAgent });

    if (user.loginHistory.length > 10) user.loginHistory.shift();

    await user.save({ validateBeforeSave: false });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        userType: user.userType,
        preferences: user.preferences,
        wellnessScore: user.wellnessScore,
        mentalHealthSessions: user.mentalHealthSessions,
        physicalHealthProgress: user.physicalHealthProgress,
        signLanguageHours: user.signLanguageHours
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in. Please try again.'
    });
  }
};

// 🔹 جلب بيانات المستخدم (Protected Route)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -loginHistory');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        userType: user.userType,
        preferences: user.preferences,
        wellnessScore: user.wellnessScore,
        mentalHealthSessions: user.mentalHealthSessions,
        physicalHealthProgress: user.physicalHealthProgress,
        signLanguageHours: user.signLanguageHours,
        goals: user.goals,
        moodHistory: user.moodHistory
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile'
    });
  }
};

// 🔹 التحقق من صلاحية التوكن
exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password -loginHistory');

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Account is not active' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        userType: user.userType,
        preferences: user.preferences,
        wellnessScore: user.wellnessScore,
        mentalHealthSessions: user.mentalHealthSessions,
        physicalHealthProgress: user.physicalHealthProgress,
        signLanguageHours: user.signLanguageHours
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }

    res.status(500).json({ success: false, message: 'Error verifying token' });
  }
};

// 🔹 تسجيل الخروج (اختياري)
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
