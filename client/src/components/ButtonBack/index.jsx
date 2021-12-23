import { Button } from "@mui/material";

export default function ButtonBack({ title }) {
  return (
    <Button size='small' variant='outlined'>
      <i style={{ marginRight: "5px" }} class='fas fa-arrow-left'></i>
      {title}
    </Button>
  );
}
