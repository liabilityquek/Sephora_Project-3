import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function ProductsPage({products}) {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  useEffect(() => {
    let sortedProductsCopy = [...products];
    if (sortByPrice === "lowToHigh") {
      sortedProductsCopy.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === "highToLow") {
      sortedProductsCopy.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sortedProductsCopy);
  }, [sortByPrice, products]);

  return (
    <>
      <h1>Products Pages</h1>
      <div>
        <label>Sort by price:</label>
        <select value={sortByPrice} onChange={(e) => setSortByPrice(e.target.value)}>
          <option value="">Featured</option>
          <option value="lowToHigh">Low to high</option>
          <option value="highToLow">High to low</option>
        </select>
      </div>
      <div className="productsDiv">
        {sortedProducts.map((p) => (
          <div key={p._id}>
            <Link to={`/products/${p.name}`}>
              <img className="productsPic" src={p.imgurl} alt={p.name} />
              <br></br>
              <label>{p.brand}</label>
              <br></br>
              <label>{p.name}</label>
              <br></br>
              <label>{(p.price / 100).toLocaleString("en-US", { style: "currency", currency: "SGD" })}</label>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
