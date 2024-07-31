// src/components/SubjectSelection.tsx
"use client"

import * as React from "react"
import { useMediaQuery } from '@react-hook/media-query'
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Subject = {
  value: string
  label: string
}

const subjects: Subject[] = [
  { value: "math", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
  // Add more subjects as needed
]

export function SubjectSelection() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("only screen and (min-width: 768px)")
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedSubject ? <>{selectedSubject.label}</> : <>+ Select Subject</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <SubjectList setOpen={setOpen} setSelectedSubject={setSelectedSubject} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedSubject ? <>{selectedSubject.label}</> : <>+ Select Subject</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <SubjectList setOpen={setOpen} setSelectedSubject={setSelectedSubject} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function SubjectList({
  setOpen,
  setSelectedSubject,
}: {
  setOpen: (open: boolean) => void
  setSelectedSubject: (subject: Subject | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter subjects..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {subjects.map((subject) => (
            <CommandItem
              key={subject.value}
              value={subject.value}
              onSelect={(value: string) => {
                setSelectedSubject(
                  subjects.find((subject) => subject.value === value) || null
                )
                setOpen(false)
              }}
            >
              {subject.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export default SubjectSelection;