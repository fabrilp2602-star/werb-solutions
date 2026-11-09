import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070a0f] text-slate-100 p-6 text-center">
      <h1 className="text-6xl font-black text-amber-400">404</h1>
      <h2 className="mt-4 text-xl font-bold uppercase tracking-wider text-white">Property or Page Not Found</h2>
      <p className="mt-2 text-sm text-slate-400 max-w-md">
        The requested NYC electrical dispatch ticket or page does not exist or has been archived.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-amber-glow hover:brightness-110 transition-all"
      >
        Return to Dispatch Center
      </Link>
    </div>
  );
}
