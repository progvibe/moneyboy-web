import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

export const Route = createFileRoute("/transactions")({
  component: TransactionsComponent,
});

type Transaction = {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number | null;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: number | null;
  symbol: string;
  total_supply: number;
  total_volume: number;
};

function TransactionsComponent() {
  const defaultData = [
    {
      ath: 1.32,
      ath_change_percentage: -24.4565,
      ath_date: "2018-07-24T00:00:00.000Z",
      atl: 0.572521,
      atl_change_percentage: 74.58094,
      atl_date: "2015-03-02T00:00:00.000Z",
      circulating_supply: 139427879732.0534,
      current_price: 0.998473,
      fully_diluted_valuation: 139306634710,
      high_24h: 1.003,
      id: "tether",
      image:
        "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
      last_updated: "2024-12-26T03:46:02.220Z",
      low_24h: 0.996868,
      market_cap: 139306634710,
      market_cap_change_24h: -14922908.81185913,
      market_cap_change_percentage_24h: -0.01071,
      market_cap_rank: 3,
      max_supply: null,
      name: "Tether",
      price_change_24h: -0.000659657295474014,
      price_change_percentage_24h: -0.06602,
      roi: null,
      symbol: "usdt",
      total_supply: 139427879732.0534,
      total_volume: 39933375277,
    },
  ];

  const columnHelper = createColumnHelper<Transaction>();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("symbol", {
      header: "Symbol",
    }),
    columnHelper.accessor("market_cap", {
      header: "Market Cap",
    }),
    columnHelper.accessor("price_change_24h", {
      header: "Price Change (24h)",
    }),
    columnHelper.accessor("price_change_percentage_24h", {
      header: "Price Change (%24h)",
    }),
  ];

  const [data, _setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];
  const {
    isLoading,
    error,
    data: transactions,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false",
      );
      const data = await response.json();
      console.log(data);
      _setData(data);
      return data;
    },
    staleTime: 1000,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableElement = (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return tableElement;
}
