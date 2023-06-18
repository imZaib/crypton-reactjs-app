import { Text, VStack } from '@chakra-ui/react'
// import React from 'react'

const ErrorComponent = (error) => {
  return (
    <VStack w={"100vw"} h={'100vh'} p={"12"} bgColor={'whatsapp.100'} alignItems={'center'} justifyContent={'center'}>
        <Text color={'whatsapp.900'} fontSize={'4xl'}>{error.error}</Text>
    </VStack>
  )
}

export default ErrorComponent