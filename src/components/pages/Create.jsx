import { Save } from "@mui/icons-material";
import {
  Alert,
  Container,
  Divider,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { db } from "../../config/firebase-config";
import { addDoc, collection, Timestamp } from "@firebase/firestore";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteError, setNoteError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [noteSuccess, setNoteSuccess] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = async () => {
    setButtonLoading("true");
    const docRef = await addDoc(collection(db, "notes"), {
      title: title,
      description: description,
      created_at: Timestamp.now(),
    })
      .then((e) => {
        console.log(e);
        setButtonLoading(false);
        setNoteSuccess(true);
      })
      .catch((e) => {
        setButtonLoading(false);

        setNoteError(true);
        setErrorMsg(e);
      });

    clearFields();
  };

  const clearFields = () => {
    setTitle("");
    setDescription("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNoteError(false);
    setNoteSuccess(false);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px" }}>
      <Paper sx={{ p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Creat a note</Typography>
          </Grid>
          <Divider variant="middle" />

          <Grid item xs={12}>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              fullWidth={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              fullWidth={true}
              multiline={true}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <LoadingButton
            loading={buttonLoading}
            fullWidth={true}
            endIcon={<Save />}
            loadingPosition="end"
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </LoadingButton>
        </Grid>
      </Paper>
      <Snackbar
        open={noteSuccess}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Note Added Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={noteError}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Error occured : {errorMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Create;
