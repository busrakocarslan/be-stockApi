import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import EuroIcon from "@mui/icons-material/Euro";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DonutCard from "./DonutCard";
import { useSelector } from "react-redux";

const KPICards = () => {
  const { sales, purchases } = useSelector((state) => state.firms);

  const totalSales = sales?.reduce((acc, sale) => acc + sale.amount, 0);
  const totalPurchases = purchases?.reduce((acc, purc) => acc + purc.amount, 0);
  const dataProfit = totalSales - totalPurchases;
  const kpiData = [
    {
      id: 2,
      title: "Profit",
      icon: <AccountBalanceWalletIcon sx={{ fontSize: "2rem" }} />,
      amont: "₺ "+ dataProfit.toLocaleString("tr-TR"),
      color: "secondary.main",
      bgColor: "primary.main",
    },
  ];

  return (
    <Stack
      justifyContent={"flex-start"}
      alignItems={"center"}
      gap={5}
      flexWrap={"wrap"}
      direction={"row"}
      p={3}
      >
      {kpiData.map((data) => (
        <Paper
        key={data.id}
        elevation={24}
        sx={{
          display: "flex",
          width: 300,
          justifyContent: "flex-start",
          gap: 2,
          p: 2,
        }}
        >
          <Avatar
            sx={{
              bgcolor: data.bgColor,
              color: data.color,
              width: 60,
              height: 60,
            }}
          >
            {data.icon}
          </Avatar>
          <Box>
            <Typography variant="button">{data.title}</Typography>
            <Typography variant="h5"> {data.amont}</Typography>
          </Box>
        </Paper>
      ))}
      <DonutCard />
    </Stack>
  );
};

export default KPICards;
