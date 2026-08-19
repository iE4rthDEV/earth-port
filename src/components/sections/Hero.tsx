import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";

const Hero: React.FC = () => {
  return (
    <section className="hero bg-base-200">
      <div className="hero-content mx-auto w-full max-w-(--container-page) flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[minmax(20rem,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-8 lg:py-24">
        <div className="order-1 space-y-5 text-center lg:order-2 lg:text-left">
          <h1 className="text-gradient text-display font-display leading-tight font-black">
            Niti Surakongka
          </h1>
          <p className="mx-auto max-w-(--container-measure) font-thai text-base leading-7 text-base-content/70 sm:text-lg sm:leading-8 lg:mx-0">
            สวัสดีครับ! ผมชื่อเอิร์ธ หรือ นายนิติ สุระคงคา เป็น Junior Full
            Stack Developer ที่มีพื้นฐานในการพัฒนา Web Application
            ด้วยเทคโนโลยีสมัยใหม่
            มีประสบการณ์ในการพัฒนาเว็บไซต์และออกแบบประสบการณ์ผู้ใช้งานทั้งฝั่ง
            Front-end และ Back-end
            และมุ่งมั่นพัฒนาทักษะการเป็นนักพัฒนาซอฟต์แวร์อย่างต่อเนื่อง
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href="/projects" variant="primary" size="lg">
              View Projects
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact
            </Button>
          </div>
        </div>
        <figure className="order-2 mx-auto w-full max-w-sm lg:order-1 lg:max-w-md">
          <Image
            src="/img/profile-earth-remove-bg.jpg"
            alt="Portrait of Niti Surakongka"
            width={450}
            height={450}
            loading="eager"
            sizes="(max-width: 1023px) min(calc(100vw - 2rem), 24rem), 28rem"
            className="mask-image-gradient h-auto w-full rounded-box object-cover ring-4 ring-primary/20"
          />
        </figure>
      </div>
    </section>
  );
};

export default Hero;
