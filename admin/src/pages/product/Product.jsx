import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";

import PublishIcon from "@mui/icons-material/Publish";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
 
  const dispatch = useDispatch();
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const product = useSelector((state) =>
  state.product.products.find((product) => product._id === productId)
);
  const [formInputs, setFormInputs] = useState({
    productName: product.title,
    productDescription: product.desc,
    productPrice: product.price,
    inStock: product.inStock,
  });
  // const [selectedFile, setSelectedFile] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file); // Store the selected file in state
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create an updated product object with the form inputs
      const updatedProduct = {
        ...product,
        title: formInputs.productName,
        desc: formInputs.productDescription,
        price: formInputs.productPrice,
        inStock: formInputs.inStock,
      };
  
      // Call the updateProduct function from apiCalls to update the product
      await updateProduct(productId, updatedProduct, dispatch);
  
      // Optional: Show a success message or perform any other actions after updating
    } catch (err) {
      console.log(err);
      // Handle errors
    }
  };

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" >
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              placeholder={formInputs.productName}
              name="productName"
              onChange={handleInputChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              placeholder={formInputs.productDescription}
              name="productDescription"
              onChange={handleInputChange}
            />
            <label>Price</label>
            <input
              type="text"
              placeholder={formInputs.productPrice}
              name="productPrice"
              onChange={handleInputChange}
            />
            <label>In Stock</label>
            <select
              name="inStock"
              id="idStock"
              onChange={handleInputChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <PublishIcon />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                // onChange={handleFileChange}
              />
            </div>
            <button className="productButton" onClick={handleFormSubmit}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
