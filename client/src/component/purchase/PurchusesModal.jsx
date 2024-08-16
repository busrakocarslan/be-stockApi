import React from "react";
import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

const PurchusesModal = ({
  open,
  handleClose,
  infoPurchases,
  setInfoPurchases,
}) => {
  const navigate = useNavigate()
  const { products, brands, firms} = useSelector(
    (state) => state.firms
  );
  const { createStock, putStock } = useStockRequest();

  const handleChange = (e) => {
    setInfoPurchases({
      ...infoPurchases,
      [e.target.name]: e.target.value,
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (infoPurchases._id) {
      putStock("purchases",infoPurchases._id,infoPurchases);
    } else {
      createStock("purchases", infoPurchases);
    }
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
          <FormControl>
            <InputLabel variant="outlined" id="firm-select-label">Firms</InputLabel>
            <Select
              
              labelId="firm-select-label"
              id="firm-select"
              name="firmId"
              value={infoPurchases?.firmId?._id || infoPurchases?.firmId }
              label="Firm"
              onChange={handleChange}
              required
            >
               <MenuItem onClick={() => navigate("/stock/firms")}>
                  Add New Firm
                </MenuItem>
                <hr />
                {firms?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>{/*value kısmı bizim seçtiğimizi be ye göndereceği için id gönderiyoruz çnkü BE bizden products post ederken id istiyor be bizden ne istiyorsa value kısmında onu gönderiyoruz */}
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel variant="outlined" id="brand-select-label">Brands</InputLabel>
            <Select
             
              labelId="brand-select-label"
              id="brand-select"
              name="brandId"
              value={infoPurchases?.brandId?._id || infoPurchases?.brandId }
              label="Brand"
              onChange={handleChange}
              required
            >
              <MenuItem onClick={() => navigate("/stock/brands")}>
                  Add New Brand
                </MenuItem>
                <hr />
                {brands?.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel variant="outlined" id="product-select-label">Product</InputLabel>

            <Select
             
              labelId="product-select-label"
              id="product-select"
              name="productId"
              value={infoPurchases?.productId?._id || infoPurchases?.productId  }
              label="Product"
              onChange={handleChange}
              required
            >
            
                <MenuItem onClick={() => navigate("/stock/products")}>
                  Add New Product
                </MenuItem>
                <hr />
                {products?.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            name="quantity"
            id="quantity"
            type="number"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={infoPurchases?.quantity}
            onChange={handleChange}
            required
          />
          <TextField
            label="Price"
            name="price"
            id="price"
            type="number"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={infoPurchases?.price}
            onChange={handleChange}
            required
          />

          <Button type="submit" color="info" variant="contained">
          {infoPurchases._id ? "Update" : "Add"} Purchase
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PurchusesModal;
