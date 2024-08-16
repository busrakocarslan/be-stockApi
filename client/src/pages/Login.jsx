import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/deneme-1.png";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik ,Form} from "formik";
import { object, string } from "yup";
// import { login } from "../services/useApiRequest";,
import useApiRequest from "../services/useApiRequest";

const Login = () => {
  const {login}=useApiRequest()

  const loginSchema = object({
   
    email: string()
      .email("geçerli bir email giriniz")
      .required("email zorunlu"), // dafault msj böyle ezebilirsin
    password: string()
      .required()
      .min(8, "en az 8 karakter olmalıdır")
      .matches(/\d+/, "şifre en az bir rakam içermelidir")// default mesaje kullanıcı tarafından anlaşılmak,yenisi oluşturuşmalı. 
      .matches(/[a-z]/, "şifre en az bir küçük harf içermelidir")
      .matches(/[A-Z]/, "şifre en az bir büyük harf içermelidir")
      .matches(
        /[@$!%*?&]+/,
        "şifre en az bir özel karakter(@$!%*?&) içermelidir"
      ),
  });

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="secondary.light" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "primary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography variant="h4" align="center" mb={4} color="primary.light">
            Login
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              //TODO
              //?POST
              //?Toastify
              //?Global State güncellenmesi
              //?form RESETLEME -- formik kullanıyorsak hazır fonk var
              //?NAVİGATE
              // login(values);//dervices klasöründe çağırdığımız api fonksiyonu
              // actions.resetForm();// formikin içinde hazır fonk bu. formu resetliyor.
              // actions.setSubmitting(false); // isSubmitting adında bir değilken var acitions içinde submit işlemi devam ederken true oluyor
              login(values)
              actions.resetForm()
              actions.setSubmitting(false)
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
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="standard"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email} // bu yapıyı yup kontrol edecek
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="standard"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password} // bu yapıyı yup kontrol edecek
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register"> <Typography  sx={{
                    color:"primary.main",
                    transition:"all .2s ease-in",
                    "&:hover": { color: "secondary.main" },
                  }}>Do you have not an account?</Typography></Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6} mt={3} justifyContent="center">
          <Container>
            <img src={image} alt="img" width="400px"  />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
