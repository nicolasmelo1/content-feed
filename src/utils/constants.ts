import z from "zod";

const envSchema = z.object({
  API_HOST: z.string().url(),
  HOST: z.string().url(),
});

// Guarantees that the environment variables are only parsed once and when used.
const proxy = new Proxy(
  { data: undefined as z.infer<typeof envSchema> | undefined },
  {
    get: (target, key: keyof z.infer<typeof envSchema>) => {
      if (target.data === undefined) {
        target.data = envSchema.parse({
          API_HOST: process.env.API_HOST,
          HOST: process.env.HOST,
        });
      }
      return (target?.data)[key] || "";
    },
  }
);

export default proxy as unknown as z.infer<typeof envSchema>;
