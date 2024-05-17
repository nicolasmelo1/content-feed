import { getApiDocs } from "../../lib/swagger";
import ReactSwagger from "../../lib/SwaggerUI";

export default async function SwaggerPage() {
  const spec = await getApiDocs();

  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
