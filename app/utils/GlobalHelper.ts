// app/utils/GlobalHelper.ts
import {
  TransactionRange,
  TransactionStatus,
  TransactionType,
} from "~/types/enums/transaction";

import type {
  TransactionItem,
  TransactionItemOptions,
} from "~/types/models/transaction";


export function formatGroupDate(dateStr: string) {
  const trxDate = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  if (sameDay(trxDate, today)) return "Today";
  if (sameDay(trxDate, yesterday)) return "Yesterday";

  return trxDate.toLocaleDateString("en-GB");
}

export function formatAmountCurrency(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export function formatDateLocal(date: string | Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatTimeLocal(date: string | Date) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(date));
}

export function statusColorLabel(status: string | undefined) {
  switch (status) {
    case TransactionStatus.SUCCESS:
      return { bg: "bg-green-500", icon: "pi pi-check" };
    case TransactionStatus.PENDING:
      return { bg: "bg-yellow-500", icon: "pi pi-clock" };
    case TransactionStatus.FAILED:
      return { bg: "bg-red-500", icon: "pi pi-times" };
    default:
      return { bg: "bg-gray-400", icon: "pi pi-question" };
  }
}

export function typeColorLabel(type: string | undefined) {
  switch (type) {
    case TransactionType.CREDIT:
      return { bg: "bg-green-100 text-green-600", icon: "pi pi-arrow-down" };
    case TransactionType.DEBIT:
      return { bg: "bg-red-100 text-red-600", icon: "pi pi-arrow-up" };
    case TransactionType.DEPOSIT:
      return { bg: "bg-blue-100 text-blue-600", icon: "pi pi-wallet" };
    case TransactionType.WITHDRAW:
      return { bg: "bg-yellow-100 text-yellow-600", icon: "pi pi-upload" };
    case TransactionType.TRANSFER:
      return {
        bg: "bg-purple-100 text-purple-600",
        icon: "pi pi-arrow-right-arrow-left",
      };
    default:
      return { bg: "bg-gray-100 text-gray-600", icon: "pi pi-question" };
  }
}

export function getTransactionItems({
  onTransfer,
  onTopUp,
}: TransactionItemOptions = {}): TransactionItem[] {
  const router = useRouter()
  return [
    {
      label: 'Transfer',
      icon: 'pi pi-send',
      route: '/transfer',
      action: onTransfer || (() => router.push('/transfer')),
    },
    {
      label: 'Top Up',
      icon: 'pi pi-wallet',
      route: '/transaction/topup',
      action: onTopUp || (() => router.push('/transaction/topup')),
    },
    {
      label: 'Withdraw',
      icon: 'pi pi-arrow-down',
      route: '/transaction/withdraw',
      action: () => router.push('/transaction/withdraw'),
    },
    {
      label: 'Payment',
      icon: 'pi pi-credit-card',
      route: '/transaction/payment',
      action: () => router.push('/transaction/payment'),
    },
    {
      label: 'History',
      icon: 'pi pi-clock',
      route: '/transaction/history',
      action: () => router.push('/transaction/history'),
    },
    {
      label: 'More',
      icon: 'pi pi-ellipsis-h',
      action: () => console.log('Show more menu...'),
    },
  ]
}


export function getWalletMutationDirection(
  trx: any, 
  currentWalletId?: string | number
) {
  const mutation = trx.mutations?.[0];
  if (!mutation) return null;
  return mutation.mutation_type;
}

export const OptionListHelper = {
  typeOptions(withAll = true) {
    const options = Object.values(TransactionType).map((type) => ({
      label: capitalizeLabel(type),
      value: type,
    }));
    return withAll ? [{ label: "All", value: "" }, ...options] : options;
  },

  statusOptions(withAll = true) {
    const options = Object.values(TransactionStatus).map((status) => ({
      label: capitalizeLabel(status),
      value: status,
    }));
    return withAll ? [{ label: "All", value: "" }, ...options] : options;
  },

  rangeOptions(withAll = false) {
    const mapping: Record<TransactionRange, string> = {
      [TransactionRange.ONE_MONTH]: "1 Bulan",
      [TransactionRange.THREE_MONTH]: "3 Bulan",
      [TransactionRange.TWELVE_MONTH]: "12 Bulan",
    };

    const options = Object.values(TransactionRange).map((range) => ({
      label: mapping[range],
      value: range,
    }));

    return withAll ? [{ label: "All", value: "" }, ...options] : options;
  },

  generateOptions(list: string[], withAll = false) {
    const opts = list.map((item) => ({
      label: capitalizeLabel(item),
      value: item.toLowerCase(),
    }));
    return withAll ? [{ label: "All", value: "" }, ...opts] : opts;
  },
};

function capitalizeLabel(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
