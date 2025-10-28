import { ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function Home() {
  const { products, categories, loading, error } = useProducts();
  const navigate = useNavigate();

  if (loading) return <p className="mt-10 text-center">Loading products...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  const randomFour = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <div className="mt-4 mx-22">
      <div className="flex flex-col justify-center w-[1216px] h-[188px] bg-gradient-to-r from-white-500 to-gray-100 rounded-xl pl-10">
        <h1 className="text-black-800 text-[48px] font-bold">Welcome back,</h1>
        <p className="text-[20px] text-gray-700">
          Discover amazing products at unbeatable prices
        </p>
      </div>

      <div className="mt-[48px]">
        <p className="text-[24px] font-bold ">Shop by Category</p>
        <div className="flex gap-4 mt-6">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/products/${category}`}
              className="flex justify-center items-center w-[292px] h-[124px] rounded-2xl shadow-sm"
            >
              <p>{category}</p>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mt-[48px] flex justify-between">
        <p className="text-[24px] font-bold ">Featured Products</p>
        <button onClick={() => navigate("/products")}>View All</button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {randomFour.map((product) => (
          <div key={product.id} className="w-[286px] h-[458px]">
            <div className="flex justify-center bg-gray-50 p-6 rounded-t-2xl">
              <img
                src={product.image}
                alt={product.title}
                className="w-[238px] h-[238px] duration-300"
              />
            </div>
            <div className="w-full h-[172px] p-6 rounded-b-2xl shadow-sm">
              <p className="font-semibold text-gray-900 h-[48px] line-clamp-2">
                {product.title}
              </p>
              <p className="mt-2 text-[15px]">
                {product.rating.rate}
                <span className="text-gray-400">({product.rating.count})</span>
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="font-bold text-2xl text-gray-900">
                  ${product.price}
                </p>
                <button className="flex items-center justify-center w-[44px] h-[44px] bg-black text-white rounded-2xl">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
