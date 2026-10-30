import Link from 'next/link';

export default function Faq() {
  return (
    <div className="faq">
        <div className="l"><p className="lbl rule">EVERYTHING YOU MAY WANT TO KNOW</p><h2 className="h2">A few thoughtful answers before we begin.</h2><Link className="go" href="/contact" style={{alignSelf: 'flex-start'}}>Get in touch <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link></div>
        <div className="list">
          <details><summary>What services does ARCHIFORM offer?<i></i></summary><p>Interior design and project management for residential renovations in Dubai: concepts, space planning, materials, bespoke joinery, furnishing, styling and renovation coordination.</p></details>
          <details><summary>What makes ARCHIFORM different?<i></i></summary><p>With a background in healthcare, we design homes that support how you live and feel, alongside refined, timeless aesthetics.</p></details>
          <details><summary>Does ARCHIFORM manage the renovation process?<i></i></summary><p>Yes. We coordinate trusted contractors and specialists to bring the design to life with attention to detail and quality.</p></details>
          <details><summary>Can you work with my ideas and budget?<i></i></summary><p>Every project starts with your lifestyle, priorities and budget. Whether you have a clear vision or need guidance, we tailor our approach.</p></details>
          <details><summary>How do I get started?<i></i></summary><p>Contact us to arrange an initial consultation. We’ll discuss your space and vision, then outline the next steps.</p></details>
        </div>
      </div>
  );
}
