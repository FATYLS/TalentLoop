export function SectionTag({ children }: { children: React.ReactNode }) {
  return <span className="section-tag">{children}</span>;
}

export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl md:text-4xl font-black text-black tracking-tight ${className}`}>
      {children}
    </h2>
  );
}

export function GlowOrbs() {
  return (
    <>
      <div className="hero-orb w-[500px] h-[500px] bg-[#BF00FF]/20 top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 animate-pulse-glow" />
      <div className="hero-orb w-[300px] h-[300px] bg-[#BF00FF]/10 top-20 right-0 animate-float" />
      <div className="hero-orb w-[200px] h-[200px] bg-black/5 bottom-0 left-10" />
    </>
  );
}
