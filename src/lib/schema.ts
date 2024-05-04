import { z } from "zod";

const namesRegEx = /^[a-zA-Z]{3,}$/;

const FormDataSchema = z.object({
  firstName: z
    .string()
    .trim()
    .regex(namesRegEx, "First name should consists of minimum 3 letters"),
  lastName: z
    .string()
    .trim()
    .regex(namesRegEx, "Last name should consists of minimum 3 letters"),
  password: z.string().trim(),
  confirmPassword: z.string().trim(),
});

export default FormDataSchema;
