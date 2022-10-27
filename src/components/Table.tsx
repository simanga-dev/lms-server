import { inferProcedureInput } from '@trpc/server';
import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import { AppRouter } from '~/server/routers/_app';
import { trpc } from '~/utils/trpc';


type PropsType = {
    data: {
        items: {
            id: string;
            ring_bell: boolean;
            distribution: string;
            comments: string;
            characteristics: string;
            name: string;
            type_of_wool: string;
            Latitude: number;
            Longitude: number;
            temperature: number;
            created_at: Date;
            motion_update_at: Date;
            out_of_range: boolean;
        }[];
        nextCursor: string | undefined;
    } | undefined
}

const LivestockTable = ({ data }: PropsType) => {

    return (
        <>
            <h3> All Livestock in the Database </h3>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine> unique identifier</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Name</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Active</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Motion Update At</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Cordinate</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Ring a Bell</Table.HeaderCell>
                        <Table.HeaderCell singleLine>View</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data?.items.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>yes / no </Table.Cell>
                            <Table.Cell>{item.motion_update_at.toUTCString()}</Table.Cell>
                            <Table.Cell>{item.Latitude}N {item.Longitude}L</Table.Cell>
                            <Table.Cell><a href="www.x.com">View Livestock </a></Table.Cell>
                        </Table.Row>)
                    )}
                </Table.Body>
            </Table>
        </>
    );
};

export default LivestockTable;
