import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from 'moment';
import 'moment/locale/es';
import { vacunas, esquemas } from "../DatosSelects/Vacunas";

const Pasajeros = ({
  datos,
  handleChange,
  handleChangeDate,
  dismissQrReader,
  handleUpdate,
  stopStream,
  showCamera,
  setShowCamera
}) => {

  useEffect(() => {
    console.log("cargo");
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Agregar Pasajero
      </Typography>

      {showCamera ? (
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              dismissQrReader();
            }}
          >
            Carga Manual
          </Button>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              setShowCamera(true);
            }}
          >
            Carga con Camara
          </Button>
        </Grid>
      )}
      {showCamera && (
        <div style={{ position:"relative",display:'flex',justifyContent:'center', margin: "0.5rem 0" }}>
        <BarcodeScannerComponent
          width={300}
          height={300}
          onUpdate={handleUpdate}
          stopStream={stopStream}
        />
        <div style={{ position:"absolute", border:"1px solid red", top:'50%', width:"300px" }}></div>
        </div>
      )}
      <LocalizationProvider dateAdapter={AdapterMoment} locale={moment.locale('es')}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="apellido"
            name="apellido"
            label="Apellidos"
            fullWidth
            autoComplete="off"
            variant="standard"
            value={datos.apellido}
            onChange={(e) => handleChange(e, "pasajero")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="nombre"
            name="nombre"
            label="Nombres"
            fullWidth
            autoComplete="off"
            variant="standard"
            value={datos.nombre}
            onChange={(e) => handleChange(e, "pasajero")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="dni"
            name="dni"
            label="DNI"
            fullWidth
            autoComplete="off"
            variant="standard"
            value={datos.dni}
            onChange={(e) => handleChange(e, "pasajero")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="sexo"
            name="sexo"
            label="Sexo"
            fullWidth
            autoComplete="off"
            variant="standard"
            value={datos.sexo}
            onChange={(e) => handleChange(e, "pasajero")}
          />
        </Grid>
        <Grid item xs={6}>
            <MobileDatePicker
              label="Fecha de Nacimiento"
              inputFormat="DD/MM/YYYY"
              value={datos.fechaNacimiento}
              onChange={(e) => handleChangeDate(e,"nacimiento")}
              renderInput={(params) => <TextField sx={{width:'100%'}} variant="standard" {...params} />}
            />
        </Grid>
        <Grid item xs={6}>
            <MobileDatePicker
              label="Fecha de Emision"
              inputFormat="DD/MM/YYYY"
              value={datos.fechaEmision}
              onChange={(e) => handleChangeDate(e,"emision")}
              renderInput={(params) => <TextField sx={{width:'100%'}} variant="standard" {...params} />}
            />
        </Grid>
      </Grid>
      </LocalizationProvider>
      <Typography variant="h6" gutterBottom sx={{ my: 2 }}>
        Esquema de Vacunas
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Tipo de Vacunas</InputLabel>
            <Select
              id="tipoVacuna"
              name="tipoVacuna"
              value={datos.tipoVacuna}
              onChange={(e) => handleChange(e, "pasajero")}
              label="Tipo de Vacunas"
            >
              <MenuItem value="">
                <em>Seleccionar</em>
              </MenuItem>
              {vacunas.map((vacuna,index) => (
                <MenuItem key={`${vacuna}-${index}`} value={vacuna}>{vacuna}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={4}>
        <FormControl variant="standard" fullWidth>
            <InputLabel>Esquema de Vacunas</InputLabel>
            <Select
              id="esquemaVacuna"
              name="esquemaVacuna"
              value={datos.esquemaVacuna}
              onChange={(e) => handleChange(e, "pasajero")}
              label="Esquema de Vacunas"
            >
              <MenuItem value="">
                <em>Seleccionar</em>
              </MenuItem>
              {esquemas.map((esquema,index) => (
                <MenuItem key={`${index}-${esquema}`} value={esquema}>{esquema}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
        <FormControl variant="standard" fullWidth>
            <InputLabel>Tipo Vacuna 3ra Dosis</InputLabel>
            <Select
              id="terceraVacuna"
              name="terceraVacuna"
              value={datos.terceraVacuna}
              onChange={(e) => handleChange(e, "pasajero")}
              label="Tipo Vacuna 3ra Dosis"
            >
              <MenuItem value="">
                <em>Seleccionar</em>
              </MenuItem>
              {vacunas.map((vacuna,index) => (
                <MenuItem key={`${index}-${vacuna}`} value={vacuna}>{vacuna}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Pasajeros;
