import React, { ReactElement } from "react";
import Image from "next/image";

interface Props {
  withName?: boolean;
  containerClassName?: string;
  imageClassName?: string;
  titleClassName?: string;
}

export default function Logo({
  withName,
  containerClassName,
  imageClassName,
  titleClassName,
}: Props): ReactElement {
  return (
    <div className={["flex gap-3 items-center", containerClassName].join(" ")}>
      <Image
        src="/images/neptunemutual_logo.png"
        height="100"
        width="100"
        alt="logo"
        className={["", imageClassName].join(" ")}
      />
      {withName && (
        <p
          className={["text-xl text-white font-bold", titleClassName].join(" ")}
        >
          NEPTUNE MUTUAL
        </p>
      )}
    </div>
  );
}
