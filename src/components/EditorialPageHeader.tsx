import type { ReactNode } from "react";

type EditorialPageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  count?: string;
  detail?: boolean;
  children?: ReactNode;
};

export default function EditorialPageHeader({
  eyebrow,
  title,
  description,
  count,
  detail = false,
  children,
}: EditorialPageHeaderProps) {
  return (
    <header
      className={`editorial-page-header${detail ? " editorial-page-header--detail" : ""}`}
    >
      <p className="editorial-label">{eyebrow}</p>
      <h1>
        {title}
        {count && (
          <span className="editorial-page-header__count">({count})</span>
        )}
      </h1>
      {description && (
        <p className="editorial-page-header__description">{description}</p>
      )}
      {children}
    </header>
  );
}
