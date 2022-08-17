import { Stack, Button,Typography } from "@mui/material"

export default function Sample() {
  return (
    <Stack direction="row" spacing={2} sx={{m:2, p:2}}>
      <Button variant="contained" color="primary">primary</Button>
      <Button variant="contained" color="secondary">secondary</Button>
      <Button variant="contained" color="error">error</Button>
      <Button variant="contained" color="warning">warning</Button>
      <Button variant="contained" color="info">info</Button>
      <Button variant="contained" color="success">success</Button>
      <Button variant="contained" color="success">あああ</Button>
      <Typography variant="h3">Responsive h3</Typography>
      <Typography variant="h4">Responsive h4</Typography>
      <Typography variant="h5">Responsive h5</Typography>
    </Stack>
  );
}
