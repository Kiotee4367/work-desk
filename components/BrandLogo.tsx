import Image from "next/image";
import type { Brand } from "@/config/brands";

/** The brand's logo, or its name as text when no logo file is set. */
export default function BrandLogo({ brand, className = "" }: { brand: Brand; className?: string }) {
  if (brand.logo) {
    return (
      <Image
        src={brand.logo}
        alt={brand.name}
        width={220}
        height={32}
        unoptimized
        priority
        className={`h-8 w-auto ${className}`}
      />
    );
  }
  return <span className={`font-heading text-lg font-semibold ${className}`}>{brand.name}</span>;
}
