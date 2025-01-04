import { z } from "zod";

const userSignUpZod = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

const userLoginZod = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export { userSignUpZod, userLoginZod };
