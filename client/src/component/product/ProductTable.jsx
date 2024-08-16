// import React from 'react'
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar, valueGetter } from "@mui/x-data-grid";
import { type } from "@testing-library/user-event/dist/type";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import useStockRequest from "../../services/useStockRequest";
import { useSelector } from "react-redux";
import { tableHeader } from "../../styles/globalStyles";

const ProductTable = ({ handleStock }) => {
  const { products } = useSelector((state) => state.firms);
  const { deleteStock } = useStockRequest();
  //!id sorunu için:
  const getRowId = (row) => row._id; // yazdıktan sonra comp içinde kullan satır 79.
  const columns = [
    //!mui x data nın unique id zorunluluğu var, id bu projede "_id" olarak geldiğinden unique id ye ulaşamıyor. Dökümanda ayrıntısı var. bu sorunu aşmak için yıkarıdaki fonk yazıldı
    { field: "_id", headerName: "#", minWidth: 100, flex: 1 }, // field kısmı bu stuna gelecek olan değerlerin nereden geleceğini yazıyor.verdiğimiz ismin Be den gelen isim ile eşleşmesi gerek,headername ise ekranda kullanıcının göreceği isim,with kısmını sabit verebildiğimiz gibi göreceli de verebiliriz.
    {
      field: "categoryId",
      headerName: "Categories",

      width: 130,
      editable: true,
      valueGetter: (value, row) => value?.name, // name direk category ıd de bulunmadığından valuegetter özelliği kullanıldı
    },
    {
      field: "brandId", // burada yazan be ile aynı olmalı ancak data da Brand ıd de değil bilgi BrandId nin içinde name içinde bu yüzden dökümanda da yazılı olan valuegetter fonksiyonunu kullanmalı.
      headerName: "Brands",
      type: "number",
      width: 130,
      // editable: true,// tablonun ilgili yerine tıklayıp değiştirmek için olan bir özellik eklenecekse edit de olmalı
      valueGetter: (value, row) => row.brandId?.name, //value.name şeklinde de ulaşılıyor name direk brand ıd de bulunmadığından valuegetter özelliği kullanıldı. burada birinci parametre value, value ile direk fielde verdiğimiz dosyanın içine erişebiliyoruz.
    },
    {
      field: "name",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,// sıralanabilme özelliği
      width: 130,
    },
    {
      field: "quantity", // bura be ile uyumlu ise direk veriler geliyor.
      headerName: "Stock",
      // headerAling:"center",
      width: 150,
      editable: true,
      
    },
    //actions kısmında sadece buton render edilecek bu sebeple dökümantasyonda belirtildiği üzere rendercell adında ya da action bir fonk var onu kullanmamız gerek ya da valuegetter fonk var onu kullanman lazım. dökümandan bak.action daha kısa bu yüzden onunla yapıldı
    //*getactions fonksiyonu bizim o bulundğu alandaki verilere ulaşmamızı sağlıyor.
    {
      field: "actions", // eğer getAction fonk kullanıyor ise  type-field actions yazmak zorunlu
      type: "actions",
      headerName: "Operations", // görünecek başlık
      getActions: (props) => [
        //  propsa alıştığım için props yazdım

        <GridActionsCellItem
          icon={
            <DeleteOutlineTwoToneIcon
              color="info"
              sx={{
                ":hover": {
                  color: "error.main",
                },
              }}
            />
          }
          onClick={() => deleteStock("products", props.id)} // getactios in içindeki tüm bilgilere props ile giriyoruz
          label="delete"
        />,
      ],
      width: 150,
      // editable: true,
    },
  ];
//   const handleCellEditStop = async (params,e) => {
//     const { id, field } = params;
//     if (field === 'quantity') {
//         const updatedProduct = {
//             id: id,
//             stock: e.target.value,
//         };
//         await handleStock(updatedProduct);
//     }
// };
// const handleProcessRowUpdate = (newRow, oldRow) => {
//   if (newRow.quantity !== oldRow.quantity) {
//     const updatedProduct = {
//       id: newRow._id,
//       quantity: newRow.quantity,
//     };
//     handleStock(updatedProduct);
//   }
//   return newRow;
// };
  
  return (
    <Box color="info.main" sx={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "info.light",
          "& .MuiDataGrid-cell": { color: "darkgray" },
          "& .MuiDataGrid-cell:hover": {
            color: "info.main",
            cursor: "pointer",
          },
        }}
        rows={products} //=>bu bilgi useSelector ile initialstate den geliyor
        columns={columns}
        // processRowUpdate={handleProcessRowUpdate}       
        // onCellEditStop={handleCellEditStop}
        initialState={{
          pagination: {
            paginationModel: {
              // pageSizeOptions ile birlikte kullandım yoksa aşağıdaki(98) ayarlamayı yapamadım
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[2, 3, 5]} // her sayfada kaç satır gösterileceğini buradan ayarlıyorsun
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={getRowId} // buraya verildi yukarıdaki 13. satırdaki fonk
        // slots={{toolbar:GridTollBar}}
        slots={{ toolbar: GridToolbar }}// table in üst kısmındaki eklentiler çıkıyor
        // headerClassName="tableHeader"
      />
    </Box>
  );
};

export default ProductTable;
