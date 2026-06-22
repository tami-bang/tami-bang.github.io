import Link from "next/link"; // 용도 사이트 내부 페이지 이동
import { siteConfig, studyCategoryItems } from "@/lib/site"; // 용도 사이트 설정 및 카테고리 조회

const footerStudyLinks = studyCategoryItems.slice(0, 4);
const EMAIL_SUBJECT = "Tami.log 포트폴리오 문의";

function getCurrentYear() {
  return new Date().getFullYear();
}

function createGmailComposeUrl(email: string) {
  const encodedEmail = encodeURIComponent(email);
  const encodedSubject = encodeURIComponent(EMAIL_SUBJECT);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${encodedSubject}`;
}

function GithubIcon() {
  return (
    <svg className="footer-link__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.98c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.13 10.13 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="footer-link__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 5.75h15A2.5 2.5 0 0 1 22 8.25v7.5a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 15.75v-7.5a2.5 2.5 0 0 1 2.5-2.5Zm0 2 7.5 5 7.5-5h-15Zm15 8.5a.5.5 0 0 0 .5-.5V9.6l-7.45 4.96a1 1 0 0 1-1.1 0L4 9.6v6.15a.5.5 0 0 0 .5.5h15Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <section className="site-footer__brand" aria-label="사이트 소개">
          <Link href="/" className="site-footer__logo">
            Tami<span>.log</span>
          </Link>
        </section>

        <nav className="site-footer__nav" aria-label="푸터 메뉴">
          <div className="site-footer__group">
            <p>Study</p>

            {footerStudyLinks.map((category) => (
              <Link
                href={`/blog/category/${category.slug}`}
                key={category.slug}
              >
                {category.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__group">
            <p>General</p>

            {siteConfig.navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__group">
            <p>Connect</p>

            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              <GithubIcon />
              GitHub
            </a>

            <a
              href={createGmailComposeUrl(siteConfig.links.email)}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              <EmailIcon />
              Email
            </a>
          </div>
        </nav>

        <div className="site-footer__bottom">
          <p>
            © {getCurrentYear()} {siteConfig.name}. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
