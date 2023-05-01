import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
} from "@chakra-ui/react";
import {
  CheckIcon,
  CloseIcon,
  SearchIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import EthIcon from "../Assets/eth.svg";
// import EthIcon from "../Assets/ethicon.png";
import React, { useEffect, useState } from "react";

const FormComponent = () => {
  const [investmentValue, setInvestmentValue] = useState(0.0);
  const [tokenValue, setTokenValue] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [symbol, setSymbol] = useState("ETH");
  const [loading, setLoading] = useState(false);
  let ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@trade`
  );

  useEffect(() => {
    setLoading(true);
    ws.onmessage = (event) => {
      const price = JSON.parse(event.data).p;
      console.log(price);
      if (price !== tokenValue) {
        setTokenValue(price * 80);
      }

      setLoading(false);
    };
    return () => {
      ws.onmessage = null;
    };
  }, [symbol]);

  const tokens = [
    "BTC",
    "ETH",
    "BNB",
    "USDC",
    "XRP",
    "DOGE",
    "MATIC",
    "SOL",
    "DOT",
    "LTC",
    "TRX",
    "BUSD",
    "SHIB",
    "AVAX",
    "ATOM",
    "UNI",
  ];

  const [filtered, setFiltered] = useState(tokens);

  const handleSearch = (e) => {
    const searchVal = e.target.value;
    const vals = tokens.filter((val) => val.includes(searchVal.toUpperCase()));
    setFiltered(vals);
  };

  return (
    <Box>
      <Container
        h="50vh"
        maxH={"50vh"}
        border="1px solid #46425E"
        py={5}
        borderRadius={10}
      >
        {!dropdownOpen ? (
          <>
            <Flex mb={4} justifyContent={"space-between"} alignItems={"center"}>
              <Text color="#C5C5C5">Current Value</Text>
              <Text color="#627EEA" fontSize={"2xl"} fontWeight={"bold"}>
                {loading ? (
                  <span>loading...</span>
                ) : (
                  <span> ₹ {parseInt(tokenValue).toFixed(2)}</span>
                )}
              </Text>
            </Flex>
            <Button
              backgroundColor={"#1C1731"}
              color="#fff"
              onClick={() => setDropdownOpen(true)}
              _hover={{ backgroundColor: "inherit" }}
              w="100%"
              iconSpacing={"70%"}
              rightIcon={<TriangleDownIcon color="#6E56F8" />}
            >
              <Flex alignItems={"center"} fontWeight={"normal"}>
                {/* <Image src={EthIcon} pr={2} />  */}
                {symbol}
              </Flex>
            </Button>

            <Flex mt={4} flexDirection={"column"} alignItems={"flex-start"}>
              <Text color="#C5C5C5" mb={4}>
                Amount you want to invest
              </Text>

              <InputGroup size="sm">
                <Input
                  color="#fff"
                  fontWeight={"bold"}
                  value={investmentValue}
                  disabled={loading}
                  onChange={(e) => {
                    setInvestmentValue(e.target.value);
                  }}
                  type="number"
                  borderRight={"none"}
                />
                <InputRightAddon bgColor={"inherit"} color="#fff">
                  INR
                </InputRightAddon>
              </InputGroup>
            </Flex>

            <Flex mt={4} flexDirection={"column"} alignItems={"flex-start"}>
              <Text color="#C5C5C5" mb={4}>
                Estimate Number of {symbol} You will Get
              </Text>

              <Input
                color="#fff"
                fontWeight={"bold"}
                disabled
                value={(investmentValue / tokenValue).toFixed(4)}
              />
            </Flex>

            <Button
              w="100%"
              mt={10}
              background={
                "linear-gradient(94.37deg, #3387D5 -5.94%, #7A06C9 115.34%)"
              }
              color="#fff"
              rounded={"full"}
              _hover={{ backgroundColor: "inherit" }}
            >
              Buy
            </Button>
          </>
        ) : (
          <Box h="100%" boxShadow={"3xl"}>
            <Flex mb={4} justifyContent={"space-between"}>
              <Text></Text>
              <IconButton
                bgColor={"inherit"}
                onClick={() => setDropdownOpen(false)}
                aria-label="Close"
                _hover={{ backgroundColor: "inherit" }}
                icon={<CloseIcon color="#DCDCEC" />}
              />
            </Flex>
            <InputGroup size="sm">
              <InputLeftAddon
                border={"1px solid rgba(110, 86, 248, 0.25)"}
                bgColor={"inherit"}
                color="#fff"
              >
                <SearchIcon />
              </InputLeftAddon>
              <Input
                color="#fff"
                fontWeight={"bold"}
                placeholder="search"
                onChange={(e) => handleSearch(e)}
                border={"1px solid rgba(110, 86, 248, 0.25)"}
                borderLeft={"none"}
              />
            </InputGroup>

            <Box
              maxH={"60%"}
              mt={8}
              overflowY={"scroll"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "5px",
                  borderRadius: "8px",
                  backgroundColor: `
                  #627EEA`,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `
                  #627EEA`,
                },
              }}
            >
              {filtered.map((val, ind) => (
                <Flex
                  py={2}
                  backgroundColor={
                    val.toLowerCase() === symbol.toLowerCase()
                      ? "#1B192D"
                      : null
                  }
                  key={ind}
                  mb={4}
                  justifyContent={"space-between"}
                  px={4}
                  onClick={() => {
                    setSymbol(val);
                    setDropdownOpen(false);
                  }}
                >
                  <Flex color="#fff">{val}</Flex>

                  {val.toLowerCase() === symbol.toLowerCase() && (
                    <CheckIcon color="#58ADAB" />
                  )}
                </Flex>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FormComponent;
