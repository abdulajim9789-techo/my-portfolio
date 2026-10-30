import Section from "./Section";

export default function Education({ education = [] }) {
  return (
    <Section
      id="education"
      number="02"
      eyebrow="Education"
      title="My academic journey."
      text="A quick view of my current education and learning foundation."
    >
      <div className="timeline">
        {education.map((e, index) => (
          <article
            className="timeline-card"
            key={e._id || e.id || index}
          >
            <div className="timeline-dot" />

            <div>
              {e.year && (
                <span className="muted">
                  {e.year}
                </span>
              )}

              <h3>
                {e.degree || e.title}
              </h3>

              <b>
                {e.institution || e.place}
              </b>

              {e.status && (
                <p>
                  {e.status}
                </p>
              )}

              {e.description && (
                <p>
                  {e.description}
                </p>
              )}

              {/* Compatibility with old local data */}
              {e.text && (
                <p>
                  {e.text}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}