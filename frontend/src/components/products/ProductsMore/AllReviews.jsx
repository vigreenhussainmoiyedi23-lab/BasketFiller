import { FaStar } from "react-icons/fa";

const AllReviews = ({ comments }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl mb-4">All Reviews</h2>
      {comments.length === 0 ? (
        <h1>No reviews yet</h1>
      ) : (
        comments.map((c, i) => (
          <div key={i} className="bg-zinc-800 p-4 rounded-xl mb-3">
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <FaStar
                    key={j}
                    color={j < c.rating ? "gold" : "gray"}
                    size={14}
                  />
                ))}
              </div>
              <h1 className="font-semibold text-sm">{c.User.username}</h1>
            </div>
            <h3 className="font-bold">{c.title}</h3>
            <p className="text-gray-300">{c.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllReviews;
