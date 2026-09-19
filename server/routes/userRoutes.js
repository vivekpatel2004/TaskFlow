const express = require("express");

const {
    getProfile,
    updateProfile,
    deleteProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All profile APIs require JWT
router.use(authMiddleware);

// GET profile
router.get("/profile", getProfile);

// UPDATE profile
router.put("/profile", updateProfile);

// DELETE account
router.delete("/profile", deleteProfile);

module.exports = router;