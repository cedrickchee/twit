import express from 'express';
const router = express.Router();

// Endpoint for system health check
router.get('/test/', (req, res) => {
  res.status(200).send({ message: 'Request received' });
});

export default router;
