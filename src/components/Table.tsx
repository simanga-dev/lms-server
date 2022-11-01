import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import { AppRouter } from '~/server/routers/_app';
import { trpc } from '~/utils/trpc';

type PropsType = {
  data:
    | {
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
      }
    | undefined;
};

function checkActive(date: Date): string {
  const msInMinute = 60 * 1000;

  const today = new Date();

  const time_diff = Math.round(
    Math.abs(today.getTime() - date.getTime()) / msInMinute,
  );

  if (time_diff < 5) return 'Yes';

  return 'No';
}

const LivestockTable = ({ data }: PropsType) => {
  const utils = trpc.useContext();

  type Input = inferProcedureInput<AppRouter['livestock']['add']>;

  const add_livestock = trpc.livestock.add.useMutation({
    async onSuccess() {
      await utils.livestock.list.invalidate();
    },
  });

  return (
    <>
      <h3> All Livestock in the Database </h3>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Active</Table.HeaderCell>
            <Table.HeaderCell>Motion Update At</Table.HeaderCell>
            <Table.HeaderCell>Cordinate</Table.HeaderCell>
            <Table.HeaderCell>Ring a Bell</Table.HeaderCell>
            <Table.HeaderCell>View</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.items.map((item) => {
            // console.log(checkActive(item.motion_update_at))
            return (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{checkActive(item.motion_update_at)} </Table.Cell>
                <Table.Cell>{item.motion_update_at.toUTCString()}</Table.Cell>
                <Table.Cell>
                  {item.Latitude}N {item.Longitude}L
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={async () => {
                      try {
                        await add_livestock.mutateAsync({
                          ...item,
                          temperature: 23.2,
                        });
                      } catch (cause) {
                        console.error({ cause }, 'Failed to add post');
                      }
                    }}
                  >
                    Ring Bell
                  </Button>{' '}
                </Table.Cell>
                <Table.Cell>
                  <Link href={`/livestock/${item.id}`}>
                    <a>View more</a>
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default LivestockTable;
