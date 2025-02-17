import PlatformIcon from './PlatformIcon';
import { Button } from './ui/button';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';
import { useCallback } from "react";
import axios from 'axios';


// eslint-disable-next-line react/prop-types
export default function ProblemCard({ id, platform, title, tags, difficulty, link}) {

  const [solved, setSolved] = useState(false);

  const solve = useCallback(async (problemId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/problem/visitProblem",
        { problemId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Problem visited successfully:", response.data);
      setSolved(true);
    } catch (error) {
      console.error("Error visiting problem:", error.response ? error.response.data : error.message);
    }
  }, []); // ✅ Only re-creates if `authToken` changes
  
  const unsolve = useCallback(async (problemId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/problem/unvisitProblem",
        { problemId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Problem unvisited successfully:", response.data);
      setSolved(false);
    } catch (error) {
      console.error("Error visiting problem:", error.response ? error.response.data : error.message);
    }
  }, []); // ✅ Only re-creates if `id` or `authToken` changes

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border dark:border-gray-800 text-left">
      <div className="flex items-center space-x-4">
        {/* Icon */}x
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" >
          <PlatformIcon platform={platform}/>
        </div>

        {/* Content */}
        <div className="flex flex-col w-full">
          {/* Title */}
          <h3 className="text-xl font-semibold dark:text-white" >
            <Button onClick={() => window.open(link, "_blank")}>
            <SquareArrowOutUpRight /> {title}
            </Button>
          </h3>

          {/* Tags and Difficulty */}
          <div className="flex flex-wrap items-center justify-between mt-2 space-x-3">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {/* eslint-disable-next-line react/prop-types*/}
              {tags.map((tag, index) => (
                <Button key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded" variant='outline'>{tag}</Button>
              ))}
            </div>

            {/* Difficulty */}
            <div className="flex items-center gap-2">
              {typeof difficulty === "string" ? (
                <Button
                  className={`text-l font-medium ${
                    difficulty === "Easy"
                      ? "text-green-600 dark:text-green-400 bg-gray-200 dark:bg-gray-700"
                      : difficulty === "Medium"
                      ? "text-yellow-600 dark:text-yellow-400 bg-gray-200 dark:bg-gray-700"
                      : "text-red-600 dark:text-red-400 bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {difficulty}
                </Button>
              ) : (
                <Button variant='outline' className="bg-gray-200 dark:bg-gray-700">{difficulty}</Button>
              )}
              {
                solved ? (
                  <Button variant='outline' className="bg-red-600 dark:bg-red-400" onClick={() => unsolve(id)}>Mark as Unsolved</Button>
                ) : (
                  <Button variant='outline' className="bg-green-600 dark:bg-green-400" onClick={() => solve(id)}>Mark as Solved</Button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}