import { useEffect } from "react";
import Charts from "../component/dasboard/Charts";
import KPICards from "../component/dasboard/KPICards";
// import { useSelector } from "react-redux";
import useStockRequest from "../services/useStockRequest";

const Home = () => {
  // const { sales, purchases } = useSelector((state) => state.firms);
  const { getStock } = useStockRequest();
  useEffect(() => {
    getStock("sales");
    getStock("purchases");
  }, []);

  return (
    <div>
      <KPICards />
      <Charts />
    </div>
  );
};

export default Home;
