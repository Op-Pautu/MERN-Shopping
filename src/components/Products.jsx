import { styled } from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"


const Container = styled.div`
    padding: 20px;
    display: grid; /* Use grid display */
    grid-template-columns: repeat(4, 1fr); /* Four columns with equal width */
    gap: 20px; /* Gap between grid items */
    
   
`

const Products = () => {
  return (
    <Container>
        {popularProducts.map((item) => (
            <Product item={item} key={item.id}/>
        ))}
    </Container>
  )
}

export default Products