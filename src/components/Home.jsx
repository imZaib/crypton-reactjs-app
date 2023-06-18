import { Box, Image, Text } from '@chakra-ui/react'
import Crypton from './../assets/ton.png'
import {motion} from 'framer-motion'

const Home = () => {
  return (
    <Box bgColor={'whatsapp.500'}  w={'full'} h={'100vh'} alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
      <motion.div style={{height:"80vh"}} animate={{ translateY: '20px'}} transition={{
        duration: 1,
        repeat: Infinity,
        repeatType:'reverse'
      }}>
      <Image w={'450px'} h={'450px'}  objectFit={'contain'} src={Crypton} m={'4'}/>
      </motion.div>
      <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'900'} color={'golden'} >
        CRAYPTON
      </Text>
    </Box>
  )
}

export default Home