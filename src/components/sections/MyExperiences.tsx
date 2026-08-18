import Link from "next/link";
import React from "react";
import PageSection from "@/components/ui/PageSection";
import SectionHeading from "@/components/ui/SectionHeading";

const MyExperiences: React.FC = () => {
  return (
    <PageSection
      muted
      containerClassName="flex flex-col items-center py-10 sm:py-20"
    >
      <SectionHeading
        title="My Experiences"
        className="font-semibold mb-8 sm:mb-14"
      />
      <div className="w-full space-y-4 sm:space-y-6">
        <div className="card card-border flex w-full flex-col justify-center rounded-box border-gray-200 bg-base-100 px-4 py-6 shadow-sm transition duration-300 hover:border-primary/40 hover:shadow-md sm:flex-row sm:px-8 sm:py-10">
          <div className="mb-2 space-y-0 sm:mb-0 sm:space-y-1">
            <span className="text-xs font-medium tracking-wide uppercase text-base-content/50 sm:text-sm">
              May 2025 - Present
            </span>
            <p className="w-full text-nowrap font-display text-xl font-semibold sm:w-80 sm:text-2xl lg:w-96">
              Software Developer
            </p>
            <div className="flex gap-1 text-xs font-normal text-base-content/90 sm:text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span className="text-base-content/80">
                CHAZ Insurance Brokers Ltd., Bangkok
              </span>
            </div>
          </div>
          <div>
            <p className="mb-4 font-thai text-base font-normal leading-7 text-base-content/80 sm:text-[17px] sm:leading-7.5">
              ในการทำงานตำแหน่ง Software Developer (Full-Stack)
              ผมได้มีโอกาสร่วมทำโปรเจกต์เว็บไซต์จริง ร่วมงานกับทีม
              และได้เรียนรู้และทำงานกับ C# และ .NET MVC
              ซึ่งเป็นประสบการณ์ใหม่สำหรับผม
              ได้มีการพัฒนาและปรับปรุงเว็บไซต์ของบริษัท
              โดยเน้นไปที่การเพิ่มประสิทธิภาพและความสามารถในการใช้งานของเว็บไซต์
              ไม่ว่าจะเป็นเว็บไซต์หลักของบริษัท เว็บไซต์สำหรับพนักงาน
              หรือเว็บไซต์สำหรับลูกค้า
              นอกจากนี้ยังได้มีโอกาสเรียนรู้เกี่ยวกับการจัดการฐานข้อมูล โดยใช้
              Oracle เพื่อให้สามารถจัดการข้อมูลได้อย่างมีประสิทธิภาพมากยิ่งขึ้น
              ได้มีการเรียนรรู้การใช้งาน Navicat เพื่อช่วยในการจัดการฐานข้อมูล
              และได้มีส่วนร่วมในการพัฒนาและปรับปรุงระบบต่าง ๆ ของบริษัท
              เพื่อให้สามารถตอบสนองความต้องการของลูกค้าและพนักงานได้อย่างมีประสิทธิภาพมากยิ่งขึ้น
              และ Source Tree
              เพื่อช่วยในการจัดการโค้ดและการทำงานร่วมกับทีมได้อย่างมีประสิทธิภาพมากยิ่งขึ้น
              นอกจากนี้ยังได้มีโอกาสเรียนรู้เกี่ยวกับการทำงานในสภาพแวดล้อมของบริษัท
              และการทำงานร่วมกับทีม
              เพื่อให้สามารถทำงานได้อย่างมีประสิทธิภาพและตอบสนองความต้องการของบริษัทได้อย่างดีที่สุด
            </p>
            <ul className="list-inside list-disc indent-2 text-base font-normal leading-7 text-base-content/80 sm:text-[17px] sm:leading-7.5">
              <li>
                CHAZ Insurance Brokers Ltd.:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://chazinsurance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CHAZ Insurance Brokers Ltd.
                </Link>
              </li>
              <li>
                Clients Chazinsurance:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://clients.chazinsurance.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Clients Chazinsurance
                </Link>
              </li>
              <li>CIBS Web For employee</li>
            </ul>
          </div>
        </div>
        <div className="card card-border flex w-full flex-col justify-center rounded-box border-gray-200 bg-base-100 px-4 py-6 shadow-sm transition duration-300 hover:border-primary/40 hover:shadow-md sm:flex-row sm:px-8 sm:py-10">
          <div className="mb-2 space-y-0 sm:mb-0 sm:space-y-1">
            <span className="text-xs font-medium tracking-wide uppercase text-base-content/50 sm:text-sm">
              Dec 2024 - Mar 2025
            </span>
            <p className="w-full text-nowrap font-display text-xl font-semibold sm:w-80 sm:text-2xl lg:w-96">
              Frontend Developer Intern
            </p>
            <div className="flex gap-1 text-xs font-normal text-base-content/90 sm:text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span className="text-base-content/80">
                EventTech.ai, Bangkok
              </span>
            </div>
          </div>
          <div>
            <p className="mb-4 font-thai text-base font-normal leading-7 text-base-content/80 sm:text-[17px] sm:leading-7.5">
              ในการเป็นนักศึกษาฝึกงานตำแหน่ง Frontend Developer
              ผมได้มีโอกาสร่วมทำโปรเจกต์เว็บไซต์จริง ร่วมงานกับทีม
              และใช้เทคโนโลยีสมัยใหม่เพื่อยกระดับประสบการณ์ของผู้ใช้งาน
              นอกจากนี้ยังได้เรียนรู้และทำงานกับ WordPress
              ซึ่งเป็นประสบการณ์ใหม่สำหรับผม พร้อมทั้งได้ศึกษาเพิ่มเติมเกี่ยวกับ
              SEO ผมได้มีส่วนร่วมในการปรับปรุงประสิทธิภาพของเว็บไซต์
              โดยเน้นไปที่การพัฒนา First Contentful Paint (FCP), Largest
              Contentful Paint (LCP) และ Cumulative Layout Shift (CLS)
              เพื่อให้เว็บไซต์ทำงานได้ราบรื่นและมีประสิทธิภาพมากยิ่งขึ้น
              นอกจากนี้ ยังได้ปรับแต่ง URL ให้อ่านง่าย เป็นมิตรกับผู้ใช้งาน
              เพิ่ม Meta Titles, Meta Tags และปรับปรุง Images SEO
              เพื่อช่วยเพิ่มอันดับในการค้นหาบน Search Engine
            </p>
            <ul className="list-inside list-disc indent-2 text-base font-normal leading-7 text-base-content/80 sm:text-[17px] sm:leading-7.5">
              <li>Koh Mak</li>
              <li>bepeerapat 20th</li>
              <li>
                SEO for Whiteroom.ai:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://whiteroom.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Whiteroom.ai
                </Link>
              </li>
              <li>
                eventtech contact form:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://inquiry.eventtech.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact form
                </Link>
              </li>
              <li>
                ticket protect:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://ticketprotect.eventtech.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ticket protect
                </Link>
              </li>
              <li>
                shop eventtech:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://shop.eventtech.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  shop eventtech
                </Link>
              </li>
              <li>
                touchpoint groups:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://touchpointgroups.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  touchpoint groups
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="card card-border flex w-full flex-col justify-center rounded-box border-gray-200 bg-base-100 px-4 py-6 shadow-sm transition duration-300 hover:border-primary/40 hover:shadow-md sm:flex-row sm:px-8 sm:py-10">
          <div className="mb-2 space-y-0 sm:mb-0 sm:space-y-1">
            <span className="text-xs font-medium tracking-wide uppercase text-base-content/50 sm:text-sm">
              Jul 2021 - Apr 2025
            </span>
            <p className="w-full text-nowrap font-display text-xl font-semibold sm:w-80 sm:text-2xl lg:w-96">
              Undergraduate Student
            </p>
            <div className="flex gap-1 text-xs font-normal text-base-content/90 sm:text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <span className="text-base-content/80">
                Nakhon Pathom Rajabhat University
              </span>
            </div>
          </div>
          <div>
            <p className="mb-4 font-thai text-base font-normal leading-7 text-base-content/80 sm:text-[17px] sm:leading-7.5">
              ในการเป็นนักศึกษาอยู่ ผมได้เรียนรู้พื้นฐานของการพัฒนาเว็บไซต์
              ตั้งแต่การออกแบบ UX/UI การสร้างแพลตฟอร์มเพื่อการศึกษา
              ไปจนถึงการทำระบบทดสอบอัตโนมัติ
              โดยโปรเจกต์เหล่านี้ทำให้ผมมีโอกาสได้ลองใช้เทคโนโลยีและเฟรมเวิร์กใหม่
              ๆ เช่น React, Next.js, TailwindCSS, MUI, Typescript, Redux,
              RESTful API, MERN Stack และ Firebase เป็นต้น
            </p>
            <ul className="list-inside list-disc indent-2 text-base font-normal leading-7 text-base-content/80 sm:text-[17px] sm:leading-7.5">
              <li>
                TechVibe: an Academic Weblog Platform:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://github.com/msssrp/tech-vibe.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Link>
              </li>
              <li>
                Web application for Purchasing Music Equipment:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://github.com/entsrkk/Mini-Project.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Link>
              </li>
              <li>
                MERN E-commerce:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://github.com/entsrkk/MERN_SeShop.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github
                </Link>
              </li>
              <li>
                MERN Blog:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://github.com/entsrkk/MERNBlog.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github
                </Link>
              </li>
              <li>
                MERN Chat:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://github.com/entsrkk/MERN_Chat.git"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github
                </Link>
              </li>
              <li>
                Blockchain for buy Pokemon:{" "}
                <Link
                  className="link link-primary no-underline transition duration-300 ease-in-out hover:font-medium"
                  href="https://blockchain-beige.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  blockchain
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default MyExperiences;
