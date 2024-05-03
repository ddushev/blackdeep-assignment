import { z } from "zod";

const FormDataSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
});

export default FormDataSchema;
