import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  Home,
  Users,
  Settings,
  BarChart3,
  Calculator,
  FileText,
  User,
  Target,
  GitCompare,
  BookOpen,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuthStore();

  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { path: '/admin', icon: Home, label: 'Dashboard' },
        { path: '/admin/users', icon: Users, label: 'Manajemen User' },
        { path: '/admin/criteria', icon: Target, label: 'Kriteria' },
        { path: '/admin/teachers', icon: BookOpen, label: 'Data Guru' },
        { path: '/admin/ahp/pairwise', icon: GitCompare, label: 'Pairwise Comparison' },
        { path: '/admin/ahp/result', icon: BarChart3, label: 'Hasil AHP' },
        { path: '/admin/reports', icon: FileText, label: 'Laporan' },
      ];
    } else if (user?.role === 'operator') {
      return [
        { path: '/operator', icon: Home, label: 'Dashboard' },
        { path: '/operator/teachers', icon: BookOpen, label: 'Data Guru' },
        { path: '/operator/pairwise/criteria', icon: GitCompare, label: 'Pairwise Kriteria' },
        { path: '/operator/pairwise/alternatives', icon: Calculator, label: 'Pairwise Alternatif' },
        { path: '/operator/ahp/process', icon: Settings, label: 'Proses AHP' },
        { path: '/operator/ahp/result', icon: BarChart3, label: 'Hasil AHP' },
      ];
    } else {
      return [
        { path: '/guru', icon: Home, label: 'Dashboard' },
        { path: '/guru/criteria', icon: Target, label: 'Kriteria' },
        { path: '/guru/result', icon: BarChart3, label: 'Hasil Penilaian' },
        { path: '/guru/report', icon: FileText, label: 'Laporan' },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SPK AHP</h1>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;