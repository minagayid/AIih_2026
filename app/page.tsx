const modelScores = [
  { name: "Gemini 3.1 Flash Lite", score: 93, stat: "0.93 Spearman" },
  { name: "Gemini 3.5 Flash", score: 92, stat: "2.08 MAE" },
  { name: "GPT-5.5", score: 87, stat: "2.08 MAE" },
  { name: "Gemini 3 Flash Preview", score: 82, stat: "0.91 Spearman" },
];

const criteria = [
  "Anatomical coverage",
  "Positioning and angulation",
  "Exposure and sharpness",
  "Motion blur and artefacts",
  "Overall diagnostic usability",
];

const authors = [
  {
    name: "Ashhadul Islam",
    role: "KTH Royal Institute of Technology",
    email: "ashhadulislam@gmail.com",
    linkedin: "https://www.linkedin.com/in/ashhadul-islam-b508581a/",
    site: "https://ashhadulislam.github.io/",
  },
  {
    name: "Mina Maged Zekry Gayid",
    role: "Happy Dental Clinic, Cairo",
    email: "minagayid@gmail.com",
    linkedin: "https://www.linkedin.com/in/mina-maged-zekry-gayid/",
    site: "https://minagayid.github.io/",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Radiograph Ready home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>
            <strong>Radiograph</strong> <em>READY</em>
          </span>
        </a>
        <div className="nav-links">
          <a href="#review">Quick review</a>
          <a href="#contribute">Contribute</a>
          <a href="#connect">Connect</a>
        </div>
        <a className="nav-cta" href="#contribute">
          Open call <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero section-pad" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Radiograph Ready / Research benchmark</p>
          <h1>
            Can vision-language models tell when a dental radiograph is{" "}
            <span className="highlight">ready to trust?</span>
          </h1>
          <p className="hero-lede">
            We are building a small, open conversation around multimodal AI,
            radiographic quality, and what trustworthy assistance should look
            like in dentistry.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contribute">
              Share a dataset <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-quiet" href="#review">
              Read the quick review <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="hero-note">A pilot study by Ashhadul Islam &amp; Mina Maged Zekry Gayid</p>
        </div>

        <div
          className="hero-visual"
          role="img"
          aria-label="Abstract dental radiograph quality study graphic"
        >
          <div className="visual-stamp">MULTIMODAL<br />DENTISTRY</div>
          <div className="visual-topline">
            <span>FIG. 01</span>
            <span>QUALITY / 01—10</span>
          </div>
          <div className="radiograph-frame">
            <div className="scan-line scan-line-one" />
            <div className="scan-line scan-line-two" />
            <div className="jaw-curve jaw-curve-top" />
            <div className="jaw-curve jaw-curve-bottom" />
            <div className="tooth-row tooth-row-top">
              {Array.from({ length: 9 }, (_, index) => <span key={"top-" + index} />)}
            </div>
            <div className="tooth-row tooth-row-bottom">
              {Array.from({ length: 9 }, (_, index) => <span key={"bottom-" + index} />)}
            </div>
            <div className="radiograph-label">PANORAMIC<br /><strong>EXAM 013</strong></div>
            <div className="quality-badge"><span>EXPERT</span><strong>04</strong></div>
          </div>
          <div className="visual-bottomline">
            <span>13 radiographs</span>
            <span>8 VLMs</span>
            <span className="signal-bars" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          </div>
        </div>
      </section>

      <section className="stat-strip" aria-label="Study at a glance">
        <div><strong>13</strong><span>expert-scored panoramic radiographs</span></div>
        <div><strong>1—10</strong><span>technical quality scale</span></div>
        <div><strong>8</strong><span>commercial and open VLMs</span></div>
        <div><strong>01</strong><span>shared prompting protocol</span></div>
      </section>

      <section className="study section-pad" id="review">
        <div className="section-intro">
          <p className="eyebrow">01 / Quick review</p>
          <h2>A small benchmark with a big question.</h2>
          <p>
            Our pilot asks a question that usually happens before diagnosis:
            is the image technically good enough to interpret? Thirteen
            panoramic radiographs were scored by an experienced dental expert,
            then sent to the same prompt across current commercial and open
            multimodal models.
          </p>
        </div>
        <div className="review-grid">
          <article className="review-card review-card-dark">
            <p className="card-label">The signal</p>
            <p className="big-stat">Fluent explanations<br /><span>are not the same as</span><br />reliable scores.</p>
            <p className="card-copy">Several models sounded clinically plausible even when their quality score disagreed with the expert reference.</p>
          </article>
          <article className="review-card review-card-lime">
            <p className="card-label">What we measured</p>
            <div className="measure-list">
              <div><strong>01</strong><span>Quality score from 1 to 10</span></div>
              <div><strong>02</strong><span>Diagnostic usability: yes or no</span></div>
              <div><strong>03</strong><span>Short technical explanation</span></div>
            </div>
            <p className="card-copy">The prompt asked models to assess image quality only, not dental pathology.</p>
          </article>
          <article className="review-card review-card-paper">
            <p className="card-label">Why it matters</p>
            <p className="card-copy card-copy-large">Before an AI assistant interprets a radiograph, it should know whether the radiograph is usable at all.</p>
            <a className="text-link" href="#contribute">Help us test that boundary <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section className="findings section-pad">
        <div className="section-intro findings-intro">
          <p className="eyebrow">02 / Early findings</p>
          <h2>Agreement is uneven.<br /><span>Calibration is the story.</span></h2>
          <p>
            Gemini 3.1 Flash Lite and Gemini 3.5 Flash tracked expert
            assessments most closely in this pilot. Other models compressed
            scores or calibrated inconsistently, even when the explanation
            sounded convincing.
          </p>
          <a className="text-link" href="#contribute">Bring a harder case <span aria-hidden="true">↗</span></a>
        </div>
        <div className="model-board" aria-label="Model agreement overview">
          <div className="board-header"><span>Model</span><span>Rank alignment</span><span>Readout</span></div>
          {modelScores.map((model, index) => (
            <div className="model-row" key={model.name}>
              <div className="model-name"><span className="model-index">0{index + 1}</span><strong>{model.name}</strong></div>
              <div className="score-track"><span style={{ width: model.score + "%" }} /></div>
              <span className="model-stat">{model.stat}</span>
            </div>
          ))}
          <div className="board-footnote">Spearman correlation and mean absolute error (MAE) from the pilot study.</div>
        </div>
      </section>

      <section className="criteria section-pad">
        <div className="criteria-heading">
          <p className="eyebrow">03 / The frame</p>
          <h2>We score the image<br /><span>before the diagnosis.</span></h2>
        </div>
        <div className="criteria-list">
          {criteria.map((criterion, index) => (
            <div className="criterion" key={criterion}>
              <span>0{index + 1}</span>
              <strong>{criterion}</strong>
              <span className="criterion-arrow" aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
      </section>

      <section className="contribute section-pad" id="contribute">
        <div className="contribute-panel">
          <div className="contribute-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> Open call / Contribute</p>
            <h2>Have a radiograph that could make the benchmark smarter?</h2>
            <p>
              We welcome de-identified panoramic X-rays, quality annotations,
              edge cases, and ideas for evaluating anatomical consistency. A
              few carefully documented examples can move this study forward.
            </p>
            <div className="contribute-points">
              <span><i>01</i> X-ray images or small datasets</span>
              <span><i>02</i> Expert quality scores or retake labels</span>
              <span><i>03</i> Research feedback and collaboration</span>
            </div>
          </div>
          <div className="contribute-form google-form-container">
          <div className="form-heading">
            <span>Contribute to the benchmark</span>
            <span className="form-status-dot" />
          </div>

          <div className="google-form-wrapper">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfUtFp47C4bpFCPCkZH_zRvaU_kTR8q58LbGDvBUxG8LfzSyQ/viewform?embedded=true"
              title="Radiograph Ready contribution form"
              loading="lazy"
            >
              Loading…
            </iframe>
          </div>

          <p className="privacy-note">
            <span aria-hidden="true">✳</span>{" "}
            Please submit only de-identified radiographs. Remove patient names,
            IDs, dates of birth, and identifying metadata before sharing.
          </p>
        </div>
        </div>
      </section>

      <section className="connect section-pad" id="connect">
        <div className="connect-heading">
          <p className="eyebrow">04 / Connect</p>
          <h2>Let&apos;s make multimodal AI<br /><span>more honest together.</span></h2>
        </div>
        <div className="author-grid">
          {authors.map((author) => (
            <article className="author-card" key={author.name}>
              <div className="author-avatar" aria-hidden="true">{author.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
              <div>
                <h3>{author.name}</h3>
                <p>{author.role}</p>
                <div className="author-links">
                  <a href={"mailto:" + author.email}>Email <span aria-hidden="true">↗</span></a>
                  <a href={author.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
                  <a href={author.site} target="_blank" rel="noreferrer">Website <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="project-link">
          <span>Workshop repository</span>
          <a href="https://github.com/minagayid/AIih_2026" target="_blank" rel="noreferrer">github.com/minagayid/AIih_2026 <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span><strong>Radiograph</strong> <em>READY</em></span>
        </a>
        <p>Trustworthy multimodal AI for dental imaging.</p>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </main>
  );
}
