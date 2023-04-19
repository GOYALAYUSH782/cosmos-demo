import { OBJECT } from "../constants";

export const getUpdatedRow = (value, key, row) => {
  if (row?.name === key) {
    return {
      ...row,
      name: value,
    };
  } else {
    key = key?.split?.("_")?.splice(1).join("_");
    if (row?.type === OBJECT) {
      const temp = row?.data?.[key?.split?.("_")?.[0]];
      delete row?.data?.[key?.split?.("_")?.[0]];
      const keyName = key?.indexOf("_") === -1 ? value : key?.split?.("_")?.[0];
      return {
        ...row,
        data: {
          ...row?.data,
          [keyName]: getUpdatedRow(value, key, temp),
        },
      };
    }
  }
};

export const getNewRow = (key, row) => {
  if (row?.name === key) {
    return {
      ...row,
      data: {
        ...row?.data,
        addName: {
          type: "string",
          isRequired: false,
          name: "addName",
        },
      },
    };
  } else {
    key = key?.split?.("_")?.splice(1).join("_");
    return {
      ...row,
      data: {
        ...row?.data,
        [key?.split?.("_")?.[0]]: getNewRow(
          key,
          row?.data?.[key?.split?.("_")?.[0]]
        ),
      },
    };
  }
};

export const deleteRow = (key, row) => {
  if (row?.data?.[key]) {
    delete row?.data?.[key];
    return row;
  } else {
    return {
      ...row,
      data: {
        ...row?.data,
        [key?.split?.("_")?.[0]]: deleteRow(
          key?.split?.("_")?.splice(1).join("_"),
          row?.data?.[key?.split?.("_")?.[0]]
        ),
      },
    };
  }
};

export const handleIsRequiredRowChange = (key, value, row) => {
  if (row?.[key]) {
    return {
      ...row,
      [key]: {
        ...row?.[key],
        isRequired: value,
      },
    };
  } else {
    return {
      ...row,
      [key?.split?.("_")?.[0]]: {
        ...row?.[key?.split?.("_")?.[0]],
        data: handleIsRequiredRowChange(
          key?.split?.("_")?.splice(1).join("_"),
          value,
          row?.[key?.split?.("_")?.[0]]?.data
        ),
      },
    };
  }
};

export const handleTypeChangeAtIndividualLevel = (value, row) => {
  if (row?.value === OBJECT) {
    delete row?.data;
    row.type = value;
    return row;
  } else {
    return value === OBJECT
      ? {
          ...row,
          type: value,
          data: {},
        }
      : {
          ...row,
          type: value,
        };
  }
};

export const handleRowTypeChange = (key, value, row) => {
  if (row?.[key]) {
    return {
      ...row,
      [key]: handleTypeChangeAtIndividualLevel(value, row?.[key]),
    };
  } else {
    return {
      ...row,
      [key?.split?.("_")?.[0]]: {
        ...row?.[key?.split?.("_")?.[0]],
        data: handleRowTypeChange(
          key?.split?.("_")?.splice(1).join("_"),
          value,
          row?.[key?.split?.("_")?.[0]]?.data
        ),
      },
    };
  }
};

// export const getSubData = (data) => {

// };

// export const getPrintableObject = (data) => {
//   const finalData = [];
//   data?.data?.map((row) => {
//     if (row?.type === OBJECT) {
//       finalData?.push({
//         [row?.name]: getSubData(row?.data),
//       });
//     } else {
//       finalData.push(row?.name);
//     }
//   });
// };
