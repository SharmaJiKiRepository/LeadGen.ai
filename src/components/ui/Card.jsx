import clsx from 'clsx';

const Card = ({ children, className }) => {
  return (
    <div className={clsx('rounded-lg bg-white p-4 shadow-sm sm:p-6', className)}>
      {children}
    </div>
  );
};

export default Card;