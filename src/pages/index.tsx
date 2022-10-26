import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment } from 'react';
import { Container, Image, Dimmer, Loader, Segment, Message, Icon, Header } from 'semantic-ui-react';
import type { AppRouter } from '~/server/routers/_app';
import Table from '../components/Table';


const square = { width: 175, height: 175 }


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
            ring_bell: false,
        };
        try {
            await add_livestock.mutateAsync(input);
        } catch (cause) {
            console.error({ cause }, 'Failed to add post');
        }
    };


    if (status === 'loading')
        <div style={{ height: '100vh', paddingTop: '20rem' }} >
            <Loader active inline='centered' size='large'>Loading</Loader>
        </div>


    if (status === 'success') {
        return (
            <Container style={{ height: '100vh', paddingTop: '5rem' }} >
                <h1 style={{ textAlign: 'center', paddingBottom: '2rem' }}>Welcome to Live Stock Monitoring System</h1>
                <div>
                    <Segment circular style={square}>
                        <Header as='h2'>
                            Active
                            <Header.Subheader>1</Header.Subheader>
                        </Header>
                    </Segment>

                    <Segment circular inverted style={square}>
                        <Header as='h2' inverted>
                            Not Active
                            <Header.Subheader>{data?.items.length}</Header.Subheader>
                        </Header>
                    </Segment>
                </div>
                <Table data={data} />
                <hr />
                <button onClick={handle_add_livestock}>Add Livestock</button>
            </Container>
        );
    }


    return (
        <Container style={{ height: '100vh', paddingTop: '20rem' }} >
            <Message warning>
                <Icon name='warning' />
                Something Went wrong
            </Message>

        </Container>
    )

};

export default IndexPage;
