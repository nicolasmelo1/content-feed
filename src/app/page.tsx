import envClientSchema from "../utils/constants";
import { ContentPage } from "../page";

export default async function Home() {
  const url = new URL(envClientSchema.HOST + "/api/contents");
  const data = await fetch(url, { cache: "no-cache" })
    .then((res) => res.json())
    .catch(() => ({ success: false, data: [], reason: "unknown" }));

  return <ContentPage contents={data.data} />;
}
