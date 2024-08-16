import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import useStockRequest from "../services/useStockRequest";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #B26400",
  boxShadow: 24,
  p: 4,
};

const FirmsModal = ({ handleClose, open, selectedFirmId }) => {
  const { createStock, putStock } = useStockRequest();
  //selectedFirm, seçilen firmanın bilgilerini tutacak ,ilk değeri null olarak ayarlandı başlangıçta herhangi bir firma seçilmemesi için
  const inputSchema = object({
    name: string().required("Firma ismi zorunludur"),
    phone: string().required("Telefon numarası zorunludur"),
    address: string().required("Adress bilgisi zorunludur"),
    image: string(),
  });
  console.log(selectedFirmId);

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Formik
          initialValues={{
            name: selectedFirmId?.name || "",
            phone: selectedFirmId?.phone || "",
            address: selectedFirmId?.address || "",
            image: selectedFirmId?.image || "",
          }}
          validationSchema={inputSchema}
          onSubmit={(values, actions) => {
            if (selectedFirmId) {// içeride id var ise put isteği yapıp değişiklik yapacak değilse post işlemi yapıp firma ekleyecek
              putStock("firms", selectedFirmId._id, values);
            } else {
              createStock("firms", values);
            }
            handleClose();
            actions.resetForm();
            actions.setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form>
              <Box sx={style} display="flex" flexDirection="column" gap="1rem">
                <TextField
                  id="outlined-basic"
                  label="Firm Name*"
                  name="name"
                  type="text"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  id="outlined-basic"
                  type="phone"
                  label="Phone*"
                  name="phone"
                  variant="outlined"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Address*"
                  name="address"
                  variant="outlined"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
                <TextField
                  id="outlined-basic"
                  label="Image*"
                  variant="outlined"
                  type="url"
                  name="image"
                  value={values.image}
                  onChange={handleChange}
                />
                <Button type="submit" color="secondary" variant="contained">
                 {
                  selectedFirmId ? "UPDATE FIRM" : "ADD FIRM"
                 } 
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Modal>
    </Box>
  );
};

export default FirmsModal;
