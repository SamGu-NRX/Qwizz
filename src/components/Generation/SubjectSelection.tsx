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
import { ClassNames } from "@emotion/react"

type Subject = {
  value: string
  label: string
}

const subjects: Subject[] = [
  { value: "math", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
  { value: "english", label: "English" },
  { value: "geography", label: "Geography" },
  { value: "spanish", label: "Spanish" },
  { value: "art", label: "Art" },
  { value: "music", label: "Music" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "psychology", label: "Psychology" },
  { value: "computer_science", label: "Computer Science" },
  { value: "environmental_science", label: "Environmental Science" },
  // Add more subjects as needed
]

export function SubjectSelection() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null)

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start text-center items-center">
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
              onSelect={(value) => {
                setSelectedSubject(
                  subjects.find((priority: { value: string }) => priority.value === value) || null
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
