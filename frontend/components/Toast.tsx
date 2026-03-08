import React, { useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose, duration = 4000 }) => {
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!shouldRender && !isVisible) return null;

    const typeConfig = {
        success: {
            bg: 'bg-emerald-500/90',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            ),
            shadow: 'shadow-emerald-500/20',
        },
        error: {
            bg: 'bg-rose-500/90',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            ),
            shadow: 'shadow-rose-500/20',
        },
        info: {
            bg: 'bg-blue-500/90',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            shadow: 'shadow-blue-500/20',
        },
    };

    const currentType = typeConfig[type];

    return (
        <div
            className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
                }`}
            onTransitionEnd={() => {
                if (!isVisible) setShouldRender(false);
            }}
        >
            <div className={`${currentType.bg} ${currentType.shadow} backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4 border border-white/20 min-w-[300px]`}>
                <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                    {currentType.icon}
                </div>
                <div className="flex-grow pt-0.5">
                    <p className="font-semibold text-sm leading-tight">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 hover:bg-white/10 p-1.5 rounded-full transition-colors"
                >
                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Toast;
