export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-950 items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-500/5 rounded-full blur-[120px]"></div>
      </div>
      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  )
}
