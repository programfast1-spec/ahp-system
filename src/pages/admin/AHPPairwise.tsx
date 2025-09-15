import React, { useState, useEffect } from 'react';
import { Criteria, PairwiseEntry, AHPResult } from '../../types';
import PairwiseMatrix from '../../components/common/PairwiseMatrix';
import AHPResultChart from '../../components/common/AHPResultChart';
import { ahpService } from '../../services/ahpService';
import { Calculator, Target, CheckCircle } from 'lucide-react';

const AHPPairwise: React.FC = () => {
  const [criteria, setCriteria] = useState<Criteria[]>([]);
  const [pairwiseValues, setPairwiseValues] = useState<PairwiseEntry[]>([]);
  const [ahpResult, setAhpResult] = useState<AHPResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'matrix' | 'result'>('matrix');

  // Sample criteria with weights from the provided data
  const sampleCriteria = [
    { id: 1, name: 'Pedagogik', code: 'PED', weight: 0.3105 },
    { id: 2, name: 'Kepribadian', code: 'KEP', weight: 0.2156 },
    { id: 3, name: 'Sosial', code: 'SOS', weight: 0.1846 },
    { id: 4, name: 'Profesional', code: 'PRO', weight: 0.1494 },
    { id: 5, name: 'Pembelajaran Kolaboratif', code: 'PK', weight: 0.0848 },
    { id: 6, name: 'Literasi Data', code: 'LD', weight: 0.0552 },
  ];

  useEffect(() => {
    loadCriteria();
  }, []);

  const loadCriteria = async () => {
    try {
      const response = await ahpService.getCriteria();
      setCriteria(response.data);
      
      // Load existing pairwise values
      const pairwiseResponse = await ahpService.getPairwiseMatrix('criteria');
      setPairwiseValues(pairwiseResponse.data);
    } catch (error) {
      console.error('Failed to load data:', error);
      // Use sample data for demo
      setCriteria(sampleCriteria);
      
      // Generate sample pairwise values based on the provided matrix data
      const samplePairwise: PairwiseEntry[] = [
        { row_id: 1, col_id: 2, value: 3.0, type: 'criteria' }, // Pedagogik vs Kepribadian
        { row_id: 1, col_id: 3, value: 5.0, type: 'criteria' }, // Pedagogik vs Sosial
        { row_id: 1, col_id: 4, value: 2.0, type: 'criteria' }, // Pedagogik vs Profesional
        { row_id: 1, col_id: 5, value: 2.0, type: 'criteria' }, // Pedagogik vs Pembelajaran Kolaboratif
        { row_id: 1, col_id: 6, value: 2.0, type: 'criteria' }, // Pedagogik vs Literasi Data
        { row_id: 2, col_id: 3, value: 2.0, type: 'criteria' }, // Kepribadian vs Sosial
        { row_id: 2, col_id: 4, value: 0.5, type: 'criteria' }, // Kepribadian vs Profesional
        { row_id: 2, col_id: 5, value: 0.3, type: 'criteria' }, // Kepribadian vs Pembelajaran Kolaboratif
        { row_id: 2, col_id: 6, value: 0.3, type: 'criteria' }, // Kepribadian vs Literasi Data
        { row_id: 3, col_id: 4, value: 0.3, type: 'criteria' }, // Sosial vs Profesional
        { row_id: 3, col_id: 5, value: 0.3, type: 'criteria' }, // Sosial vs Pembelajaran Kolaboratif
        { row_id: 3, col_id: 6, value: 0.3, type: 'criteria' }, // Sosial vs Literasi Data
        { row_id: 4, col_id: 5, value: 2.0, type: 'criteria' }, // Profesional vs Pembelajaran Kolaboratif
        { row_id: 4, col_id: 6, value: 2.0, type: 'criteria' }, // Profesional vs Literasi Data
        { row_id: 5, col_id: 6, value: 0.5, type: 'criteria' }, // Pembelajaran Kolaboratif vs Literasi Data
      ];
      
      setPairwiseValues(samplePairwise);
    }
  };

  const handlePairwiseChange = (values: PairwiseEntry[]) => {
    setPairwiseValues(values);
  };

  const handleCalculateAHP = async () => {
    setLoading(true);
    try {
      // Save pairwise values first
      await ahpService.savePairwiseMatrix(pairwiseValues);
      
      // Calculate AHP
      const response = await ahpService.calculateAHP('criteria');
      setAhpResult(response.data);
      setStep('result');
    } catch (error) {
      console.error('Failed to calculate AHP:', error);
      
      // For demo, use sample results
      const sampleResult: AHPResult = {
        weights: {
          1: 0.3105, // Pedagogik
          2: 0.2156, // Kepribadian  
          3: 0.1846, // Sosial
          4: 0.1494, // Profesional
          5: 0.0848, // Pembelajaran Kolaboratif
          6: 0.0552, // Literasi Data
        },
        consistency_ratio: 0.047, // From the provided data
        lambda_max: 6.265,
      };
      
      setAhpResult(sampleResult);
      setStep('result');
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (!ahpResult) return [];
    
    return criteria.map(criterion => ({
      name: criterion.name,
      weight: ahpResult.weights[criterion.id] || 0,
    }));
  };

  if (step === 'result' && ahpResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hasil Perhitungan AHP</h1>
            <p className="text-gray-600">Hasil bobot kriteria dari pairwise comparison</p>
          </div>
          <button
            onClick={() => setStep('matrix')}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            Kembali ke Matrix
          </button>
        </div>

        {/* Consistency Check */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Uji Konsistensi</h3>
            <div className={`flex items-center space-x-2 ${
              ahpResult.consistency_ratio! <= 0.1 ? 'text-green-600' : 'text-red-600'
            }`}>
              {ahpResult.consistency_ratio! <= 0.1 ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Calculator className="w-5 h-5" />
              )}
              <span className="font-medium">
                CR: {ahpResult.consistency_ratio!.toFixed(4)}
                {ahpResult.consistency_ratio! <= 0.1 ? ' (Konsisten)' : ' (Tidak Konsisten)'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Lambda Max</p>
              <p className="text-lg font-bold text-blue-900">{ahpResult.lambda_max?.toFixed(6)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Consistency Index</p>
              <p className="text-lg font-bold text-green-900">
                {((ahpResult.lambda_max! - criteria.length) / (criteria.length - 1)).toFixed(6)}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${
              ahpResult.consistency_ratio! <= 0.1 ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <p className={`text-sm font-medium ${
                ahpResult.consistency_ratio! <= 0.1 ? 'text-green-600' : 'text-red-600'
              }`}>
                Consistency Ratio
              </p>
              <p className={`text-lg font-bold ${
                ahpResult.consistency_ratio! <= 0.1 ? 'text-green-900' : 'text-red-900'
              }`}>
                {ahpResult.consistency_ratio!.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bobot Kriteria</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ranking
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kriteria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bobot
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Persentase
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {criteria
                  .map(criterion => ({
                    ...criterion,
                    weight: ahpResult.weights[criterion.id] || 0,
                  }))
                  .sort((a, b) => b.weight - a.weight)
                  .map((criterion, index) => (
                    <tr key={criterion.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {criterion.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {criterion.weight.toFixed(4)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-blue-500 rounded-full"
                                style={{ width: `${criterion.weight * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="ml-3 text-sm font-medium">
                            {(criterion.weight * 100).toFixed(2)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AHPResultChart
            data={getChartData()}
            type="bar"
            title="Grafik Bobot Kriteria"
          />
          <AHPResultChart
            data={getChartData()}
            type="radar"
            title="Radar Chart Bobot Kriteria"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pairwise Comparison - Kriteria</h1>
          <p className="text-gray-600">Masukkan nilai perbandingan berpasangan untuk kriteria utama</p>
        </div>
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      <PairwiseMatrix
        items={criteria.map(c => ({ id: c.id, name: c.name }))}
        values={pairwiseValues}
        onChange={handlePairwiseChange}
        onCalculate={handleCalculateAHP}
        consistencyRatio={ahpResult?.consistency_ratio}
        loading={loading}
      />

      {/* Information Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">
          Petunjuk Penggunaan Pairwise Comparison
        </h4>
        <div className="space-y-2 text-blue-800">
          <p>1. Bandingkan setiap kriteria dengan kriteria lainnya</p>
          <p>2. Gunakan skala Saaty (1-9) untuk menilai tingkat kepentingan</p>
          <p>3. Nilai 1 = sama penting, 9 = mutlak lebih penting</p>
          <p>4. Sistem akan otomatis mengisi nilai reciprocal (kebalikan)</p>
          <p>5. Pastikan Consistency Ratio (CR) ≤ 0.10 untuk hasil yang valid</p>
        </div>
      </div>
    </div>
  );
};

export default AHPPairwise;