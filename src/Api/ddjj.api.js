import axios from 'axios';

export const postDDJJPY = async (datos) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/ddjjpy`,
      datos
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postDDJJARG1 = async (datos) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/ddjjarg1`,
      datos
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteQR = async () => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/deleteqr`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const downloadQR = async (url) => {
  try {
    const { data } = await axios({
      url,
      method: 'GET',
      responseType: 'blob', // important
    });
    return window.URL.createObjectURL(new Blob([data]));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
