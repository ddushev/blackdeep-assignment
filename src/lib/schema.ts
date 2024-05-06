import { z } from "zod";

const namesRegex = /^[\p{L}]{3,}$/u;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])[A-Za-z0-9!@#$%^&*()-_+=]{8,}$/;

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
    avatar: z
      .any()
      .refine(
        (file) => file && file[0]?.name.length >= 1,
        "Please upload an .jpg, jpeg, .png or .webp image with maximum size of 5MB"
      )
      .refine(
        (file) => file && file[0]?.size <= MAX_FILE_SIZE,
        "Max image size is 5MB"
      )
      .refine(
        (file) => file && ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default FormDataSchema;
