import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'rectangular' | 'rounded';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rounded',
  width,
  height,
  animation = 'pulse',
}) => {
  const style: React.CSSProperties = {
    width: width !== undefined ? width : '100%',
    height: height !== undefined ? height : '1em',
  };

  const variantClasses = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse',
  };

  const baseClasses = 'bg-gray-700';

  const classes = [
    baseClasses,
    variantClasses[variant],
    animation && animationClasses[animation],
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes} style={style} />;
};

export default Skeleton;