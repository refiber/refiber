import Layout from "@/components/Layout";
import { Link } from "@inertiajs/react";

export default function ProfilePage() {
  // const { auth } = usePage().props;

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
        <h1>Profile</h1>
      </div>

      <div>TODO</div>
    </div>
  );
}

ProfilePage.layout = (page: React.ReactNode) => <Layout children={page} />;
