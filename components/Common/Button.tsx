
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'primary', 
  className = '',
  disabled = false
}) => {
  const baseStyles = 'px-6 py-3 rounded-[20px] font-bold font-baloo transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const types = {
    primary: 'bg-[#90CAF9] text-white shadow-lg shadow-blue-200 hover:bg-[#64B5F6] hover:shadow-xl',
    secondary: 'bg-[#FFD1FF] text-[#2C3E50] shadow-md hover:scale-[1.05] hover:shadow-lg',
    outline: 'border-2 border-[#90CAF9] text-[#2C3E50] hover:bg-[#E3F2FD]',
    ghost: 'text-[#2C3E50] hover:bg-white/40'
  };

  return (
    <button 
      disabled={disabled}
      onClick={onClick} 
      className={`${baseStyles} ${types[type]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
