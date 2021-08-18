import { apiUrl } from "./config";
import axios from "axios";

// Conexion con el backend
export const getProducts = async (_id) => {
  const url = `${apiUrl}/api/producto/leeproductobyid`;
  try {
    const response = await axios({
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ _id }),
    });
    // console.log(response.data.data[0]);
    if (response.statusText !== "OK") {
      throw new Error(response.data.message);
    }
    return response.data.data[0];
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

// const { data } = await response.json();

// export const getProducts = async (id) => {
//   try {
//     const response = await axios({
//       url: `${apiUrl}/api/productos/${id}`,
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (response.statusText !== "OK") {
//       throw new Error(response.data.message);
//     }
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     return { error: err.response.data.message || err.message };
//   }
// };
