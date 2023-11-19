import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
} from "@mui/material";
import styles from "./form.module.css";
import {
  updateForm,
  updateUseId,
  updateStep,
  fetchData,
} from "../../../features/return/returnSlice";

const logistics = ["Finecom", "Best Solutions", "Self Service"];
const warehouses = [
  "Hamburg",
  "Berlin",
  "Plattling",
  "Gelsenkirchen",
  "Aschaffenburg",
];

const Step1 = ({ onSubmitButtonClick }) => {
  const form = useSelector((state) => state.return.form);
  const useId = useSelector((state) => state.return.useId);
  const dispatch = useDispatch();

  const handleInputChange = (event, key) => {
    dispatch(updateForm({ key: key, value: event.target.value }));
  };

  const handleUseIdChange = (event) => {
    dispatch(updateUseId(event.target.checked));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = useId ? form.id : form.uuid;
    dispatch(fetchData(id))
      .then((response) => {
        dispatch(updateStep(2));
      })
      .catch((error) => {
        alert("Error fetching data");
        dispatch(updateStep(2));
      });
  };

  const validateUUID = (uuid) => {
    // basic uuid validation, it has to contains at least 1 number and 1 letter.
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    const valid = regex.test(uuid);
    return valid;
  };

  const validateId = (id) => {
    // basic id validation, it has to contains only numbers.
    const regex = /^[0-9]+$/;
    const valid = regex.test(id);
    return valid;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Step 1 Select logistic */}
      <FormControl className={styles.formControl}>
        <InputLabel>Select Logistic</InputLabel>
        <Select
          id="logistic"
          value={form.logistic}
          required
          onChange={(event) => handleInputChange(event, "logistic")}
        >
          {logistics.map((logistic) => (
            <MenuItem key={logistic} value={logistic}>
              {logistic}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Step 2 Select warehouse */}
      <FormControl className={styles.formControl}>
        <InputLabel>Warehouse</InputLabel>
        <Select
          id="warehouse"
          value={form.warehouse}
          required
          onChange={(event) => handleInputChange(event, "warehouse")}
        >
          {warehouses.map((warehouse) => (
            <MenuItem key={warehouse} value={warehouse}>
              {warehouse}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Chose between using Id or Uuid using checkboxes */}
      <FormControlLabel
        control={<Checkbox checked={useId} onChange={handleUseIdChange} />}
        label="Use ID"
      />
      {/* use Id when useId is true otherwise use uuid */}
      {useId && (
        <TextField
          id="id"
          className={styles.formControl}
          label="ID"
          value={form.id}
          onChange={(event) => handleInputChange(event, "id")}
          required
          error={!!form.id && !validateId(form.id)}
          helperText={form.id && !validateId(form.id) && "Filed is not an id"}
        />
      )}
      {/* IF UUId */}
      {!useId && (
        <TextField
          id="uuid"
          className={styles.formControl}
          label="UUID"
          value={form.uuid}
          onChange={(event) => handleInputChange(event, "uuid")}
          required
          error={!!form.uuid && !validateUUID(form.uuid)}
          helperText={
            form.uuid && !validateUUID(form.uuid) && "Filed is not an uuid"
          }
        />
      )}

      <Button variant="contained" className={styles.formButton} type="submit">
        Next
      </Button>
    </form>
  );
};

export default Step1;
