import { Alert, AlertTitle, Box, Skeleton, Stack } from "@mui/material";
import React from "react";

export const ErrorMessage = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Unfortunately, the data could not be retrieved
      </Alert>
    </Stack>
  );
};
export const NoDataMessage = () => {
  return (
    <Alert sx={{ mt: 3 }} severity="warning">
      No data found to display
    </Alert>
  );
};
// export const CardSkeleton = ({ children }) => {
//   return (
//     <Skeleton animation="wave" variant="rounded" width="100%">
//       {children}
//     </Skeleton> // context api gibi sarmalayacağımız şeyi dinamik hale getirmek için children prop kullanıldı.
//   );
// };
export const CardSkeleton = () => {
  return (
    <><Skeleton
      sx={{ bgcolor: 'lightgrey.900', width: "90%", margin: "auto" }}
      variant="rectangular"
      width={250}
      height={350} />
      <Box display="flex" justifyContent="center" gap={2} mt={2} >
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </Box></>
  );
};

const TableSkeleton = () => {
  return (
    <Box sx={{ width: "90%", margin: "auto" }}>
      <Skeleton animation="wave" variant="rounded" width="100%" height={90} />
      <br />
      <Skeleton
        animation="wave"
        variant="rounded"
        width="100%"
        height={50}
      />{" "}
      <br />
      <Skeleton animation="wave" variant="rounded" width="100%" height={50} />
      <br />
      <Skeleton animation="wave" variant="rounded" width="100%" height={30} />
    </Box>
  );
};

export default TableSkeleton;

// import * as React from 'react';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// import Stack from '@mui/material/Stack';

// export default function DescriptionAlerts() {
//   return (
//
//       <Alert severity="success">
//         <AlertTitle>Success</AlertTitle>
//         This is a success Alert with an encouraging title.
//       </Alert>
//       <Alert severity="info">
//         <AlertTitle>Info</AlertTitle>
//         This is an info Alert with an informative title.
//       </Alert>
//       <Alert severity="warning">
//         <AlertTitle>Warning</AlertTitle>
//         This is a warning Alert with a cautious title.
//       </Alert>
//
//     </Stack>
//   );
// }
