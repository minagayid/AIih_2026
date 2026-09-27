import mlResults from "../ml/results.json";

const modelScores = [
  { name: "Gemini 3.1 Flash Lite", value: "0.93", metric: "Spearman" },
  { name: "Gemini 3.5 Flash", value: "2.08", metric: "MAE" },
  { name: "GPT-5.5", value: "2.08", metric: "MAE" },
  { name: "Gemini 3 Flash Preview", value: "0.91", metric: "Spearman" },
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
          <a href="#ml-findings">New X-ray data</a>
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
            Can AI assess dental X-ray image quality{" "}
            <span className="highlight">before diagnosis?</span>
          </h1>
          <p className="hero-lede">
            Explore findings from 810 model-rated X-ray rows and an image-feature
            baseline, alongside a separate 13-image expert-scored pilot. The
            new workbook has no expert labels, so its results are exploratory.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contribute">
              Share a dataset <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-quiet" href="#review">
              Read the new data findings <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="hero-note">Research by Ashhadul Islam &amp; Mina Maged Zekry Gayid</p>
        </div>

        <div
          className="hero-visual"
          role="img"
          aria-label="Abstract dental radiograph quality study graphic"
        >
          <div className="visual-stamp">MULTIMODAL<br />DENTISTRY</div>
          <div className="visual-topline">
            <span>ML UPDATE</span>
            <span>IMAGE FEATURES</span>
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
            <div className="radiograph-label">DENTAL X-RAY<br /><strong>IMAGE SET</strong></div>
            <div className="quality-badge"><span>SCORED</span><strong>810</strong></div>
          </div>
          <div className="visual-bottomline">
            <span>797 exact-unique images</span>
            <span>7 rating columns</span>
            <span className="signal-bars" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          </div>
        </div>
      </section>

      <section className="stat-strip" aria-label="Study at a glance">
        <div><strong>{mlResults.dataset.scored_image_rows}</strong><span>scored image rows in the new workbook</span></div>
        <div><strong>{mlResults.dataset.exact_unique_images}</strong><span>exact-unique images</span></div>
        <div><strong>7</strong><span>model-rating columns per image</span></div>
        <div><strong>0</strong><span>expert labels in the new workbook</span></div>
      </section>

      <section className="study section-pad" id="review">
        <div className="section-intro">
          <p className="eyebrow">01 / New X-ray data · quick review</p>
          <h2>A larger model-rated dataset. An exploratory signal.</h2>
          <p>
            The linked workbook contains {mlResults.dataset.scored_image_rows}
            {" "}rows with seven model-generated ratings each and
            {" "}{mlResults.dataset.exact_unique_images} exact-unique images.
            Ratings disagree across models. A simple image-feature model
            predicts their average somewhat better than a constant baseline,
            but the workbook provides no expert reference or documented rubric.
          </p>
        </div>
        <div className="review-grid">
          <article className="review-card review-card-dark">
            <p className="card-label">The signal</p>
            <p className="big-stat">Models often<br /><span>ranked images</span><br />differently.</p>
            <p className="card-copy">Median pairwise Spearman agreement was {mlResults.model_rating_agreement.median_pairwise_spearman.toFixed(2)} across 21 model pairs.</p>
          </article>
          <article className="review-card review-card-lime">
            <p className="card-label">What the baseline measured</p>
            <div className="measure-list">
              <div><strong>01</strong><span>49 grayscale, histogram, and image-quality features</span></div>
              <div><strong>02</strong><span>Nested 5-fold validation by image hash</span></div>
              <div><strong>03</strong><span>Prediction of average model rating</span></div>
            </div>
            <p className="card-copy">The target is the workbook's model ratings, not expert image quality.</p>
          </article>
          <article className="review-card review-card-paper">
            <p className="card-label">What comes next</p>
            <p className="card-copy card-copy-large">Expert quality labels and a documented scoring rubric are needed to test whether image ratings reflect clinical image quality.</p>
            <a className="text-link" href="#contribute">Help us test that boundary <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section className="findings section-pad ml-findings" id="ml-findings">
        <div className="section-intro findings-intro">
          <p className="eyebrow">02 / Expanded dataset · exploratory ML</p>
          <h2>A modest signal.<br /><span>No expert ground truth.</span></h2>
          <p>
            The new workbook pairs {mlResults.dataset.scored_image_rows} X-ray
            rows with seven model-generated ratings. The original
            13-image expert-scored pilot remains separate: this workbook has
            no expert labels and does not document its rating scale.
          </p>
        </div>
        <div className="review-grid ml-review-grid">
          <article className="review-card review-card-dark">
            <p className="card-label">New workbook · dataset</p>
            <p className="big-stat">{mlResults.dataset.scored_image_rows}<br /><span>scored rows</span></p>
            <p className="card-copy">
              {mlResults.dataset.exact_unique_images} exact-unique images were
              used, each paired with seven model ratings. The embedded images
              were thumbnails at 112×150 or 150×113 pixels.
            </p>
          </article>
          <article className="review-card review-card-lime">
            <p className="card-label">Model-to-model rank agreement</p>
            <p className="big-stat">{mlResults.model_rating_agreement.median_pairwise_spearman.toFixed(2)}</p>
            <p className="card-copy">
              Median Spearman correlation across 21 model pairs; the mean was
              {" "}{mlResults.model_rating_agreement.mean_pairwise_spearman.toFixed(2)}.
              The scores often ranked images differently.
            </p>
          </article>
          <article className="review-card review-card-paper">
            <p className="card-label">Image-feature ridge model · nested 5-fold validation</p>
            <p className="big-stat">
              MAE {mlResults.cross_validation.model_mae.toFixed(2)} rating units{" "}
              <span>vs {mlResults.cross_validation.mean_baseline_mae.toFixed(2)} baseline</span>
            </p>
            <p className="card-copy card-copy-large">
              Image features modestly predicted the average of the seven model
              ratings (Spearman {mlResults.cross_validation.model_spearman_vs_weak_target.toFixed(2)};
              {" "}R² {mlResults.cross_validation.r2_vs_weak_target.toFixed(2)}).
              This evaluates agreement with those model ratings only. It does
              not establish expert accuracy, diagnostic usability, or clinical
              readiness.
            </p>
          </article>
        </div>
      </section>

      <section className="findings section-pad historical-findings">
        <div className="section-intro findings-intro">
          <p className="eyebrow">03 / Historical · expert-scored pilot</p>
          <h2>Agreement is uneven.<br /><span>Calibration is the story.</span></h2>
          <p>
            These results belong to the original 13-image pilot, not the new
            workbook. Gemini 3.1 Flash Lite had a reported Spearman value of
            0.93 in that pilot. The values below mix rank correlation and MAE,
            so they cannot be compared directly across models.
          </p>
          <a className="text-link" href="#contribute">Bring a harder case <span aria-hidden="true">↗</span></a>
        </div>
        <div className="model-board" aria-label="Historical model results from the original expert-scored pilot">
          <div className="board-header"><span>Model</span><span>Readout</span><span>Metric</span></div>
          {modelScores.map((model, index) => (
            <div className="model-row" key={model.name}>
              <div className="model-name"><span className="model-index">0{index + 1}</span><strong>{model.name}</strong></div>
              <span className="model-value">{model.value}</span>
              <span className="model-stat">{model.metric}</span>
            </div>
          ))}
          <div className="board-footnote">Historical pilot values. The rows report different metrics and should not be compared directly.</div>
        </div>
      </section>

      <section className="criteria section-pad historical-criteria">
        <div className="criteria-heading">
          <p className="eyebrow">04 / Original pilot protocol</p>
          <h2>Assess the image<br /><span>before the diagnosis.</span></h2>
          <p>These criteria describe the expert-scored pilot only. The new workbook does not document a scoring rubric.</p>
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
          <p className="eyebrow">05 / Connect</p>
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
