import axios from "axios";
import { saveAs } from "file-saver";

const base_url = "https://localhost:5000";

export const loginUser = async (userData) => {
  return await axios.post(`${base_url}/users/login`, JSON.stringify(userData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const registerUser = async (userData) => {
  return await axios.post(
    `${base_url}/users/register`,
    JSON.stringify(userData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const logoutUser = async (userData) => {
  return await axios.post(`${base_url}/users/logout`, userData);
};

// ITEMS

export const getAllItems = async (userId, token) => {
  return await axios.get(`${base_url}/users/${userId}/offer`, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });
};

export const saveBillingInfo = async (userId, billingInfo) => {
  return await axios.post(
    `${base_url}/users/${userId}/billing-info`,
    JSON.stringify(billingInfo),
    {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    }
  );
};

export const saveProducts = async (userId, offerInfo) => {
  const response = await axios.post(
    `${base_url}/users/${userId}/products`,
    JSON.stringify(offerInfo),
    {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};

//Using the fetch API here due to issues with Axios in accessing content disposition.

export const generatePdf = async (userId, html) => {
  try {
    const response = await fetch(
      `https://localhost:5000/users/${userId}/offer`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          html,
        }),
      }
    );

    const filename = response.headers
      .get("content-disposition")
      .split(";")
      .find((n) => n.includes("filename="))
      .replace("filename=", "")
      .trim();

    const blob = await response.blob();
    saveAs(blob, filename);
  } catch (error) {
    throw new Error(error);
  }
};
