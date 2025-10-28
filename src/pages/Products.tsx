import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductModal from "../components/productmodal";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function Products() {
  const { products, loading, error } = useProducts();
  const params = useParams();
  const navigate = useNavigate();
  const { category } = params;
  const [filterproducts, setFilterproducts] = useState(products);
  const [isActive, setIsActive] = useState<string | undefined>(category);

  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenModal = (product: any) => {
    setSelectedProduct(product);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (category) {
      setFilterproducts(products.filter((p) => p.category === category));
    } else {
      setFilterproducts(products);
    }
  }, [category, products]);

  if (loading) return <p className="text-gray-600">Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4 mx-22 w-[1216px]">
      <h1 className="text-[30px] font-bold">
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "All Products"}
      </h1>

      <div className="flex gap-2 mt-6">
        {[
          { label: "All Products", value: "" },
          { label: "Jewelery", value: "jewelery" },
          { label: "Electronics", value: "electronics" },
          { label: "Men's clothing", value: "men's clothing" },
          { label: "Women's clothing", value: "women's clothing" },
        ].map((category) => (
          <button
            key={category.label}
            className={`flex text-gray-600 text-[16px] items-center gap-2 px-4 py-2 font-medium ${
              isActive === category.value ||
              (category.value === "" && isActive === "All products")
                ? "text-white bg-black rounded-xl"
                : "bg-gray-100 hover:bg-gray-200 rounded-xl"
            }`}
            onClick={() => {
              setIsActive(category.value);
              if (category.value) navigate(`/products/${category.value}`);
              else navigate(`/products`);
            }}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="text-[14px] text-gray-600 mt-6">
        <p>Showing {filterproducts.length} products</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {filterproducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleOpenModal(product)}
            className="w-[286px] h-[458px] hover:shadow-lg cursor-pointer"
          >
            <div className="flex justify-center bg-gray-50 p-6 rounded-t-2xl">
              <img
                src={product.image}
                alt={product.title}
                className="w-[238px] h-[238px] duration-300 hover:scale-110"
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
                <p className="font-bold text-2xl text-gray-900 ">
                  ${product.price}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="flex items-center justify-center w-[44px] h-[44px] bg-black text-white rounded-2xl"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpenModal && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}
