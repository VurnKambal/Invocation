import React from "react";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`rounded-lg ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export default Card;
