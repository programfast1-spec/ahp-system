import React from 'react';
import { BarChart3, Calculator, GitCompare, BookOpen, CheckCircle, Clock } from 'lucide-react';

const OperatorDashboard: React.FC = () => {
  const stats = [
    { 
      name: 'Data Guru', 
      value: '45', 
      icon: BookOpen, 
      color: 'bg-purple-500',
      change: '+5%'
    },
    { 
      name: 'Matrix Completed', 
      value: '8/10', 
      icon: GitCompare, 
      color: 'bg-blue-500',
      change: '+20%'
    },
    { 
      name: 'AHP Calculations', 
      value: '15', 
      icon: Calculator, 
      color: 'bg-green-500',
      change: '+10%'
    },
    { 
      name: 'Reports Generated', 
      value: '23', 
      icon: BarChart3, 
      color: 'bg-orange-500',
      change: '+15%'
    },
  ];

  const recentTasks = [
    { id: 1, task: 'Update pairwise kriteria sosial', status: 'completed', time: '10 menit lalu' },
    { id: 2, task: 'Input data guru baru', status: 'in-progress', time: '30 menit lalu' },
    { id: 3, task: 'Generate laporan pelatihan', status: 'pending', time: '1 jam lalu' },
    { id: 4, task: 'Validasi consistency ratio', status: 'completed', time: '2 jam lalu' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'in-progress':
        return 'Sedang Dikerjakan';
      default:
        return 'Menunggu';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Operator</h1>
          <p className="text-gray-600">Kelola data dan proses perhitungan AHP</p>
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
        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Tugas Terbaru</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3">
                  {getStatusIcon(task.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {task.task}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getStatusText(task.status)}
                      </span>
                      <span className="text-xs text-gray-500">{task.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AHP Progress */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Progress AHP</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-2">
                  <span>Pairwise Kriteria</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-2">
                  <span>Pairwise Sub-Kriteria</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-2">
                  <span>Penilaian Alternatif</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-2">
                  <span>Consistency Check</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <div className="text-center">
                <GitCompare className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Input Pairwise</p>
                <p className="text-xs text-gray-500">Masukkan nilai perbandingan</p>
              </div>
            </button>

            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
              <div className="text-center">
                <Calculator className="w-8 h-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Hitung AHP</p>
                <p className="text-xs text-gray-500">Proses perhitungan bobot</p>
              </div>
            </button>

            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Lihat Hasil</p>
                <p className="text-xs text-gray-500">Analisis dan laporan</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;