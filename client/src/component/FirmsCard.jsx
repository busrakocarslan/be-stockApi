import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { editFirm, removeFirm } from '../features/firmSlice';
import useStockRequest from "../services/useStockRequest";
import { btnStyle } from "../styles/globalStyles";

const FirmsCard = ({
  firm,
  handleOpen,
  open,
  selectedFirmId,
  setSelectedFirmId,
  setSelectedFirm,
}) => {
  const { _id, image, name, address, phone } = firm;

  const { deleteStock, createStock } = useStockRequest();
  const { firmsList } = useSelector((state) => state.firms);

  // const dispatch=useDispatch()// dispatch i useStockRequestte removefilm i tanımlarken kullanıyorsun thunk kullanmadıysan burada kullanamazsın
  const handleEdit = () => {
    handleOpen();
    setSelectedFirmId(firm); // başlangıcı null olan selectedfirmid ye firm in ıd si atanmış oluyor
  };

  return (
    <Stack>
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 300,
          minHeight: 450,
          maxHeight: 450,
          m: "1px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          p: 2,
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Typography variant="body2" mb="5px" color="text.secondary">
            {address}
          </Typography>
          <Typography gutterBottom variant="body2" component="text.secondary">
            {phone}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={image}
          sx={{ objectPosition: "center", objectFit: "contain" }}
        />
        <Box>
          <Button size="small" onClick={() => deleteStock("firms", _id)}>
            {/*path parametre olarak geliyor id ile de hangi firma bilgisi geçiyor. */}
            <DeleteOutlineTwoToneIcon color="secondary" sx={btnStyle} />{" "}
          </Button>
          <Button size="small" onClick={handleEdit}>
            <EditTwoToneIcon color="success" sx={btnStyle} />
          </Button>
        </Box>
      </Card>
    </Stack>
  );
};

export default FirmsCard;
