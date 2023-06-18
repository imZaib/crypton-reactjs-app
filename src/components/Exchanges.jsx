import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../main";
import { BiWorld } from "react-icons/bi";
import Loader from './Loader'
import {
  Card,
  CardBody,
  Image,
  HStack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent";
const Exchanges = () => {
  const [myData, setMyData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false)
  const [myError, setMyError] = useState('')

  useEffect(() => {
    const fetchExchanges = async () => {
        try {
          const { data } = await axios.get(`${server}exchanges`);
          setMyData(data);
          setLoader(false);
        } catch (error) {
          setMyError(error.message);
          setError(true)
          setLoader(false)
        }
    };

    fetchExchanges();
  }, []);

  if(error) return <ErrorComponent error={myError}/>

  return (
    <>
      {loader ? (
          <Loader/>
      ) : (
        <HStack flexWrap={"wrap"} w={"100vw"} p={"12"} bgColor={'whatsapp.100'} justifyContent={'space-evenly'}>
          {myData.map((data, index) => (
            <Card
              key={index}
              size={"lg"}
              w={"52"}
              h={"52"}
              p={"1"}
              shadow={"lg"}
              m={"4"}
              borderRadius={'20'}
            >
              <CardBody>
                <Image
                  h={"10"}
                  w={"10"}
                  src={data.image}
                  objectFit={"contain"}
                />
                <Heading size={"sm"}  noOfLines={'1'} py={'2'}>
                  {data.name}
                </Heading>

                {data.trust_score_rank ? (
                  <Text noOfLines={"1"} fontSize={"12"}>
                    <strong>Rank: </strong>
                    {data.trust_score_rank}
                  </Text>
                ) : (
                  <Text noOfLines={"1"} fontSize={"12"}>
                    <strong>Rank: </strong> N/A
                  </Text>
                )}

                {data.year_established ? (
                  <Text noOfLines={"1"} fontSize={"12"}>
                    <strong>Established Year: </strong>
                    {data.year_established}
                  </Text>
                ) : (
                  <Text noOfLines={"1"} fontSize={"12"}>
                    <strong>Established Year: </strong> N/A
                  </Text>
                )}

                {data.country ? (
                  <Text noOfLines={"1"} fontSize={"12"}>
                    <strong>Country: </strong>
                    {data.country}
                  </Text>
                ) : (
                  <Text noOfLines={"1"} fontSize={"12"}>
                    <strong>Country: </strong> N/A
                  </Text>
                )}
                <Button
                  my={"1"}
                  size={"sm"}
                  variant="ghost"
                  leftIcon={<BiWorld />}
                  colorScheme="whatsapp"
                >
                  <a href={data.url} target="blank">
                    More Info...
                  </a>
                </Button>
              </CardBody>
            </Card>
          ))}
        </HStack>
      )}
    </>
  );
};

export default Exchanges;
