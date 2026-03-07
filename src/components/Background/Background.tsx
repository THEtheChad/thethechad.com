export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Neon ambient blobs */}
      <div className="absolute -top-64 -left-40 h-[560px] w-[560px] rounded-full bg-accent/[0.13] blur-[130px]" />
      <div className="absolute top-1/3 -right-52 h-[440px] w-[440px] rounded-full bg-pink/[0.10] blur-[110px]" />
      <div className="absolute -bottom-56 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/[0.10] blur-[110px]" />

      {/* Neon dot-grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,207,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
