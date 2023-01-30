import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement
  >
>(({ className, children, ...rest }, ref) => {
  return (
    <button
      className="btn"
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  )
})