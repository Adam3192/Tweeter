import { Router } from 'express';
import { createUser, loginUser, getCurrentUser, getCurrentUser2, thisUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/oneUser', getCurrentUser)
router.get('/thisUser', getCurrentUser2)
router.get('/Batman', thisUser);

export default router;
