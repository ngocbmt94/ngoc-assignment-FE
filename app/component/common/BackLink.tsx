import Link from "next/link";
interface BackLinkProps {
  className?: string;
}
export default function BackLink({ className = "" }: BackLinkProps) {
  return (
    <Link href="/" className={`text-blue-500 hover:text-blue-700 inline-flex items-center space-x-1 font-medium ${className}`}>
      Back
    </Link>
  );
}
