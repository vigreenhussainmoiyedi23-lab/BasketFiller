import { useState } from "react";
import { FaStar } from "react-icons/fa";

const UserReviews = ({ reviews, onDelete, onUpdate }) => {
    if (!reviews?.length) return null;
    const [editting, seteditting] = useState(false)
    const [review, setReview] = useState({
        title: null,
        description: null,
        rating: null,
    });
    return (
        <div className="mt-10">
            <h2 className="text-2xl mb-4">Your Reviews</h2>
            {reviews.map((c) => (
                <div key={c._id} className="bg-zinc-800 p-4 rounded-xl mb-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-1">
                            {editting ?
                                [1, 2, 3, 4, 5].map((num) => (
                                    <FaStar
                                        key={num}
                                        size={24}
                                        className="cursor-pointer"
                                        color={num <= review.rating ? "gold" : "gray"}
                                        onClick={() => setReview({ ...review, rating: num })}
                                    />
                                ))
                                :
                                [...Array(5)].map((_, j) => (
                                    <FaStar key={j} color={j < c.rating ? "gold" : "gray"} />
                                ))}
                        </div>
                        <h1>{c.User.username}</h1>
                    </div>

                    <div className="flex justify-end gap-3 mb-3">
                        <button
                            onClick={() => {
                                if (!editting) seteditting(prev => !prev)
                                else {
                            const {title,description,rating}=review
                                    if (!title )review.title=c.title
                                    if (!description )review.description=c.description
                                    if (!rating )review.rating=c.rating
                                    onUpdate(c._id, review)
                                    seteditting(prev => !prev)
                                }
                            }}
                            className="bg-blue-500 px-4 py-2 rounded-md text-sm">
                            {editting ? "Update" : "Edit"}
                        </button>
                        <button
                            onClick={() => onDelete(c._id)}
                            className="bg-red-600 px-4 py-2 rounded-md text-sm"
                        >
                            Delete
                        </button>
                    </div>
                    {editting ? <>
                        <input
                            type="text"
                            placeholder="Title"
                            required
                            value={review.title || c.title}
                            onChange={(e) => setReview({ ...review, title: e.target.value })}
                            className="w-full border-2 border-white/20  p-2 mb-2 bg-zinc-800 rounded outline-none"
                        />

                        <textarea
                            placeholder="Description"
                            required
                            value={review.description || c.description}
                            onChange={(e) => setReview({ ...review, description: e.target.value })}
                            className="w-full border-2 border-white/20 p-2 mb-2 bg-zinc-800 rounded resize-none outline-none"
                        />
                    </> : <>
                        <h3 className="font-bold">{c.title}</h3>
                        <p className="text-gray-300">{c.description}</p>
                    </>}
                </div>
            ))}
        </div>
    );
};

export default UserReviews;
