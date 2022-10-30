import { router, baseProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const default_select = Prisma.validator<Prisma.livestockSelect>()({
    id: true,
    distribution: true,
    comments: true,
    characteristics: true,
    name: true,
    type_of_wool: true,
    Latitude: true,
    Longitude: true,
    temperature: true,
    ring_bell: true,
    created_at: true,
    motion_update_at: true,
    out_of_range: true
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
    byId: baseProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async ({ input }) => {
            const { id } = input;
            const post = await prisma.livestock.findUnique({
                where: { id },
                select: default_select,
            });
            if (!post) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `No post with id '${id}'`,
                });
            }
            return post;
        }),
    add: baseProcedure
        .input(
            z.object({
                id: z.string().uuid().optional(),
                distribution: z.string().min(1),
                comments: z.string().min(1),
                characteristics: z.string().min(1),
                name: z.string().min(1),
                type_of_wool: z.string().min(1),
                Latitude: z.number(),
                Longitude: z.number(),
                temperature: z.number(),
                ring_bell: z.boolean(),
                motion_update_at: z.date().optional(),
            }),
        )
        .mutation(async ({ input }) => {
            const { id } = input;
            if (id) {
                const livestock = await prisma.livestock.update({
                    where: { id },
                    data: input,
                    select: default_select,
                });
                return livestock;
            }

            const livestock = await prisma.livestock.create({
                data: input,
                select: default_select,
            });
            return livestock;
        }),
});
