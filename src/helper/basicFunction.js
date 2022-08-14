export const convertDateFormat = (jsondate) => {
  if (jsondate === undefined || jsondate === null) {
    return null
  } else {
    let date = new Date(jsondate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + dt;
  }
};

export const convertDateFormatfull = (jsondate) => {
  if (jsondate !== undefined && jsondate !== null) {
    let date = new Date(jsondate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + dt.toString().padStart(2, 0) + " " + hh.toString().padStart(2, 0) + ":" + mm.toString().padStart(2, 0) + ":" + ss.toString().padStart(2, 0);
  } else {
    return null
  }
};