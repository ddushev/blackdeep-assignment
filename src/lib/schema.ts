import { z } from "zod";

const namesRegex = /^[a-zA-Z]{3,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])[A-Za-z0-9!@#$%^&*()-_+=]{8,}$/;

const FormDataSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .regex(namesRegex, "First name should consists of minimum 3 letters"),
    lastName: z
      .string()
      .trim()
      .regex(namesRegex, "Last name should consists of minimum 3 letters"),
    password: z
      .string()
      .trim()
      .regex(
        passwordRegex,
        "Password should contain at least 8 characters, including at least one uppercase letter, one digit, and one symbol"
      ),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default FormDataSchema;
