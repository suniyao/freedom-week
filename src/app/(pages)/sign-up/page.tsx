import Link from "next/link";

export default function signUp(){
  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Create New Account</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-300 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="username"
              placeholder="ilovemath123"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-300 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200 placeholder-gray-300 text-gray-800"
            />
          </div>

          <div className="flex flex-col items-center text-sm text-amber-500">
            <Link href={"/sign-in"} className="hover:underline">Have an account?</Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2 text-white hover:bg-amber-400 transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  )
} 