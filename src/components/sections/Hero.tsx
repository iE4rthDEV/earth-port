"use client";

import Image from "next/image";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import Button from "@/components/ui/Button";

const Hero: React.FC = () => {
  return (
    <section className="hero bg-base-200">
      <div className="hero-content container mx-auto max-w-none px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-10 py-12 sm:gap-16 sm:py-16 lg:flex-row lg:py-20">
          <Image
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-easing="ease-out"
            data-aos-delay="100"
            src="/img/profile-earth-remove-bg.jpg"
            alt="Niti Surakongka"
            width={450}
            height={450}
            loading="eager"
            className="mask-image-gradient h-95 w-100 rounded-2xl object-cover ring-4 ring-primary/20 sm:h-110"
          />
          <div className="space-y-4 text-center sm:space-y-6 lg:text-left">
            <TypeAnimation
              sequence={["Niti Surakongka"]}
              wrapper="h1"
              speed={40}
              className="text-gradient font-display text-3xl font-black uppercase tracking-wide sm:text-5xl"
            />
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-out"
              className="mx-auto max-w-3xl font-thai text-base font-normal leading-7 text-base-content/70 md:text-balance md:text-xl md:leading-8 lg:mx-0"
            >
              สวัสดีครับ! ผมชื่อเอิร์ธ หรือ นายนิติ สุระคงคา เป็น Junior Full Stack Developer ที่มีพื้นฐานในการพัฒนา Web Application ด้วยเทคโนโลยีสมัยใหม่
              มีประสบการณ์ในการพัฒนาเว็บไซต์และออกแบบประสบการณ์ผู้ใช้งานในฝั่ง Front-end และ Back-end ผมมีความมุ่งมั่นที่จะพัฒนาโซลูชันเว็บที่สมบูรณ์แบบ
              พร้อมทั้งพัฒนาทักษะการเป็นนักพัฒนาซอฟต์แวร์ของตนเองอย่างต่อเนื่อง
            </p>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <Button href="/projects" variant="primary">
                View Projects
              </Button>
              <Button href="/contact" variant="secondary">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
