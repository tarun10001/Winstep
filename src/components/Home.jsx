import React, { useEffect } from "react";
import {
  Button,
  Flex,
  useToast,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Input,
  Stack,
  Heading,
  ModalBody,
  ModalCloseButton,
  Box,
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  const [outlets, setOutlets] = useState([]);
  const [userData, setuserData] = useState({});
  const [userDetails, setuserDetails] = useState({});
  const res = useToast();
  const [vehicleId, setVehicleId] = useState("");
  const [vehicles, setvehicles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:8080/outlets");
      const result = await res.json();
      setOutlets(await result);
    };
    getData();
  }, []);

  const handling1 = (event) => {
    const getid = event.target.value;
    console.log();
    setVehicleId(getid);
    const getvehicles = async () => {
      const res1 = await fetch(`http://localhost:8080/outlets/${vehicleId}`);
      const getresult = await res1.json();
      setvehicles(getresult.vehicles);
      setuserData({ ...userData, name: getresult.outlet });
    };
    getvehicles();
  };

  const handling2 = (event) => {
    setuserData({ ...userData, car: event.target.value });
  };

  const inputHandle = (e) => {
    setuserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:8080/userDetails`, userDetails)
      .then((e) => {});
  };

  return (
    <div>
      <h1>WiseStep Technologies</h1>
      <Box width={"20%"} margin={"auto"}>
        <Select onChange={(e) => handling1(e)}>
          <option>Select Outlets</option>

          {outlets.map((e) => (
            <option key={e.id} value={e.id}>
              {" "}
              {e.outlet}
            </option>
          ))}
        </Select>

        {vehicles === undefined ? (
          <Select
            placeholder=" First Select Any Outlet"
            marginTop={"20px"}
          ></Select>
        ) : (
          <Select
            name="outlet"
            onChange={(e) => handling2(e)}
            marginTop={"20px"}
          >
            {vehicles.map((e) => (
              <option key={e.car} value={e.car}>
                {e.car}
              </option>
            ))}
          </Select>
        )}
      </Box>

      <Button
        name="car"
        onClick={() => {
          onOpen();
        }}
        margin={"10%"}
        bg="blue"
      >
        {" "}
        Fill the Form{" "}
      </Button>

      <Button>
        <Link to="/car">Parking</Link>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wisestep Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Stack>
                <Stack align={"center"}>
                  <Heading>User car : {userData.car}</Heading>
                </Stack>

                <Box>
                  <Stack>
                    <FormControl>
                      <FormLabel> Your Name</FormLabel>
                      <Input
                        onChange={(e) => {
                          inputHandle(e);
                        }}
                        name="name"
                        type="text"
                      />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>Number</FormLabel>
                      <Input
                        onChange={(e) => {
                          inputHandle(e);
                        }}
                        name="number"
                        type="number"
                      />
                    </FormControl>

                    <Stack>
                      <Button
                        onClick={() => {
                          handleSubmit();
                          onClose();
                          res({
                            title: "20 minutes left to pick your car",
                            status: "success",
                            duration: 4000,
                            isClosable: true,
                            position: "top",
                          });
                        }}
                        bg={"blue"}
                        color={"white"}
                        _hover={{
                          bg: "cyan",
                        }}
                      >
                        Submit Form
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
