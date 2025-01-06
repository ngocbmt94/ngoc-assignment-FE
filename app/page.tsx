import Link from "next/link";

export const metadata = {
  title: "Home page",
};

const links = [
  { id: 1, href: "/problem-1" },
  { id: 2, href: "/problem-2" },
  { id: 3, href: "/problem-3" },
];
export default function Page() {
  return (
    <div className="flex justify-center p-5 gap-10">
      {links.map((item) => (
        <Link key={item.id} href={item.href} className="text-blue-600 visited:text-purple-600 text-xl">
          Problem {item.id}
        </Link>
      ))}
    </div>
  );
}
