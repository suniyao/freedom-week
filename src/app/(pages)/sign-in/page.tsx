export default function signIn(){
  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Sign In</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <div className="flex justify-between text-sm text-amber-500">
            <a href="#" className="hover:underline">Forgot password?</a>
            <a href="#" className="hover:underline">Create account</a>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2 text-white hover:bg-amber-400 transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  )
} 