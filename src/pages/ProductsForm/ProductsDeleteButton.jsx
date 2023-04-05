export default function ProductsDeleteButton({ id, delProduct }) {
  
  const handleDelete = async () => {
    const response = await fetch(`/api/locations/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
    delProduct(id);
  };

  return <button onClick={handleDelete}>Delete</button>;
}
