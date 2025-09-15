import React from 'react';
import { Users, Target, BookOpen, BarChart3, FileText, Calculator } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { 
      name: 'Total User', 
      value: '24', 
      icon: Users, 
      color: 'bg-blue-500',
      change: '+12%'
    },
    { 
      name: 'Kriteria', 
      value: '6', 
      icon: Target, 
      color: 'bg-green-500',
      change: '+0%'
    },
    { 
      name: 'Data Guru', 
      value: '45', 
      icon: BookOpen, 
      color: 'bg-purple-500',
      change: '+8%'
    },
    { 
      name: 'Hasil AHP', 
      value: '12', 
      icon: BarChart3, 
      color: 'bg-orange-500',
      change: '+25%'
    },
  ];

  const recentActivities = [
    { id: 1, action: 'User baru ditambahkan', user: 'Admin', time: '2 menit yang lalu' },
    { id: 2, action: 'Pairwise comparison diperbarui', user: 'Operator', time: '5 menit yang lalu' },
    { id: 3, action: 'Laporan AHP diunduh', user: 'Guru', time: '10 menit yang lalu' },
    { id: 4, action: 'Kriteria baru ditambahkan', user: 'Admin', time: '15 menit yang lalu' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600">Selamat datang di sistem penunjang keputusan AHP</p>
        </div>
        <div className="flex items-center space-x-3">
          <Calculator className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className="ml-2 text-sm font-medium text-green-600">
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">
                      oleh {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Kelola User</p>
                    <p className="text-sm text-gray-500">Tambah, edit, atau hapus user</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Kelola Kriteria</p>
                    <p className="text-sm text-gray-500">Atur kriteria dan sub-kriteria</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Lihat Hasil AHP</p>
                    <p className="text-sm text-gray-500">Analisis dan laporan hasil</p>
                  </div>
                </div>
              </button>

              <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-orange-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Generate Laporan</p>
                    <p className="text-sm text-gray-500">Export ke PDF atau Excel</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Sistem</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-green-800">Database</p>
              <p className="text-xs text-green-600">Connected</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-green-800">AHP Engine</p>
              <p className="text-xs text-green-600">Running</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-green-800">Export Service</p>
              <p className="text-xs text-green-600">Available</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;