import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { saveAs } from "file-saver";

const Descargar = () => {
  const saveFile = () => {
    saveAs(
      `/api/downloadqr`,
      "QR PY.zip"
    );
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Descargar
      </Typography>
      <Grid container spacing={2} sx={{mt:1}}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={saveFile}>
            Descargar QR PY
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Descargar;
