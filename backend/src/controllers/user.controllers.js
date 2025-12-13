
// config
const imagekit = require('../config/Imagekit');

// models
const UserModel = require('../models/user.model'); // (if you plan to save URL)

// utils
const { comparePassword, HashPassword } = require('../utils/bcrypt');

function ProfileHandler(req, res) {
    res.status(200).json({ user: req.user });
}
async function ProfileEditHandler(req, res) {
    try {
        const { username } = req.body;
        const profilePic = req.file;

        if (!profilePic) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        //  filename
        const fileName = `${Date.now()}-${profilePic.originalname}`;

        //  upload to ImageKit
        const { url, fileId } = await imagekit.upload({
            fileName,
            file: profilePic.buffer.toString('base64'),
            folder: '/profilePics',
        });
        const user = await UserModel.findOne({ _id: req.params.id }).lean()
        await imagekit.deleteFile(user?.fileId)
        // updating user info in DB
        await UserModel.findByIdAndUpdate(req.params.id, {
            username,
            profilePic: url,
            fileId
        });
        res.status(200).json({
            message: "Profile updated successfully",
            username,
            profilePic: url
        });

    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}
async function ProfileSecurityHandler(req, res) {
    console.log(req.body)
    const { oldPassword, newPassword } = req.body
    const user = await UserModel.findOne({ _id: req.params.id })
    const result = await comparePassword(oldPassword, user.password)
    if (!result) res.status(400).json({ message: "Wrong Password" })
    const hashedPassword = await HashPassword(newPassword)
    user.password = hashedPassword
    await user.save()
    res.status(200).json({ message: "user Credentials Updated Succesfully" })
}

async function ContactUsHandler(req, res) {
    try {
        const { title, description, phone } = req.body;
        if (!title || !description || !phone)
            return res.status(400).json({ message: 'All fields are required' });

        // You could save to DB or send an email here
        console.log('📩 New Contact Message:', { title, description, phone });

        res.status(200).json({ message: 'Your query has been submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
}

module.exports = {
    ProfileHandler,
    ProfileEditHandler,
    ProfileSecurityHandler,
    ContactUsHandler
}