import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../main";
import {
  Card,
  CardBody,
  Image,
  HStack,
  Heading,
  Text,
  Button,
  VStack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";
import Loader from "./Loader";
const Coins = () => {
  const [myData, setMyData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [myError, setMyError] = useState("");
  const [page, setPage] = useState("1");
  const [currency, setCurrency] = useState("inr");

  const CurrencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const btn = new Array(20).fill(0);

  const changePage = (page) => {
    setPage(page);
    setLoader(true);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}coins/markets?vs_currency=${currency}&page=${page}`
        );
        setMyData(data);
        setLoader(false);
      } catch (error) {
        setMyError(error.message);
        setError(true);
        setLoader(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent error={myError} />;

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <VStack w={"full"} p={"12"} bgColor={"whatsapp.100"}>
          <RadioGroup value={currency} onChange={setCurrency}>
            <HStack>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack flexWrap={"wrap"} w={"full"} justifyContent={"space-evenly"}>
            {myData.map((data, index) => (
              <Link key={index} to={`coin/${data.id}`}>
                <Card
                  key={index}
                  size={"lg"}
                  w={"52"}
                  h={"52"}
                  p={"1"}
                  shadow={"lg"}
                  m={"4"}
                  borderRadius={"20"}
                >
                  <CardBody>
                    <Image
                      h={"10"}
                      w={"10"}
                      src={data.image}
                      objectFit={"contain"}
                    />
                    <Heading size={"sm"} noOfLines={"2"} py={"2"}>
                      {data.name}
                    </Heading>

                    {data.symbol ? (
                      <Text noOfLines={"1"} fontSize={"12"}>
                        <strong>Symbol: </strong>
                        {data.symbol}
                      </Text>
                    ) : (
                      <Text noOfLines={"1"} fontSize={"12"}>
                        <strong>Symbol: </strong> N/A
                      </Text>
                    )}

                    {data.market_cap_rank ? (
                      <Text noOfLines={"1"} fontSize={"12"}>
                        <strong>Rank: </strong>
                        {data.market_cap_rank}
                      </Text>
                    ) : (
                      <Text noOfLines={"1"} fontSize={"12"}>
                        <strong>Rank: </strong> N/A
                      </Text>
                    )}

                    {data.current_price ? (
                      <Text noOfLines={"1"} fontSize={"12"}>
                        <strong>Current Price : </strong>
                        {`${data.current_price}${CurrencySymbol}`}
                      </Text>
                    ) : (
                      <Text noOfLines={"1"} fontSize={"12"}>
                        <strong>Current Price: </strong> N/A
                      </Text>
                    )}
                  </CardBody>
                </Card>
              </Link>
            ))}
          </HStack>
          <HStack
            overflow={"auto"}
            justifyContent={"center"}
            w={"full"}
            p={"8"}
          >
            {btn.map((e, i) => (
              <Button
                key={i}
                variant={"solid"}
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </HStack>
        </VStack>
      )}
    </>
  );
};

export default Coins;
