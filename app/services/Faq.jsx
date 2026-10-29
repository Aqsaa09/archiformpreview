import Link from 'next/link';

export default function Faq() {
  return (
    <div className="faq">
        <div className="l"><p className="lbl rule">Questions</p><p className="body">Still have a question?</p><Link className="go" href="/contact" style={{alignSelf: 'flex-start'}}>Get in touch <svg width="26" height="10" aria-hidden="true"><use href="#arrow"/></svg></Link></div>
        <div className="list">
          <details><summary>What makes ARCHIFORM different?<i></i></summary><p>We believe a home should do more than look beautiful. It should support the way you live and feel. With a background in healthcare and training in interior design, we take a considered approach to creating healthy living environments alongside refined, timeless design.</p></details>
          <details><summary>What does a healthy home mean to ARCHIFORM?<i></i></summary><p>A healthy home considers more than aesthetics. We pay attention to lighting, ventilation, air-conditioning, moisture prevention and material selection to create spaces that feel comfortable, support wellbeing and promote better everyday living.</p></details>
          <details><summary>Do you manage the renovation process?<i></i></summary><p>Yes. ARCHIFORM coordinates the renovation journey, working with trusted contractors and specialists to translate the design into reality while keeping attention on detail, quality and the overall direction.</p></details>
          <details><summary>Can you work with my existing ideas and budget?<i></i></summary><p>Every project begins with understanding your lifestyle, preferences, priorities and budget. Whether you have a clear vision or need guidance from the start, we develop a tailored approach.</p></details>
          <details><summary>How do I get started?<i></i></summary><p>Contact us to arrange an initial consultation. We’ll discuss your space, your vision and your priorities, then outline the most suitable next steps.</p></details>
        </div>
      </div>
  );
}
