import * as MUI from "@mui/material";

interface SubmitButtonProps {
  handleSubmit: () => (event: React.FormEvent<HTMLFormElement>) => void;
}

function SubmitButton({ handleSubmit }: SubmitButtonProps) {
  return (
    <MUI.Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={handleSubmit}
    >
      Entrar
    </MUI.Button>
  );
}

export default SubmitButton;
