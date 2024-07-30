"use client";
import * as React from "react"
 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import dataJson  from "@/app/dashboard.json" 

export default function FlashcardDrawer({cardID}){
    const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  let flashcard = {}

  for (let i = 0; i < dataJson["flashcard-sets"].length; i++){
    if (dataJson["flashcard-sets"][i].ID === cardID) flashcard = dataJson["flashcard-sets"][i]
  }
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
 
  return (
    <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              { flashcard == {} ? <Card>
                <CardHeader>
                    <CardTitle>Question #{index+1}</CardTitle>
                    <CardDescription>{flashcard.cards[index].question}</CardDescription>
                </CardHeader> 
                <CardContent>
                <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">A: {flashcard.cards[index].choices.A}</span>
                      <div>
                          Edit
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">B: {flashcard.cards[index].choices.B}</span>
                      <div>
                          Edit
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">C: {flashcard.cards[index].choices.C}</span>
                      <div>
                          Edit
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">D: {flashcard.cards[index].choices.D}</span>
                      <div>
                          Edit
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card> : <Card><CardHeader>
                    <CardTitle>Did not find flashcard</CardTitle>
                </CardHeader> 
                <CardContent>
                Please try again. Id: {cardID} JSON: {dataJson['flashcard-sets'][0].ID} bool: {(cardID === dataJson['flashcard-sets'][0].ID).toString()}
                </CardContent>
              </Card>}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    </div>
  )
}