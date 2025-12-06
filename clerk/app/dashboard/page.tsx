import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress || "User"}!
            </p>
          </div>
          <UserButton />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Profile</h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-600 font-medium">Name: </span>
              <span className="text-gray-900">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">Email: </span>
              <span className="text-gray-900">{user?.emailAddresses[0]?.emailAddress}</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">User ID: </span>
              <span className="text-gray-900 font-mono text-sm">{user?.id}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            🎉 You have successfully authenticated with Clerk! This is a protected route that
            requires sign-in to access.
          </p>
        </div>
      </div>
    </div>
  );
}
