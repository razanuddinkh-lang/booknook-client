export default function Loading({ label = "Loading your books" }: { label?: string }) {
  return <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-base-content/60"><span className="loading loading-spinner loading-lg text-primary" /><span className="text-sm">{label}...</span></div>;
}
