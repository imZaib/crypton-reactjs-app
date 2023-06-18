import { Center,Spinner } from "@chakra-ui/react"

const Loader = () => {
  return (
    <Center bgColor={'whatsapp.100'} h="100vh" w={"100vw"} color="white" >
    <Spinner
      thickness="9px"
      speed="0.5s"
      emptyColor="green.50"
      color="green"
      size="xl"
      p={'55'}
    />
  </Center>
  )
}

export default Loader