import { useState } from "react";

// 1. On définit le type des "props" pour dire qu'on attend une fonction onChange
interface StarRatingProps {
  onChange: (rating: number) => void;
}

export default function StarRating({ onChange }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    onChange(value); // 2. On appelle la fonction reçue du parent
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-3xl transition-colors duration-150 focus:outline-none"
        >
          <span
            className={
              star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
}
