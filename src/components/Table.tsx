import React from 'react'
import { Icon, Label, Menu, Table, Header, Rating, Button } from 'semantic-ui-react'

const TableExamplePagination = () => (
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
            <Table.Row>
                <Table.Cell>
                    85989056-4954-11ed-8ca7-eb1cfc297983
                </Table.Cell>
                <Table.Cell>15:26:46.302N, 65:56:55.903W</Table.Cell>
                <Table.Cell>Tue 11 Oct 2022 12:48:21 SAST</Table.Cell>
                <Table.Cell> <Button>Ring Bell</Button></Table.Cell>
                <Table.Cell>A cow with big head</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>ad4e0536-4954-11ed-8b81-97d0b9cc4aeb</Table.Cell>
                <Table.Cell>45:44:46.302N, 65:53:55.903W</Table.Cell>
                <Table.Cell>Tue 11 Oct 2022 12:48:21 SAST</Table.Cell>
                <Table.Cell> <Button>Ring Bell</Button></Table.Cell>
                <Table.Cell>A make pig with 45Kg of wait</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>b77280d2-4954-11ed-8284-3b9d03e20ca0</Table.Cell>
                <Table.Cell>45:26:46.302N, 45:55:55.903W</Table.Cell>
                <Table.Cell>Tue 11 Oct 2022 12:48:21 SAST</Table.Cell>
                <Table.Cell> <Button>Ring Bell</Button></Table.Cell>
                <Table.Cell>A black female cow</Table.Cell>
            </Table.Row>
        </Table.Body>

    </Table>
)

// export default TableExamplePagination
//
//
// const TableExamplePadded = () => (
//   <Table celled padded>
//     <Table.Header>
//       <Table.Row>
//       </Table.Row>
//     </Table.Header>
//
//     <Table.Body>
//       <Table.Row>
//         <Table.Cell>
//           <Header as='h2' textAlign='center'>
//             A
//           </Header>
//         </Table.Cell>
//         <Table.Cell singleLine>Power Output</Table.Cell>
//         <Table.Cell>
//           <Rating icon='star' defaultRating={3} maxRating={3} />
//         </Table.Cell>
//         <Table.Cell textAlign='right'>
//           80% <br />
//           <a href='#'>18 studies</a>
//         </Table.Cell>
//         <Table.Cell>
//           Creatine supplementation is the reference compound for increasing
//           muscular creatine levels; there is variability in this increase,
//           however, with some nonresponders.
//         </Table.Cell>
//       </Table.Row>
//       <Table.Row>
//         <Table.Cell>
//           <Header as='h2' textAlign='center'>
//             A
//           </Header>
//         </Table.Cell>
//         <Table.Cell singleLine>Weight</Table.Cell>
//         <Table.Cell>
//           <Rating icon='star' defaultRating={3} maxRating={3} />
//         </Table.Cell>
//         <Table.Cell textAlign='right'>
//           100% <br />
//           <a href='#'>65 studies</a>
//         </Table.Cell>
//         <Table.Cell>
//           Creatine is the reference compound for power improvement, with numbers
//           from one meta-analysis to assess potency
//         </Table.Cell>
//       </Table.Row>
//     </Table.Body>
//   </Table>
// )
//
export default TableExamplePagination

