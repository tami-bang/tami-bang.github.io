import Image from "next/image";

export default function JourneyTimeline() {
  return (
    <section
      className="about-journey-image-section"
      aria-label="경험이 흐르고 지금의 내가 되었습니다"
    >
      <Image
        src="/images/about-journey.png"
        alt="경험이 흐르고, 지금의 내가 되었습니다."
        width={1200}
        height={1800}
        className="about-journey-image"
        sizes="(max-width: 1200px) 100vw, 1200px"
      />
    </section>
  );
}
