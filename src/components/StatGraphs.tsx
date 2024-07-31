"use client"

import { Bar, BarChart, Label, Rectangle, ReferenceLine, XAxis, LabelList, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "./ui/button"
import Link from "next/link"

export default function StatCharts({weekData, lastWeekData}) {
    const todayDate = new Date(Date.now())
    const sundayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(),todayDate.getDate() - todayDate.getDay())
    const dayInMillis = 24 * 60 * 60 * 1000;

    var questionsRight = [0, 0, 0, 0, 0, 0, 0]

    var totalCorrect = 0;
    var totalQuestions = 0;
    for (let i = 0; i < weekData.length; i++){
        totalCorrect += weekData[i].accuracy;
        totalQuestions += weekData[i]['set-size'];
        questionsRight[weekData[i].date.getDate() - sundayDate.getDate()] = weekData[i].accuracy;
    }


    function getAccuracy(data){
        var correct = 0;
        var total = 0;
        for (let i = 0; i < data.length; i++){
          correct += data[i].accuracy;
          total += data[i]['set-size'];
        }
        return Math.round(correct/total * 100)
      }

      function getDateString(date: Date, offset: number){
        const newDate = new Date(date.getTime())
        newDate.setTime(date.getTime() + offset * dayInMillis);
        return (newDate.getFullYear().toString().concat("-",(newDate.getMonth() + 1).toString().concat("-",(newDate.getDate()).toString())))
      }
    

  return (
    <div className = "chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start gap-6 sm:flex-row ">
    <Card className="lg:max-w-md">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>This week</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {totalCorrect}{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            questions answered correctly
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            steps: {
              label: "Questions",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={[
              {
                date: (getDateString(sundayDate, 0)),
                steps: questionsRight[0],
              },
              {
                date: (getDateString(sundayDate, 1)),
                steps: questionsRight[1],
              },
              {
                date: (getDateString(sundayDate, 2)),
                steps: questionsRight[2],
              },
              {
                date: (getDateString(sundayDate, 3)),
                steps: questionsRight[3],
              },
              {
                date: (getDateString(sundayDate, 4)),
                steps: questionsRight[4],
              },
              {
                date: (getDateString(sundayDate, 5)),
                steps: questionsRight[5],
              },
              {
                date: (getDateString(sundayDate, 6)),
                steps: questionsRight[6],
              },
            ]}
          >
            <Bar
              dataKey="steps"
              fill="var(--color-steps)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }}
            />
            <ChartTooltip
              defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }}
                />
              }
              cursor={false}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Over the past 7 days, you have answered{" "}
          <span className="font-medium text-foreground">{totalQuestions}</span> questions.
        </CardDescription>
      </CardFooter>
    </Card>
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Progress</CardTitle>
        <CardDescription>
          Your accuracy this week compared to last week.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid auto-rows-min gap-2">
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            {getAccuracy(weekData)}%
            <span className="text-sm font-normal text-muted-foreground">
              accuracy
            </span>
          </div>
          <ChartContainer
            config={{
              steps: {
                label: "Steps",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="aspect-auto h-[32px] w-full"
          >
            <BarChart
              accessibilityLayer
              layout="vertical"
              margin={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
              data={[
                {
                  date: "This week",
                  steps: getAccuracy(weekData),
                },
              ]}
            >
              <Bar
                dataKey="steps"
                fill="var(--color-steps)"
                radius={4}
                barSize={32}
              >
                <LabelList
                  position="insideLeft"
                  dataKey="date"
                  offset={8}
                  fontSize={12}
                  fill="white"
                />
              </Bar>
              <YAxis dataKey="date" type="category" tickCount={1} hide />
              <XAxis dataKey="steps" type="number" hide />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="grid auto-rows-min gap-2">
          <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
            {getAccuracy(lastWeekData)}%
            <span className="text-sm font-normal text-muted-foreground">
              accuracy
            </span>
          </div>
          <ChartContainer
            config={{
              steps: {
                label: "Steps",
                color: "hsl(var(--muted))",
              },
            }}
            className="aspect-auto h-[32px] w-full"
          >
            <BarChart
              accessibilityLayer
              layout="vertical"
              margin={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
              }}
              data={[
                {
                  date: "Last week",
                  steps: getAccuracy(lastWeekData),
                },
              ]}
            >
              <Bar
                dataKey="steps"
                fill="var(--color-steps)"
                radius={4}
                barSize={32}
              >
                <LabelList
                  position="insideLeft"
                  dataKey="date"
                  offset={8}
                  fontSize={12}
                  fill="hsl(var(--muted-foreground))"
                />
              </Bar>
              <YAxis dataKey="date" type="category" tickCount={1} hide />
              <XAxis dataKey="steps" type="number" hide />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
    <Card className="justify-center">
        <CardHeader>
            <CardTitle>Want to see more?</CardTitle>
            <CardDescription>Go to the Stats page to see more charts. </CardDescription>
        </CardHeader>
        <CardContent>
            <Button><Link href="/dashboard-force/stats">Go to Stats Page</Link></Button>
        </CardContent>
    </Card>
    </div>
  )
}