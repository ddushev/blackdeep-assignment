import { z } from "zod";

const namesRegEx = /^[A-Za-z]+$/;

const FormDataSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name should be at least 3 characters long")
    .regex(namesRegEx, "First name should consists only of letters"),
  lastName: z
    .string()
    .trim()
    .min(3, "Last name should be at least 3 characters long")
    .regex(namesRegEx, "Last name should consists only of letters"),
});

export default FormDataSchema;
