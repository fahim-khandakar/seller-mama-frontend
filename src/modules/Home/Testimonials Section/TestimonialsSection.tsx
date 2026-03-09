"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { reviews } from "./config/constants";

export default function TestimonialsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    <section className="w-full py-20 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase">
            HEAR FROM THE <span className="text-orange-500">SQUAD</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Real photos and real feedback from our community of football fans.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto px-10">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="border-none bg-slate-50 dark:bg-slate-900/40 rounded-[2rem] overflow-hidden h-full">
                    <CardContent className="p-0 flex flex-col h-full">
                      {/* Fan Photo */}
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src={review.jerseyImg}
                          alt="Customer Jersey"
                          fill
                          className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                      </div>

                      <div className="p-6 md:p-8 relative -mt-10 flex-1 flex flex-col">
                        {/* Avatar */}
                        <Avatar className="h-14 w-14 border-4 border-white dark:border-slate-900 shadow-xl mb-4">
                          <AvatarImage src={review.image} />
                          <AvatarFallback>{review.name[0]}</AvatarFallback>
                        </Avatar>

                        {/* Rating */}
                        <div className="flex gap-0.5 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < review.rating ? "fill-orange-500 text-orange-500" : "text-slate-300"}`}
                            />
                          ))}
                        </div>

                        {/* Text */}
                        <div className="relative mb-6 flex-1">
                          <Quote className="absolute -top-2 -left-1 w-6 h-6 text-orange-500/10" />
                          <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed relative z-10">
                            {review.text}
                          </p>
                        </div>

                        {/* Info */}
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                            {review.name}
                          </h4>
                          <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">
                            {review.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Orange Navigation */}
            <CarouselPrevious className="hidden md:flex -left-4 bg-orange-500 hover:bg-orange-600 text-white border-none h-10 w-10" />
            <CarouselNext className="hidden md:flex -right-4 bg-orange-500 hover:bg-orange-600 text-white border-none h-10 w-10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
