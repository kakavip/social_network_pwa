import {
    Text,
    Center,
    Grid,
    GridItem,
    Image,
    Box,
    Flex,
    Icon,
} from "@chakra-ui/react";
import { withTranslation } from "@Server/i18n";
import { NextPage } from "next";
import React from "react";
import { InfoIcon } from "@chakra-ui/icons";

import backIcon from "@Assets/images/back.png";
import matchOptionIcon from "@Assets/images/match_option.png";
import demoImg from "@Assets/images/abcde.png";
import heartDatingIcon from "@Assets/images/heart-dating.png";
import closeDatingIcon from "@Assets/images/dating_close.png";
import starDatingIcon from "@Assets/images/dating_star.png";

const styles = {
    container: {
        backgroundColor: "white",
        height: "100vh",
        position: "relative",
    },
    header: {
        backgroundColor: "white",
        height: "59px",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        overflow: "hidden",
        zIndex: "2",
        border: "1px solid #38E6FE",
    },
    main: {
        backgroundColor: "white",
        height: "100%",
        paddingTop: "59px",
        // paddingBottom: "94px",
        zIndex: "1",
    },
};

const AccountDatingReacs: NextPage<any, any> = () => {
    return (
        <div style={styles.container}>
            <div className="Header" style={styles.header}>
                <Grid templateColumns="repeat(5, 1fr)" gap={4} h="100%">
                    <GridItem colSpan={1} h="100%">
                        <Center boxSize="100%">
                            <Image src={backIcon} boxSize="35px" />
                        </Center>
                    </GridItem>
                    <GridItem colStart={2} colEnd={5}>
                        <Center h="100%">
                            <Text
                                fontSize="24px"
                                fontWeight="bold"
                                color="#0066FF"
                            >
                                Let's feel happy
                            </Text>
                        </Center>
                    </GridItem>
                    <GridItem colStart={5} colEnd={6} h="100%">
                        <Center boxSize="100%">
                            <Image boxSize="35px" src={matchOptionIcon} />
                        </Center>
                    </GridItem>
                </Grid>
            </div>
            <div
                className="Main"
                style={{ ...styles.main, backgroundColor: "#E5E5E5" }}
            >
                <Box
                    height="90%"
                    width="100%"
                    bg="white"
                    position="relative"
                    borderRadius="10px"
                    marginTop="5px"
                    overflow="hidden"
                    border="solid #7000FF 1px"
                >
                    <Image boxSize="100%" src={demoImg} fit="cover" />
                    <Box
                        position="absolute"
                        top="10px"
                        height="4px"
                        width="100%"
                        paddingLeft="20px"
                        paddingRight="20px"
                    >
                        <Grid
                            templateColumns="repeat(3, 1fr)"
                            boxSize="100%"
                            bg="black"
                        >
                            <GridItem h="100%" padding="0px 2px">
                                <Box
                                    bg="white"
                                    boxSize="100%"
                                    borderRadius="2px"
                                />
                            </GridItem>
                            <GridItem h="100%" padding="0px 2px">
                                <Box
                                    bg="#C4C4C4"
                                    boxSize="100%"
                                    borderRadius="2px"
                                />
                            </GridItem>
                            <GridItem h="100%" padding="0px 2px">
                                <Box
                                    bg="#C4C4C4"
                                    boxSize="100%"
                                    borderRadius="2px"
                                />
                            </GridItem>
                        </Grid>
                    </Box>
                    <Box
                        position="absolute"
                        bottom="0px"
                        left="10px"
                        height="20%"
                        width="65%"
                        bg="gray"
                    >
                        <Text fontSize="24px" fontWeight="bold" color="white">
                            ABC II * 22.yo
                        </Text>
                        <Flex>
                            <Center margin="5px">
                                <Box
                                    h="10px"
                                    w="10px"
                                    bg="#04D832"
                                    borderRadius="100%"
                                    border="solid white 1px"
                                />
                            </Center>
                            <Text fontWeight="bold" color="white" opacity="70%">
                                Recently Active
                            </Text>
                        </Flex>
                        <Text opacity="80%" color="white" marginTop="5px">
                            Hãy làm cánh hoa bay trong bầu trời lặng gió....
                            :)))
                        </Text>
                    </Box>
                    <Box
                        position="absolute"
                        right="20px"
                        bottom="20px"
                        w="30px"
                        h="30px"
                    >
                        <InfoIcon h="100%" w="100%" color="white" />
                    </Box>
                </Box>
                <Box height="10%" width="100%">
                    <Center boxSize="100%">
                        <Grid templateColumns="repeat(3, 1fr)">
                            <GridItem padding="0px 20px">
                                <Box
                                    boxSize="54px"
                                    bg="white"
                                    borderRadius="100%"
                                    overflow="hidden"
                                    padding="10px"
                                >
                                    <Image
                                        boxSize="100%"
                                        src={closeDatingIcon}
                                    />
                                </Box>
                            </GridItem>
                            <GridItem padding="0px 20px">
                                <Box
                                    boxSize="54px"
                                    bg="white"
                                    borderRadius="100%"
                                    padding="10px"
                                >
                                    <Image
                                        boxSize="100%"
                                        src={starDatingIcon}
                                    />
                                </Box>
                            </GridItem>
                            <GridItem padding="0px 20px">
                                <Box
                                    boxSize="54px"
                                    bg="white"
                                    borderRadius="100%"
                                    padding="10px"
                                >
                                    <Image
                                        boxSize="100%"
                                        src={heartDatingIcon}
                                    />
                                </Box>
                            </GridItem>
                        </Grid>
                    </Center>
                </Box>
            </div>
        </div>
    );
};

const Extended = withTranslation("common")(AccountDatingReacs);

export default Extended;
