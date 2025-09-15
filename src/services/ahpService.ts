import { api } from './api';
import { Criteria, PairwiseEntry, AHPResult } from '../types';

export const ahpService = {
  // Criteria management
  getCriteria: () => api.get<Criteria[]>('/criteria'),
  createCriteria: (data: Partial<Criteria>) => api.post<Criteria>('/criteria', data),
  updateCriteria: (id: number, data: Partial<Criteria>) => api.put<Criteria>(`/criteria/${id}`, data),
  deleteCriteria: (id: number) => api.delete(`/criteria/${id}`),

  // Pairwise comparisons
  getPairwiseMatrix: (type: 'criteria' | 'alternative', parentId?: number) => 
    api.get<PairwiseEntry[]>(`/ahp/pairwise/${type}${parentId ? `/${parentId}` : ''}`),
  savePairwiseMatrix: (entries: PairwiseEntry[]) => 
    api.post<void>('/ahp/pairwise', { entries }),

  // AHP calculation
  calculateAHP: (type: 'criteria' | 'alternative', parentId?: number) => 
    api.post<AHPResult>(`/ahp/calculate/${type}${parentId ? `/${parentId}` : ''}`),
  getAHPResults: () => api.get<AHPResult[]>('/ahp/results'),

  // Export
  exportResults: (format: 'pdf' | 'excel') => 
    api.get(`/ahp/export/${format}`, { responseType: 'blob' }),
};