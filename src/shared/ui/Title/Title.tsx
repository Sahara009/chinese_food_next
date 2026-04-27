type TitleProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "danger" | "muted";
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
};

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl",
};

const colorClasses = {
  primary: "text-black",
  secondary: "text-gray-600",
  danger: "text-red-500",
  muted: "text-gray-400",
};

export function Title({
  children,
  size = "md",
  color = "primary",
  as = "h1",
  className = "",
}: TitleProps) {
  const Component = as;

  return (
    <Component
      className={`
          font-bold
          ${sizeClasses[size]}
          ${colorClasses[color]}
          ${className}
        `}
    >
      {children}
    </Component>
  );
}
