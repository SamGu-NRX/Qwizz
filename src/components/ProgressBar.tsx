"use client";
import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

export default function ProgressBars({percent1, percent2}){
    const [progressWk, setProgressWk] = React.useState(13)
 
  React.useEffect(() => {
    const timer = setTimeout(() => setProgressWk(percent1), 500)
    return () => clearTimeout(timer)
  }, [])

  const [progressMth, setProgressMth] = React.useState(10)
 
  React.useEffect(() => {
    const timer = setTimeout(() => setProgressMth(percent2), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
        <Card x-chunk="dashboard-05-chunk-1" id="this-week">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">{percent1}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    This week, you got {percent1}% questions right!
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={progressWk} aria-label="90% correct" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2" id="this-month">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">{percent2}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    This month, you got {percent2}% questions right.
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={progressMth} aria-label="80% correct" />
                </CardFooter>
              </Card>
    </>
  )
}