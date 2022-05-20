import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from 'moment';
import 'moment/locale/es';

const DatosEmpresa = ({ datos, handleChange, handleChangeDate }) => {
  const handleClickBorrar = () => {
    localStorage.removeItem("datosEmpresa");
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos de la Empresa
      </Typography>
      <LocalizationProvider dateAdapter={AdapterMoment} locale={moment.locale('es')}>
        <Grid container spacing={2} sx={{mt:1}}>
          <Grid item xs={12}>
            <MobileDatePicker
              label="Fecha de Partida"
              inputFormat="DD/MM/YYYY"
              value={datos.fechaPartida}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="razonsocial"
              name="razonsocial"
              label="Razon Social"
              fullWidth
              autoComplete="off"
              variant="standard"
              value={datos.razonsocial}
              onChange={(e) => handleChange(e, "empresa")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="nombreCortoTransporte"
              name="nombreCortoTransporte"
              label="Nombre Corto Transporte"
              fullWidth
              autoComplete="off"
              variant="standard"
              onChange={(e) => handleChange(e, "empresa")}
              value={datos.nombreCortoTransporte}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              required
              id="nombreLargoTransporte"
              name="nombreLargoTransporte"
              label="Nombre Largo Transporte"
              fullWidth
              autoComplete="off"
              variant="standard"
              onChange={(e) => handleChange(e, "empresa")}
              value={datos.nombreLargoTransporte}
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              required
              id="nombreDueñoEmpresa"
              name="nombreDueñoEmpresa"
              label="Nombre Dueño Empresa"
              fullWidth
              autoComplete="off"
              variant="standard"
              onChange={(e) => handleChange(e, "empresa")}
              value={datos.nombreDueñoEmpresa}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="calle"
              name="calle"
              label="Calle"
              fullWidth
              autoComplete="off"
              variant="standard"
              onChange={(e) => handleChange(e, "empresa")}
              value={datos.calle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="nroCalle"
              name="nroCalle"
              label="Nro Calle"
              fullWidth
              autoComplete="off"
              variant="standard"
              onChange={(e) => handleChange(e, "empresa")}
              value={datos.nroCalle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="ciudad"
              name="ciudad"
              label="Ciudad"
              fullWidth
              autoComplete="off"
              variant="standard"
              onChange={(e) => handleChange(e, "empresa")}
              value={datos.ciudad}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="emailEmpresa"
              name="emailEmpresa"
              label="Email Empresa"
              fullWidth
              autoComplete="off"
              variant="standard"
              onChange={(e) => handleChange(e, "empresa")}
              value={datos.emailEmpresa}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="telEmpresa"
              name="telEmpresa"
              label="Telefono Empresa"
              fullWidth
              autoComplete="off"
              variant="standard"
              onChange={(e) => handleChange(e, "empresa")}
              value={datos.telEmpresa}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="telDueñoEmpresa"
              name="telDueñoEmpresa"
              label="Telefono Dueño Empresa"
              fullWidth
              autoComplete="off"
              variant="standard"
              onChange={(e) => handleChange(e, "empresa")}
              value={datos.telDueñoEmpresa}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={handleClickBorrar}>
              Reiniciar Datos
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </React.Fragment>
  );
};

export default DatosEmpresa;
