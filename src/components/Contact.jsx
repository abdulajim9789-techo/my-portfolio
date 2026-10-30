
import Section from "./Section";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Contact({ profile = {} }) {
  const email = profile?.email?.trim() || "";

  return (
    <Section
      id="contact"
      number="08"
      eyebrow="Contact"
      title="Let's build something useful."
      text="Have a project idea, internship opportunity or collaboration? Reach out."
    >
      <div className="contact-panel">
        <div>
          <span className="eyebrow">
            Open to conversations
          </span>

          <h3>{email || "Your email address"}</h3>
        </div>

        {email ? (
          <a
            className="primary-button"
            href={`mailto:${email}`}
          >
            <Mail size={18} />
            Send email
            <ArrowUpRight size={18} />
          </a>
        ) : (
          <p>Add your email in the admin profile settings.</p>
        )}
      </div>
    </Section>
  );
}
