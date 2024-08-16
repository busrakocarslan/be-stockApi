import React from 'react'
import { AreaChart, LineChart } from '@tremor/react';
import { useSelector } from 'react-redux';


const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.firms);
  const salesData = sales?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString('tr-TR'),
    SalesAmount: item.amount, // Corrected typo
  }));

  const purchData = purchases?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString('tr-TR'),
    PurchasesAmount: item.amount, // Corrected typo
  }));
  const combinedData = [...purchData,...salesData];//spread ile birleştirildi tarihler



const dataFormatter = (number) =>
  `₺ ${Intl.NumberFormat("us").format(number).toString()}`

  return (
    <div>
       <AreaChart
      className="h-80"
      data={combinedData}
      index="date"
      categories={['SalesAmount', 'PurchasesAmount']}
      colors={['orange', 'blue']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      // onValueChange={(v) => console.log(v)}
    />
    
    </div>
  )
}

export default Charts




