import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postData, updateStep } from "../../../features/return/returnSlice";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Step3 = () => {
  const form = useSelector((state) => state.return.form);
  const dispatch = useDispatch();

  const onBackButtonClick = () => {
    dispatch(updateStep(1));
  };

  const onSubmitButtonClick = () => {
    //   post data to backend
    dispatch(postData()).then(() => {
      dispatch(updateStep(4));
    }).catch((error) => {
      alert("Error posting data")
      console.error("Error posting data:", error);
    });
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Summary
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary">
          {/*  */}
          <div>
            <div>Selected Logistic: {form.logistic}</div>
            <div>Selected Warehouse: {form.warehouse}</div>
            <div>UUID/ID: {form.uuid || form.id}</div>
            <div>Items to return: {JSON.stringify(form.itemsToReturn)}</div>
            <div>Return Reasons: {form.returnReasons}</div>
            <div>Annotation: {form.annotation}</div>
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onBackButtonClick}>
          Back
        </Button>
        <Button size="small" onClick={onSubmitButtonClick}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Step3;
