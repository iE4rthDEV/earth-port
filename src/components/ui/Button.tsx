import Link from "next/link";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "btn btn-primary rounded-full border-none bg-linear-to-r from-primary to-secondary px-6 py-2.5 text-sm font-semibold text-primary-content transition duration-300 hover:scale-105 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  secondary:
    "btn btn-outline rounded-full border-gray-300 bg-gray-50 px-6 py-2.5 text-sm font-semibold text-gray-700 transition duration-300 hover:border-primary hover:bg-gray-100 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
  ghost:
    "btn btn-ghost rounded-full px-4 py-2 text-sm font-medium text-primary-content transition duration-300 hover:bg-primary-content/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-content focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick } = props as ButtonAsButtonProps;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
