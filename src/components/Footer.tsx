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
      <div className="site-footer__scene">
        <svg
          className="site-footer__hill"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="site-footer__hill-fill"
            d="M0 60C300 60 420 24 720 24s420 36 720 36V0H0Z"
          />
          <path
            className="site-footer__hill-edge"
            d="M0 60C300 60 420 24 720 24s420 36 720 36"
          />
        </svg>
        <div className="site-footer__inner">
          <section className="site-footer__composition" aria-label="Tami.log">
            <span className="site-footer__wordmark">TAMI.LOG</span>
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

            <FooterMascot />
          </nav>

          <div className="site-footer__bottom">
            <p>
              © {getCurrentYear()} {siteConfig.name}. Built with Next.js.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
