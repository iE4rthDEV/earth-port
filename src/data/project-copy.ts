import type { Locale } from "@/i18n/config";
import type { LocalizedProjectCopy } from "@/types/project";
import type { ProjectId } from "./projects";

type ProjectCopyById = Record<ProjectId, LocalizedProjectCopy>;

export const PROJECT_COPY = {
  th: {
    "1": {
      projectDescription:
        "ระบบแคชเชียร์และบันทึกการจองสินค้าสำหรับร้านค้าครอบครัว พัฒนาขึ้นเพื่อให้การบริหารจัดการร้านสะดวก รวดเร็ว และมีประสิทธิภาพมากขึ้น",
      summary:
        "โปรเจกต์ส่วนตัวสำหรับร้านค้าของครอบครัว ครอบคลุมระบบคิดเงินและคำนวณเงินทอน การชำระเงินผ่าน PromptPay และการบันทึกคำสั่งจองสินค้าในช่วงเทศกาล",
      keyResponsibilities: [
        "พัฒนาเว็บไซต์ตามแบบที่ออกแบบไว้ใน Figma",
        "ออกแบบฐานข้อมูลสำหรับจัดเก็บข้อมูลลูกค้า",
        "พัฒนาอินเทอร์เฟซที่รองรับทุกขนาดหน้าจอด้วย Next.js และ Tailwind CSS",
        "ออกแบบอินเทอร์เฟซให้สะอาด ใช้งานง่าย และเป็นมิตรต่อผู้ใช้",
        "ออกแบบระบบชำระเงินด้วย PromptPay QR Code",
      ],
    },
    "2": {
      projectDescription:
        "เว็บไซต์หลักของ CHAZ Insurance Brokers Ltd. ที่ย้ายระบบจาก Joomla มายัง WordPress",
      summary:
        "พัฒนาเว็บไซต์หลักของ CHAZ Insurance Brokers Ltd. โดยย้ายระบบเดิมจาก Joomla มายัง WordPress",
      keyResponsibilities: [
        "ย้ายระบบเว็บไซต์จาก Joomla มายัง WordPress",
        "ออกแบบและพัฒนาอินเทอร์เฟซที่รองรับทุกขนาดหน้าจอด้วย WordPress",
        "ออกแบบอินเทอร์เฟซให้สะอาดและเป็นมิตรต่อผู้ใช้",
        "ติดตั้งระบบสลับภาษาเพื่อรองรับเนื้อหาหลายภาษา",
        "ติดตั้งแบบฟอร์มออนไลน์สำหรับลูกค้าที่ต้องการให้บริษัทติดต่อกลับ พร้อมระบบส่งอีเมล",
        "ติดตั้งแบบฟอร์มสมัครงานออนไลน์ พร้อมระบบส่งอีเมล",
        "ดูแลรักษาระบบและแก้ไขข้อผิดพลาดที่เกิดขึ้น",
      ],
    },
    "3": {
      projectDescription:
        "แพลตฟอร์มเว็บบล็อกเชิงวิชาการสำหรับเผยแพร่บทความและงานวิจัย รวมถึงแลกเปลี่ยนความคิดเห็นระหว่างนักศึกษา อาจารย์ และผู้ใช้ทั่วไป ระบบครอบคลุมการยืนยันตัวตน การจัดการบทความ เรื่องร้องเรียน ผู้ใช้ และการตั้งค่าระบบ",
      summary:
        "โปรเจกต์จบที่พัฒนาโดยทีม 3 คน สำหรับเขียนและเผยแพร่บทความออนไลน์ รองรับผู้ใช้มากกว่า 100 คนในภาควิชาวิศวกรรมซอฟต์แวร์",
      keyResponsibilities: [
        "ออกแบบและพัฒนาอินเทอร์เฟซที่รองรับทุกขนาดหน้าจอด้วย Next.js และ TypeScript",
        "สร้างคอมโพเนนต์ให้เหมาะกับ SSR, CSR และ SSG เพื่อสนับสนุนประสิทธิภาพและ SEO",
        "ใช้ Mantine สร้าง UI ที่ทันสมัยและสม่ำเสมอ",
        "ออกแบบและตกแต่งอินเทอร์เฟซด้วย Tailwind CSS",
        "ออกแบบอินเทอร์เฟซให้สะอาด ใช้งานง่าย และเป็นมิตรต่อผู้ใช้",
      ],
    },
    "4": {
      projectDescription:
        "โปรเจกต์ในรายวิชา Blockchain ที่ผสานการเรียนรู้ Pokémon API เข้ากับการใช้ Blockchain สำหรับการซื้อขาย โดยพัฒนาด้วย Next.js และ Tailwind CSS",
      summary:
        "โปรเจกต์รายวิชา Blockchain ที่ผสานการเรียนรู้ Pokémon API กับกระบวนการซื้อขายผ่าน Blockchain",
      keyResponsibilities: [
        "ศึกษา Web3 และการเชื่อมต่อกับ Blockchain",
        "ศึกษาและทดลองใช้งาน API",
      ],
    },
    "5": {
      projectDescription:
        "เว็บไซต์บริการประกันตั๋วที่ช่วยคุ้มครองผู้ซื้อตั๋วเมื่อไม่สามารถเข้าร่วมงานได้ตามเงื่อนไขที่กำหนด",
      summary:
        "พัฒนาเว็บไซต์บริการ Ticket Protection เพื่อให้ผู้ซื้อตั๋วได้รับความคุ้มครองเมื่อไม่สามารถเข้าร่วมงานได้ตามเงื่อนไข",
      keyResponsibilities: [
        "ออกแบบและพัฒนาอินเทอร์เฟซที่รองรับทุกขนาดหน้าจอด้วย WordPress",
        "พัฒนาเว็บไซต์ตามแบบที่ออกแบบไว้ใน Figma",
        "ออกแบบอินเทอร์เฟซให้สะอาดและเป็นมิตรต่อผู้ใช้",
        "ติดตั้งระบบสลับภาษาเพื่อรองรับเนื้อหาหลายภาษา",
      ],
    },
    "6": {
      projectDescription:
        "เว็บไซต์ร้านค้าออนไลน์ของ EventTech สำหรับเลือกซื้อสินค้าและบริการที่เกี่ยวข้องกับงานอีเวนต์ได้อย่างสะดวกและปลอดภัย",
      summary:
        "พัฒนาและปรับปรุงเว็บไซต์ร้านค้าออนไลน์ของ EventTech เพื่อให้ผู้ใช้ซื้อสินค้าและบริการด้านอีเวนต์ได้สะดวกและปลอดภัย",
      keyResponsibilities: [
        "ออกแบบและพัฒนาอินเทอร์เฟซที่รองรับทุกขนาดหน้าจอด้วย WordPress",
        "ออกแบบอินเทอร์เฟซให้สะอาดและเป็นมิตรต่อผู้ใช้",
        "ติดตั้งระบบสลับภาษาเพื่อรองรับเนื้อหาหลายภาษา",
      ],
    },
    "7": {
      projectDescription:
        "Workshop ในรายวิชา Component-based & Mobile Development สำหรับเรียนรู้การจัดการ state ด้วย Redux ครอบคลุมการเพิ่มสินค้า จัดการตะกร้า และลบสินค้า พร้อมทดลองใช้ Redux DevTools สำหรับ debug",
      summary:
        "Workshop สำหรับเรียนรู้ Redux ผ่านระบบสินค้าและตะกร้าสินค้า ตั้งแต่การเพิ่มสินค้าไปจนถึงการนำสินค้าออกจากตะกร้า",
      keyResponsibilities: [
        "ศึกษา Redux สำหรับจัดการ state ของแอปพลิเคชัน",
        "ใช้ Redux DevTools เพื่อตรวจสอบและ debug state",
        "ใช้ React Hook Form สำหรับจัดการฟอร์ม",
      ],
    },
    "8": {
      projectDescription:
        "Workshop ในรายวิชา Component-based & Mobile Development สำหรับเรียนรู้พื้นฐาน MERN Stack, WebSocket และ Lodash ผ่านแอปพลิเคชันแชตที่ส่งข้อความระหว่างผู้ใช้แบบเรียลไทม์",
      summary:
        "Workshop สำหรับเรียนรู้ MERN Stack, WebSocket และ Lodash ผ่านการพัฒนาแอปพลิเคชันแชตแบบเรียลไทม์",
      keyResponsibilities: [
        "ศึกษาพื้นฐานการพัฒนาแอปพลิเคชันด้วย MERN Stack",
        "ใช้ WebSocket สำหรับส่งข้อความแบบเรียลไทม์",
        "ใช้ Lodash และ Axios ภายในโปรเจกต์",
      ],
    },
    "9": {
      projectDescription:
        "Workshop ในรายวิชา Component-based & Mobile Development ที่ต่อยอดการใช้งาน MERN Stack และ Firebase ครอบคลุมการสมัครและเข้าสู่ระบบด้วย Google รวมถึงการใช้ Swagger เพื่อจัดทำและทดสอบ API documentation",
      summary:
        "Workshop E-commerce ที่ต่อยอดการใช้ MERN Stack ด้วย Firebase authentication และ Swagger API documentation",
      keyResponsibilities: [
        "พัฒนาการสมัครและเข้าสู่ระบบด้วยบัญชี Google ผ่าน Firebase",
        "ใช้ Swagger สำหรับจัดทำ API documentation",
        "ใช้ AuthContext เพื่อตรวจสอบสิทธิ์ของผู้ใช้",
        "จำกัดสิทธิ์การเข้าถึงหน้า Admin Panel",
      ],
    },
  },
  en: {
    "1": {
      projectDescription:
        "A cashier and product reservation system built for my family's store to make day-to-day operations faster, simpler, and more efficient.",
      summary:
        "A personal project for my family's store, covering checkout and change calculation, PromptPay payments, and seasonal product reservations.",
      keyResponsibilities: [
        "Built the website from designs prepared in Figma",
        "Designed a database for storing customer information",
        "Developed a responsive interface with Next.js and Tailwind CSS",
        "Designed a clean, approachable interface focused on ease of use",
        "Designed a payment flow using PromptPay QR Code",
      ],
    },
    "2": {
      projectDescription:
        "The main website for CHAZ Insurance Brokers Ltd., migrated from Joomla to WordPress.",
      summary:
        "Developed the main website for CHAZ Insurance Brokers Ltd. by migrating the existing Joomla site to WordPress.",
      keyResponsibilities: [
        "Migrated the website from Joomla to WordPress",
        "Designed and developed a responsive WordPress interface",
        "Created a clean and user-friendly interface",
        "Installed multilingual switching for localized content",
        "Implemented an online callback form with email delivery",
        "Implemented an online job application form with email delivery",
        "Maintained the site and resolved issues as they arose",
      ],
    },
    "3": {
      projectDescription:
        "An academic weblog platform for publishing articles and research and exchanging academic perspectives among students, lecturers, and general users. The system includes authentication, article management, complaint handling, user management, and system settings.",
      summary:
        "A capstone project built by a three-person team for publishing online articles, supporting more than 100 users in the Software Engineering department.",
      keyResponsibilities: [
        "Designed and developed a responsive interface with Next.js and TypeScript",
        "Built components suited to SSR, CSR, and SSG to support performance and SEO",
        "Used Mantine to create a modern and consistent UI",
        "Designed and styled the interface with Tailwind CSS",
        "Created a clean, approachable interface focused on ease of use",
      ],
    },
    "4": {
      projectDescription:
        "A Blockchain course project combining experiments with the Pokémon API and blockchain-based purchasing, developed with Next.js and Tailwind CSS.",
      summary:
        "A Blockchain course project that combines learning the Pokémon API with a blockchain-based purchasing flow.",
      keyResponsibilities: [
        "Explored Web3 and blockchain connectivity",
        "Studied and experimented with API integration",
      ],
    },
    "5": {
      projectDescription:
        "A ticket protection website that helps cover ticket buyers when they cannot attend an event under the applicable conditions.",
      summary:
        "Developed a Ticket Protection website that provides coverage when ticket buyers cannot attend an event under the applicable conditions.",
      keyResponsibilities: [
        "Designed and developed a responsive WordPress interface",
        "Built the website from designs prepared in Figma",
        "Created a clean and user-friendly interface",
        "Installed multilingual switching for localized content",
      ],
    },
    "6": {
      projectDescription:
        "EventTech's online store for purchasing event-related products and services through a convenient and secure experience.",
      summary:
        "Developed and improved EventTech's online store to make event-related products and services convenient and secure to purchase.",
      keyResponsibilities: [
        "Designed and developed a responsive WordPress interface",
        "Created a clean and user-friendly interface",
        "Installed multilingual switching for localized content",
      ],
    },
    "7": {
      projectDescription:
        "A Component-based & Mobile Development workshop focused on Redux state management through product and cart features, including adding and removing cart items and inspecting state with Redux DevTools.",
      summary:
        "A workshop for learning Redux through product and shopping-cart flows, from adding products to removing items from the cart.",
      keyResponsibilities: [
        "Studied Redux for application state management",
        "Used Redux DevTools to inspect and debug state",
        "Used React Hook Form for form management",
      ],
    },
    "8": {
      projectDescription:
        "A Component-based & Mobile Development workshop covering the foundations of the MERN Stack, WebSocket, and Lodash through a chat application with real-time messaging between users.",
      summary:
        "A workshop for learning the MERN Stack, WebSocket, and Lodash by building a real-time chat application.",
      keyResponsibilities: [
        "Studied the foundations of MERN Stack application development",
        "Used WebSocket for real-time messaging",
        "Used Lodash and Axios within the project",
      ],
    },
    "9": {
      projectDescription:
        "A Component-based & Mobile Development workshop that extends a MERN Stack application with Firebase, Google sign-in, and Swagger for API documentation and testing.",
      summary:
        "An e-commerce workshop extending the MERN Stack with Firebase authentication and Swagger API documentation.",
      keyResponsibilities: [
        "Implemented registration and Google sign-in with Firebase",
        "Used Swagger to create API documentation",
        "Used AuthContext to verify user authorization",
        "Restricted access to the Admin Panel",
      ],
    },
  },
} as const satisfies Record<Locale, ProjectCopyById>;
