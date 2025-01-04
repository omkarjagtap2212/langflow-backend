import express from 'express';
import { runFlow } from '../controllers/langflowController.js';

const router = express.Router();

router.post('/runFlow', runFlow);

export default router;
