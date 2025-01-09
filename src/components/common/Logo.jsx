import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="text-2xl font-bold gradient-text cursor-pointer" 
      onClick={() => navigate('/')}
    >
      DebateGPT
    </div>
  );
};

export default Logo; 