import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchases:[],
  sales:[],
  products:[],
  firms: [],
  brands:[],
  categories:[],
  loading: false,
  error: false,
};

const firmSlice = createSlice({
  name: "firms",// buraya verdiğimiz name dan alıyoruz toolkit e bak.
  initialState,
  reducers: {
    firmPending: (state) => {
      state.loading = true;
      state.error = false
    },
    // firmSuccess: (state, { payload }) => {
    //   state.loading = false;
    //   state.firmsData = payload.data;
    // },
    // SalesSuccess: (state, { payload }) => {
    //   state.loading = false;
    //   state.sales = payload.data;
    // },
    //! reduxın genel kuralı gereği action parametresi bir objedir. içerisinde de type ve payload barındırır. buradaki durumda tüm slice larda tek farklı durum path olduğundan payloadın içinde olan path bilgisini alarak dinamik yaptık tabi bir de burada bizim data bilgisine ihtiyacım oluyor nereye atayacağı path ile anklaşıyor ne atacağını da veri ile alıyoruz. veriye istediğimiz adı verebiliriz ki stockdata dedik
    getStockSuccess:(state,{payload:{path,stockData}})=>{
      state.loading = false
      // state[action.payload.path]=action.payload.stockData // şimdi burada yapılan işlem şu action içindeki payloadın içindeki path bilgisli bizim sales gibi firm gibi initial state de tuttuğumuz bir veri aynı zamanda biz o veriyi değişken olarak böyle alıyoruz.ör:actionın içindeki payloadın içindeki path bilgisi sales ise diyoruz ki  state in içindeki sales e action. payloadı ata.
      //? neden stock data dedik, çünkü bilgiler data içinde data da olduğundan ve bunu useStockRequestte stockdata ya atadığımız için buraya da stockdata dedik.
      //*square bracket yöntemi ile ayayınca içindekileri bir değişken olarak kabul ediyor. 
      //! destruc edilmiş hali 
      state[path]=stockData
      // state.error=false
      
     
    },
    getProPurBraFirmSuccess: (
      state,
      { payload: { products, purchases, firms, brands } }
    ) => {
      state.loading = false
      state.products = products
      state.purchases = purchases
      state.brands = brands
      state.firms = firms
    },
    // patchStockSuccess: (state, { payload: { id, updatedProduct } }) => {
    //   state.loading = false;
    //   state.products = state.products.map((product) =>
    //     product._id === id ? { ...product, ...updatedProduct } : product
    //   );
    // },



    firmRegister: (state) => {
      state.loading = false;
      state.error = true;
    },
    //! sadece tek bir getstockssuccess fonk yazdığımızdan diğer işlemlere ayrı ayrı yazmaya ihtiyaç kalmadı. 
    // removeFirmAction: (state, { payload }) => {
    //   return {
    //     ...state,
    //     firmsData: state.firmsData.filter(
    //       (firmList) => firmList._id !== payload
    //     ),
    //   };
    // },
    // editFirm: (state, { payload }) => {
    //   return {
    //     ...state,
    //     firmsData: state.firmsData.map((firmList) =>
    //       firmList._id === payload
    //         ? { ...firmList, payload: !firmList.payload }
    //         : firmList
    //     ),
    //   };
    // },
    // addFirm:(state,{payload})=>{
    //   return {
    //     ...state, firmsData:[...state.firmsData,{id:new Date().getTime(),text:payload}]
    //   }
    // }
  },
});

export const { firmPending, firmRegister,getStockSuccess,getProPurBraFirmSuccess } =
  firmSlice.actions;

export default firmSlice.reducer;
