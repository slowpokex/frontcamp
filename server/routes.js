import express, { Router } from 'express';

const rootRouter = new Router();
const apiRoutes = new Router();

//Api router
apiRoutes.use(express.json());
apiRoutes.use(express.urlencoded({ extended: true }));

rootRouter.use('/api/', apiRoutes);

export default rootRouter;
