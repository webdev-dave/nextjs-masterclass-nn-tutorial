import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/dojo-logo.png";

export default function Navbar() {
  return (
    <nav>
      <Image
        src={Logo}
        width={70}
        quality={100}
        placeholder="blur"
        alt="logo"
      />
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
    </nav>
  );
}
