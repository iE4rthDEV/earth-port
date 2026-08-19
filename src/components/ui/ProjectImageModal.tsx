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
      <button
        type="button"
        data-project-image
        aria-label={`Enlarge ${alt} image`}
        className="block w-full cursor-zoom-in rounded-box focus-visible:outline-offset-4 lg:aspect-[4/3] lg:overflow-hidden"
        onClick={open}
      >
        <Image
          src={src}
          alt={alt}
          width={1080}
          height={1080}
          loading="eager"
          sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
          className="h-auto w-full rounded-box border border-base-300 object-cover shadow-lg lg:h-full"
        />
      </button>
      <Modal
        opened={opened}
        onClose={close}
        title={`Preview of ${alt}`}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 4,
        }}
        size="lg"
        centered
      >
        <Image
          src={src}
          alt={alt}
          width={1080}
          height={1080}
          sizes="(max-width: 767px) calc(100vw - 3rem), 48rem"
          className="h-auto w-full rounded-box"
        />
      </Modal>
    </>
  );
};

export default ProjectImageModal;
