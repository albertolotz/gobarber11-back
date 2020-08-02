import { Router } from 'express';

const xxxxRouter = Router();

xxxxRouter.post('/', async (request, response) => {
  try {
    return response.send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default xxxxRouter;
