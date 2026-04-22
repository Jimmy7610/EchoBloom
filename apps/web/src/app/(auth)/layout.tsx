import { Sprout } from 'lucide-react'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 items-center justify-center">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <Sprout className="w-6 h-6" />
          EchoBloom
        </Link>
      </div>
      {children}
    </div>
  )
}
