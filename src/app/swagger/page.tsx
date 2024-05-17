import { getApiDocs, ReactSwagger } from "../../lib";

export default async function SwaggerPage() {
  const spec = await getApiDocs();

  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
