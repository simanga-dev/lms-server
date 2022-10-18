import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import type { AppRouter } from '~/server/routers/_app';
import Table from '../components/Table';

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();

  const { data, status } = trpc.livestock.list.useQuery({});

  const add_livestock = trpc.livestock.add.useMutation({
    async onSuccess() {
      await utils.livestock.list.invalidate();
    },
  });

  const handle_add_livestock = async () => {
    type Input = inferProcedureInput<AppRouter['livestock']['add']>;
    const input: Input = {
      description: 'Wow, I am a animal that got added',
      geo_coordinate: 'This is my live location',
      ring_bell: true,
    };
    try {
      await add_livestock.mutateAsync(input);
    } catch (cause) {
      console.error({ cause }, 'Failed to add post');
    }
  };

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   const allPosts = postsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allPosts) {
  //     void utils.post.byId.prefetch({ id });
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <Container>
      <h1>Welcome to Live Stock Monitoring System</h1>
      <p> Total Active livestock:</p>
      <h2>{data?.items.length}</h2>

      <h2>
        All Livestock in the Database
        {status === 'loading' && '(loading)'}
      </h2>

      <Table />

      <button onClick={handle_add_livestock}>Add Livestock</button>

      <hr />
    </Container>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
