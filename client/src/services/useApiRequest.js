// amaç api isteklerini tek yerden atmak
// import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import useAxios from "./useAxios";

const useApiRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { token } = useSelector((state) => state.auth.token);
  const { axiosToken, axiosPublic } = useAxios();
  const login = async (userData) => {
    //   const BASE_URL = "https://10001.fullstack.clarusway.com"

    dispatch(fetchStart());
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login`,
      //   userData
      // )
      const { data } = await axiosPublic.post("/auth/login/", userData);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login işlemi başarılı");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login başarısız oldu");
      console.log(error);
    }
  };

  const register = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("users", userData);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Kayıt işlemi başarılı");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Kayıt başarısız oldu");
      console.log(error);
    }
  };
  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosToken("/auth/logout");
      // await axios(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {headers:{Authorization:`Token ${token}`}});// Be tarafında token silinerek verilerimizin silinmesi için bu işlem yapıldı. Token bilgisini de useSelector ile globaldeki veriden çektim.
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout işlemi başarılı");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Logout işlemi başarısız oldu");
      console.log(error);
    }
  };
  return { login, register, logout }; //costom hook yapınca direk export edemiyoruz böyle return etmemeiz gerek birden falz aolursa diye direk { içinde } yazdık
};

export default useApiRequest;

// fonksiyonu oluşturduktan sonra ilgili yerde çğırıyoruz.
// /users
// Navigate("/")
//registerSuccess
//payload.data.username
//regester say regirter{register}=useapires
//onsubmit register(values)

//logout api steği oluyor. /gets autth/logout slice girip ona da fonk yazılıyor.
// dashborar import logout{}
//?Custom hook
//? Eger uygulamanın her yerinde kullanmak için bazı fonksiyonlara ihtyaç varsa  ve bu fonksiyonlar içerisinde custom hook'ların ( useSelector, useDispatch,useNavigate etc.) kullanılması gerekiyorsa o Zaman çözüm Bu dosyayı custom hook'a çevirmektir.
