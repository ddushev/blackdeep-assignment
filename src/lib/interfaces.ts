import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormFields from "./types";

export default interface IFormStepProps {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
}
