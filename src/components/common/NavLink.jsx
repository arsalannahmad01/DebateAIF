const NavLink = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
    >
      {children}
    </a>
  );
};

export default NavLink; 