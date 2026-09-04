const th = {
  metadata: {
    homeTitle: "Niti Surakongka | ผลงาน Full Stack Developer",
    homeDescription:
      "Portfolio ของ Niti Surakongka นักพัฒนา Full Stack ที่รวบรวมประสบการณ์ ผลงาน และช่องทางติดต่อ",
    projectsTitle: "ผลงาน | Niti Surakongka",
    projectsDescription:
      "รวมผลงานเว็บไซต์และ Web Application ของ Niti Surakongka",
    contactTitle: "ติดต่อ | Niti Surakongka",
    contactDescription:
      "ช่องทางติดต่อ Niti Surakongka สำหรับโอกาสในการร่วมงานและสอบถามข้อมูลเพิ่มเติม",
    projectNotFoundTitle: "ไม่พบโปรเจกต์ | Niti Surakongka",
  },
  navigation: {
    home: "หน้าหลัก",
    projects: "ผลงาน",
    contact: "ติดต่อ",
    primaryLabel: "เมนูหลัก",
    mobileLabel: "เมนูสำหรับมือถือ",
    openMenu: "เปิดเมนู",
    closeMenu: "ปิดเมนู",
    skipToContent: "ข้ามไปยังเนื้อหาหลัก",
  },
  language: {
    label: "เลือกภาษา",
    thai: "ภาษาไทย",
    english: "ภาษาอังกฤษ",
    changeError: "เปลี่ยนภาษาไม่สำเร็จ กรุณาลองอีกครั้ง",
  },
  home: {
    heroDescription:
      "สวัสดีครับ ผมชื่อเอิร์ธ หรือ นายนิติ สุระคงคา เป็น Junior Full Stack Developer ที่มีพื้นฐานด้านการพัฒนา Web Application ด้วยเทคโนโลยีสมัยใหม่ ผมมีประสบการณ์ในการพัฒนาเว็บไซต์และออกแบบประสบการณ์ผู้ใช้ทั้ง Frontend และ Backend พร้อมมุ่งมั่นพัฒนาทักษะด้านซอฟต์แวร์อย่างต่อเนื่อง",
    portraitAlt: "ภาพถ่ายของ Niti Surakongka",
    viewProjects: "ดูผลงาน",
    contact: "ติดต่อ",
    technologiesHeading: "Technologies I Use",
    projectsHeading: "ผลงาน",
    projectsHighlight: "ที่คัดสรร",
    experiencesHeading: "ประสบการณ์ของผม",
    showDetails: "ดูรายละเอียด",
    hideDetails: "ซ่อนรายละเอียด",
  },
  projects: {
    heading: "ผลงานทั้งหมด",
    subtitle: "รวมผลงานจากเส้นทางการเรียนรู้สู่ระบบที่นำไปใช้งานจริง",
    viewGroup: "รูปแบบการแสดงผลงาน",
    gridView: "มุมมองแบบตาราง",
    listView: "มุมมองแบบรายการ",
    viewProject: "ดูโปรเจกต์",
    projectImageAlt: "ภาพตัวอย่างโปรเจกต์",
    moreTechnologies: "เทคโนโลยีเพิ่มเติม",
  },
  projectDetail: {
    backToProjects: "กลับไปหน้าผลงาน",
    backLabel: "ย้อนกลับไปยังผลงานทั้งหมด",
    projectImageAlt: "ภาพตัวอย่างโปรเจกต์",
    technologiesUsed: "Technologies Used",
    livePreview: "ดูเว็บไซต์จริง",
    githubRepository: "ดู GitHub repository",
    opensNewTab: "เปิดในแท็บใหม่",
  },
  contact: {
    heading: "ติดต่อ",
    subtitle: "ติดต่อผมได้ผ่านช่องทางต่าง ๆ ด้านล่าง",
    facebook: "ติดต่อ Niti Surakongka ผ่าน Facebook",
    line: "ติดต่อ Niti Surakongka ผ่าน LINE",
    phone: "โทรหา Niti Surakongka ที่หมายเลข 091-758-2874",
    github: "ดูโปรไฟล์ iE4rthDEV บน GitHub",
    linkedin: "ดูโปรไฟล์ Niti Surakongka บน LinkedIn",
  },
  footer: {
    description: "Junior Full Stack Developer — Portfolio และผลงาน",
    quickLinks: "ลิงก์ด่วน",
    connect: "ช่องทางติดตาม",
    navigationLabel: "เมนูส่วนท้าย",
    socialLabel: "ช่องทางโซเชียล",
    rights: "สงวนลิขสิทธิ์",
  },
  errors: {
    notFoundTitle: "ไม่พบหน้าที่ต้องการ",
    notFoundDescription: "หน้าที่คุณกำลังค้นหาไม่มีอยู่หรืออาจถูกย้ายแล้ว",
    backHome: "กลับหน้าหลัก",
    projectNotFoundTitle: "ไม่พบโปรเจกต์",
    projectNotFoundDescription: "ไม่พบโปรเจกต์ที่คุณต้องการ",
    backToProjects: "กลับไปหน้าผลงาน",
  },
  common: {
    opensNewTab: "เปิดในแท็บใหม่",
  },
} as const;

export type DeepStringShape<T> = {
  readonly [Key in keyof T]: T[Key] extends string
    ? string
    : DeepStringShape<T[Key]>;
};

export type Dictionary = DeepStringShape<typeof th>;

export default th;
