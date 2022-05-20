import axios from 'axios';

export const postDDJJ = async (datos) => {
  try {
    const { data } = await axios.post(
      `/api/ddjj`,
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
      `/api/deleteqr`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
