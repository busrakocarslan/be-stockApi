import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import {
  firmRegister,
  firmPending,
  getStockSuccess,
  getProPurBraFirmSuccess
} from "../features/firmSlice";
import { toastSuccessNotify, toastErrorNotify } from "../helper/ToastNotify";

const useStockRequest = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();

  // const getFirms = async () => {
  //   dispatch(firmPending());
  //   try {
  //     const { data } = await axiosToken("/firms");
  //     dispatch(firmSuccess(data));// slice da eklemeseydim buraya data.data demem gerekecekti ben slice e ekledim
  //     console.log(data);
  //   } catch (error) {
  //     dispatch(firmRegister());
  //     console.log(error);
  //   }
  // };
  // const getSales = async () => {
  //   dispatch(firmPending());
  //   try {
  //     const { data } = await axiosToken("/sales");
  //     dispatch(SalesSuccess(data));// slice da eklemeseydim buraya data.data demem gerekecekti ben slice e ekledim
  //     console.log(data);
  //   } catch (error) {
  //     dispatch(firmRegister());
  //     console.log(error);
  //   }
  // };

  //? bu fonksiyon path kısmını paratemre olarak aldığından ayrı ayrı her işlem için fonk yazmak yerine tek bir fonk ile bu işlem hepsinde ayrı ayrı gerçekleşmiş oluyor.Burada buraya gelen path bilgisini de slice kısmında yazdığımız fonkiyona göndererek onu da parametrik hale getirdik.
  //!-----------Firma bilgilerinin çağırılması işlemi-----
  const getStock = async (path = "firms") => {
    dispatch(firmPending());
    try {
      const { data } = await axiosToken(`/${path}`);
      const stockData = data.data; // bunu şundan dolayı yaptık api dan gelen veriler data nın içinde data var onun içinde data.data diye içerisine yazmadık da onu bir değişken olarak atadık.Çünkü 45. sırada payloadın içinde data.data şeklinde yazmaya izin vermiyor.
      dispatch(getStockSuccess({ stockData, path })); // burada klasik payload yazıyoruz aslında ancak burada payloadın içinde 2 parametre olduğundan destruc edip yzıldı
      console.log(data);
    } catch (error) {
      toastErrorNotify("Oops! there is something wrong for adding");
      dispatch(firmRegister());
      console.log(error);
    }
  };
  // path paraetresi verilmez ise deafult olarak firms atandı.id yi de delete id ile sildiği için vermek zorundasın
  //!-----------Firma bilgilerinin silinmesi işlemi-----
  const deleteStock = async (path = "firms", id) => {
    dispatch(firmPending());
    try {
      await axiosToken.delete(`/${path}/${id}`); 
      toastSuccessNotify(`${path} delete successfully`);// delete işlemi herhangi bir şey döndürmediği için değişkene atamaya gerek yokama delete yazmak zorundasın dikkat et!

      getStock(path); // get fonk yeniden çağıracaksın
    } catch (error) {
      dispatch(firmRegister());
      toastErrorNotify("Oops! there is something wrong for adding")
      console.log(error);
    }
  };

  //!-----------------Yeni bir firma ekleme işlemi-----------
  const createStock = async (path = "firms", firminfo) => {
    dispatch(firmPending());
    try {
      await axiosToken.post(`/${path}`, firminfo);
      toastSuccessNotify(`${path} added successfully`);
      getStock(path);
      // console.log(data);
    } catch (error) {
      dispatch(firmRegister());
      toastErrorNotify("Oops! there is something wrong for adding");
      console.log(error);
    }
  };
  //!-----------Firma bilgilerinin güncellenmesi işlemi-----
  const putStock = async (path = "firms", id, firminfo) => {
    dispatch(firmPending());
    try {
      await axiosToken.put(`/${path}/${id}`, firminfo);
      toastSuccessNotify(`${path} updated successfully`);
      getStock(path);
      // console.log(data);
    } catch (error) {
      dispatch(firmRegister());
      toastErrorNotify("Oops! there is something wrong for updating");
      console.log(error);
    }
  };
  //!-----------Verilere aynı anda ulaşmak için kurulan promiseAll işlemi-----

  const getProPurBraFirmStock = async () => {
    dispatch(firmPending());
    
    try {
      const [pro, pur, bra, fir] = await Promise.all([// array olarak yazıyoruz sırası öenmli! eg. pro producta denk geliyor dikkat et
        axiosToken("/products"),
        axiosToken("/purchases"),
        axiosToken("/brands"),
        axiosToken("/firms"),
      ])
      const products = pro?.data?.data// içiçer dispatchin içinde yazmadığım için verilerde nested olduğu için burada atama yapıp aşağıya gönderdim.
      const purchases = pur?.data?.data
      const brands = bra?.data?.data
      const firms = fir?.data?.data

      dispatch(getProPurBraFirmSuccess({ products, purchases, brands, firms }))
    } catch (error) {
      console.log(error)
    }
  }

  
  // const patchStock = async (path = "firms", id,firminfo) => {
  //   dispatch(firmPending());
  //   try {
  //     await axiosToken.patch(`/${path}/${id}`,firminfo);
  //     dispatch(patchStockSuccess({ id, firminfo }));
  //     toastSuccessNotify(`${path} updated successfully`);
  //     getStock(path);
  //     // console.log(data);
  //   } catch (error) {
  //     dispatch(firmRegister());
  //     toastErrorNotify("Oops! there is something wrong for updating");
  //     console.log(error);
  //   }
  // };

  return { getStock, deleteStock, createStock, putStock,getProPurBraFirmStock };
};

export default useStockRequest;

// içerisinde hook kullanacağımız için costom hook şeklinde çağırıyoruz.
