import React from 'react';
import { User, Award, TrendingUp, FileText, Download, Star } from 'lucide-react';

const GuruDashboard: React.FC = () => {
  // Sample teacher data
  const teacherProfile = {
    name: 'Ahmad Susanto, S.Pd',
    nip: '197504152000031001',
    subject: 'Matematika',
    rank: 3,
    totalScore: 0.847,
    lastUpdated: '2024-01-15',
  };

  const criteriaScores = [
    { name: 'Pedagogik', weight: 0.3105, score: 0.85, weightedScore: 0.264 },
    { name: 'Kepribadian', weight: 0.2156, score: 0.92, weightedScore: 0.198 },
    { name: 'Sosial', weight: 0.1846, score: 0.78, weightedScore: 0.144 },
    { name: 'Profesional', weight: 0.1494, score: 0.88, weightedScore: 0.131 },
    { name: 'Pembelajaran Kolaboratif', weight: 0.0848, score: 0.73, weightedScore: 0.062 },
    { name: 'Literasi Data', weight: 0.0552, score: 0.85, weightedScore: 0.047 },
  ];

  const recommendations = [
    'Prioritas untuk pelatihan Teknologi Pembelajaran',
    'Direkomendasikan untuk pelatihan Metode Pembelajaran Inovatif',
    'Sesuai untuk program pengembangan keprofesian berkelanjutan',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Guru</h1>
          <p className="text-gray-600">Lihat profil dan hasil penilaian Anda</p>
        </div>
        <div className="flex items-center space-x-3">
          <User className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{teacherProfile.name}</h2>
              <p className="text-blue-100">NIP: {teacherProfile.nip}</p>
              <p className="text-blue-100">Mata Pelajaran: {teacherProfile.subject}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-6 h-6 text-yellow-300" />
              <span className="text-2xl font-bold">#{teacherProfile.rank}</span>
            </div>
            <p className="text-blue-100">Peringkat</p>
          </div>
        </div>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Skor</p>
              <p className="text-2xl font-bold text-gray-900">{teacherProfile.totalScore}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Peringkat</p>
              <p className="text-2xl font-bold text-gray-900">#{teacherProfile.rank}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Kategori</p>
              <p className="text-lg font-bold text-gray-900">Sangat Baik</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Detail Penilaian per Kriteria</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Kriteria</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Bobot</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Skor</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Skor Tertimbang</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Performance</th>
                </tr>
              </thead>
              <tbody>
                {criteriaScores.map((criteria, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-gray-900">{criteria.name}</td>
                    <td className="py-4 px-4 text-center text-gray-600">
                      {(criteria.weight * 100).toFixed(1)}%
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${
                        criteria.score >= 0.9 ? 'bg-green-100 text-green-800' :
                        criteria.score >= 0.8 ? 'bg-blue-100 text-blue-800' :
                        criteria.score >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {(criteria.score * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-medium text-gray-900">
                      {criteria.weightedScore.toFixed(3)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            criteria.score >= 0.9 ? 'bg-green-500' :
                            criteria.score >= 0.8 ? 'bg-blue-500' :
                            criteria.score >= 0.7 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${criteria.score * 100}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Rekomendasi Pelatihan</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Lihat Laporan Detail</span>
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">Download PDF</span>
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Download Excel</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Last Update Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <span className="font-medium">Terakhir diperbarui:</span> {teacherProfile.lastUpdated}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Data penilaian ini didasarkan pada hasil perhitungan AHP terbaru dari sistem.
        </p>
      </div>
    </div>
  );
};

export default GuruDashboard;