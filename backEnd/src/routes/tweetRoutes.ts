import { Router } from 'express';
import { addTweet, editTweet, deleteTweet, getAllTweets, getOneTweet, currentUserTweets, thisUser } from '../controllers/tweetController';

const router = Router();

router.get('/:name', currentUserTweets);
router.get('/user/:name', thisUser);
router.get('/', getAllTweets);
router.get('/tweet/:id', getOneTweet);
router.post('/', addTweet);
router.put('/:id', editTweet);
router.delete('/:id', deleteTweet);

export default router;
