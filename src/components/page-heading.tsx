export default function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-9 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="section-title">{title}</h1>
      <p className="mt-3 leading-7 text-base-content/65">{description}</p>
    </div>
  );
}
