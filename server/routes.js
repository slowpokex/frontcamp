import express, { Router } from 'express';
import restRouter from './models/restaurant/router'

const rootRouter = new Router();

// Root router
rootRouter.use(express.json());
rootRouter.use(express.urlencoded({ extended: true }));
rootRouter.use('/api/restaurant/', restRouter);

export default rootRouter;
