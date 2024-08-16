import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/deneme-1.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import useApiRequest from "../services/useApiRequest";
const Register = () => {
  const { register } = useApiRequest();
  const navigate = useNavigate();
  const registerSchema = object({
    username: string().required("Kullanıcı adı giriniz"),
    firstName: string().required("Adınızı giriniz"),
    lastName: string().required("Soyadınızı giriniz"),
    email: string()
      .email("Geçerli bir email giriniz")
      .required("Email zorunludur"),
    password: string()
      .required("Şifre zorunludur")
      .min(8, "Şifre en az 8 karakter olmalıdır")
      .max(16, "Şifre en fazla 16 karakter olmalıdır")
      .matches(/\d+/, "Şifre en az bir rakam içermelidir.")
      .matches(/[a-z]+/, "Şifre en az bir küçük harf içermelidir.")
      .matches(/[A-Z]+/, "Şifre en az bir büyük harf içermelidir.")
      .matches(
        /[@$!%*?&]+/,
        "Şifre en az bir özel karakter(@$!%*?&) içermelidir."
      ),
  });
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="flex-start"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          minHeight: "100vh",
          p: 2,
          
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>
          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              register(values);
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
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="User Name"
                    name="username"
                    id="userName"
                    type="text"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    label="First Name"
                    name="firstName"
                    id="firstName"
                    type="text"
                    variant="outlined"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    id="last_name"
                    type="text"
                    variant="outlined"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    size="large"
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography color="secondary">
              Do you have an account?
              <Link to="/" style={{ textDecoration: "none", color: "#303E46" }}>
                <Typography
                  sx={{
                    color:"primary.main",
                    transition:"all .1s ease-in-out",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Login Now
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={0}
          sm={7}
          md={6}
          my={10}
          justifyContent="center"
          alignItems="center"
        >
          <Container>
            <img src={image} alt="img" width="500px" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Register;
