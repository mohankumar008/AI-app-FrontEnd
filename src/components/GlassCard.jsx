const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan to-transparent animate-scan" />
      </div>
      <div className="relative z-10 p-8 sm:p-10">{children}</div>
    </div>
  );
};
export default GlassCard;