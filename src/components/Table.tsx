import { inferProcedureInput } from '@trpc/server';
import React from 'react';
import {
  Icon,
  Label,
  Menu,
  Table,
  Header,
  Rating,
  Button,
} from 'semantic-ui-react';
import { AppRouter } from '~/server/routers/_app';
import { trpc } from '~/utils/trpc';

const TableExamplePagination = () => {
  const { data } = trpc.livestock.list.useQuery({});
  const utils = trpc.useContext();

  type Input = inferProcedureInput<AppRouter['livestock']['add']>;

  const add_livestock = trpc.livestock.add.useMutation({
    async onSuccess() {
      await utils.livestock.list.invalidate();
    },
  });

  // onClick={handle_ring_bell({ id, description, updated_at: Date.now(), ring_bell: !ring_bell })}>

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
        {data?.items.map(
          ({ id, updated_at, description, ring_bell, geo_coordinate }) => {
            console.log(ring_bell);
            return (
              <Table.Row key={id}>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{geo_coordinate}</Table.Cell>
                <Table.Cell>{updated_at.toISOString()}</Table.Cell>
                <Table.Cell width={2}>
                  <Button
                    onClick={async () => {
                      try {
                        await add_livestock.mutateAsync({
                          id,
                          description,
                          ring_bell: !ring_bell,
                          updated_at: new Date(),
                          geo_coordinate,
                        });
                      } catch (cause) {
                        console.error({ cause }, 'Failed to add post');
                      }
                    }}
                  >
                    Ring Bell
                  </Button>
                </Table.Cell>
                <Table.Cell>{description}</Table.Cell>
              </Table.Row>
            );
          },
        )}
      </Table.Body>
    </Table>
  );
};

export default TableExamplePagination;
