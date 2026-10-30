export default function Section({ id, number, eyebrow, title, text, children }) {
  return <section id={id} className="content-section"><div className="container"><div className="section-head"><span className="section-number">{number}</span><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{children}</div></section>;
}
