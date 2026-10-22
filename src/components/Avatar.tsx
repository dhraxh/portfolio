import Image from "next/image";
import { fullName, portfolio } from "@/data/portfolio";

/** Round avatar with a green "online" dot. Falls back to your initial if no photo is set. */
export default function Avatar({ size = 32 }: { size?: number }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      {portfolio.avatar ? (
        <Image
          src={portfolio.avatar}
          alt={fullName}
          width={size}
          height={size}
          className="rounded-full object-cover ring-1 ring-white/15"
          priority
        />
      ) : (
        <span
          aria-hidden="true"
          className="grid h-full w-full place-items-center rounded-full bg-linear-to-br from-zinc-200 to-zinc-500 text-sm font-bold text-black ring-1 ring-white/15"
        >
          {portfolio.firstName.charAt(0)}
        </span>
      )}
      <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-[#111] bg-emerald-400" />
      <span className="sr-only">Online</span>
    </span>
  );
}
