import { router } from '../trpc';
import { healthRouter } from './health';
import { livestock_router } from './livestock';
import { postRouter } from './post';

export const appRouter = router({
  post: postRouter,
  health: healthRouter,
  livestock: livestock_router,
});

export type AppRouter = typeof appRouter;
