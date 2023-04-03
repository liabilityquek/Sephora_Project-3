import { Link } from 'react-router-dom';
import "../InventoryManagement/InventoryTable/InventoryTable.css";

export default function AddProducts({products}) {

  return (
    <div className="table-responsive">
      <h1>Add Product</h1>
      <Link to="/productpage/new">
        <button>Add Product</button>
      </Link>
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
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p._id}</td>
              <td>${(p.price / 100).toFixed(2)}</td>
              <td>{p.category}</td>
              <td>{p.brand}</td>
              <td>{p.imgurl}</td>
              <td><button>Delete</button></td>
              <td><Link to={`/productpage/products/${p._id}/edit`}>
                  <button>Edit</button>
                </Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
