import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState({
    title: "",
    description: "",
    rating: 5,
  });

  const handleSubmit = () => {
    if (!review.title || !review.description) {
      alert("Please fill out all fields");
      return;
    }
    onSubmit(review);
    setReview({ title: "", description: "", rating: 5 });
  };

  return (
    <div className="mt-8 bg-zinc-900 p-6 rounded-xl">
      <h2 className="text-xl mb-4">Add Review</h2>

      <input
        type="text"
        placeholder="Title"
        value={review.title}
        onChange={(e) => setReview({ ...review, title: e.target.value })}
        className="w-full p-2 mb-2 bg-zinc-800 rounded outline-none"
      />

      <textarea
        placeholder="Description"
        value={review.description}
        onChange={(e) => setReview({ ...review, description: e.target.value })}
        className="w-full p-2 mb-2 bg-zinc-800 rounded resize-none outline-none"
      />

      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((num) => (
          <FaStar
            key={num}
            size={24}
            className="cursor-pointer"
            color={num <= review.rating ? "gold" : "gray"}
            onClick={() => setReview({ ...review, rating: num })}
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewForm;
