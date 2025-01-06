import Link from "next/link";
import BackLink from "../component/common/BackLink";

export const metadata = {
  title: "Resolve problem 1",
};

export default function PageProblem1() {
  // Option 1: create new Array with length is n and use reduce method to sum
  const sum_to_n_a = function (n: number) {
    const coverToPositive = Math.abs(n);
    const sum = Array.from({ length: coverToPositive }, (_, i) => i + 1).reduce((acc, val) => acc + val, 0);
    return n < 0 ? -sum : sum;
  };

  // Option 2: use a for loop to accumulate the sum.
  const sum_to_n_b = function (n: number) {
    const coverToPositive = Math.abs(n);
    let sum = 0;
    for (let i = 1; i <= coverToPositive; i++) {
      sum += i;
    }
    return n < 0 ? -sum : sum;
  };

  // Option 3: use sum = (n * ( n + 1)) / 2
  const sum_to_n_c = function (n: number) {
    const coverToPositive = Math.abs(n);
    const sum = (coverToPositive * (coverToPositive + 1)) / 2;
    return n < 0 ? -sum : sum;
  };
  return (
    <div className="container mx-auto p-6">
      <BackLink />
      <h1 className="mt-5 text-4xl font-bold text-purple-600 mb-6">Resolve Problem 1: Three Ways to Sum to N</h1>

      <div className="space-y-4 text-lg">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800">Result Option 1:</span>
          <span className="text-violet-600">{sum_to_n_a(-5)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800">Result Option 2:</span>
          <span className="text-violet-600">{sum_to_n_b(-2)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-800">Result Option 3:</span>
          <span className="text-violet-600">{sum_to_n_c(4)}</span>
        </div>
      </div>
    </div>
  );
}
