import { useUser } from '../../../context/UserContext';
import { FaBell, FaComments, FaUsers, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserActionsPanel = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-transparent text-white space-y-6">
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => navigate('/profile/edit')}
      >
        <img
          src={user?.profileImage || '/avatars/avatar1.png'}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white object-cover"
        />
        <p className="text-xs font-semibold mt-1">{user?.userName}</p>
      </div>

      <div className="flex flex-col items-center space-y-4 mt-4 text-lg">
        <FaBell className="hover:text-blue-400 cursor-pointer" />
        <FaUsers className="hover:text-blue-400 cursor-pointer" />
        <FaComments className="hover:text-blue-400 cursor-pointer" />
        <FaPlus className="hover:text-blue-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default UserActionsPanel;
