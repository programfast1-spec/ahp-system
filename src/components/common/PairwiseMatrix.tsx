import React, { useState, useEffect } from 'react';
import { PairwiseEntry } from '../../types';
import { Calculator, CheckCircle, AlertCircle } from 'lucide-react';

interface PairwiseMatrixProps {
  items: Array<{ id: number; name: string; }>;
  values: PairwiseEntry[];
  onChange: (values: PairwiseEntry[]) => void;
  onCalculate: () => void;
  consistencyRatio?: number;
  loading?: boolean;
}

const SAATY_SCALE = [
  { value: 1, label: '1 - Sama penting' },
  { value: 2, label: '2 - Sedikit lebih penting' },
  { value: 3, label: '3 - Lebih penting' },
  { value: 4, label: '4 - Sangat lebih penting' },
  { value: 5, label: '5 - Mutlak lebih penting' },
  { value: 6, label: '6 - Sangat mutlak lebih penting' },
  { value: 7, label: '7 - Ekstrim lebih penting' },
  { value: 8, label: '8 - Sangat ekstrim lebih penting' },
  { value: 9, label: '9 - Mutlak ekstrim lebih penting' },
];

const PairwiseMatrix: React.FC<PairwiseMatrixProps> = ({
  items,
  values,
  onChange,
  onCalculate,
  consistencyRatio,
  loading = false,
}) => {
  const [matrix, setMatrix] = useState<number[][]>([]);

  useEffect(() => {
    initializeMatrix();
  }, [items, values]);

  const initializeMatrix = () => {
    const n = items.length;
    const newMatrix = Array(n).fill(null).map(() => Array(n).fill(1));

    // Fill diagonal with 1
    for (let i = 0; i < n; i++) {
      newMatrix[i][i] = 1;
    }

    // Fill with existing values
    values.forEach(entry => {
      const rowIndex = items.findIndex(item => item.id === entry.row_id);
      const colIndex = items.findIndex(item => item.id === entry.col_id);
      
      if (rowIndex !== -1 && colIndex !== -1) {
        newMatrix[rowIndex][colIndex] = entry.value;
        // Reciprocal value
        if (rowIndex !== colIndex) {
          newMatrix[colIndex][rowIndex] = 1 / entry.value;
        }
      }
    });

    setMatrix(newMatrix);
  };

  const handleValueChange = (row: number, col: number, value: number) => {
    if (row === col) return; // Diagonal elements are always 1

    const newMatrix = [...matrix];
    newMatrix[row][col] = value;
    newMatrix[col][row] = 1 / value; // Reciprocal

    setMatrix(newMatrix);

    // Convert matrix to PairwiseEntry array
    const newValues: PairwiseEntry[] = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        newValues.push({
          row_id: items[i].id,
          col_id: items[j].id,
          value: newMatrix[i][j],
          type: 'criteria', // This should be determined by parent component
        });
      }
    }

    onChange(newValues);
  };

  const getConsistencyColor = () => {
    if (consistencyRatio === undefined) return 'text-gray-500';
    if (consistencyRatio <= 0.1) return 'text-green-600';
    return 'text-red-600';
  };

  const getConsistencyIcon = () => {
    if (consistencyRatio === undefined) return null;
    if (consistencyRatio <= 0.1) return <CheckCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Matriks Perbandingan Berpasangan
        </h3>
        <p className="text-sm text-gray-600">
          Masukkan nilai perbandingan menggunakan skala Saaty (1-9)
        </p>
      </div>

      <div className="mb-4 bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Skala Saaty:</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {SAATY_SCALE.slice(0, 5).map(scale => (
            <div key={scale.value} className="text-blue-800">
              {scale.label}
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Kriteria
              </th>
              {items.map(item => (
                <th
                  key={item.id}
                  className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase transform -rotate-45"
                  style={{ minWidth: '60px' }}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    {item.name.substring(0, 8)}...
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((rowItem, rowIndex) => (
              <tr key={rowItem.id} className="border-t">
                <td className="px-2 py-2 text-sm font-medium text-gray-900">
                  {rowItem.name}
                </td>
                {items.map((colItem, colIndex) => (
                  <td key={colItem.id} className="px-2 py-2 text-center">
                    {rowIndex === colIndex ? (
                      <div className="w-16 h-8 bg-gray-100 rounded flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                    ) : rowIndex < colIndex ? (
                      <select
                        value={matrix[rowIndex]?.[colIndex] || 1}
                        onChange={(e) => handleValueChange(rowIndex, colIndex, parseFloat(e.target.value))}
                        className="w-16 h-8 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {SAATY_SCALE.map(scale => (
                          <option key={scale.value} value={scale.value}>
                            {scale.value}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="w-16 h-8 bg-gray-50 rounded flex items-center justify-center text-xs text-gray-600">
                        {matrix[rowIndex]?.[colIndex]?.toFixed(2) || '1.00'}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {consistencyRatio !== undefined && (
            <div className={`flex items-center space-x-2 ${getConsistencyColor()}`}>
              {getConsistencyIcon()}
              <span className="text-sm font-medium">
                CR: {consistencyRatio.toFixed(4)}
                {consistencyRatio <= 0.1 ? ' (Konsisten)' : ' (Tidak Konsisten)'}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onCalculate}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Calculator className="w-4 h-4" />
          <span>{loading ? 'Menghitung...' : 'Hitung AHP'}</span>
        </button>
      </div>
    </div>
  );
};

export default PairwiseMatrix;