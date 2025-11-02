import clsx from 'clsx';

const Button = ({ children, onClick, variant = 'primary', className }) => {
  const baseClasses = 'font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full sm:w-auto';
  const variants = {
    primary: 'text-white bg-primary hover:bg-primary-dark',
    secondary: 'text-gray-900 bg-white hover:bg-gray-100 border border-gray-200',
  };
  return (
    <button onClick={onClick} className={clsx(baseClasses, variants[variant], className)}>
      {children}
    </button>
  );
};

export default Button;