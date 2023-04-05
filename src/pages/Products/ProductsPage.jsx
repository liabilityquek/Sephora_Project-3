import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


export default function ProductsPage({products,sortByCategory,category,setSortByCategory}) {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    let filteredProductsCopy = [...products];
  if (sortByCategory) {
    filteredProductsCopy = filteredProductsCopy.filter((p) => p.category === sortByCategory);
  }
  if (sortByPrice === "lowToHigh") {
    filteredProductsCopy.sort((a, b) => a.price - b.price);
  } else if (sortByPrice === "highToLow") {
    filteredProductsCopy.sort((a, b) => b.price - a.price);
  }
  if (searchTerm) {
      filteredProductsCopy = filteredProductsCopy.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }
  setSortedProducts(filteredProductsCopy);
}, [searchTerm, sortByCategory, sortByPrice, products]);

const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <>
      <h1>Products Pages</h1>
      <div>
        <label>Search:</label>
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div>
        <label>Sort by Price:</label>
        <select value={sortByPrice} onChange={(e) => setSortByPrice(e.target.value)}>
          <option value="">All Products</option>
          <option value="lowToHigh">Low to high</option>
          <option value="highToLow">High to low</option>
        </select>
      </div>
       <div>
        <label>Sort by categories:</label>
        <select value={sortByCategory} onChange={(e) => setSortByCategory(e.target.value)}>
           <option value="">All categories</option>
          {category.map((c,i) => (
            <option key={i} value={c}>{c}</option>
          ))}
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
