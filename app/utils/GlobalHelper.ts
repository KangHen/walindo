// app/utils/GlobalHelper.ts
import { TransactionRange, TransactionStatus, TransactionType } from "~/types/enums/transaction"

export function formatAmountCurrency(value: number) {
  return new Intl.NumberFormat('id-ID').format(value)
}

export function formatDateLocal(date: string | Date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function statusColorLabel(status: string | undefined) {
  switch (status) {
    case TransactionStatus.SUCCESS:
      return 'success'
    case TransactionStatus.PENDING:
      return 'warning'
    case TransactionStatus.FAILED:
      return 'danger'
    default:
      return 'info'
  }
}

export const OptionListHelper = {

  typeOptions(withAll = true) {
    const options = Object.values(TransactionType).map(type => ({
      label: capitalizeLabel(type),
      value: type,
    }))
    return withAll ? [{ label: 'All', value: '' }, ...options] : options
  },

  statusOptions(withAll = true) {
    const options = Object.values(TransactionStatus).map(status => ({
      label: capitalizeLabel(status),
      value: status,
    }))
    return withAll ? [{ label: 'All', value: '' }, ...options] : options
  },

  rangeOptions(withAll = false) {
    const mapping: Record<TransactionRange, string> = {
      [TransactionRange.ONE_MONTH]: '1 Bulan',
      [TransactionRange.THREE_MONTH]: '3 Bulan',
      [TransactionRange.TWELVE_MONTH]: '12 Bulan',
    }

    const options = Object.values(TransactionRange).map(range => ({
      label: mapping[range],
      value: range,
    }))

    return withAll ? [{ label: 'All', value: '' }, ...options] : options
  },

  generateOptions(list: string[], withAll = false) {
    const opts = list.map(item => ({
      label: capitalizeLabel(item),
      value: item.toLowerCase(),
    }))
    return withAll ? [{ label: 'All', value: '' }, ...opts] : opts
  },
}

function capitalizeLabel(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
