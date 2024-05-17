import envClientSchema from "../utils/constants";
import { ContentPage } from "../page";

export default async function Home() {
  const url = new URL(envClientSchema.NEXT_PRIVATE_ORIGIN + "/api/contents");
  const data = await fetch(url, { cache: "no-cache" }).then((res) =>
    res.json()
  );

  return <ContentPage contents={data.data} />;
}
