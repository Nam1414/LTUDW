
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className={`font-extrabold tracking-tighter kant-logo-text cursor-pointer font-baloo ${sizes[size]}`}>
      KANT
    </div>
  );
};

export default Logo;
