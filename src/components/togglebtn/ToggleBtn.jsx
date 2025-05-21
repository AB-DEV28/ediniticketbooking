import React, { useState, useEffect, useRef } from 'react';

const ToggleBtn = ({ buttonText, buttonTextHidden, children }) => {
    const [isVisible, setIsVisible] = useState(true);
    const toggleRef = useRef(null);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleOutsideClick = (e) => {
        if (toggleRef.current && !toggleRef.current.contains(e.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="w-full h-auto" ref={toggleRef}>
            <button
                onClick={toggleVisibility}
                className={`w-fit px-4 py-2 border-2 rounded-lg transition ${
                    !isVisible
                        ? 'bg-primary text-neutral-50'
                        : 'border-primary bg-transparent text-primary'
                }`}
            >
                {isVisible ? buttonTextHidden : buttonText}
            </button>

            {isVisible && (
                <div className="mt-10 p-4 bg-neutral-50 border border-neutral-300 rounded-xl shadow-sm">
                    {children}
                </div>
            )}
        </div>
    );
};

export default ToggleBtn;
