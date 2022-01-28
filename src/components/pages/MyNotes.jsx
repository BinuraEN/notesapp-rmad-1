import { Container, Grid, Alert, Snackbar, Skeleton } from "@mui/material";
import NoteItem from "../NoteItem";
import { db } from "../../config/firebase-config";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  query,
  orderBy,
} from "@firebase/firestore";
import { useEffect, useState } from "react";

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [noteError, setNoteError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [noteSuccess, setNoteSuccess] = useState(false);
  const [itemsLoading, setitemsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setitemsLoading(true);
    const q = query(collection(db, "notes"), orderBy("created_at", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesArr = [];
      querySnapshot.docs.map((doc) => {
        const note = {
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          created_at: doc.data().created_at,
        };
        notesArr.push(note);
      });
      setNotes(notesArr);
      setitemsLoading(false);
    });
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id))
      .then(() => {
        setNoteSuccess(true);
      })
      .catch((e) => {
        setNoteError(true);
        setErrorMsg("Error occured" + e);
      });
    //getData();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNoteError(false);
    setNoteSuccess(false);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Grid container spacing={2}>
        {itemsLoading ? (
          <Skeleton animation="wave" width="100%" height="200px" />
        ) : (
          notes.map((note, i) => (
            <Grid key={i} item xs={12}>
              <NoteItem note={note} onDelete={deleteNote} />
            </Grid>
          ))
        )}
      </Grid>
      <Snackbar
        open={noteSuccess}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Note Deleted Successfully
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

export default MyNotes;
