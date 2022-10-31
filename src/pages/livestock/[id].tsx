import NextError from 'next/error';
import { useRouter } from 'next/router';
import { Container } from 'semantic-ui-react';
import { NextPageWithLayout } from '~/pages/_app';
import { trpc } from '~/utils/trpc';

const LivestockPreviePage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const postQuery = trpc.livestock.byId.useQuery({ id });

  if (postQuery.error) {
    return (
      <NextError
        title={postQuery.error.message}
        statusCode={postQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (postQuery.status !== 'success') {
    return <>Loading...</>;
  }
  const { data } = postQuery;
  return (
    <Container style={{ height: '100vh', paddingTop: '5rem' }}>
      <h1>{data.name}</h1>
      <em>Created {data.created_at.toLocaleDateString('en-us')}</em>

      <p>{data.distribution}</p>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Container>
  );
};

export default LivestockPreviePage;
