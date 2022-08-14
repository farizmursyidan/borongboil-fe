import axios from "axios";

export const getDataFromAPI = async (url) => {
  try {
    let respond = await axios.get(process.env.REACT_APP_API + url, {
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        username: process.env.REACT_APP_user,
        password: process.env.REACT_APP_pass,
      },
      withCredentials: true
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond Get Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond Get Data err", err);
    return respond;
  }
};

export const getDatafromAPINODEFile = async (url) => {
  try {
    let respond = await axios.get(process.env.REACT_APP_API + url, {
      responseType: "blob",
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        username: process.env.REACT_APP_user,
        password: process.env.REACT_APP_pass,
      },
      withCredentials: true
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond Post Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond Post Data err", err);
    return respond;
  }
};

export const postDataToAPI = async (url, data) => {
  try {
    let respond = await axios.post(process.env.REACT_APP_API + url, data, {
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        username: process.env.REACT_APP_user,
        password: process.env.REACT_APP_pass,
      },
      withCredentials: true
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond Post Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond Post Data err", err);
    return respond;
  }
};

export const patchDataToAPI = async (url, data) => {
  try {
    let respond = await axios.patch(process.env.REACT_APP_API + url, data, {
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        username: process.env.REACT_APP_user,
        password: process.env.REACT_APP_pass,
      },
      withCredentials: true
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond Patch Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond Patch Data err", err);
    return respond;
  }
};

export const deleteDataFromAPI = async (url, props) => {
  try {
    let respond = await axios.delete(process.env.REACT_APP_API + url, {
      headers: {
        "Content-Type": "application/json"
      },
      auth: {
        username: process.env.REACT_APP_user,
        password: process.env.REACT_APP_pass,
      },
      withCredentials: true
    });
    if (respond.status >= 200 && respond.status < 300) {
      console.log("respond Delete Data", respond);
    }
    return respond;
  } catch (err) {
    let respond = err;
    console.log("respond Delete Data err", err);
    return respond;
  }
};

export const setWithExpiry = (key, value, ttl) => {
  const now = new Date()

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key)

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key)
    return null
  }
  return item.value
}