export interface Candidate {
  id: number;
  fullName: string;
  email: string;
  appliedPosition: string;
  status: 'applied' | 'screening' | 'hired' | 'rejected';
}