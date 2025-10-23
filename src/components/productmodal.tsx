import { X } from "lucide-react";
import type { ProductType } from "../context/CartContext";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";

interface ProductModalProps {
  product: ProductType | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!product) return null;

  return (
    <div
      className=" fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center shadow-sm "
      onClick={onClose}
    >
      <div className=" bg-white rounded-2xl p-6  w-[100%] mb:h-[100%]  max-w-[796px] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex justify-center md:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-[250px] h-[250px] object-contain"
            />
          </div>

          <div className="flex flex-col justify-between md:w-1/2">
            <div>
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <p className="mt-2 text-[15px] text-gray-500">
                {product.rating.rate} ({product.rating.count})
              </p>
            </div>

            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">
                ${product.price}
              </p>
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="mt-4 bg-black text-white w-full py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
