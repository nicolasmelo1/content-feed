import { createSwaggerSpec } from "next-swagger-doc";

export default async function getApiDocs() {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api", // define api folder under app folder
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Content Feed API",
        version: "1.0",
      },
      components: {},
      security: [],
    },
  });
  return spec;
}
