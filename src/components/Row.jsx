import { FormControlLabel, IconButton, Switch } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import TypeDropdown from "./TypeDropdown";
import { BOOLEAN, INTEGER, STRING } from "../constants";

const Row = ({
  data,
  parentKey,
  handleNameUpdate,
  handleRowAdd,
  handleDelete,
  handleIsRequiredChange,
  handleTypeChange,
}) => {
  const { type, isRequired, name } = data;
  const myKey = `${parentKey}_${name}`;
  if (type === STRING) {
    return (
      <div className="my-2 p-2 border-b border-gray-200 flex justify-between group hover:bg-slate-300">
        <div className="flex space-x-2">
          <input
            className="outline-none p-2 bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={name}
            type="text"
            onChange={(e) => handleNameUpdate(e?.target?.value, myKey)}
          />
          <TypeDropdown
            value={type}
            handleChange={(e) => handleTypeChange(e?.target?.value, myKey)}
          />
        </div>
        <div className="invisible group-hover:visible">
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={isRequired}
                onChange={(e) =>
                  handleIsRequiredChange(e?.target?.checked, myKey)
                }
              />
            }
            label="Required"
            labelPlacement="start"
          />
          <IconButton
            onClick={() => handleDelete(myKey)}
            size="small"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    );
  }
  if (type === INTEGER) {
    return (
      <div className="my-2 p-2 border-b border-gray-200 flex justify-between group hover:bg-slate-300">
        <div className="flex space-x-2">
          <input
            className="outline-none p-2 bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={name}
            type="text"
            onChange={(e) => handleNameUpdate(e?.target?.value, myKey)}
          />
          <TypeDropdown
            value={type}
            handleChange={(e) => handleTypeChange(e?.target?.value, myKey)}
          />
        </div>
        <div className="invisible group-hover:visible">
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={isRequired}
                onChange={(e) =>
                  handleIsRequiredChange(e?.target?.checked, myKey)
                }
              />
            }
            label="Required"
            labelPlacement="start"
          />
          <IconButton
            onClick={() => handleDelete(myKey)}
            size="small"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    );
  }
  if (type === BOOLEAN) {
    return (
      <div className="my-2 p-2 border-b border-gray-200 flex justify-between group hover:bg-slate-300">
        <div className="flex space-x-2">
          <input
            className="outline-none p-2 bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={name}
            type="text"
            onChange={(e) => handleNameUpdate(e?.target?.value, myKey)}
          />
          <TypeDropdown
            value={type}
            handleChange={(e) => handleTypeChange(e?.target?.value, myKey)}
          />
        </div>
        <div className="invisible group-hover:visible">
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={isRequired}
                onChange={(e) =>
                  handleIsRequiredChange(e?.target?.checked, myKey)
                }
              />
            }
            label="Required"
            labelPlacement="start"
          />
          <IconButton
            onClick={() => handleDelete(myKey)}
            size="small"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    );
  }
  return (
    <div className="my-2">
      <div className="flex justify-between w-full p-2 hover:bg-slate-300 group">
        <div className="flex space-x-2">
          <input
            className="outline-none p-2 bg-slate-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={name}
            type="text"
            onChange={(e) => handleNameUpdate(e?.target?.value, myKey)}
          />
          <TypeDropdown
            value={type}
            handleChange={(e) => handleTypeChange(e?.target?.value, myKey)}
          />
        </div>
        <div className="space-x-4 invisible group-hover:visible">
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={isRequired}
                onChange={(e) =>
                  handleIsRequiredChange(e?.target?.checked, myKey)
                }
              />
            }
            label="Required"
            labelPlacement="start"
          />
          <button className="focus:ring-4" onClick={() => handleRowAdd(myKey)}>
            +
          </button>
          <IconButton
            onClick={() => handleDelete(myKey)}
            size="small"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className="ml-5 mt-2">
        {Object.keys(data?.data)?.map((key, index) => (
          <Row
            key={index}
            data={data?.data?.[key]}
            parentKey={myKey}
            handleRowAdd={handleRowAdd}
            handleNameUpdate={handleNameUpdate}
            handleIsRequiredChange={handleIsRequiredChange}
            handleTypeChange={handleTypeChange}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
