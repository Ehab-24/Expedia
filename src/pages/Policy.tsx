import { useParams } from "react-router-dom";
import policies from "../static/policies.json";

const PolicyPage = () => {
  const { article } = useParams();
  // @ts-ignore
  const html = policies[article];

  return (
    <main className="w-full my-40 px-4 md:px-40 xl:px-80">
      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
};

export default PolicyPage;
