export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  TRANSFER = "transfer",
}

export enum TransactionStatus {
  SUCCESS = "success",
  PENDING = "pending",
  FAILED = "failed",
}

export enum TransactionRange {
  ONE_MONTH = "1m",
  THREE_MONTH = "3m",
  TWELVE_MONTH = "12m",
}
