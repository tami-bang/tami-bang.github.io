type SectionHeaderProps = {
  eyebrow: string;
  eyebrowDescription?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  eyebrowDescription,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignClassName =
    align === "center" ? "section-header--center" : "section-header--left";

  return (
    <div className={`section-header ${alignClassName}`}>
      <p className="section-eyebrow">
        {eyebrow}
        {eyebrowDescription && (
          <>
            {" : "}
            <span className="section-eyebrow__description">
              {eyebrowDescription}
            </span>
          </>
        )}
      </p>
      {title && <h1>{title}</h1>}

      {description && <p>{description}</p>}
    </div>
  );
}
