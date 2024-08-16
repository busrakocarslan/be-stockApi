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
import useStockRequest from "../../services/useStockRequest";
import { btnStyle } from "../../styles/globalStyles"

const BrandsCard = ({brand,handleClose,handleOpen,setInfoBrand}) => {
  const {address,phone,image,_id,name}=brand
    const { deleteStock,createStock } = useStockRequest();
    const handleEdit=()=>{
      setInfoBrand(brand)
      handleOpen()
      console.log(brand);
    }
    
  return (
    <Stack>
      <Card
        sx={{
          minWidth: 300,
          maxWidth:300,
          minHeight: "450px",
          maxHeight: "450px",
          m: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          p:2
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
          <Button size="small" onClick={()=>deleteStock("brands",_id)}>{/*path parametre olarak geliyor id ile de hangi firma bilgisi geçiyor. */}
            <DeleteOutlineTwoToneIcon color="secondary" sx={btnStyle} />{" "}
          </Button>
          <Button size="small" onClick={handleEdit} >
            <EditTwoToneIcon   color="success" sx={btnStyle} />
          </Button>
        </Box>
      </Card>
    </Stack>
  )
}

export default BrandsCard




 
  
//   const { firmsList } = useSelector((state) => state.firms);
 
