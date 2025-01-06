"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Background from "../component/problem-2/Background";
import BackLink from "../component/common/BackLink";

const schema = z.object({
  fromAmount: z.number().min(0.0001, "Amount must be greater than 0").nonnegative(),
  fromToken: z.string().nonempty("Select a token"),
  toToken: z.string().nonempty("Select a token"),
});

interface Token {
  currency: string;
  date: string;
  price: number;
}

const SwapForm: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://interview.switcheo.com/prices.json");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setTokens(data);
    };
    getData();
  }, []);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      fromAmount: 0,
      fromToken: "USDC",
      toToken: "",
    },
  });

  const onSubmit = (values: any) => {
    const { fromAmount, fromToken, toToken } = values;
    const fromPrice = tokens.find((token) => token.currency === fromToken)?.price || 0;
    const toPrice = tokens.find((token) => token.currency === toToken)?.price || 0;
    const exchangeRate = fromPrice / toPrice;
    const toAmount = fromAmount * exchangeRate;

    alert(`You will receive approximately ${toAmount} ${toToken}`);
  };

  return (
    <>
      <div className="flex flex-col justify-center w-full h-dvh ">
        <BackLink className="z-10 px-4 py-2 fixed top-10 left-10 inline max-w-16 bg-white rounded-md" />
        <div className="w-full max-w-96 mx-auto p-6 border rounded-lg shadow-lg bg-white z-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Currency Swap</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-2">Amount to Swap</label>
            <Controller name="fromAmount" control={control} render={({ field: { onChange, value } }) => <input onChange={(e) => onChange(Number(e.target.value))} type="number" className="w-full p-2 border rounded" placeholder="Enter amount" />} />
            {errors.fromAmount && <p className="text-red-500 text-sm">{errors.fromAmount.message}</p>}

            <label className="block mt-4 mb-2">From Token</label>
            <Controller
              name="fromToken"
              control={control}
              render={({ field }) => (
                <select className="w-full p-2 border rounded" {...field}>
                  <option value="USDC">USDC</option>
                  {tokens.map((token, i) => (
                    <option key={i} value={token.currency}>
                      {token.currency}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.fromToken && <p className="text-red-500 text-sm">{errors.fromToken.message}</p>}

            <label className="block mt-4 mb-2">To Token</label>
            <Controller
              name="toToken"
              control={control}
              render={({ field }) => (
                <select className="w-full p-2 border rounded" {...field}>
                  <option value="">Select Token</option>
                  {tokens.map((token, i) => (
                    <option key={i} value={token.currency}>
                      {token.currency}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.toToken && <p className="text-red-500 text-sm">{errors.toToken.message}</p>}

            <button disabled={!isValid} type="submit" className={`w-full mt-6 p-2 bg-violet-950 text-white rounded hover:bg-violet-700 ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`}>
              Convert
            </button>
          </form>
        </div>
      </div>
      <Background />
    </>
  );
};

export default SwapForm;
