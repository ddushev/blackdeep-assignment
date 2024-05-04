import { z } from "zod";

const namesRegex = /^[a-zA-Z]{3,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])[A-Za-z0-9!@#$%^&*()-_+=]{8,}$/;
const interestsValues = ["Sports", "Music", "Dancing", "Games"];

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
    password: z.string().trim(),
    // .regex(
    //   passwordRegex,
    //   "Password should contain at least 8 characters, including at least one uppercase letter, one digit, and one symbol"
    // ),
    confirmPassword: z.string().trim(),
    interests: z
      .array(z.enum(["Sports", "Music", "Dancing", "Games"]), {
        invalid_type_error:
          "Please selected at least one and no more than 2 interests",
      })
      .refine(
        (interests) => interests.length <= 2,
        "Please selected at least one and no more than 2 interests"
      ),
    avatar: z.object({
      // name: z.string(),
      // type: z.string().refine((value) => value.startsWith("image/"), {
      //   message: "Only image files are allowed",
      // }),
      // size: z.number().max(500000, "File size should not exceed 500KB"),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default FormDataSchema;
