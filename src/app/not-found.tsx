import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
      <h1 className="text-7xl font-extrabold text-main">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        Page will come soon
      </h2>
      <p className="text-gray-500 mt-2">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 bg-main text-white rounded-lg shadow hover:bg-secondaryMain transition"
      >
        Go back home
      </Link>
    </div>
  );
}
