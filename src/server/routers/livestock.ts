import { router, baseProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const default_select  = Prisma.validator<Prisma.LivestockSelect>()({
  id: true,
  description: true,
  ring_bell: true,
  created_at: true,
  updated_at: true,
});

export const livestock_router = router({
  list: baseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.livestock.findMany({
        select: default_select,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          created_at: 'desc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),


  add: baseProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        description: z.string().min(1),
        ring_bell: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const livestock = await prisma.livestock.create({
        data: input,
        select: default_select,
      });
      return livestock;
    }),
})
