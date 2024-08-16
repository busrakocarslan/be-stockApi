import React, { useEffect } from "react";
import { DonutChart } from "@tremor/react";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
import { Stack } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const DonutCard = () => {
  const { sales, purchases } = useSelector((state) => state.firms);
  const { getStock } = useStockRequest();
  const dataForCart = sales.map((item) => ({
    // sales için
    name: item.brandId?.name,
    value: item.amount,
  }));
  const dataForCartPurc = purchases.map((item) => ({
    // purchases için
    name: item.brandId?.name,
    value: item.amount,
  }));

  const dataFormatter = (
    number // amount un yazım şeklini yaralyan func.
  ) => `₺ ${Intl.NumberFormat("tr").format(number).toString()}`;
  return (
    <Stack
      direction={"row"}
      justifyContent={"flex-start"}
      width={"50%"}
      gap={5}
    >
      <div>
        <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          SALES
        </span>
        <div className="flex justify-center">
          <DonutChart
            style={{ width: "140px", height: "140px" }}
            data={dataForCart}
            variant="donut"
            valueFormatter={dataFormatter}
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </div>
      <div>
        <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          PURCHASES
        </span>
        <div className="flex justify-center">
          <DonutChart
            style={{ width: "140px", height: "140px" }}
            data={dataForCartPurc}
            variant="donut"
            valueFormatter={dataFormatter}
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </div>
    </Stack>
  );
};

export default DonutCard;
