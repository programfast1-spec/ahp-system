export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'guru';
  created_at?: string;
  updated_at?: string;
}

export interface Criteria {
  id: number;
  code?: string;
  name: string;
  weight?: number;
  parent_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Alternative {
  id: number;
  code?: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PairwiseEntry {
  id?: number;
  row_id: number;
  col_id: number;
  value: number;
  type: 'criteria' | 'alternative';
  user_id?: number;
}

export interface AHPResult {
  id?: number;
  weights: Record<number, number>;
  consistency_ratio?: number;
  lambda_max?: number;
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Teacher {
  id: number;
  name: string;
  nip: string;
  subject: string;
  scores: Record<number, number>;
  total_score?: number;
  rank?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Training {
  id: number;
  title: string;
  description: string;
  duration: number;
  max_participants: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'inactive' | 'completed';
  created_at?: string;
  updated_at?: string;
}