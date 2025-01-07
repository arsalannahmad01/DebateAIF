import { Link } from 'react-router-dom';

const NavLink = ({ href, children, className = '' }) => {
  return (
    <Link 
      to={href} 
      className={className}
    >
      {children}
    </Link>
  );
};

export default NavLink; 