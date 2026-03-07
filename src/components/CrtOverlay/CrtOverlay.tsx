export function CrtOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      {/* Horizontal scan lines */}
      <div className="crt-scanlines absolute inset-0" />
      {/* Dark vignette at screen edges */}
      <div className="crt-vignette absolute inset-0" />
      {/* Phosphor flicker */}
      <div className="crt-flicker absolute inset-0" />
    </div>
  );
}
