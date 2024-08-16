import React, { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import loadingGif from "../assets/loading.gif";
import BrandsCard from "../component/brands/BrandsCard";
import BrandsModal from "../component/brands/BrandsModal";
import {
  CardSkeleton,
  ErrorMessage,
  NoDataMessage,
} from "../component/DataFetchMessages";

const Brands = () => {
  const { getStock, stockData } = useStockRequest();
  const { brands, loading, error } = useSelector((state) => state.firms);
  const [open, setOpen] = useState(false);
  const [infoBrand, setInfoBrand] = useState({ name: "", image: "" }); // liftingstate up yapıldı çünkü kardeşler arası da bu bilgiye ihtiyaç duyulduğundan propla gönderildi parentten
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfoBrand({ name: "", image: "" });
  };
  useEffect(() => {
    getStock("brands");
  }, []);
  return (
    <Box>
      <Typography variant="h3" color="primary.main" mb={2}>
        BRANDS
      </Typography>
      <Button
        color="error"
        variant="contained"
        sx={{ mb: 1 }}
        disabled={error}
        onClick={handleOpen}
      >
        ADD BRAND
      </Button>

      {loading && <CardSkeleton />}
      {/* {error && !loading && <ErrorMessage />} */}

      {!loading && !brands.length && <NoDataMessage />}
      {!error && !loading && (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
          gap={2}
        >
          {brands?.map((brand) => (
            <BrandsCard
              key={brand._id}
              brand={brand}
              setInfoBrand={setInfoBrand}
              handleClose={handleClose}
              handleOpen={handleOpen}
            ></BrandsCard>
          ))}
        </Box>
      )}

      <BrandsModal
        open={open}
        handleClose={handleClose}
        infoBrand={infoBrand}
        setInfoBrand={setInfoBrand}
      />

      {/* {loading && <img src={loadingGif} alt="Loading" />} */}

      {/* {error && <Typography variant="body1">Hay aksi, bir hata oluştu!</Typography>} */}

      
    </Box>
  );
};

export default Brands;

// getstock adında parametreli fonk ile verileri çağırıyoruz.
