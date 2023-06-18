import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../main";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import PropTypes from "prop-types";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

const CoinDetails = () => {
  const [myData, setMyData] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [myError, setMyError] = useState("");
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [ChartArr, setChartArr] = useState([]);

  const params = useParams();

  const CurrencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const btns = ['24h','7d','14d','30d','60d','200d','360d', 'max']

  const switchChartStats = (key)=>{

    switch (key) {
      case '24h':
        setDays('24h');
        setLoader(true);
        break;
      case '7d':
        setDays('7d');
        setLoader(true);
        break;
      case '14d':
        setDays('14d');
        setLoader(true);
        break;
      case '30d':
        setDays('30d');
        setLoader(true);
        break;
      case '60d':
        setDays('60d');
        setLoader(true);
        break;
      case '200d':
        setDays('200d');
        setLoader(true);
        break;
      case '360d':
        setDays('360d');
        setLoader(true);
        break;
      case 'max':
        setDays('max');
        setLoader(true);
        break;
    
      default:
        break;
    }

  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setMyData(data);
        setChartArr(chartData.prices);
        setLoader(false);
      } catch (error) {
        setMyError(error.message);
        setError(true);
        setLoader(false);
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <ErrorComponent error={myError} />;

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} p={"16"} borderWidth={1}>
            <Chart arr={ChartArr} currency={CurrencySymbol} days={days} />
          </Box>
          <HStack p={'4'}  borderWidth={1} alignItems={'center'} justifyContent={'center'} overflowX={'auto'}>
            {btns.map((i)=>(
              <Button key={i}onClick={()=>switchChartStats(i)}>{i}</Button>
            ))}
          </HStack >

          <Container maxW={"container.xl"} p={"16"}>
            <RadioGroup value={currency} onChange={setCurrency}>
              <HStack>
                <Radio value="inr">INR</Radio>
                <Radio value="usd">USD</Radio>
                <Radio value="eur">EUR</Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
                Last Updated On{" "}
                {Date(myData.market_data.last_updated).split("G")[0]}
              </Text>

              <Image
                src={myData.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}
              />

              <Stat>
                <StatLabel>{myData.name}</StatLabel>

                <StatNumber>
                  <strong>Price: </strong>
                  {CurrencySymbol}
                  {myData.market_data.current_price[`${currency}`]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      myData.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {myData.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
              <Badge
                fontSize={"2xl"}
                bgColor={"whatsapp.900"}
                color={"white"}
              >{`#${myData.market_cap_rank}`}</Badge>

              <CustomBar
                high={`${CurrencySymbol}${myData.market_data.high_24h[currency]}`}
                low={`${CurrencySymbol}${myData.market_data.low_24h[currency]}`}
              />

              <Box w={"full"} p={"4"}>
                <Item
                  title={"Max Supply"}
                  value={myData.market_data.max_supply}
                />
                <Item
                  title={"Circulating"}
                  value={myData.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={`${CurrencySymbol}${myData.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All Time Low"}
                  value={`${CurrencySymbol}${myData.market_data.atl[currency]}`}
                />
                <Item
                  title={"All Time High"}
                  value={`${CurrencySymbol}${myData.market_data.ath[currency]}`}
                />
              </Box>
            </VStack>
          </Container>
        </>
      )}
    </>
  );
};

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme="whatsapp" w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge colorScheme="red">{low}</Badge>
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge colorScheme="green">{high}</Badge>
    </HStack>
  </VStack>
);

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text
      letterSpacing={"widest"}
      fontFamily={"sans-serif"}
      fontStyle={"normal"}
      fontWeight={"extrabold"}
    >
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

CustomBar.propTypes = {
  high: PropTypes.string.isRequired,
  low: PropTypes.string.isRequired,
};
Item.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default CoinDetails;
