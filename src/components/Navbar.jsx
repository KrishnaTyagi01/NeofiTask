import { Box, Button, Flex, Image } from "@chakra-ui/react";
import LogoImg from "../Assets/logo.svg";
import React from "react";

const Navbar = () => {
  const tabs = ["Trade", "Earn", "Support", "About"];
  return (
    <Box>
      <Flex justifyContent={"space-between"} flexWrap={"wrap"} px={6} pt={2}>
        <Image src={LogoImg} />

        <Flex justifyContent={"space-between"} w="20%">
          {tabs.map((val, ind) => (
            <Box
              key={ind}
              borderBottom={ind === 0 ? "2px solid #627EEA" : "none"}
              color={ind === 0 ? "#627EEA" : "#5A5A5A"}
              fontWeight={ind === 0 ? "bold" : "normal"}
            >
              {val}
            </Box>
          ))}
        </Flex>

        <Button
          background={
            "linear-gradient(94.37deg, #3387D5 -5.94%, #7A06C9 115.34%)"
          }
          color="#fff"
          rounded={"full"}
          _hover={{ backgroundColor: "inherit" }}
        >
          Connect Wallet
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
