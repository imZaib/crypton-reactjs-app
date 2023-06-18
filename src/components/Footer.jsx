import { Avatar, HStack, Text, } from '@chakra-ui/react'
import Crypton from './../assets/ton.png'

const Footer = () => {
  return (
    <HStack w={'full'} justifyContent={'space-evenly'} bgColor={'whatsapp.600'}>
      <Text fontSize={'3xl'}><Avatar src={Crypton}></Avatar>CRYPTON</Text>
      <Text >All rights reserved</Text>
      
    </HStack>
  )
}

export default Footer