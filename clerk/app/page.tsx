import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex flex-col items-center gap-8 text-center px-4">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome to Next.js with Clerk
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            A simple authentication starter using Clerk and Next.js. Get started
            by signing in to access protected routes.
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <Link
            href="/sign-in"
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors border-2 border-indigo-600"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
