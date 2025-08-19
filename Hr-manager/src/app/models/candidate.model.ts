export interface Candidate {
  id: number;
  fullName: string;
  email: string;
  appliedDepartmentId: number | null;
  status: 'applied' | 'screening' | 'hired' | 'rejected';
}