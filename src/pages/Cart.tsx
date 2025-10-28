import { ShoppingBag, Trash } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (item.qty || 1),
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal <= 100 ? 10 : 0;
  const Total = subtotal + tax + shipping;

  const navigate = useNavigate();

  return (
    <div className="p-6">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-100 gap-6 ">
          <ShoppingBag size={112} strokeWidth={1.5} />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-gray-700">Your cart is empty</h1>
            <h2 className="text-gray-500">Add some products to get started!</h2>
          </div>
          <button
            onClick={() => navigate("/Products")}
            className="bg-black w-[192px] h-[48px] text-white font-semibold rounded-xl"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="max-w-[1200px] mx-auto  px-25">
          <h1 className="text-[30px] font-bold mb-4">Shopping Cart</h1>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 ">
            <div className="flex flex-col gap-4  ">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row gap-6 shadow-sm p-6 rounded-xl w-[634px] h-[164px]"
                >
                  <div className="flex item-center justify-center h-[96px] w-[96px] bg-gray-100 rounded-xl">
                    <img src={item.image} alt={item.title} className=" p-3" />
                  </div>
                  <div className="flex flex-col gap-4 w-[466px]">
                    <h2 className="font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-4">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span className="mx-2">{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>

                    <div className="flex justify-between item-end">
                      <p>${item.price.toFixed(2)}</p>
                      <Trash
                        size={27}
                        strokeWidth={0.75}
                        onClick={() => removeFromCart(item.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-[320px] h-auto lg:h-[381px] rounded-2xl shadow-sm p-5">
              <h1 className="font-bold text-[20px] mb-6">Order Summary</h1>
              <div className="flex flex-col gap-4">
                <p className="text-gray-600 flex justify-between">
                  SubTotal{" "}
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </p>
                <p className=" text-gray-600 flex justify-between">
                  tax(10%) {""}
                  <span className="font-semibold"> ${tax.toFixed(2)}</span>
                </p>
                <p className="text-gray-600 flex justify-between">
                  Shipping
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : `$ ${shipping}`}
                  </span>
                </p>
                <p className="border-t border-gray-300  w-full "></p>
                <p className=" flex justify-between">
                  Total {""}
                  <span className="font-semibold"> ${Total.toFixed(2)}</span>
                </p>
                <button className="text-white bg-black py-4 rounded-xl">
                  Procced to checkout
                </button>
                {subtotal < 100 ? (
                  <p className="flex items-center justify-center">
                    Free shipping on orders over $100{" "}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
