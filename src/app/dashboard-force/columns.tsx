"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import Dashboard from "./page"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Check, X} from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Question = {
  title: Array<string>
  id: string
  type: string
  date: Date
  accuracy: boolean
}

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "title",
    header: () => <div>Title</div>,
    cell: ({ row }) => {
        var description = (row.getValue("title")[1]).toString()
        return (
            <div>
                <div className="font-medium">Gas Station</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                    {description.substring(0, 40).concat("", "...")}
                </div>
            </div>
        )
    },
  },
  {
    accessorKey: "id",
    header: () => <div>Link</div>,
    cell: ({ row }) => {
        const linkId = parseInt(row.getValue("id"))
        return (
            <div>
                <Button onClick={() => Dashboard.showQuestion()}>Show</Button>
            </div>
        )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const date = (row.getValue("date"))
        return (
            <div>
                {(date.getMonth()+1).toString().concat("-", (date.getDate()).toString()).concat("-", (date.getFullYear()).toString())}
            </div>
        )
    },
  },
  {
    accessorKey: "accuracy",
    header: () => <div>Accuracy</div>,
    cell: ({ row }) => {
      const accuracy = (row.getValue("accuracy"))
      if (accuracy){
        return <Check/>
      }
      else{
        return <X/>
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const question = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(question.title[1])}
            >
              Copy question
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Flag</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]