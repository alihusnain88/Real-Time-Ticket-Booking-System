import express from 'express';
import { signupUser, loginUser, logoutUser} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, (req, res) => {
    return res.status(200).json({
        user: req.user
    })
});
router.post("/logout", logoutUser);

export default router; 