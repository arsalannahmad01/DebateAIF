const Button = ({ children, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700',
    secondary: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
  };

  return (
    <button
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 