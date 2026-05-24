"use client";

import Image from "next/image";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import Button from "@/components/ui/Button";

const Hero: React.FC = () => {
  return (
    <section className="section-muted">
      <div className="container mx-auto px-4 sm:px-6">
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
            loading="lazy"
            className="mask-image-gradient h-[380px] w-[400px] rounded-2xl object-cover ring-4 ring-primary/20 sm:h-[440px]"
          />
          <div className="space-y-4 text-center sm:space-y-6 lg:text-left">
            <TypeAnimation
              sequence={["Niti Surakongka"]}
              wrapper="h1"
              speed={40}
              className="text-gradient font-Outfit text-3xl font-black uppercase tracking-wide sm:text-5xl"
            />
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-out"
              className="font-Kanit mx-auto max-w-3xl text-base font-light leading-relaxed text-stone-600 md:text-balance md:text-xl lg:mx-0"
            >
              สวัสดีครับ! ผมชื่อเอิร์ธ หรือ นายนิติ สุระคงคา เป็น Junior Front-end Developer ที่มีความสนใจในการพัฒนา Web Application ด้วยเทคโนโลยีสมัยใหม่
              มีประสบการณ์ในการพัฒนาเว็บไซต์และออกแบบประสบการณ์ผู้ใช้งานในฝั่ง Front-end พร้อมเรียนรู้และพัฒนาทักษะใหม่ๆ อยู่เสมอ
              และปัจจุบันกำลังต่อยอดทักษะด้าน Full Stack เพื่อเติบโตสู่การเป็น Full Stack Developer ในอนาคต
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
