import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { useState, useEffect } from 'react';
import {
    Container,
    Loader,
    Segment,
    Message,
    Icon,
    Header,
} from 'semantic-ui-react';
import Table from '../components/Table';

const square = { width: 175, height: 175 };

const IndexPage: NextPageWithLayout = () => {
    const [active, setActive] = useState(0);

    const { data, status } = trpc.livestock.list.useQuery({ limit: 50 });


    useEffect(() => {
        setActive(0)
        data?.items.forEach((item) => {
            const msInMinute = 60 * 1000;

            const today = new Date();

            const time_diff = Math.round(
                Math.abs(today.getTime() - item.motion_update_at.getTime()) /
                msInMinute,
            );

            if (time_diff < 5)
                setActive((prev) => prev + 1);
        });
    }, [data]);

    if (status === 'success') {
        return (
            <Container style={{ height: '100vh', paddingTop: '5rem' }}>
                <h1 style={{ textAlign: 'center', paddingBottom: '2rem' }}>
                    Welcome to Live Stock Monitoring System
                </h1>
                <div>
                    <Segment circular style={square}>
                        <Header as="h2">
                            Active
                            <Header.Subheader>{active}</Header.Subheader>
                        </Header>
                    </Segment>

                    <Segment circular inverted style={square}>
                        <Header as="h2" inverted>
                            Not Active
                            <Header.Subheader>{data?.items.length - active}</Header.Subheader>
                        </Header>
                    </Segment>
                </div>
                <Table data={data} />
            </Container>
        );
    }

    if (status === 'error') {
        return (
            <Container style={{ height: '100vh', paddingTop: '20rem' }}>
                <Message warning>
                    <Icon name="warning" />
                    Something Went wrong
                </Message>
            </Container>
        );
    }

    return (
        <div style={{ height: '100vh', paddingTop: '20rem' }}>
            <Loader active inline="centered" size="large">
                Loading
            </Loader>
        </div>);

};

export default IndexPage;
