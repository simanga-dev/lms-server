import React from 'react'
import { Icon, Label, Menu, Table, Header, Rating, Button } from 'semantic-ui-react'
import { trpc } from '~/utils/trpc';



const TableExamplePagination = () => {
    const { data } = trpc.livestock.list.useQuery({});

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine> unique identifier</Table.HeaderCell>
                    <Table.HeaderCell>Last Location</Table.HeaderCell>
                    <Table.HeaderCell>Last Update</Table.HeaderCell>
                    <Table.HeaderCell>Ring Bell</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    data?.items.map(({ id, updated_at, description }) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{id}</Table.Cell>
                                <Table.Cell>15:26:46.302N, 65:56:55.903W</Table.Cell>
                                <Table.Cell>{updated_at.toISOString()}</Table.Cell>
                                <Table.Cell width={2} > <Button>Ring Bell</Button></Table.Cell>
                                <Table.Cell>{description}</Table.Cell>
                            </Table.Row>

                        )
                    })

                }
            </Table.Body>
        </Table>
    )
}

export default TableExamplePagination

