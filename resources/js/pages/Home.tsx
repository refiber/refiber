import { Link, usePage } from "@inertiajs/react";

import Layout from "components/Layout";

type HomePageProps = {
  hello: string;
};

export default function HomePage({ hello }: HomePageProps) {
  const { auth, shared } = usePage().props;

  return (
    <div>
      <h1 className="text-3xl font-semibold">Hello {hello}</h1>

      <p className="mt-3 text-gray-200">
        If you're using Refiber in your project, please let{" "}
        <a
          className="hover:underline inline-block text-sky-500"
          href="https://twitter.com/keevnx"
          target="_blank"
        >
          me
        </a>{" "}
        know what amazing things you're building!
      </p>

      <div className="mt-6 text-gray-200 flex flex-col space-y-2">
        <Link href="/about" className="hover:underline hover:text-white w-fit">
          / about
        </Link>

        {!auth && (
          <Link
            href="/login"
            className="hover:underline hover:text-white w-fit"
          >
            / login
          </Link>
        )}

        <a
          className="hover:underline hover:text-white w-fit"
          href="https://refiber.notion.site/Refiber-Docs-613336569bcd439ca74c27e30d46a491?pvs=4"
          target="_blank"
        >
          / docs
        </a>
      </div>

      {/* check app/middleware/SharedWeb.go and resources/js/vite-env.d.ts */}
      <div className="mt-6 text-gray-500 italic">env: {shared.env}</div>
    </div>
  );
}

HomePage.layout = (page: React.ReactNode) => <Layout children={page} />;
