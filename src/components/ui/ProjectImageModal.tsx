"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import React from "react";

interface ProjectImageModalProps {
  src: string;
  alt: string;
}

const ProjectImageModal: React.FC<ProjectImageModalProps> = ({ src, alt }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={450}
        height={450}
        loading="lazy"
        className="rounded-lg border drop-shadow-lg hover:cursor-zoom-in hover:scale-105 duration-300"
        onClick={open}
      />
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 4,
        }}
        size="lg"
        centered
      >
        <Image src={src} alt={alt} width={1080} height={1080} />
      </Modal>
    </>
  );
};

export default ProjectImageModal;
