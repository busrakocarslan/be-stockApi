import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { modalstyle } from "../../styles/globalStyles";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";

const ProductModal = ({ open, handleClose, infoProduct={}, setInfoProduct,handleStock }) => {
  const { createStock,putStock } = useStockRequest();
  const { categories, brands } = useSelector((state) => state.firms);

  const handleChange = (e) => {
    setInfoProduct({ ...infoProduct, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createStock("products", infoProduct);

    handleClose();
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
          sx={modalstyle}
          display="flex"
          flexDirection="column"
          gap="1rem"
          component={"form"}
          onSubmit={handleSubmit}
        >
          <FormControl fullWidth>
            <InputLabel id="categoryId">Categories</InputLabel>
            <Select
              labelId="categoryId"
              id="categoryId"
              name="categoryId"
              value={infoProduct.categoryId}
              label="Categories"
              onChange={handleChange}
            >
              {categories.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem> // be bizden id istediği için value da id veriyoruz.
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="brandId">Brands</InputLabel>
            <Select
              labelId="brandId" // değiştirildi
              id="brandId" // değiştirildi
              name="brandId" // değiştirildi
              value={infoProduct.brandId}
              label="Brands"
              onChange={handleChange}
            >
              {brands.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem> // be bizden id istediği için value da id veriyoruz.
              ))}
            </Select>
          </FormControl>
          <TextField
            label="name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={infoProduct.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="stock"
            name="quantity"
            id="quantity"
            type="number"
            variant="outlined"
            value={infoProduct.quantity}
            onChange={handleChange}
            required
           
          />

          <Button type="submit" color="info" variant="contained">
            add product
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductModal;
