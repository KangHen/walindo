import { MutationType } from '../enums/mutation';

export interface Mutation {
  id: string;
  transaction_id: string;
  wallet_id: string;
  mutation_type: MutationType; 
  amount: string;
  balance_before: string;
  balance_after: string;
  description: string;
  created_at: string;
  updated_at: string;
}