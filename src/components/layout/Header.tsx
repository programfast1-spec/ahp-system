import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { user } = useAuthStore();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Sistem Penunjang Keputusan AHP
          </h2>
          <p className="text-sm text-gray-600">
            Pemilihan Guru untuk Pelatihan - Role: {user?.role}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <div className="h-6 w-px bg-gray-300" />

          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;