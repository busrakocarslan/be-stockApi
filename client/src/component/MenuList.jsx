import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardCustomizeTwoToneIcon from "@mui/icons-material/DashboardCustomizeTwoTone";
import CurrencyExchangeTwoToneIcon from "@mui/icons-material/CurrencyExchangeTwoTone";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import StoreTwoToneIcon from "@mui/icons-material/StoreTwoTone";
import StarBorderPurple500TwoToneIcon from "@mui/icons-material/StarBorderPurple500TwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
  const navigate = useNavigate();

  const icons = [
    {
      title: "Dashboard",
      iconName: <DashboardCustomizeTwoToneIcon />,
      path: "/stock",
    },
    {
      title: "Purchases",
      iconName: <ShoppingCartTwoToneIcon />,
      path: "/stock/purchases/",
    },
    {
      title: "Sales",
      iconName: <CurrencyExchangeTwoToneIcon />,
      path: "/stock/sales/",
    },
    {
      title: "Firms",
      iconName: <StoreTwoToneIcon />,
      path: "/stock/firms/",
    },
    {
      title: "Brands",
      iconName: <StarBorderPurple500TwoToneIcon />,
      path: "/stock/brands/",
    },
    {
      title: "Products",
      iconName: <Inventory2TwoToneIcon />,
      path: "/stock/products/",// onclik özelliğiniz map ile döndüğümüz yere yadığımızdan verilen adrese gidyor. Absolutepath olduğundan heryerden gidiyor.
    },
  ];

  return (
    <div>
      <List>
        {icons.map((item, index) => (
          <ListItem
            key={index}
            disablePadding// listıtemıcon listıtemtext gibi bileşenlerin etrafındaki pDDİNGİ KONTROL EDER.
            onClick={() => navigate(item.path)}
          >
            <ListItemButton
              sx={{
                "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                  color: "secondary.main", // 
                },
                "&:hover": {
                  "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                    color: "error.main", // Hover durumunda rengi değiştir notu aşağıda
                  },
                },
              }}
            >
              <ListItemIcon>{item.iconName}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuList;
//.MuiListItemIcon-root: Bu, MUI kütüphanesinde ListItemIcon bileşeninin kök elementini temsil eder. Yani, bu seçici, ListItemButton bileşeninin içindeki ListItemIcon bileşenlerini hedef alır.
//MuiListItemText-primary: Bu, MUI kütüphanesinde ListItemText bileşeninin birincil metin elementini temsil eder. Yani, bu seçici, ListItemButton bileşeninin içindeki ListItemText bileşenlerinin birincil metinlerini hedef alır.