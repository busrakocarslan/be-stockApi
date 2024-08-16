import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar, valueGetter } from "@mui/x-data-grid";
import { type } from "@testing-library/user-event/dist/type";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import useStockRequest from "../../services/useStockRequest";
import { useSelector } from "react-redux";

const PurchasesTable = ({ handleOpen, setInfoPurchases }) => {
  const { purchases } = useSelector((state) => state.firms);
  const { deleteStock } = useStockRequest();
  const handleEditPurchases = (row) => {
    const {// yazmayınca değişiklik yapmıyor
      _id,
      firmId,
      brandId,
      productId,
      quantity,
      amount,
      price,
    } = row;

    handleOpen();
    setInfoPurchases(row);
  };
  const getRowId = (row) => row._id;
  const columns = [
    //!mui x data nın unique id zorunluluğu var, id bu projede "_id" olarak geldiğinden unique id ye ulaşamıyor. Dökümanda ayrıntısı var. bu sorunu aşmak için yıkarıdaki fonk yazıldı
    { field: "_id", headerName: "#", minWidth: 100, flex: 1 }, // field kısmı bu stuna gelecek olan değerlerin nereden geleceğini yazıyor.verdiğimiz ismin Be den gelen isim ile eşleşmesi gerek,headername ise ekranda kullanıcının göreceği isim,with kısmını sabit verebildiğimiz gibi göreceli de verebiliriz.
    {
      field: "createdAt",
      headerName: "DATE",
      width: 130,
      headerAlign: "center",
      align: "center",
      valueGetter: (value, row) => new Date(row.createdAt).toLocaleString("en-US") // toLocaleString() yöntemi, tarih ve saatleri, para birimlerini, sayıları ve diğer değerleri belirli bir yerel biçime dönüştürmek için kullanıyor.en-us ABD, de-DE Almanya, tr-TR Türkiye gibi
    },
    {
      field: "firmId",
      headerName: "Firm",
      headerAlign: "center",
      align: "center",
      // sortable: false,// sıralama
      width: 130,
      valueGetter: (value,row) => row.firmId?.name,
    },
    {
      field: "brandId", // burada yazan be ile aynı olmalı ancak data da Brand ıd de değil bilgi BrandId nin içinde name içinde bu yüzden dökümanda da yazılı olan valuegetter fonksiyonunu kullanmalı.
      headerName: "Brands",
      type: "number",
      width: 130,
      headerAlign: "center",
      align: "center",
      valueGetter: (value,row) => row.brandId?.name, // name direk brand ıd de bulunmadığından valuegetter özelliği kullanıldı
    },
    {
      field: "productId", // bura be ile uyumlu ise direk veriler geliyor.
      headerName: "Product",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueGetter: (value, row) => row.productId?.name,
    },

    {
      field: "quantity", // bura be ile uyumlu ise direk veriler geliyor.
      headerName: "Stock",
      width: 150,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount", // bura be ile uyumlu ise direk veriler geliyor.
      headerName: "Amount",
      width: 150,
      headerAlign: "center",
      align: "center",
      // editable: true,
    },
    {
      field: "price",
      headerAlign: "center",
      align: "center", // bura be ile uyumlu ise direk veriler geliyor.
      headerName: "Price",
      width: 150,
      editable: true,
    },

    //actions kısmında sadece buton render edilecek bu sebeple dökümantasyonda belirtildiği üzere rendercell adında ya da action bir fonk var onu kullanmamız gerek ya da valuegetter fonk var onu kullanman lazım. dökümandan bak.action daha kısa bu yüzden onunla yapıldı
    //*getactions fonksiyonu bizim o bulundğu alandaki verilere ulaşmamızı sağlıyor.
    {
      field: "actions", // eğer getAction fonk kullanıyor ise  type-field actions yazmak zorunlu
      type: "actions",
      headerName: "Operations", // görünecek başlık
      minWidth: 40,
      headerAlign: "center",
      align: "center",
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
          onClick={() => deleteStock("purchases", props.id)} // getactios in içindeki tüm bilgilere props ile giriyoruz
          label="delete"
        />,
        <GridActionsCellItem
          icon={
            <EditTwoToneIcon
              color="success"
              sx={{
                ":hover": {
                  color: "error.main",
                },
              }}
            />
          }
          onClick={()=>handleEditPurchases(props?.row)} // getactios in içindeki tüm bilgilere props ile giriyoruz
          label="edit"
        />,
      ],
      width: 150,
      editable: true,
    },
  ];
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
        rows={purchases} //=>bu bilgi useSelector ile initialstate den geliyor
        columns={columns} // yukarıda biz oluşturuyoruz.
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[2, 3, 5]} // her sayfada kaç satır gösterileceğini buradan ayarlıyorsun
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={getRowId} // buraya verildi yukarıdaki 13. satırdaki fonk
        // 
        slots={{ toolbar: GridToolbar }}// table in üst kısmındaki eklentiler çıkıyorheaderClassName="tableHeader"
      />
    </Box>
  );
};

export default PurchasesTable;
