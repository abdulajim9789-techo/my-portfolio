import Section from "./Section";
import {
  BadgeCheck,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

export default function Certifications({
  certifications = [],
}) {
  return (
    <Section
      id="certifications"
      number="07"
      eyebrow="Certifications"
      title="Credentials and learning proof."
      text="Certificates, courses and achievements that document my learning journey."
    >
      <div className="cert-grid">
        {certifications.length === 0 ? (
          <div className="info-panel cert-empty">
            <BadgeCheck size={30} />

            <h3>No certifications yet</h3>

            <p>
              Certifications will appear here when they
              are added from the Admin Dashboard.
            </p>
          </div>
        ) : (
          certifications.map((c) => (
            <article
              className="info-panel certificate-card"
              key={c._id || c.id}
            >
              {/* CERTIFICATE IMAGE */}
              <div className="certificate-image">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={`${c.title} certificate`}
                    loading="lazy"
                  />
                ) : (
                  <div className="certificate-image-placeholder">
                    <ImageIcon size={32} />

                    <span>
                      Certificate image
                    </span>
                  </div>
                )}
              </div>

              {/* CERTIFICATE DETAILS */}
              <div className="certificate-content">
                <div className="certificate-icon">
                  <BadgeCheck size={22} />
                </div>

                <div className="certificate-title-row">
                  <h3>{c.title}</h3>

                  {c.year && (
                    <span className="certificate-year">
                      {c.year}
                    </span>
                  )}
                </div>

                {c.issuer && (
                  <p className="certificate-issuer">
                    {c.issuer}
                  </p>
                )}

                {/* CREDENTIAL LINK */}
                {c.credentialUrl && (
                  <a
                    className="certificate-link"
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Credential
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </Section>
  );
}