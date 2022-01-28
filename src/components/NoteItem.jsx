import { Delete, Note } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

function NoteItem(props) {
  const note = props.note;

  return (
    <Alert
      severity="success"
      icon={<Note fontSize="inherit" />}
      action={
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => props.onDelete(note.id)}
        >
          <Delete />
        </IconButton>
      }
    >
      <AlertTitle>
        <Typography variant="h5">{note.title}</Typography>
      </AlertTitle>
      <Typography variant="subtitle1">{note.description}</Typography>
      <Divider sx={{ width: "100%", margin: "5px 0" }} />
      <Typography sx={{ fontStyle: "italic", fontSize: "12px" }}>
        created at{" "}
        {`${note.created_at
          .toDate()
          .toLocaleDateString("en-US")} ${note.created_at
          .toDate()
          .toLocaleTimeString("en-US")}`}
      </Typography>
    </Alert>
  );
}

export default NoteItem;
