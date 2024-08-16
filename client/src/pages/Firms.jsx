import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useDispatch, useSelector } from "react-redux";
import FirmsCard from "../component/FirmsCard";
import { Box, Button, Typography } from "@mui/material";
import Modal from "../component/Modal";
import FirmsModal from "../component/Modal";
import loadingGif from "../assets/loading.gif";
import {
  CardSkeleton,
  ErrorMessage,
  NoDataMessage,
} from "../component/DataFetchMessages";

const Firms = () => {
  const [open, setOpen] = useState(false); // lifting state up yapıldı çünkü kardeşler arası da bu bilgiye ihtiyaç duyulduğundan propla gönderildi parentten
  const handleOpen = () => setOpen(true);
  const [selectedFirmId, setSelectedFirmId] = useState(); // selectedFirmId, seçilen firmanın bilgilerini tutacak ,ilk değeri null olarak ayarlandı başlangıçta herhangi bir firma seçilmemesi için,put ile pst işlemi arasında eldeki tek fark id bilgisi olduğundna ona göre bir condition
  const handleClose = () => {
    setOpen(false);
    setSelectedFirmId(null); // add butonuna firmi seçtikten sonra tıkladığımda bilgileri silmesi için
  };

  console.log(selectedFirmId);
  const { getStock, stockData } = useStockRequest();
  // const dispatch = useDispatch();
  const { firms, loading, error } = useSelector((state) => state.firms);

  useEffect(() => {
    getStock("firms"); // tek bir fonk parametreli yazdığımızdan çağırıken içerisine parametre koymamız gerek.
    // getStock("sales")

    // getFirms();
    // getSales() // bu fonk bize api dan firma bil getirecek. Başka yerde de lazım olacağından gelen verileri global state de tutmak lazım.
  }, []);

  return (
    <Box>
      <Typography variant="h3" color="primary.main" mb={2}>
        Firms
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleOpen}
        disabled={error}
        sx={{ mb: 5 }}
      >
        ADD fİRMS
      </Button>

      {loading &&  <CardSkeleton />}
      {/* {error && !loading && <ErrorMessage />} */}

      {!loading && !firms.length && <NoDataMessage />}
      {!error && !loading && (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          mt={1}
          gap={2}
        >
          {firms?.map((firm) => (
            <FirmsCard
              key={firm._id}
              firm={firm}
              setSelectedFirmId={setSelectedFirmId}
              handleOpen={handleOpen}
            ></FirmsCard>
          ))}
        </Box>
      )}

      <FirmsModal
        handleClose={handleClose}
        open={open}
        selectedFirmId={selectedFirmId}
      />
      {/* {loading && <img src={loadingGif} alt="Loading" />} */}
      {/* {error && (
        <Typography variant="body1">Hay aksi, bir hata oluştu!</Typography>
      )} */}
    </Box>
  );
};

export default Firms;
// tekrar tekrar api isteği atmak yerine parametre alan bir fonk yazmalıyız.
