import "bootstrap/dist/css/bootstrap.min.css";


export default function AddProducts({products}) {

  return (
    <>
      <h1>Add Product</h1>
      <table className="table table-striped table-hover">
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
          </tr>
        ))}
      </tbody>
    </table>
     
    </>
  );
}







 <tr>
      <th>Product Name</th>
      <th>Product ID</th>
      <th>Price</th>
      <th>Category</th>
      <th>Brand</th>
      <th>Picture URL</th>
      <th>Product ID</th>
    </tr>