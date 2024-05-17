import z from "zod";

const envSchema = z.object({
  API_HOST: z.string().url(),
  NEXT_PRIVATE_ORIGIN: z.string().url(),
});

const envClientSchema = envSchema.parse({
  API_HOST: process.env.API_HOST,
  NEXT_PRIVATE_ORIGIN: process.env.__NEXT_PRIVATE_ORIGIN,
});

export default envClientSchema;
