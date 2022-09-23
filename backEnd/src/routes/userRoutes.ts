import { Router } from 'express';
import { createUser, loginUser, getCurrentUser, getCurrentUser2, thisUser, searchUsers } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/oneUser', getCurrentUser)
router.get('/thisUser', getCurrentUser2)
router.get('/Batman', thisUser);
router.get('/searchUsers', searchUsers);

export default router;
