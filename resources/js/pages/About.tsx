import Layout from "@/components/Layout";
import { Link } from "@inertiajs/react";

export default function AboutPage() {
  return (
    <div>
      <div className="text-3xl font-semibold flex">
        <Link
          href="/"
          className="hover:underline hover:text-white text-gray-300 font-normal"
        >
          <h2>Refiber</h2>
        </Link>
        <div className="mx-3">/</div>
        <h1>About</h1>
      </div>

      <div className="mt-6 text-gray-200 prose prose-h2:text-white">
        <p>
          Refiber's journey began as a quest to explore the Go language and its
          potential for building a modern framework. Inspired by the Laravel and
          Inertia.js architecture, I embarked on this project, leveraging the
          robust foundation provided by the GoFiber framework.
        </p>

        <h2>The GoFiber Connection</h2>
        <p>
          GoFiber plays a crucial role in Refiber's development. It serves as
          the solid base upon which Refiber's functionalities are built. This
          strategic choice allows Refiber to focus on specific features and
          integrations, while benefiting from GoFiber's core strengths.
        </p>

        <h2>How You Can Contribute:</h2>
        <ul>
          <li>
            <b>Dive into the Code:</b> Explore the codebase on GitHub{" "}
            <a
              className="hover:underline  text-sky-500"
              href="https://github.com/refiber"
              target="_blank"
            >
              https://github.com/refiber
            </a>{" "}
            and submit pull requests with your improvements.
          </li>
          <li>
            <b>Report the Issues:</b> Encountered a bug? Open an issue on GitHub
            to help keep Refiber polished.
          </li>
          <li>
            <b>Share Your Expertise:</b> Engage in discussions and offer
            feedback to shape the future of Refiber.
          </li>
        </ul>

        <p>
          <i>This Refiber description was created with AI assistance.</i>
        </p>
      </div>
    </div>
  );
}

AboutPage.layout = (page: React.ReactNode) => <Layout children={page} />;
