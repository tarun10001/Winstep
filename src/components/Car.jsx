import React, { useEffect, useState } from "react";

import {  TableCaption,
  TableContainer,
  Button,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
} from "@chakra-ui/react";

export default function Car() {
  const [car, setCar] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const res = await fetch("http://localhost:8080/userDetails");
      const getRes = await res.json();
      setCar(await getRes);
    };
    getdata();
  }, [car]);

  const handleRemove = async (e) => {
    await fetch(`http://localhost:8080/userDetails/${e.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <TableContainer>
        <Table variant="dark">
          <TableCaption>Wisestep Scooters</TableCaption>
          <Thead>
            <Tr>
            <Th>Name Of User </Th>
              <Th>Number</Th>
              <Th>Id Of Car</Th>
            </Tr>
          </Thead>

          <Tbody>
            {car.map((e) => (
              <Tr key={e.id}>
                <Td>{e.id}</Td>
                <Td>{e.name}</Td>
                <Td isNumeric>{e.number}</Td>
                <Button
                  onClick={() => {
                    handleRemove(e);
                  }}
                  bg="blue"
                >
                  Delete This Slot
                </Button>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
