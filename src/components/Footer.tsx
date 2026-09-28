import Link from "next/link"; // 용도 사이트 내부 페이지 이동
import FooterMascot from "@/components/FooterMascot";
import FooterReveal from "@/components/FooterReveal";
import { siteConfig } from "@/lib/site"; // 용도 사이트 설정 조회

const EMAIL_SUBJECT = "Tami.log 포트폴리오 문의";

function getCurrentYear() {
  return new Date().getFullYear();
}

function createGmailComposeUrl(email: string) {
  const encodedEmail = encodeURIComponent(email);
  const encodedSubject = encodeURIComponent(EMAIL_SUBJECT);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${encodedSubject}`;
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <FooterReveal />
      <div className="site-footer__inner">
        <section className="site-footer__composition" aria-label="Tami.log">
          <span className="site-footer__wordmark" aria-hidden="true">
            TAMI.LOG
          </span>
          <Link href="/" className="site-footer__logo">
            Tami<span>.log</span>
          </Link>
          <FooterMascot />
        </section>

        <nav className="site-footer__links" aria-label="연락처">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="site-footer__contact"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>

          <a
            href={createGmailComposeUrl(siteConfig.links.email)}
            target="_blank"
            rel="noreferrer"
            className="site-footer__contact"
          >
            Email <span aria-hidden="true">↗</span>
          </a>
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
