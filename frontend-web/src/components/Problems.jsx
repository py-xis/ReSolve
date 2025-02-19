import { useRecoilValue } from "recoil";
import {useMemo} from "react";
import ProblemCard from "./ProblemCard";
import { Button } from "./ui/button";
import { Chrome } from "lucide-react";
import { problemsAtom } from "@/store/atoms/problems";

export default function Problems(){
    const problems = useRecoilValue(problemsAtom);


    const memoizedProblems = useMemo(() => {
      return problems.map(problem => ({ ...problem })); // Clone objects to ensure referential stability
  }, [problems]);

    

    return (
        <div className="container mx-auto px-4 py-8">
      
      
      
          {/* <div className="flex flex-col gap-4">
            {memoizedProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                platform={problem.platform}
                title={problem.title}
                tags={problem.tags}
                difficulty={problem.difficulty}
                link={problem.link}
                id={problem.id}
              />
            ))}
          </div> */}
      
          {
            memoizedProblems.length === 0 ?
            <>
              <div className="flex flex-col gap-4 items-center py-4">
                <p className="text-gray-600 dark:text-gray-400 font-semibold text-3xl">No problems found</p>
                <p className="text-gray-600 dark:text-gray-400 font-semibold text-3xl">Get the chrome extension and start upsolving</p>
              </div>
              <div className="flex justify-center items-center">
                  <Button className="px-6 py-5 text-lg font-semibold rounded-lg" onClick={() => window.open("https://google.com", "_blank")}>
                    <Chrome className="w-6 h-6" /> {/* Increase icon size */}
                    <span className="ml-2">Get the Chrome Extension</span>
                  </Button>
              </div> 
            </>
            :
            <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold dark:text-white mb-6">Problems</h2>
            {memoizedProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                platform={problem.platform}
                title={problem.title}
                tags={problem.tags}
                difficulty={problem.difficulty}
                link={problem.link}
                id={problem.id}
                solvedStatus={problem.revisited}
              />
            ))}
          </div>
          }
        </div>
      );

}