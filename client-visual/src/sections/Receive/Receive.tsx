import React from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { SideDetails } from "../../common/SideDetails";
import { MainText } from "./MainText";
import { MainImage } from "./MainImage";
import { BackgroundText } from "./BackgroundText";
import { FundingProcess } from "./FundingProcess";
import { DonorText } from "./DonorText";
import { FundingProcessExplainer } from "./FundingProcessExplainer";
import { MoreDetails } from "./MoreDetails";
import json2mq from "json2mq";

const useStyles = makeStyles({
  top: {
    backgroundColor: "#0068ea",
    paddingTop: "100px",
    height: "90vh",
  },
  body: {
    backgroundColor: "white",
  },
});

export const Receive = () => {
  const classes = useStyles();
  const matches = useMediaQuery(
    json2mq({
      minWidth: 800,
    })
  );
  return (
    <div>
      <div
        className={classes.top}
        style={{
          paddingBottom: "14px",
          paddingLeft: "14px",
          paddingRight: "14px",
        }}
      >
        <Grid container>
          {matches ? (
            <Grid style={{ paddingBottom: "50px" }} item xs={12} sm={4}>
              <SideDetails
                firstNumber="01"
                firstLabel="donors"
                middleNumber="01 btc"
                middleLabel="bitcoin received"
                lastNumber="1300 eth"
                lastLabel="ether received"
              />
            </Grid>
          ) : null}
          <MainText />
          {matches ? null : (
            <Grid item xs={12} sm={4}>
              <SideDetails
                firstNumber="01"
                firstLabel="donors"
                middleNumber="01 btc"
                middleLabel="bitcoin received"
                lastNumber="1300 eth"
                lastLabel="ether received"
              />
            </Grid>
          )}
        </Grid>
        <div style={{ position: "absolute", left: 57, bottom: 48 }}>
          <MainImage />
        </div>
        <Grid
          container
          style={{ position: "absolute", bottom: 96 }}
          alignContent="center"
          alignItems="center"
          justify="center"
        >
          {matches ? <MoreDetails /> : null}
        </Grid>
      </div>
      <div>
        <Grid container className={classes.body}>
          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={9}>
            <BackgroundText />
          </Grid>
        </Grid>
        <Grid container className={classes.body}>
          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={9}>
            <DonorText />
          </Grid>
        </Grid>
        <Grid container className={classes.body}>
          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <FundingProcess />
          </Grid>
        </Grid>
      </div>
      <div style={{ paddingBottom: "100px" }}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <FundingProcessExplainer />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
