import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
// import { useDispatch } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "3px solid #972E0E",
  boxShadow: 24,
  p: 4,
};

const BrandsModal = ({ open, handleClose, infoBrand, setInfoBrand }) => {
  const { createStock, putStock } = useStockRequest();

  //   console.log(infoBrand);
  const handleBrand = (e) => {
    e.preventDefault()
    setInfoBrand({ ...infoBrand, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (infoBrand._id) {
      putStock("brands",infoBrand._id,infoBrand);// infoBrand_id yi eklemez isen put işlemi yapılamıyor fonk'na bak useStockRequesten
    } else {
      createStock("brands", infoBrand);
    }
    
    handleClose();
    console.log(infoBrand._id);
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          display="flex"
          flexDirection="column"
          gap="1rem"
          component={"form"}
          onSubmit={handleSubmit}
        >
          <TextField
           
            label="Brand Name*"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={infoBrand.name}
            onChange={handleBrand}
          />

          <TextField
            id="image"
            label="Image URL*"
            variant="outlined"
            type="url"
            name="image"
            value={infoBrand.image}
            onChange={handleBrand}
          />
          <Button type="submit" color="error" variant="contained">
            {
                infoBrand._id? "UPDATE BRAND" : "SAVE BRAND"
            }
            
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default BrandsModal;
