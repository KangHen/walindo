export interface Transaction {
    id: number;
    title: string;
    amount: number;
    date?: string;
    description?: string;
    icon: string;
    type?: 'credit' | 'debit';
}