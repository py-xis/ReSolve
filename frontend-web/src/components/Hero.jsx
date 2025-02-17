
export default function Hero() {
    return (
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold dark:text-white">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Re</span>Solve.
        </h1>
  
        <p className="text-gray-600 dark:text-gray-400 text-2xl">
          A platform to solve problems the smart way.
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-2xl">
          Track unsolved problems from CodeForces, LeetCode and AtCoder and upsolve.
        </p>
      </div>
    )
}