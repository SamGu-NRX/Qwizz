import Head from 'next/head';
import Onboarding from '@/components/Onboarding/Onboarding';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoreVertical,
} from 'lucide-react';

import Script from 'next/script'

import * as React from "react"
import { useState, useEffect } from 'react'

import Sidebar from "@/components/SidebarDash";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { Question, columns } from "./columns"
import { DataTable } from "./data-table"

import Header from "@/components/HeaderDash"

import dataJson  from "@/app/dashboard.json" 

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { title } from "process";




async function getData(): Promise<Question[]> {
  let dataTableInfo = []
  for (let i = 0; i < dataJson['flashcard-sets'].length; i++){
    var correct = 0;
    const flashcardContent = dataJson['flashcard-sets'][i];
    for (let index = 0; index < flashcardContent.cards.length; index++){
      if (flashcardContent.cards[index].correct == flashcardContent.cards[index].chosen) correct++;
    }
    let flashcardJson = {
      title: [flashcardContent.title, ""],
      id: flashcardContent.ID,
      type: flashcardContent.subject,
      date: new Date(flashcardContent.date.year, flashcardContent.date.month-1, flashcardContent.date.day),
      accuracy: correct.toString(),
      "set-size": flashcardContent.cards.length.toString()
    }
    dataTableInfo.push(flashcardJson)
  }
  return dataTableInfo
}

 async function showQuestion() {
  return ("hi")
}

export default async function Dashboard() {
  const data = await getData()

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <Onboarding />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Hello, Arthur!</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Welcome back to StudyBuddy, your intelligent study
                    companion! Start improving your SAT scores with AI today!
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button id="start-studying">Start Studying</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1" id="this-week">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">90%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    This week, you got 90% questions right!
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={90} aria-label="90% correct" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">80%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    This week, you got 90% questions right.
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={80} aria-label="80% correct" />
                </CardFooter>
              </Card>
            </div>
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Questions</CardTitle>
                    <CardDescription>
                      Recent questions you answered this week.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                  <DataTable columns={columns} data={data} />
                  </CardContent>
                </Card>
          </div>
          <div>
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Gas Station
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>Date: 6/23/23 </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold" id = "question-title">Question</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                A gas station sells regular gasoline for $2.39 per
                gallon and premium gasoline for $2.79 per gallon. If the
                gas station sold a total of 550 gallons of both types of
                gasoline in one day for a total of $1,344.50, how many
                gallons of premium gasoline were sold?
              </span>
            </li>
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">Answer Choices</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">A:</span>
              <span>25</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">B:</span>
              <span>75</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">C:</span>
              <span>175</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">D:</span>
              <span>475</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div>
          <div>
            <div className="font-semibold">Correct Answer: B: 75</div>
            <span className="text-muted-foreground">
              When asked for a specific value, try Plugging In the
              Answers. Label them as gallons of premium and start with
              the value in (B). If 75 gallons of premium were sold, the
              station would make 75($2.79) = $209.25 for those sales. A
              total of 550 gallons were sold, so the station would have
              sold 550 - 75 = 475 gallons of regular gasoline. The sales
              for the regular gasoline would be 475($2.39) = $1,135.25.
              The total sales for both types of gasoline would be
              $209.25 + $1,135.25 = $1,344.50. That matches the
              information in the question, so (B) is correct.
            </span>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Your Answer: B</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Good Job!</dt>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated <time dateTime="2023-11-23">November 23, 2023</time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  </div>
        </main>
      </div>
      <Script>
        {`
          var elements = document.getElementsByClassName("shower");
          Array.from(elements).forEach(function (element) {
              element.addEventListener('click', ClientClick);
          });
          
          function ClientClick(e) {
                  const title = document.getElementById("question-title");
                  title.innerHTML = "HIIIII";
          }
        `}
      </Script>
    </div>
  );
}

