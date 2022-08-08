import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

import { prisma } from "../../../db/client"

export const appRouter = trpc
  .router()
  .query("getAllQuestions", {
    async resolve() {
      return await prisma.pollQuestion.findMany()
    }
  })

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});