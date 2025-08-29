import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className, ...props }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect width="40" height="40" rx="8" className="fill-foreground" />
    <path d="M12 12H28V16H12V12Z" className="fill-background" />
    <path d="M12 18H24V22H12V18Z" className="fill-background" />
    <path d="M12 24H28V28H12V24Z" className="fill-background" />
  </svg>
);