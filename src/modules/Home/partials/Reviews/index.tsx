"use client";

import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";

import { Review } from "@/shared/config/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReviewCard from "../Reviews Card/ReviewCard";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type ReviewsProps = { data: Review[] };

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
};

const useIsClient = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

const Reviews = ({ data }: ReviewsProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const isDesktop = useIsDesktop();
  const isClient = useIsClient();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!isClient) return null;

  return (
    <section className="overflow-hidden">
      <motion.div
        initial={{ x: "100px", opacity: 0 }}
        whileInView={{ x: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="relative w-full mb-6 md:mb-9"
        >
          <div className="relative flex items-end sm:items-center max-w-7xl mx-auto mb-6 md:mb-10 px-4 xl:px-0">
            <motion.h2
              initial={{ y: "100px", opacity: 0 }}
              whileInView={{ y: "0", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={cn([
                "text-[32px] leading-[36px] md:text-5xl capitalize mr-auto",
              ])}
            >
              OUR HAPPY CUSTOMERS
            </motion.h2>
            <div className="flex items-center space-x-1 ml-2">
              <CarouselPrevious variant="ghost" className="text-2xl">
                <ArrowLeft />
              </CarouselPrevious>
              <CarouselNext variant="ghost" className="text-2xl">
                <ArrowRight />
              </CarouselNext>
            </div>
          </div>
          <CarouselContent>
            {data.map((review, index) => (
              <CarouselItem
                key={review.id}
                className="w-full max-w-[358px] sm:max-w-[400px] pl-5"
              >
                <ReviewCard
                  className="h-full"
                  data={review}
                  blurChild={
                    data.length >= 6 && (
                      <div
                        className={cn([
                          isDesktop
                            ? (current + 1 === count
                                ? 0
                                : current + 1 > count
                                ? 1
                                : current + 1) === index &&
                              "backdrop-blur-[2px]"
                            : (current === count ? 0 : current) === index &&
                              "backdrop-blur-[2px]",
                          isDesktop
                            ? (current === 1
                                ? count - 2
                                : current === 2
                                ? count - 1
                                : current - 3) === index &&
                              "backdrop-blur-[2px]"
                            : (current === 1
                                ? count - 1
                                : current === 2
                                ? 0
                                : current - 2) === index &&
                              "backdrop-blur-[2px]",
                          "absolute bg-white/10 right-0 top-0 h-full w-full z-10",
                        ])}
                      />
                    )
                  }
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
};

export default Reviews;
