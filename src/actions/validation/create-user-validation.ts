import z from "zod";

const CreateUserValidationSchema = z.object({
    email: z.string().email()
        .min(0, "Missing field email")
        .max(128, "Email must be less than 128 characters."),
    username: z.string()
        .min(0, "Missing field username")
        .max(64, "Username must be less than 64 characters."),
    password: z.string()
        .min(6, "Password must be at least 6 characters."),
})

export const parseCreateUserData = async (data: unknown) => CreateUserValidationSchema.parseAsync(data)