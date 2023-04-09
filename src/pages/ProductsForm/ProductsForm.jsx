import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsDeleteButton from "./ProductsDeleteButton";

export default function ProductsForm({ products, delProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    let filteredProductsCopy = [...products];

    if (searchTerm) {
      filteredProductsCopy = filteredProductsCopy.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setSortedProducts(filteredProductsCopy);
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flexed">
      <div className="table-responsive">
        <h3>Product Portfolio</h3>
        <Link to="/productpage/new">
          <button>Add Product</button>
        </Link>
        <div>
          <label>Search:</label>
          <input type="text" value={searchTerm} onChange={handleSearchChange} />
        </div>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Picture URL</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p._id}</td>
                <td>${(p.price / 100).toFixed(2)}</td>
                <td>{p.category}</td>
                <td>{p.brand}</td>
                <td>{p.imgurl}</td>
                <td>
                  <ProductsDeleteButton id={p._id} delProduct={delProduct} />
                </td>
                <td>
                  <Link to={`/productpage/products/${p._id}/edit`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
