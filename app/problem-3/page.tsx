import Link from "next/link";
import { useMemo } from "react";
import { useWalletBalances } from "../hook/useWalletBalances";
import { usePrices } from "../hook/usePrices";
import WalletRow from "../component/problem-3/WalletRow";
import BackLink from "../component/common/BackLink";

export const metadata = {
  title: "Resolve problem 3",
};

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo"; // Fixed type mismatch, assuming blockchain should be part of WalletBalance, blockchain should be Union Types, one of them can be used
}

interface FormattedWalletBalance extends WalletBalance {
  priority: number;
  formatted: string;
}

type SearchParams = { [key: string]: string | string[] | undefined };

interface Props {
  searchParams: SearchParams;
}

// move blockchainPriorities outside to avoid re-create when component update state
const blockchainPriorities: Record<WalletBalance["blockchain"] | "default", number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
  default: -99,
};

const WalletPage: React.FC<Props> = (props) => {
  const { searchParams, ...rest } = props;
  const { balances } = useWalletBalances();
  const { prices } = usePrices();

  const getPriority = (blockchain: WalletBalance["blockchain"]): number => {
    return blockchainPriorities[blockchain] ?? blockchainPriorities.default;
  };

  /* Issue and solution to fixed:
  1. The useMemo block filters balances for a priority check getPriority(balance.blockchain) and amount <= 0 condition,
  but only returns true for cases where balance.amount <= 0.  => This logic appears incorrect

  2. "lhsPriority "is used but not declared in sortedBalances => will get error => I think it should be result of getPriority(balance.blockchain)

  3. formattedBalances is derived from sortedBalances, but formattedBalances is not used directly to render rows.
  Instead, sortedBalances.map is repeated, calculating values redundantly. => I think after filter, we can use map method to loop over the
  array and calculation formatted => after that we can sort.

  4. Removed prices as an unnecessary dependency => avoid re-calculations based on prices, which are not used in sortedBalances.

  5. Should be check balance.currency is exist in prices object or not
  */

  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
        priority: getPriority(balance.blockchain), // cache priority to prepare for sort and avoid call getPriority() too much => This optimizes the sorting operation.
      }))
      .sort((lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) => lhs.priority - rhs.priority);
  }, [balances]); // Removed prices as an unnecessary dependency

  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    // should be check balance.currency is exist in prices object or not
    if (!prices[balance.currency]) {
      console.warn(`Price not found for currency: ${balance.currency}`);
    }

    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;

    return (
      <WalletRow
        className="d-flex"
        key={`${balance.currency}-${balance.amount}`} // Improved key to avoid index usage
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div className="container mx-auto p-6">
      <BackLink />
      <h1 className="mt-5 text-4xl font-bold text-purple-600 mb-6">
        The issue and its solution have been added to the command line. <br /> Please prefer the source code
      </h1>
      {rows}
    </div>
  );
};

export default WalletPage;
