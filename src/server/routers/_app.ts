import { router } from '../trpc';
import { healthRouter } from './health';
import { livestock_router } from './livestock';

export const appRouter = router({
  health: healthRouter,
  livestock: livestock_router,
});

export type AppRouter = typeof appRouter;
