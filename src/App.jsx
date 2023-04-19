import React, { useState } from "react";
import Row from "./components/Row";
import {
  deleteRow,
  getNewRow,
  getUpdatedRow,
  handleIsRequiredRowChange,
  handleRowTypeChange,
  handleTypeChangeAtIndividualLevel,
} from "./utils";
import { OBJECT } from "./constants";

export default function App() {
  const [data, setData] = useState({
    type: "array",
    isRequired: false,
    name: "parent",
    data: [
      {
        type: OBJECT,
        isRequired: false,
        name: "person",
        data: {
          name: {
            type: OBJECT,
            isRequired: false,
            name: "name",
            data: {
              firstName: {
                type: "string",
                isRequired: false,
                name: "firstName",
              },
              lastName: {
                type: "string",
                isRequired: false,
                name: "lastName",
              },
              fullName: {
                type: OBJECT,
                isRequired: false,
                name: "fullName",
                data: {
                  random: {
                    type: "string",
                    isRequired: false,
                    name: "random",
                  },
                },
              },
            },
          },
          age: {
            type: "integer",
            isRequired: false,
            name: "age",
          },
        },
      },
      {
        type: "integer",
        isRequired: false,
        name: "order",
      },
      {
        type: "boolean",
        isRequired: false,
        name: "class",
      },
    ],
  });

  const handleNameUpdate = (value, key) => {
    key = key?.split?.("_")?.splice(1).join("_");
    setData({
      ...data,
      data: data?.data?.map((row) =>
        row?.name === key?.split?.("_")?.[0]
          ? getUpdatedRow(value, key, row)
          : row
      ),
    });
  };

  const handleRowAdd = (key) => {
    console.log(key);
    key = key?.split?.("_")?.splice(1).join("_");
    if (data?.data?.find((row) => row?.name === key?.split?.("_")?.[0])) {
      setData({
        ...data,
        data: data?.data?.map((row) =>
          row?.name === key?.split?.("_")?.[0] ? getNewRow(key, row) : row
        ),
      });
    } else {
      setData({
        ...data,
        data: [
          ...data?.data,
          {
            type: "string",
            isRequired: false,
            name: "addName",
          },
        ],
      });
    }
  };

  const handleDelete = (key) => {
    console.log(key);
    key = key?.split?.("_")?.splice(1).join("_");
    if (data?.data?.find((row) => row?.name === key)) {
      setData({
        ...data,
        data: [
          ...data?.data?.filter((row) => row?.name !== key?.split?.("_")?.[0]),
        ],
      });
    } else {
      setData({
        ...data,
        data: data?.data?.map((row) =>
          row?.name === key?.split?.("_")?.[0]
            ? deleteRow(key?.split?.("_")?.splice(1).join("_"), row)
            : row
        ),
      });
    }
  };

  const handleIsRequiredChange = (value, key) => {
    console.log(key);
    key = key?.split?.("_")?.splice(1).join("_");
    setData({
      ...data,
      data: [
        ...data?.data?.map((row) =>
          row?.name === key
            ? {
                ...row,
                isRequired: value,
              }
            : row?.name === key?.split?.("_")?.[0]
            ? {
                ...row,
                data: handleIsRequiredRowChange(
                  key?.split?.("_")?.splice(1).join("_"),
                  value,
                  row?.data
                ),
              }
            : row
        ),
      ],
    });
  };

  const handleTypeChange = (value, key) => {
    console.log(key);
    key = key?.split?.("_")?.splice(1).join("_");
    setData({
      ...data,
      data: [
        ...data?.data?.map((row) =>
          row?.name === key
            ? handleTypeChangeAtIndividualLevel(value, row)
            : row?.name === key?.split?.("_")?.[0]
            ? {
                ...row,
                data: handleRowTypeChange(
                  key?.split?.("_")?.splice(1).join("_"),
                  value,
                  row?.data
                ),
              }
            : row
        ),
      ],
    });
  };

  // constraints
  // doesn't support array type
  // cant have same key in first level

  return (
    <div className="w-screen flex justify-center ">
      <div className="border border-gray-200 rounded-lg shadow min-w-[700px] p-5 mt-8">
        <div className="bg-slate-100 p-4">
          <div className="flex justify-between px-2">
            <p>Field Name and type</p>
            <button onClick={() => handleRowAdd(data?.name)}>+</button>
          </div>
          {data?.data?.map((row, index) => (
            <Row
              key={index}
              data={row}
              parentKey={data?.name}
              handleNameUpdate={handleNameUpdate}
              handleRowAdd={handleRowAdd}
              handleDelete={handleDelete}
              handleIsRequiredChange={handleIsRequiredChange}
              handleTypeChange={handleTypeChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
