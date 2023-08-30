
import { styled } from "styled-components";
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  gap:10px;
  
`
const Input = styled.input`
  border: none;
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 25px;
 
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  
`

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
           <Input/>
           <AiOutlineSearch style={{ color: 'gray', fontSize: 16}}/>
           
          </SearchContainer>
        </Left>
        <Center>
          <Logo>OP.</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem><AiOutlineShoppingCart/> </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
