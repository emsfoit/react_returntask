import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "./form.module.css";
import { updateForm, updateStep } from "../../../features/return/returnSlice";

const returnReasons = [
  "Reason 1",
  "Reason 2",
  "Reason 3",
  "Reason 4",
  "Reason 5",
];

const Step2 = ({ onSubmitButtonClick }) => {
  const form = useSelector((state) => state.return.form);
  const prviousOrders = useSelector((state) => state.return.prviousOrders);
  const dispatch = useDispatch();

  const handleInputChange = (event, key) => {
    dispatch(updateForm({ key: key, value: event.target.value }));
  };

  const handleItemsToReturn = (event, sku) => {
    dispatch(
      updateForm({
        key: "itemsToReturn",
        value: { ...form.itemsToReturn, [sku]: event.target.value },
      })
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateStep(3));
  };

  return (
    <form onSubmit={handleSubmit}>
      {prviousOrders.map((order) => {
        let countArr = [];
        for (let i = 0; i <= order.count; i++) {
          countArr.push(i);
        }
        return (
          <FormControl
            key={order.sku}
            component="fieldset"
            className={styles.formControl}
          >
            <InputLabel>
              {" "}
              {order.sku}({order.count}) : Select how money Items to return
            </InputLabel>
            <Select
              value={form.itemsToReturn[order.sku] || 0}
              required
              onChange={(event) => handleItemsToReturn(event, order.sku)}
            >
              {countArr.map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      })}
      <FormControl component="fieldset" className={styles.formControl}>
        <FormLabel component="legend">Return Reason</FormLabel>
        <RadioGroup
          id="returnReason"
          value={form.returnReason}
          required
          onChange={(event) => handleInputChange(event, "returnReason")}
        >
          {returnReasons.map((reason) => (
            <FormControlLabel
              key={reason}
              value={reason}
              control={<Radio />}
              label={reason}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {/* Step 6 add annotation if needed */}
      <TextField
        id="annotation"
        className={styles.formControl}
        label="Annotation"
        value={form.annotation}
        onChange={(event) => handleInputChange(event, "annotation")}
        multiline
        rows={5}
      />
      <Button variant="contained" className={styles.formButton} type="submit">
        Next
      </Button>
    </form>
  );
};

export default Step2;
