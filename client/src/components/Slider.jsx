import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { styled } from "styled-components";
import { sliderItems } from "../data";
import { useState } from "react";
import { mobile } from './../responsive';
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2; 
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${props=>props.slideindex * -100}vw);
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #${props=>props.bg};
 
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
`;
const Image = styled.img`
  height: 80%;
  padding-left: ${props => props.isfirstslide ? '100px' : '0'}; /* Apply padding only for the first slide */
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;
const Description = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {

  const [slideIndex, setSlideIndex] = useState(0)

  const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
  }  
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick('left')}>
        <MdOutlineArrowLeft />
      </Arrow>
      <Wrapper slideindex={slideIndex}>
        {sliderItems.map((item, index) => (
          <Slide bg={item.bg}  key={item.id}>
            <ImgContainer>
              <Image src={item.img} isfirstslide={index === 0 ? 'true' : 'false'} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Description>
              {item.desc}
              </Description>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick('right')}>
        <MdOutlineArrowRight />
      </Arrow>
    </Container>
  );
};

export default Slider;
