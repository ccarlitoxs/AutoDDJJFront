import React, { useState, useEffect } from "react";
import moment from "moment";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DatosEmpresa from "./Steps/DatosEmpresa";
import Pasajeros from "./Steps/Pasajeros";
import Descargar from "./Steps/Descargar";
import { postDDJJ, deleteQR } from "../Api/ddjj.api";

const steps = ["Datos Empresa", "Pasajeros", "Descargar"];

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const getStepContent = (
  step,
  datos,
  handleChangeInput,
  handleChangeDate,
  handleChangeDateEmit,
  handleUpdate,
  dismissQrReader,
  stopStream,
  showCamera,
  setShowCamera
) => {
  switch (step) {
    case 0:
      return (
        <DatosEmpresa
          datos={datos.empresa}
          handleChange={handleChangeInput}
          handleChangeDate={handleChangeDate}
        />
      );
    case 1:
      return (
        <Pasajeros
          datos={datos.pasajero}
          handleChange={handleChangeInput}
          handleChangeDate={handleChangeDateEmit}
          handleUpdate={handleUpdate}
          dismissQrReader={dismissQrReader}
          stopStream={stopStream}
          showCamera={showCamera}
          setShowCamera={setShowCamera}
        />
      );
    case 2:
      return <Descargar />;
    default:
      throw new Error("Unknown step");
  }
};

const theme = createTheme();

const StepperView = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [showCamera, setShowCamera] = useState(!isDesktop);
  const [openAlert, setOpenAlert] = useState({
    type: null,
    msg: ''
  });
  const [datos, setDatos] = useState({
    empresa: {
      razonsocial: "",
      nombreCortoTransporte: "",
      // nombreLargoTransporte: "",
      nombreDueñoEmpresa: "",
      calle: "",
      nroCalle: "",
      ciudad: "",
      emailEmpresa: "",
      telEmpresa: "",
      telDueñoEmpresa: "",
      fechaPartida: moment().valueOf(),
    },
    pasajero: {
      apellido: "",
      nombre: "",
      fechaNacimiento: moment().valueOf(),
      fechaEmision: moment().valueOf(),
      dni: "",
      edad: "",
      sexo: "",
      tipoVacuna: "",
      esquemaVacuna: "",
      terceraVacuna: "",
    },
  });

  const [stopStream, setStopStream] = useState(false);

  const handleUpdate = (err, result) => {
    if (datos.pasajero.apellido === "" && datos.pasajero.nombre === "") {
      if (result) {
        const datosDni = result.text.split("@");
        setDatos({
          ...datos,
          pasajero: {
            ...datos.pasajero,
            apellido: datosDni[1],
            nombre: datosDni[2],
            sexo: datosDni[3],
            dni: datosDni[4],
            fechaNacimiento: moment(datosDni[6], "DD/MM/YYYY").valueOf(),
            edad: moment().diff(
              moment(datosDni[6], "DD/MM/YYYY"),
              "years",
              false
            ),
            fechaEmision: moment(datosDni[7], "DD/MM/YYYY").valueOf(),
          },
        });
      } else {
        console.log("Not Found");
      }
    }
  };

  const dismissQrReader = () => {
    // Stop the QR Reader stream (fixes issue where the browser freezes when closing the modal) and then dismiss the modal one tick later
    setStopStream(true);
    setTimeout(() => setShowCamera(false), 100);
  };

  useEffect(() => {
    if (localStorage.getItem("datosEmpresa")) {
      setDatos({
        ...datos,
        empresa: JSON.parse(localStorage.getItem("datosEmpresa")),
      });
    }
  }, []);

  const handleClickAgregarOtro = async () => {
    setShowCamera(!isDesktop);

    try {
      const respuesta = await postDDJJ(datos);

      console.log("respuesta", respuesta);
      //TODO: CONFIGURAR ALERTA
    } catch (error) {
      console.log(error)
      setOpenAlert({
        type: 'error',
        msg: error.response?.data?.msg
      });
    }

    setDatos({
      ...datos,
      ["pasajero"]: {
        apellido: "",
        nombre: "",
        fechaEmision: moment().valueOf(),
        dni: "",
        edad: "",
        sexo: "",
        tipoVacuna: "",
        esquemaVacuna: "",
        terceraVacuna: "",
      },
    });
  };

  const handleFinish = async () => {
    try {
      await deleteQR();
    } catch (error) {
      console.log(error);
    }
    setActiveStep(activeStep + 1);
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      localStorage.setItem("datosEmpresa", JSON.stringify(datos.empresa));
    } else if (activeStep === 1) {
      // localStorage.setItem("datosPasajero", JSON.stringify(datos.empresa));
      dismissQrReader();

      try {
        const respuesta = await postDDJJ(datos);

        console.log("respuesta", respuesta);
        //TODO: CONFIGURAR ALERTA
      } catch (error) {
        console.log(error)
        setOpenAlert({
          type: 'error',
          msg: error.response?.data?.msg
        });
      }


      setDatos({
        ...datos,
        ["pasajero"]: {
          apellido: "",
          nombre: "",
          fechaEmision: moment().valueOf(),
          dni: "",
          sexo: "",
          edad: "",
          tipoVacuna: "",
          esquemaVacuna: "",
          terceraVacuna: "",
        },
      });
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      dismissQrReader();
    } else {
      setShowCamera(true);
    }
    setActiveStep(activeStep - 1);
  };

  const handleChangeInput = (e, seccion) => {
    setDatos({
      ...datos,
      [seccion]: {
        ...datos[seccion],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChangeDate = (e) => {
    setDatos({
      ...datos,
      ["empresa"]: { ...datos.empresa, fechaPartida: e.utc() },
    });
  };

  const handleChangeDateEmit = (e, dateInput) => {
    if (dateInput === "emision") {
      setDatos({
        ...datos,
        ["pasajero"]: { ...datos.pasajero, fechaEmision: e.utc() },
      });
    } else {
      setDatos({
        ...datos,
        ["pasajero"]: {
          ...datos.pasajero,
          fechaNacimiento: e.utc(),
          edad: moment().diff(e, "years", false),
        },
      });
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert({
      type: null,
      msg: ''
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            AutoDDJJ
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            URBANO
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Proceso completado
                </Typography>
                <Typography variant="subtitle1">
                  Recargue para comenzar denuevo
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep,
                  datos,
                  handleChangeInput,
                  handleChangeDate,
                  handleChangeDateEmit,
                  handleUpdate,
                  dismissQrReader,
                  stopStream,
                  showCamera,
                  setShowCamera
                )}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Atras
                    </Button>
                  )}

                  {activeStep === 1 && (
                    <Button
                      onClick={handleClickAgregarOtro}
                      variant="contained"
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Agregar Otro
                    </Button>
                  )}

                  {activeStep !== steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleFinish}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Terminar
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={openAlert.type !== null} autoHideDuration={4000} onClose={handleCloseAlert}>
            <Alert
              onClose={handleCloseAlert}
              severity={openAlert.type || 'warning'}
              sx={{ width: "100%" }}
            >
              {openAlert.msg || ''}
            </Alert>
          </Snackbar>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default StepperView;
