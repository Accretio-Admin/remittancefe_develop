import Link from "next/link";
import React from "react";
import { ILinkCustom } from "../../interfaces/customs/ICustoms.interface";

const LinksCustom = ({ href, prefetch = false, nameLink }: ILinkCustom) => {
  return (
    <Link href={href} prefetch={prefetch} passHref legacyBehavior>
      {nameLink}
    </Link>
  );
};

export default LinksCustom;
