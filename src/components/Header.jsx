import { Button, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HStack bgColor={'whatsapp.600'} p={'4'} shadow={'base'}> 
    
    <Button variant={'unstyled'} color={'white'} >
      <Link to={'/'}>Home</Link>
    </Button>
    
    <Button variant={'unstyled'} color={'white'} >
      <Link to={'/exchanges'}>Exchanges</Link>
    </Button>
    
    <Button variant={'unstyled'} color={'white'} >
      <Link to={'/coins'}>Coins</Link>
    </Button>
    
    
    </HStack>
  )
}

export default Header