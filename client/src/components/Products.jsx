import { styled } from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import { mobile } from "../responsive"
import { useEffect, useState } from "react"
import axios from 'axios'

const Container = styled.div`
    padding: 20px;
    display: grid; /* Use grid display */
    grid-template-columns: repeat(4, 1fr); /* Four columns with equal width */
    gap: 20px; /* Gap between grid items */
    ${mobile({ display: "flex", flexWrap: "wrap", justifyContent: "space-between" })}
   
`

const Products = ({cat, filters, sort, setSort}) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products")
        setProducts(res.data)
      } catch (error) {
       console.log(error)
      }
    }
    getProducts()
  }, [cat])

  useEffect(() => {
    cat && setFilteredProducts(
      products.filter(item=> Object.entries(filters).every(([key, value]) => 
        item[key].includes(value)
        ))
    )
  }, [products, cat, filters])

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
    [...prev].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Sort in descending order
    })
  );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === 'desc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    } else {
     
    }
  }, [sort]);
  return (
    <Container>
        {cat ? filteredProducts.map((item) => (
            <Product item={item} key={item.id}/>
        )): products
          .slice(0, 8)
          .map((item) => (
          <Product item={item} key={item.id}/>
      )) }
    </Container>
  )
}

export default Products