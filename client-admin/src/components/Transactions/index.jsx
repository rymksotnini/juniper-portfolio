import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  UnpublishedTransactionCard,
  PublishedTransactionCard,
  ArchivedTransactionCard,
} from "../../ui/Cards";
import TxList from "../../ui/TxList";
import Snackbar from "../../ui/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "4em",
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#f8f8f8",
  },
  padding: {
    padding: theme.spacing(3),
  },
  tabs: {
    backgroundColor: "#2e1534",
  },
  fetchingTxs: {
    textAlign: "center",
  },
}));

function TabPanel(props) {
  const { children, activeTab, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={activeTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ backgroundColor: "#f8f8f8", paddingBottom: "2em" }}
    >
      {activeTab === index && <Container maxWidth="md">{children}</Container>}
    </div>
  );
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: "#00aeef",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "uppercase",
    color: "#929292",
    fontWeight: 700,
    fontSize: 12,
    letterSpacing: 1.2,
    opacity: 1,
  },
}))((props) => <Tab disableRipple {...props} />);

export default function CustomizedTabs() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [fetchingTxs, setFetchingTxs] = useState(false);
  const [txs, setTxs] = useState([]);
  const [unpublishedTxs, setUnpublishedTxs] = useState([]);
  const [publishedTxs, setPublishedTxs] = useState([]);
  const [archivedTxs, setArchivedTxs] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDuration] = useState(3000);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const changeView = (event, newTab) => {
    setActiveTab(newTab);
  };

  const archiveTransaction = (txid) => {
    txs.forEach((tx) => {
      if (tx.txid === txid) {
        tx.archived = true;
      }
    });
    setTxs(txs);
    filterTransactions(txs);
  };

  const archiveTransactionSuccess = () => {
    setSnackbarMessage("Tx Archived");
    setSnackbarSeverity("success");
    setShowSnackbar(true);
  };

  const archiveTransactionFailed = (txid) => {
    txs.forEach((tx) => {
      if (tx.txid === txid) {
        tx.archived = false;
      }
    });
    setTxs(txs);
    filterTransactions(txs);
    setSnackbarMessage("Tx Archive Failed");
    setSnackbarSeverity("error");
    setShowSnackbar(true);
  };

  const filterTransactions = (txs) => {
    setUnpublishedTxs(
      txs.filter((tx) => tx.published === false && tx.archived === false)
    );
    // setting unpublished to false for now until modals are wired up
    setPublishedTxs(
      txs.filter((tx) => tx.published === false && tx.archived === false)
    );
    setArchivedTxs(txs.filter((tx) => tx.archived === true));
  };

  useEffect(() => {
    const getTransactions = async () => {
      setFetchingTxs(true);
      let data;
      let txs = [];
      try {
        data = await fetch("/rest/admin/transactions");
        txs = await data.json();
      } catch (e) {
        console.log(e);
      }

      setTxs(txs);
      filterTransactions(txs);
      setFetchingTxs(false);
    };

    getTransactions();
  }, []);

  return (
    <div className={classes.root}>
      <StyledTabs value={activeTab} onChange={changeView} centered>
        <StyledTab
          label="Unpublished"
          style={activeTab === 0 ? { color: "#00aeef" } : {}}
        />
        <StyledTab
          label="Published"
          style={activeTab === 1 ? { color: "#00aeef" } : {}}
        />
        <StyledTab
          label="Archived Transactions"
          style={activeTab === 2 ? { color: "#00aeef" } : {}}
        />
      </StyledTabs>
      <Typography className={classes.padding} />

      <TabPanel activeTab={activeTab} index={0}>
        {fetchingTxs ? (
          <div className={classes.fetchingTxs}>
            <CircularProgress />
            <h2>Loading Transactions</h2>
          </div>
        ) : (
          <TxList
            title={`${unpublishedTxs.length} Unpublished Transactions`}
            txs={unpublishedTxs}
            TxCard={UnpublishedTransactionCard}
            archiveTransaction={archiveTransaction}
            archiveTransactionSuccess={archiveTransactionSuccess}
            archiveTransactionFailed={archiveTransactionFailed}
          />
        )}
      </TabPanel>
      <TabPanel activeTab={activeTab} index={1}>
        <TxList
          title={`${publishedTxs.length} Published Transactions`}
          txs={publishedTxs}
          TxCard={PublishedTransactionCard}
        />
      </TabPanel>
      <TabPanel activeTab={activeTab} index={2}>
        <TxList
          title={`${archivedTxs.length} Archived Transactions`}
          txs={archivedTxs}
          TxCard={ArchivedTransactionCard}
        />
      </TabPanel>
      <Snackbar
        open={showSnackbar}
        severity={snackbarSeverity}
        duration={snackbarDuration}
        message={snackbarMessage}
        onClose={() => {
          setShowSnackbar(false);
        }}
      />
    </div>
  );
}
