import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Target } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import { Criteria } from '../../types';
import { ahpService } from '../../services/ahpService';

const CriteriaManagement: React.FC = () => {
  const [criteria, setCriteria] = useState<Criteria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCriteria, setEditingCriteria] = useState<Criteria | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    parent_id: null as number | null,
  });

  // Default criteria based on the AHP data provided
  const defaultCriteria = [
    { name: 'Pedagogik', code: 'PED', parent_id: null },
    { name: 'Kepribadian', code: 'KEP', parent_id: null },
    { name: 'Sosial', code: 'SOS', parent_id: null },
    { name: 'Profesional', code: 'PRO', parent_id: null },
    { name: 'Pembelajaran Kolaboratif', code: 'PK', parent_id: null },
    { name: 'Literasi Data', code: 'LD', parent_id: null },
  ];

  useEffect(() => {
    loadCriteria();
  }, []);

  const loadCriteria = async () => {
    try {
      const response = await ahpService.getCriteria();
      setCriteria(response.data);
    } catch (error) {
      // If API fails, use default criteria
      console.error('Failed to load criteria, using defaults:', error);
      const defaultWithIds = defaultCriteria.map((item, index) => ({
        id: index + 1,
        ...item,
      }));
      setCriteria(defaultWithIds);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCriteria) {
        await ahpService.updateCriteria(editingCriteria.id, formData);
      } else {
        await ahpService.createCriteria(formData);
      }
      
      await loadCriteria();
      resetForm();
    } catch (error) {
      console.error('Failed to save criteria:', error);
      // For demo purposes, simulate success
      const newCriteria = {
        id: Math.max(...criteria.map(c => c.id), 0) + 1,
        ...formData,
      };
      
      if (editingCriteria) {
        setCriteria(criteria.map(c => c.id === editingCriteria.id ? { ...c, ...formData } : c));
      } else {
        setCriteria([...criteria, newCriteria]);
      }
      resetForm();
    }
  };

  const handleEdit = (item: Criteria) => {
    setEditingCriteria(item);
    setFormData({
      name: item.name,
      code: item.code || '',
      parent_id: item.parent_id || null,
    });
    setShowModal(true);
  };

  const handleDelete = async (item: Criteria) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus kriteria "${item.name}"?`)) {
      return;
    }

    try {
      await ahpService.deleteCriteria(item.id);
      await loadCriteria();
    } catch (error) {
      console.error('Failed to delete criteria:', error);
      // For demo purposes, simulate success
      setCriteria(criteria.filter(c => c.id !== item.id));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', code: '', parent_id: null });
    setEditingCriteria(null);
    setShowModal(false);
  };

  const columns = [
    {
      key: 'code' as keyof Criteria,
      label: 'Kode',
      render: (value: string) => value || '-',
    },
    {
      key: 'name' as keyof Criteria,
      label: 'Nama Kriteria',
    },
    {
      key: 'parent_id' as keyof Criteria,
      label: 'Parent',
      render: (value: number | null) => {
        if (!value) return 'Root';
        const parent = criteria.find(c => c.id === value);
        return parent?.name || '-';
      },
    },
    {
      key: 'weight' as keyof Criteria,
      label: 'Bobot',
      render: (value: number) => value ? `${(value * 100).toFixed(2)}%` : '-',
    },
  ];

  const parentCriteria = criteria.filter(c => !c.parent_id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Kriteria</h1>
          <p className="text-gray-600">Kelola kriteria dan sub-kriteria untuk penilaian AHP</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kriteria</span>
        </button>
      </div>

      <DataTable
        data={criteria}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingCriteria ? 'Edit Kriteria' : 'Tambah Kriteria'}
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kode Kriteria
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: PED"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Kriteria *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: Pedagogik"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent Kriteria
                </label>
                <select
                  value={formData.parent_id || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    parent_id: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Root (Kriteria Utama)</option>
                  {parentCriteria.map(parent => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Pilih parent jika ini adalah sub-kriteria
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingCriteria ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriteriaManagement;