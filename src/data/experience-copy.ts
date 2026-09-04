import type { Locale } from "@/i18n/config";
import type { LocalizedExperienceCopy } from "@/types/experience";
import type { ExperienceId } from "./experiences";

type ExperienceCopyById = Record<ExperienceId, LocalizedExperienceCopy>;

export const EXPERIENCE_COPY = {
  th: {
    "software-developer": {
      period: "พ.ค. 2025 - ปัจจุบัน",
      location: "กรุงเทพฯ",
      summary:
        "พัฒนาและปรับปรุงเว็บไซต์ที่ใช้งานจริงร่วมกับทีมด้วย C#, .NET MVC และ Oracle โดยให้ความสำคัญกับประสิทธิภาพและการใช้งานของระบบสำหรับบริษัท พนักงาน และลูกค้า",
      description:
        "ในตำแหน่ง Software Developer (Full-Stack) ผมได้ร่วมพัฒนาโปรเจกต์เว็บไซต์ที่ใช้งานจริงและทำงานร่วมกับทีม พร้อมเรียนรู้ C# และ .NET MVC ซึ่งเป็นเทคโนโลยีใหม่สำหรับผม งานหลักครอบคลุมการพัฒนาและปรับปรุงเว็บไซต์ของบริษัท ทั้งเว็บไซต์หลัก ระบบสำหรับพนักงาน และระบบสำหรับลูกค้า โดยมุ่งเพิ่มประสิทธิภาพและความสะดวกในการใช้งาน นอกจากนี้ ผมยังได้เรียนรู้การจัดการฐานข้อมูลด้วย Oracle และ Navicat รวมถึงใช้ SourceTree เพื่อจัดการโค้ดและทำงานร่วมกับทีม",
    },
    "frontend-developer-intern": {
      period: "ธ.ค. 2024 - มี.ค. 2025",
      location: "กรุงเทพฯ",
      summary:
        "ร่วมพัฒนาเว็บไซต์ที่ใช้งานจริงและปรับปรุง Core Web Vitals, SEO และประสบการณ์ผู้ใช้ด้วยเทคโนโลยี Frontend สมัยใหม่และ WordPress",
      description:
        "ระหว่างฝึกงานในตำแหน่ง Frontend Developer ผมได้ร่วมพัฒนาเว็บไซต์ที่ใช้งานจริง ทำงานร่วมกับทีม และใช้เทคโนโลยี Frontend สมัยใหม่เพื่อยกระดับประสบการณ์ผู้ใช้ ผมได้เรียนรู้ WordPress และศึกษา SEO เพิ่มเติม พร้อมมีส่วนร่วมในการปรับปรุง First Contentful Paint (FCP), Largest Contentful Paint (LCP) และ Cumulative Layout Shift (CLS) เพื่อให้เว็บไซต์ทำงานได้ราบรื่นขึ้น รวมถึงปรับโครงสร้าง URL, Meta Titles, Meta Tags และ Image SEO เพื่อสนับสนุนประสิทธิภาพด้านการค้นหา",
    },
    "undergraduate-student": {
      period: "ก.ค. 2021 - เม.ย. 2025",
      location: "นครปฐม",
      summary:
        "เรียนรู้การพัฒนาเว็บไซต์ตั้งแต่ UX/UI ไปจนถึงระบบทดสอบอัตโนมัติ ผ่านโปรเจกต์ที่ใช้ React, Next.js, TypeScript, MERN Stack และ Firebase",
      description:
        "ระหว่างเป็นนักศึกษา ผมได้เรียนรู้พื้นฐานการพัฒนาเว็บไซต์ ตั้งแต่การออกแบบ UX/UI และการสร้างแพลตฟอร์มเพื่อการศึกษา ไปจนถึงระบบทดสอบอัตโนมัติ โปรเจกต์ต่าง ๆ เปิดโอกาสให้ผมทดลองใช้ React, Next.js, Tailwind CSS, Material UI, TypeScript, Redux, RESTful API, MERN Stack และ Firebase",
    },
  },
  en: {
    "software-developer": {
      period: "May 2025 - Present",
      location: "Bangkok",
      summary:
        "Develop and improve production websites with a team using C#, .NET MVC, and Oracle, with a focus on performance and usability for the company, employees, and customers.",
      description:
        "As a Software Developer (Full-Stack), I contribute to production web projects and collaborate with a development team while building experience with C# and .NET MVC. My work covers the company's main website as well as employee- and customer-facing systems, with an emphasis on performance and usability. I also work with Oracle and Navicat for database management and use SourceTree to support source control and team collaboration.",
    },
    "frontend-developer-intern": {
      period: "Dec 2024 - Mar 2025",
      location: "Bangkok",
      summary:
        "Contributed to production websites and improved Core Web Vitals, SEO, and user experience using modern frontend technologies and WordPress.",
      description:
        "During my Frontend Developer internship, I contributed to production websites, collaborated with a team, and used modern frontend technologies to improve user experience. I gained hands-on experience with WordPress and expanded my SEO knowledge by working on First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS). I also improved URL structure, meta titles, meta tags, and image SEO to support search performance.",
    },
    "undergraduate-student": {
      period: "Jul 2021 - Apr 2025",
      location: "Nakhon Pathom",
      summary:
        "Studied web development from UX/UI through automated testing in projects using React, Next.js, TypeScript, the MERN Stack, and Firebase.",
      description:
        "As an undergraduate student, I built a foundation in web development spanning UX/UI design, educational platforms, and automated testing. These projects gave me practical opportunities to work with React, Next.js, Tailwind CSS, Material UI, TypeScript, Redux, RESTful APIs, the MERN Stack, and Firebase.",
    },
  },
} as const satisfies Record<Locale, ExperienceCopyById>;
