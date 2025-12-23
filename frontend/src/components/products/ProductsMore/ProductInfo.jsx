import { FaStar } from "react-icons/fa";

const ProductInfo = ({ product }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">{product.title}</h1>
      <p className="text-gray-300 mt-2">{product.description}</p>

      <div className="mt-4 flex gap-4 items-center">
        <span className="text-3xl font-bold text-green-400">
          ₹{product.finalPrice}
        </span>
        {product.discount > 0 && (
          <span className="line-through text-gray-400">₹{product.price}</span>
        )}
      </div>

      {product.stock < 100 && (
        <p className="mt-2 text-red-400">
          Hurry! Only {product.stock} items left
        </p>
      )}

      <div className="flex items-center gap-2 mt-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            color={i < Math.round(product.rating) ? "gold" : "gray"}
          />
        ))}
        <span>({product.rating?.toFixed(1) || 0})</span>
      </div>
    </div>
  );
};

export default ProductInfo;
