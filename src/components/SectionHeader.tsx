type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignClassName =
    align === "center" ? "section-header--center" : "section-header--left";

  return (
    <div className={`section-header ${alignClassName}`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>

      {description && <p>{description}</p>}
    </div>
  );
}