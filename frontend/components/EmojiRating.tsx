import React from 'react';

interface EmojiRatingProps {
    value?: number;
    onChange: (value: number) => void;
    disabled?: boolean;
}

const ratings = [
    { value: 5, emoji: '😍', label: 'Excellent', color: 'border-emerald-400 text-emerald-400' },
    { value: 4, emoji: '😊', label: 'Bien', color: 'border-blue-400 text-blue-400' },
    { value: 3, emoji: '😐', label: 'Moyen', color: 'border-yellow-400 text-yellow-400' },
    { value: 2, emoji: '🙁', label: 'Mauvais', color: 'border-orange-400 text-orange-400' },
    { value: 1, emoji: '😫', label: 'Terrible', color: 'border-rose-400 text-rose-400' },
];

const EmojiRating: React.FC<EmojiRatingProps> = ({ value, onChange, disabled }) => {
    return (
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
            {ratings.map((rate) => {
                const isActive = value === rate.value;

                return (
                    <button
                        key={rate.value}
                        type="button"
                        disabled={disabled}
                        onClick={() => onChange(rate.value)}
                        className={`
              relative flex flex-col items-center justify-center w-20 md:w-24 h-24 md:h-28 
              rounded-xl md:rounded-2xl border-2 transition-all duration-300 group
              ${isActive
                                ? `${rate.color} bg-[var(--card-bg)] border-current shadow-lg scale-105`
                                : 'border-[var(--card-border)] bg-[var(--card-bg)] grayscale opacity-60 hover:opacity-100 hover:grayscale-0 hover:border-indigo-500/30'
                            }
              ${disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}
            `}
                    >
                        <span className={`text-4xl mb-2 transform transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {rate.emoji}
                        </span>
                        <span className={`text-sm font-bold tracking-tight transform transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                            {rate.label}
                        </span>

                        {isActive && (
                            <div className="absolute -inset-1 rounded-[1.2rem] bg-current opacity-10 animate-pulse pointer-events-none" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default EmojiRating;
