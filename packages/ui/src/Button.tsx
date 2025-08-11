import * as React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button: React.FC<ButtonProps> = ({ type = "button", ...props }) => (<button type={type} {...props} />);
