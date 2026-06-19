const FLOATING_STAR_COUNT = 18;

export default function GlobalAmbientEffects() {
  return (
    <div className="global-ambient" aria-hidden="true">
      <div className="global-ambient__stars">
        {Array.from({ length: FLOATING_STAR_COUNT }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <span className="global-shooting-star global-shooting-star--one" />
      <span className="global-shooting-star global-shooting-star--two" />
      <span className="global-shooting-star global-shooting-star--three" />
    </div>
  );
}
