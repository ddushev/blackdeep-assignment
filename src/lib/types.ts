import { z } from "zod";
import FormDataSchema from "./schema";

type FormFields = z.infer<typeof FormDataSchema>;

export default FormFields;
