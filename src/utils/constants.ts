import z from "zod";

const envSchema = z.object({
  API_HOST: z.string().url(),
  NEXT_PRIVATE_ORIGIN: z.string().url(),
});

const proxy = new Proxy(
  { data: undefined as z.infer<typeof envSchema> | undefined },
  {
    get: (target, key: keyof z.infer<typeof envSchema>) => {
      if (target.data === undefined) {
        target.data = envSchema.parse({
          API_HOST: process.env.API_HOST,
          NEXT_PRIVATE_ORIGIN: process.env.__NEXT_PRIVATE_ORIGIN,
        });
      }
      return (target?.data)[key] || "";
    },
  }
);

export default proxy as unknown as z.infer<typeof envSchema>;
