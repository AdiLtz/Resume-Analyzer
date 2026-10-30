const skillGroups = [
  { name: "Programming", description: "Languages and development tools", skills: ["python", "java", "javascript", "typescript", "c++", "c#", "sql", "html", "css", "react", "node.js", "git", "accessibility", "responsive design", "rest api", "testing", "debugging", "data structures", "algorithms", "unit testing", "oop", "database design", "system design", "scripting", "scikit-learn", "tensorflow", "pytorch", "feature engineering", "model evaluation"] },
  { name: "Data & Analytics", description: "Working with data and insights", skills: ["excel", "power bi", "tableau", "pandas", "numpy", "machine learning", "data analysis", "statistics", "sql", "data visualization", "data cleaning", "storytelling", "google analytics"] },
  { name: "Design & Product", description: "Creating useful digital experiences", skills: ["figma", "ui/ux", "wireframing", "prototyping", "user research", "product management", "agile", "usability testing", "product strategy", "information architecture", "adobe illustrator", "adobe photoshop", "typography", "branding", "visual design", "creativity", "canva"] },
  { name: "Cloud & IT", description: "Infrastructure, platforms, and support", skills: ["aws", "azure", "gcp", "docker", "kubernetes", "linux", "cybersecurity", "networking", "security", "troubleshooting", "incident response", "risk assessment", "siem", "threat analysis", "vulnerability management", "monitoring", "customer support"] },
  { name: "Business & Communication", description: "How you work with people and teams", skills: ["communication", "leadership", "teamwork", "project management", "problem solving", "presentation", "research", "planning", "risk management", "documentation", "stakeholder management", "organization", "time management", "requirements gathering", "process mapping", "seo", "content marketing", "social media", "copywriting", "campaign management"] },
  { name: "Work experience", description: "Internships, jobs, and practical exposure", skills: ["internship", "intern", "volunteer", "freelance", "client", "stakeholder"] }
];

const roles = [
  { title: "Frontend Developer", skills: ["javascript", "react", "html", "css", "typescript", "figma", "accessibility", "responsive design", "rest api", "testing", "git", "debugging"], description: "Build accessible, responsive interfaces for web products." },
  { title: "Data Analyst", skills: ["sql", "excel", "python", "power bi", "tableau", "data analysis", "statistics", "data visualization", "pandas", "data cleaning", "storytelling", "critical thinking"], description: "Turn datasets into clear insights that support decisions." },
  { title: "Product / UX Associate", skills: ["figma", "ui/ux", "user research", "wireframing", "communication", "agile", "prototyping", "usability testing", "product strategy", "information architecture", "presentation", "collaboration"], description: "Help teams understand users and shape better products." },
  { title: "Junior Software Engineer", skills: ["java", "python", "javascript", "git", "sql", "problem solving", "data structures", "algorithms", "rest api", "unit testing", "oop", "debugging"], description: "Contribute to software features, testing, and maintenance." },
  { title: "Cloud Support Associate", skills: ["aws", "azure", "linux", "networking", "docker", "communication", "gcp", "troubleshooting", "security", "scripting", "monitoring", "customer support"], description: "Support cloud systems and help resolve technical issues." },
  { title: "Project Coordinator", skills: ["project management", "communication", "leadership", "agile", "presentation", "planning", "risk management", "documentation", "stakeholder management", "organization", "teamwork", "time management"], description: "Keep projects organized, aligned, and moving forward." },
  { title: "Machine Learning Engineer", skills: ["python", "machine learning", "deep learning", "pandas", "numpy", "statistics", "scikit-learn", "tensorflow", "pytorch", "feature engineering", "model evaluation", "sql"], description: "Develop and evaluate models that solve practical problems." },
  { title: "Cybersecurity Analyst", skills: ["cybersecurity", "linux", "networking", "security", "incident response", "risk assessment", "siem", "python", "threat analysis", "vulnerability management", "communication", "documentation"], description: "Help protect systems by monitoring, investigating, and reducing risk." },
  { title: "Backend Developer", skills: ["java", "python", "node.js", "sql", "rest api", "database design", "git", "docker", "testing", "security", "system design", "debugging"], description: "Build reliable services, APIs, and data-backed applications." },
  { title: "Digital Marketing Associate", skills: ["communication", "seo", "content marketing", "social media", "google analytics", "copywriting", "canva", "excel", "research", "campaign management", "data analysis", "presentation"], description: "Plan digital campaigns and use performance insights to improve reach." },
  { title: "Business Analyst", skills: ["excel", "sql", "data analysis", "communication", "requirements gathering", "process mapping", "documentation", "problem solving", "presentation", "stakeholder management", "research", "power bi"], description: "Connect business needs with clear requirements and measurable insights." },
  { title: "Graphic Designer", skills: ["figma", "adobe illustrator", "adobe photoshop", "canva", "typography", "branding", "visual design", "prototyping", "communication", "creativity", "presentation", "user research"], description: "Create thoughtful visual assets and consistent brand experiences." }
];

const learningBySkill = {
  react: "Build a small component-based project and publish it in a portfolio.",
  sql: "Practice joins, grouping, and subqueries with a public dataset.",
  python: "Create a small automation or data-cleaning project and document it.",
  aws: "Try a guided cloud fundamentals lab and note the services you used.",
  figma: "Create a clickable prototype and ask a classmate to test the flow.",
  "data analysis": "Pick a public dataset, write down a question, and share a one-page finding.",
  communication: "Practice a concise project walkthrough with a clear outcome.",
  "machine learning": "Build a baseline model and explain its limitations as well as its results."
};

const sampleResume = `Aarav Sharma
Computer Science student | Bengaluru, India

PROFILE
Motivated computer science undergraduate with a strong foundation in Python, Java, and SQL. Interested in building useful software and turning data into practical insights.

EDUCATION
B.E. Computer Science, North Valley Institute of Technology | 2022–2026
Relevant coursework: Data Structures, Database Systems, Operating Systems

SKILLS
Python, Java, SQL, JavaScript, HTML, CSS, Git, Excel, teamwork, communication

PROJECTS
Campus Event Portal | React, JavaScript, SQL
Built a responsive event listing portal for student clubs. Added search and category filters and worked with a team of three to test the user experience.

Student Performance Analysis | Python, Pandas, Excel
Cleaned and analyzed a sample dataset of 500 student records. Presented key trends in a summary dashboard for a class project.

EXPERIENCE
Technology Club Volunteer | 2024
Helped coordinate two campus workshops and supported event communications for 80+ attendees.`;

const input = document.querySelector("#resume-input");
const charCount = document.querySelector("#char-count");
const errorMessage = document.querySelector("#input-error");
const analyzeButton = document.querySelector("#analyze-button");
const results = document.querySelector("#results");
const targetRole = document.querySelector("#target-role");
const skillsPicker = document.querySelector("#skills-picker");
const roleSkillOptions = document.querySelector("#role-skill-options");
const certificateInput = document.querySelector("#certificate-input");
const certificatePreviews = document.querySelector("#certificate-previews");
let savedEditorRange = null;
let pdfJsPromise;
let resumeVersions = [];
let activeVersionId = "";
let versionSaveTimer;
let trackedJobs = [];

roles.forEach(role => {
  const option = document.createElement("option");
  option.value = role.title;
  option.textContent = role.title;
  targetRole.append(option);
});

targetRole.addEventListener("change", () => {
  renderRoleSkills();
  scheduleVersionSave();
});
document.querySelector("#add-skills-button").addEventListener("click", addSelectedSkills);
document.querySelector("#theme-toggle").addEventListener("click", toggleTheme);
certificateInput.addEventListener("change", addCertificatePhotos);
document.querySelectorAll(".nav-link[data-workspace]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    switchWorkspace(link.dataset.workspace);
  });
});
document.querySelector("#run-ats-button").addEventListener("click", runAtsCheck);
document.querySelector("#run-match-button").addEventListener("click", runJobMatch);
document.querySelector("#job-description-input").addEventListener("input", event => {
  document.querySelector("#job-description-count").textContent = `${event.target.value.length.toLocaleString()} characters`;
  document.querySelector("#match-error").textContent = "";
});
document.querySelector("#edit-resume-button").addEventListener("click", () => switchWorkspace("editor"));
document.querySelector("#create-version-button").addEventListener("click", createResumeVersion);
document.querySelector("#version-list").addEventListener("click", handleVersionAction);
document.querySelector("#job-form").addEventListener("submit", saveTrackedJob);
document.querySelector("#cancel-job-edit").addEventListener("click", resetJobForm);
document.querySelector("#job-list-tracker").addEventListener("click", handleTrackedJobAction);
document.querySelector("#job-search").addEventListener("input", renderTrackedJobs);
document.querySelector("#job-status-filter").addEventListener("change", renderTrackedJobs);

const savedTheme = localStorage.getItem("careerlens-theme");
if (savedTheme === "dark") setTheme("dark");

input.addEventListener("input", () => {
  charCount.textContent = `${getResumeText().length.toLocaleString()} characters`;
  errorMessage.textContent = "";
  updateJobMatchResumePreview();
  scheduleVersionSave();
});
loadResumeVersions();
loadTrackedJobs();

document.addEventListener("selectionchange", saveEditorSelection);
input.addEventListener("paste", pastePlainText);
document.querySelector(".editor-toolbar").addEventListener("pointerdown", saveEditorSelection);
document.querySelector("#font-family").addEventListener("change", event => applyEditorCommand("fontName", event.target.value));
document.querySelector("#font-size").addEventListener("change", event => applyFontSize(event.target.value));
document.querySelector("#text-color").addEventListener("input", event => applyEditorCommand("foreColor", event.target.value));
document.querySelector("#highlight-button").addEventListener("click", () => {
  applyEditorCommand("hiliteColor", document.querySelector("#highlight-color").value);
});
document.querySelector("#clear-format").addEventListener("click", () => applyEditorCommand("removeFormat"));
document.querySelectorAll(".format-button").forEach(button => {
  button.addEventListener("mousedown", event => event.preventDefault());
});
document.querySelectorAll(".format-button[data-command]").forEach(button => {
  button.addEventListener("click", () => applyEditorCommand(button.dataset.command));
});

document.querySelector("#sample-button").addEventListener("click", () => {
  input.replaceChildren(document.createTextNode(sampleResume));
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
});

document.querySelector("#reanalyze-button").addEventListener("click", () => {
  document.querySelector("#analyzer").scrollIntoView({ behavior: "smooth" });
  input.focus({ preventScroll: true });
});

analyzeButton.addEventListener("click", analyzeResume);

function getResumeText() {
  return input.innerText.replace(/\u00a0/g, " ");
}

function saveEditorSelection() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  const range = selection.getRangeAt(0);
  if (input.contains(range.commonAncestorContainer)) {
    savedEditorRange = range.cloneRange();
  }
}

function restoreEditorSelection() {
  if (!savedEditorRange || !input.contains(savedEditorRange.commonAncestorContainer)) return false;
  input.focus();
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(savedEditorRange);
  return true;
}

function applyEditorCommand(command, value = null) {
  if (!restoreEditorSelection()) {
    document.querySelector("#editor-feedback").textContent = "Select text in your resume first.";
    input.focus();
    return;
  }
  const inlineStyles = {
    fontName: ["fontFamily", value],
    fontSize: ["fontSize", value],
    foreColor: ["color", value],
    hiliteColor: ["backgroundColor", value]
  };
  if (inlineStyles[command]) {
    applyInlineStyle(...inlineStyles[command]);
    return;
  }
  document.execCommand(command, false, value);
  document.querySelector("#editor-feedback").textContent = "Formatting applied.";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  saveEditorSelection();
}

function applyFontSize(size) {
  const exactSizes = { "2": "10px", "3": "12px", "4": "14px", "5": "18px", "6": "24px", "7": "32px" };
  applyInlineStyle("fontSize", exactSizes[size]);
}

function applyInlineStyle(property, value) {
  if (!restoreEditorSelection()) {
    document.querySelector("#editor-feedback").textContent = "Select text in your resume first.";
    input.focus();
    return;
  }
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  if (range.collapsed) {
    document.querySelector("#editor-feedback").textContent = "Select the text you want to format first.";
    return;
  }
  const span = document.createElement("span");
  span.style[property] = value;
  span.append(range.extractContents());
  range.insertNode(span);
  range.selectNodeContents(span);
  selection.removeAllRanges();
  selection.addRange(range);
  savedEditorRange = range.cloneRange();
  document.querySelector("#editor-feedback").textContent = "Formatting applied.";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function pastePlainText(event) {
  event.preventDefault();
  const text = event.clipboardData.getData("text/plain");
  if (!document.execCommand("insertText", false, text)) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !input.contains(selection.anchorNode)) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
  }
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

function analyzeResume() {
  const text = getResumeText().trim();
  if (text.length < 50) {
    errorMessage.textContent = "Add at least 50 characters so we can give you meaningful feedback.";
    input.focus();
    return;
  }

  analyzeButton.disabled = true;
  analyzeButton.querySelector("span:first-child").textContent = "Reviewing your resume...";
  window.setTimeout(() => {
    const analysis = buildAnalysis(text);
    renderAnalysis(analysis, text);
    analyzeButton.disabled = false;
    analyzeButton.querySelector("span:first-child").textContent = "Analyze my resume";
    results.dataset.hasAnalysis = "true";
    results.hidden = false;
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 250);
}

function switchWorkspace(name) {
  document.querySelectorAll("[data-workspace-panel]").forEach(panel => {
    panel.hidden = panel.dataset.workspacePanel !== name ||
      (panel.id === "results" && panel.dataset.hasAnalysis !== "true");
  });
  document.querySelectorAll(".nav-link[data-workspace]").forEach(link => {
    const active = link.dataset.workspace === name;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const activeLink = document.querySelector(`.nav-link[data-workspace="${name}"]`);
  if (activeLink) history.replaceState(null, "", activeLink.getAttribute("href"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function runAtsCheck() {
  const text = getResumeText().trim();
  const output = document.querySelector("#ats-results");
  if (text.length < 50) {
    output.hidden = false;
    output.innerHTML = '<div class="empty-state">Add at least 50 characters in the Resume editor before running an ATS check.</div>';
    return;
  }
  const sectionPatterns = [
    { name: "Contact information", pattern: /@|(?:\+?\d[\d\s().-]{7,}\d)|linkedin|github/i },
    { name: "Professional summary", pattern: /\b(summary|profile|objective)\b/i },
    { name: "Work experience", pattern: /\b(experience|employment|internship|work history)\b/i },
    { name: "Education", pattern: /\b(education|academic|degree|university|college)\b/i },
    { name: "Skills", pattern: /\b(skills|technical skills|competencies)\b/i },
    { name: "Projects", pattern: /\b(projects|selected projects|portfolio)\b/i }
  ];
  const foundSections = sectionPatterns.filter(section => section.pattern.test(text));
  const hasTables = input.querySelector("table") !== null;
  const hasImages = input.querySelector("img") !== null;
  const hasColumns = input.querySelectorAll("td, th").length > 0;
  const hasUnusualSymbols = /[◆●■►➤★☆✓✔]/.test(text);
  const styledElements = [...input.querySelectorAll("[style]")];
  const usesColor = styledElements.some(element => element.style.color && !["rgb(40, 50, 71)", "rgb(29, 39, 59)"].includes(element.style.color));
  const usesHighlight = styledElements.some(element => element.style.backgroundColor && !["transparent", "rgba(0, 0, 0, 0)"].includes(element.style.backgroundColor));
  const layoutIssues = [hasTables, hasColumns, hasImages].filter(Boolean).length;
  const keywordRole = roles.find(role => role.title === targetRole.value) || roles
    .map(role => ({ ...role, overlap: role.skills.filter(skill => includesSkill(text, skill)).length }))
    .sort((a, b) => b.overlap - a.overlap)[0];
  const foundKeywords = keywordRole.skills.filter(skill => includesSkill(text, skill));
  const missingKeywords = keywordRole.skills.filter(skill => !foundKeywords.includes(skill)).slice(0, 6);
  const formatting = Math.max(0, 100 - layoutIssues * 25 - (hasUnusualSymbols ? 10 : 0) - (usesColor ? 5 : 0) - (usesHighlight ? 5 : 0));
  const sectionScore = Math.round(foundSections.length / sectionPatterns.length * 100);
  const keywordScore = Math.round(foundKeywords.length / keywordRole.skills.length * 100);
  const score = Math.round(formatting * .4 + sectionScore * .35 + keywordScore * .25);
  const findings = [
    { ok: !hasTables && !hasColumns, title: "Use a simple, single-column layout", detail: hasTables || hasColumns ? "Tables or columns were detected. Use plain headings and a single text column for more reliable parsing." : "No table-based or multi-column layout detected." },
    { ok: !hasImages, title: "Keep important details as text", detail: hasImages ? "An image appears in the resume. Put contact details and key qualifications in selectable text." : "No images are embedded in the resume text area." },
    { ok: foundSections.length >= 4, title: "Use standard section headings", detail: `${foundSections.length} of ${sectionPatterns.length} common sections found: ${foundSections.map(section => section.name).join(", ") || "none detected"}.` },
    { ok: !hasUnusualSymbols, title: "Prefer plain bullets and simple symbols", detail: hasUnusualSymbols ? "Decorative symbols detected. Replace them with standard bullets or simple text." : "No unusual decorative symbols detected." },
    { ok: !usesColor && !usesHighlight, title: "Keep styling restrained", detail: usesColor || usesHighlight ? "Colored or highlighted text detected. Keep essential information readable without relying on color." : "No colored or highlighted text detected." }
  ];
  output.innerHTML = `
    <div class="tool-results-heading"><div><div class="section-kicker">ATS READABILITY SNAPSHOT</div><h2>${score}% compatibility estimate</h2><p>Best keyword comparison: ${escapeHtml(keywordRole.title)}. This score is a heuristic, not a pass/fail result.</p></div><div class="large-score">${score}<span>/100</span></div></div>
    <div class="tool-stat-grid">${[
      { label: "Structure", value: sectionScore, detail: `${foundSections.length}/${sectionPatterns.length} sections` },
      { label: "Keyword alignment", value: keywordScore, detail: `${foundKeywords.length}/${keywordRole.skills.length} role skills` },
      { label: "Simple formatting", value: formatting, detail: layoutIssues ? `${layoutIssues} layout concern(s)` : "Parser-friendly layout" }
    ].map(stat => renderToolStat(stat)).join("")}</div>
    <div class="tool-lower-grid"><article class="tool-card"><div class="section-kicker">PARSER-FRIENDLY CHECKS</div><div class="check-list">${findings.map(item => `<div class="check-item ${item.ok ? "check-ok" : "check-warn"}"><span>${item.ok ? "✓" : "!"}</span><div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p></div></div>`).join("")}</div></article>
    <article class="tool-card"><div class="section-kicker">KEYWORDS TO CONSIDER</div><h3>${escapeHtml(keywordRole.title)}</h3><p class="tool-muted">Only include keywords that honestly reflect your experience.</p><div class="keyword-chips">${missingKeywords.length ? missingKeywords.map(skill => `<span class="keyword-chip">${escapeHtml(titleCase(skill))}</span>`).join("") : '<span class="keyword-chip keyword-present">All role keywords detected</span>'}</div></article></div>`;
  output.hidden = false;
}

function runJobMatch() {
  const resumeText = getResumeText().trim();
  const description = document.querySelector("#job-description-input").value.trim();
  const error = document.querySelector("#match-error");
  const output = document.querySelector("#match-results");
  if (resumeText.length < 50) {
    error.textContent = "Add at least 50 characters to your resume in the editor first.";
    return;
  }
  if (description.length < 40) {
    error.textContent = "Paste a job description with at least 40 characters.";
    return;
  }
  const knownSkills = [...new Set(roles.flatMap(role => role.skills))];
  const jobSkills = knownSkills.filter(skill => includesSkill(description, skill));
  const matchingSkills = jobSkills.filter(skill => includesSkill(resumeText, skill));
  const missingSkills = jobSkills.filter(skill => !matchingSkills.includes(skill));
  const stopWords = new Set("about after again against also among and any are around because been before being between both but can could does doing down during each either enough especially from further have having here into just more most much must only other otherwise over same should since some such than that their them then there these they this those through under until upon using very want what when where which while will with within would your".split(" "));
  const keywordFrequency = new Map();
  for (const word of description.toLowerCase().match(/[a-z][a-z0-9+#.-]{3,}/g) || []) {
    if (!stopWords.has(word) && !knownSkills.includes(word)) keywordFrequency.set(word, (keywordFrequency.get(word) || 0) + 1);
  }
  const jobKeywords = [...keywordFrequency.keys()].sort((a, b) => keywordFrequency.get(b) - keywordFrequency.get(a)).slice(0, 12);
  const matchedKeywords = jobKeywords.filter(keyword => includesSkill(resumeText, keyword));
  const missingKeywords = jobKeywords.filter(keyword => !matchedKeywords.includes(keyword)).slice(0, 8);
  const skillMatch = jobSkills.length ? matchingSkills.length / jobSkills.length : 0;
  const keywordMatch = jobKeywords.length ? matchedKeywords.length / jobKeywords.length : 0;
  const matchPercent = Math.round((skillMatch * .65 + keywordMatch * .35) * 100);
  const suitability = matchPercent >= 75 ? "Strong alignment" : matchPercent >= 50 ? "Promising with a few gaps" : "Needs more role-specific evidence";
  const actions = [];
  if (missingSkills.length) actions.push(`If accurate, add evidence of ${missingSkills.slice(0, 3).map(titleCase).join(", ")} in your skills or project sections.`);
  if (missingKeywords.length) actions.push(`Reflect relevant language from the posting, such as ${missingKeywords.slice(0, 3).join(", ")}, where it truthfully describes your work.`);
  if (!/\b(project|projects)\b/i.test(resumeText)) actions.push("Add one relevant project and explain the tools, your contribution, and its outcome.");
  if (!/\b\d+%|\b\d+\+?\s*(users|students|customers|records|members|attendees|hours|projects)\b/i.test(resumeText)) actions.push("Quantify a result or scope where possible, such as records analyzed, users served, or time saved.");
  if (!actions.length) actions.push("Your resume reflects many terms from this description. Tailor your opening summary and keep examples specific.");
  output.innerHTML = `
    <div class="tool-results-heading"><div><div class="section-kicker">JOB DESCRIPTION OVERLAP</div><h2>${matchPercent}% match</h2><p>Text similarity estimate based on detected skills and repeated job-description keywords.</p></div><div class="large-score match-score">${matchPercent}<span>%</span></div></div>
    <div class="tool-stat-grid">${[
      { label: "Skill overlap", value: Math.round(skillMatch * 100), detail: `${matchingSkills.length}/${jobSkills.length} skills found` },
      { label: "Keyword overlap", value: Math.round(keywordMatch * 100), detail: `${matchedKeywords.length}/${jobKeywords.length} keywords found` },
      { label: "Estimated suitability", value: matchPercent, detail: suitability }
    ].map(stat => renderToolStat(stat)).join("")}</div>
    <div class="tool-lower-grid"><article class="tool-card"><div class="section-kicker">MISSING SKILLS</div><h3>${missingSkills.length ? `${missingSkills.length} skills to review` : "No known skill gaps found"}</h3><p class="tool-muted">Only add these if they genuinely match your experience.</p><div class="keyword-chips">${missingSkills.length ? missingSkills.map(skill => `<span class="keyword-chip">${escapeHtml(titleCase(skill))}</span>`).join("") : '<span class="keyword-chip keyword-present">Skills covered</span>'}</div></article>
    <article class="tool-card"><div class="section-kicker">MISSING KEYWORDS</div><h3>Terms to consider</h3><p class="tool-muted">These words appear in the job description but not in your resume.</p><div class="keyword-chips">${missingKeywords.length ? missingKeywords.map(keyword => `<span class="keyword-chip">${escapeHtml(keyword)}</span>`).join("") : '<span class="keyword-chip keyword-present">No keyword gaps detected</span>'}</div></article></div>
    <article class="tool-card recommended-changes"><div class="section-kicker">RECOMMENDED CHANGES</div><div class="change-list">${actions.map(action => `<div class="check-item"><span>↗</span><div><p>${escapeHtml(action)}</p></div></div>`).join("")}</div></article>`;
  output.hidden = false;
}

function renderToolStat(stat) {
  return `<article class="stat-card"><div class="stat-header"><span>${escapeHtml(stat.label)}</span><strong>${stat.value}%</strong></div><div class="stat-track"><span style="width:${stat.value}%"></span></div><p>${escapeHtml(stat.detail)}</p></article>`;
}

function updateJobMatchResumePreview() {
  const text = getResumeText().trim();
  document.querySelector("#match-resume-preview").textContent = text
    ? `${text.slice(0, 170)}${text.length > 170 ? "…" : ""}`
    : "Add resume content in the Resume editor to compare against a job description.";
  document.querySelector("#match-resume-label").textContent = activeResumeVersion()?.name || "Resume from the editor";
}

function scheduleVersionSave() {
  window.clearTimeout(versionSaveTimer);
  versionSaveTimer = window.setTimeout(saveActiveResumeVersion, 300);
}

function saveActiveResumeVersion() {
  const version = activeResumeVersion();
  if (!version) return;
  version.content = sanitizeResumeHtml(input.innerHTML);
  version.targetRole = targetRole.value;
  version.updatedAt = Date.now();
  persistResumeVersions();
  renderResumeVersions();
  updateJobMatchResumePreview();
}

function activeResumeVersion() {
  return resumeVersions.find(version => version.id === activeVersionId);
}

function loadResumeVersions() {
  try {
    const stored = localStorage.getItem("careerlens-resume-versions");
    if (stored) {
      const state = JSON.parse(stored);
      if (state && Array.isArray(state.versions)) {
        resumeVersions = state.versions.filter(version =>
          version && typeof version.id === "string" && typeof version.name === "string" && typeof version.content === "string"
        );
        activeVersionId = state.activeVersionId;
      }
    }
  } catch (error) {
    document.querySelector("#version-feedback").textContent = `Could not read saved resume versions: ${error.message}`;
  }
  if (!resumeVersions.length) {
    const initial = { id: createId(), name: "General Resume", content: "", targetRole: "", updatedAt: Date.now() };
    resumeVersions = [initial];
    activeVersionId = initial.id;
  }
  if (!activeResumeVersion()) activeVersionId = resumeVersions[0].id;
  const current = activeResumeVersion();
  input.innerHTML = sanitizeResumeHtml(current.content);
  targetRole.value = current.targetRole || "";
  charCount.textContent = `${getResumeText().length.toLocaleString()} characters`;
  renderRoleSkills();
  renderResumeVersions();
  updateJobMatchResumePreview();
  persistResumeVersions();
}

function persistResumeVersions() {
  try {
    localStorage.setItem("careerlens-resume-versions", JSON.stringify({ activeVersionId, versions: resumeVersions }));
    return true;
  } catch (error) {
    document.querySelector("#version-feedback").textContent = `Could not save resume versions in this browser: ${error.message}`;
    return false;
  }
}

function createResumeVersion() {
  saveActiveResumeVersion();
  const baseName = document.querySelector("#version-type").value;
  const number = resumeVersions.filter(version => version.name === baseName || version.name.startsWith(`${baseName} (`)).length;
  const name = number ? `${baseName} (${number + 1})` : baseName;
  const roleByVersion = {
    "Software Developer Resume": "Junior Software Engineer",
    "Data Analyst Resume": "Data Analyst",
    "Project Manager Resume": "Project Coordinator",
    "Marketing Resume": "Digital Marketing Associate"
  };
  const version = {
    id: createId(),
    name,
    content: sanitizeResumeHtml(input.innerHTML),
    targetRole: roleByVersion[baseName] || targetRole.value,
    updatedAt: Date.now()
  };
  resumeVersions.push(version);
  activeVersionId = version.id;
  input.innerHTML = version.content;
  targetRole.value = version.targetRole;
  renderRoleSkills();
  charCount.textContent = `${getResumeText().length.toLocaleString()} characters`;
  const saved = persistResumeVersions();
  renderResumeVersions();
  updateJobMatchResumePreview();
  if (saved) document.querySelector("#version-feedback").textContent = `${name} created. Edits are saved automatically in this browser.`;
}

function handleVersionAction(event) {
  const button = event.target.closest("button[data-version-action]");
  if (!button) return;
  const version = resumeVersions.find(item => item.id === button.dataset.versionId);
  if (!version) return;
  if (button.dataset.versionAction === "open") {
    saveActiveResumeVersion();
    activeVersionId = version.id;
    input.innerHTML = sanitizeResumeHtml(version.content);
    targetRole.value = version.targetRole || "";
    charCount.textContent = `${getResumeText().length.toLocaleString()} characters`;
    renderRoleSkills();
    input.dispatchEvent(new Event("input", { bubbles: true }));
    const saved = persistResumeVersions();
    renderResumeVersions();
    if (saved) document.querySelector("#version-feedback").textContent = `${version.name} opened.`;
  } else if (button.dataset.versionAction === "delete") {
    if (resumeVersions.length === 1) {
      document.querySelector("#version-feedback").textContent = "Keep at least one resume version in your library.";
      return;
    }
    resumeVersions = resumeVersions.filter(item => item.id !== version.id);
    if (activeVersionId === version.id) {
      activeVersionId = resumeVersions[0].id;
      input.innerHTML = sanitizeResumeHtml(resumeVersions[0].content);
      targetRole.value = resumeVersions[0].targetRole || "";
      charCount.textContent = `${getResumeText().length.toLocaleString()} characters`;
      renderRoleSkills();
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    const saved = persistResumeVersions();
    renderResumeVersions();
    if (saved) document.querySelector("#version-feedback").textContent = `${version.name} deleted.`;
  }
}

function renderResumeVersions() {
  document.querySelector("#version-count").textContent = `${resumeVersions.length} saved`;
  document.querySelector("#version-list").innerHTML = resumeVersions.map(version => {
    const wordCount = getPlainText(version.content).trim().split(/\s+/).filter(Boolean).length;
    const active = version.id === activeVersionId;
    return `<article class="version-card ${active ? "version-active" : ""}"><div class="version-card-icon">${active ? "✓" : "▤"}</div><div class="version-info"><h3>${escapeHtml(version.name)} ${active ? '<span class="active-version-badge">ACTIVE</span>' : ""}</h3><p>${wordCount} words · ${version.targetRole ? escapeHtml(version.targetRole) : "No target role"} · Updated ${new Date(version.updatedAt).toLocaleDateString()}</p></div><div class="version-actions"><button type="button" class="version-open-button" data-version-action="open" data-version-id="${escapeHtml(version.id)}">${active ? "Current" : "Open"}</button><button type="button" class="version-delete-button" data-version-action="delete" data-version-id="${escapeHtml(version.id)}" aria-label="Delete ${escapeHtml(version.name)}" ${resumeVersions.length === 1 ? "disabled" : ""}>×</button></div></article>`;
  }).join("");
}

function loadTrackedJobs() {
  try {
    const stored = localStorage.getItem("careerlens-tracked-jobs");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) throw new Error("Saved job tracker data has an invalid format.");
      trackedJobs = parsed.filter(job =>
        job && typeof job.id === "string" && typeof job.title === "string" &&
        typeof job.company === "string" && typeof job.status === "string"
      );
    }
  } catch (error) {
    document.querySelector("#tracker-feedback").textContent = `Could not load saved applications: ${error.message}`;
    document.querySelector("#tracker-feedback").classList.add("error");
  }
  resetJobForm();
  renderTrackedJobs();
}

function saveTrackedJob(event) {
  event.preventDefault();
  const formError = document.querySelector("#job-form-error");
  formError.textContent = "";
  const editId = document.querySelector("#job-edit-id").value;
  const existing = trackedJobs.find(job => job.id === editId);
  const linkValue = document.querySelector("#job-link-input").value.trim();
  let safeLink = "";
  if (linkValue) {
    try {
      const parsed = new URL(linkValue);
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Use a secure http or https job posting URL.");
      safeLink = parsed.href;
    } catch (error) {
      formError.textContent = error.message || "Enter a valid job posting link.";
      return;
    }
  }
  const job = {
    id: existing ? existing.id : createId(),
    title: document.querySelector("#job-title-input").value.trim(),
    company: document.querySelector("#company-input").value.trim(),
    status: document.querySelector("#job-status-input").value,
    date: document.querySelector("#job-date-input").value,
    followup: document.querySelector("#job-followup-input").value,
    link: safeLink,
    notes: document.querySelector("#job-notes-input").value.trim(),
    createdAt: existing ? existing.createdAt : Date.now(),
    updatedAt: Date.now()
  };
  if (!job.title || !job.company || !job.date) {
    formError.textContent = "Job title, company, and date are required.";
    return;
  }
  const previousJobs = trackedJobs;
  if (existing) trackedJobs = trackedJobs.map(item => item.id === existing.id ? job : item);
  else trackedJobs = [job, ...trackedJobs];

  if (!persistTrackedJobs()) {
    trackedJobs = previousJobs;
    renderTrackedJobs();
    return;
  }
  resetJobForm();
  renderTrackedJobs();
  const feedback = document.querySelector("#tracker-feedback");
  feedback.classList.remove("error");
  feedback.textContent = existing ? "Application updated." : "Application added to your tracker.";
}

function persistTrackedJobs() {
  try {
    localStorage.setItem("careerlens-tracked-jobs", JSON.stringify(trackedJobs));
    return true;
  } catch (error) {
    const feedback = document.querySelector("#tracker-feedback");
    feedback.classList.add("error");
    feedback.textContent = `Could not save your applications in this browser: ${error.message}`;
    return false;
  }
}

function resetJobForm() {
  const form = document.querySelector("#job-form");
  form.reset();
  document.querySelector("#job-edit-id").value = "";
  document.querySelector("#job-date-input").value = new Date().toISOString().slice(0, 10);
  document.querySelector("#job-form-title").textContent = "Log a job application";
  document.querySelector("#save-job-button").innerHTML = 'Save application <span class="button-arrow">→</span>';
  document.querySelector("#cancel-job-edit").hidden = true;
  document.querySelector("#job-form-error").textContent = "";
}

function renderTrackedJobs() {
  const statusFilter = document.querySelector("#job-status-filter").value;
  const query = document.querySelector("#job-search").value.trim().toLowerCase();
  document.querySelector("#tracker-stats").innerHTML = [
    { label: "Total tracked", value: trackedJobs.length, icon: "▤" },
    { label: "Applied", value: trackedJobs.filter(job => ["Applied", "Interview", "Offer", "Rejected"].includes(job.status)).length, icon: "↗" },
    { label: "In interview", value: trackedJobs.filter(job => job.status === "Interview").length, icon: "◉" },
    { label: "Offers", value: trackedJobs.filter(job => job.status === "Offer").length, icon: "✦" }
  ].map(stat => `<article class="tracker-stat-card"><span class="tracker-stat-icon">${stat.icon}</span><div><span>${escapeHtml(stat.label)}</span><strong>${stat.value}</strong></div></article>`).join("");

  const filtered = trackedJobs.filter(job => {
    const textMatches = `${job.title} ${job.company} ${job.notes}`.toLowerCase().includes(query);
    return textMatches && (!statusFilter || job.status === statusFilter);
  }).sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.updatedAt || 0) - (a.updatedAt || 0));
  const list = document.querySelector("#job-list-tracker");
  if (!filtered.length) {
    list.innerHTML = `<div class="tracker-empty"><div class="tracker-empty-icon">◷</div><strong>${trackedJobs.length ? "No applications match these filters" : "Your next opportunity starts here"}</strong><p>${trackedJobs.length ? "Try another search or status filter." : "Add a role above to keep applications, interviews, and follow-ups organized."}</p></div>`;
    return;
  }
  list.innerHTML = filtered.map(job => {
    const statusClass = job.status.toLowerCase();
    const followupDate = job.followup ? new Date(`${job.followup}T00:00:00`) : null;
    const isOverdue = followupDate && followupDate < new Date(new Date().toDateString()) && !["Offer", "Rejected"].includes(job.status);
    const safeLink = isSafeHttpUrl(job.link) ? `<a class="job-posting-link" href="${escapeHtml(job.link)}" target="_blank" rel="noopener noreferrer">View posting ↗</a>` : "";
    return `<article class="tracked-job-card">
      <div class="tracked-job-main">
        <div class="tracked-job-heading"><div><h3>${escapeHtml(job.title)}</h3><strong>${escapeHtml(job.company)}</strong></div><span class="job-status-badge status-${statusClass}">${escapeHtml(job.status)}</span></div>
        <div class="tracked-job-meta"><span>◷ ${escapeHtml(formatTrackerDate(job.date))}</span>${job.followup ? `<span class="${isOverdue ? "followup-overdue" : ""}">↗ Follow up ${escapeHtml(formatTrackerDate(job.followup))}${isOverdue ? " · overdue" : ""}</span>` : ""}${safeLink}</div>
        ${job.notes ? `<p class="tracked-job-notes">${escapeHtml(job.notes)}</p>` : ""}
      </div>
      <div class="tracked-job-actions"><button type="button" class="job-edit-action" data-job-action="edit" data-job-id="${escapeHtml(job.id)}">Edit</button><button type="button" class="job-delete-action" data-job-action="delete" data-job-id="${escapeHtml(job.id)}">Delete</button></div>
    </article>`;
  }).join("");
}

function handleTrackedJobAction(event) {
  const button = event.target.closest("button[data-job-action]");
  if (!button) return;
  const job = trackedJobs.find(item => item.id === button.dataset.jobId);
  if (!job) return;
  const feedback = document.querySelector("#tracker-feedback");
  feedback.classList.remove("error");
  if (button.dataset.jobAction === "edit") {
    document.querySelector("#job-edit-id").value = job.id;
    document.querySelector("#job-title-input").value = job.title;
    document.querySelector("#company-input").value = job.company;
    document.querySelector("#job-status-input").value = job.status;
    document.querySelector("#job-date-input").value = job.date;
    document.querySelector("#job-link-input").value = job.link || "";
    document.querySelector("#job-followup-input").value = job.followup || "";
    document.querySelector("#job-notes-input").value = job.notes || "";
    document.querySelector("#job-form-title").textContent = "Update your application";
    document.querySelector("#save-job-button").innerHTML = 'Save changes <span class="button-arrow">→</span>';
    document.querySelector("#cancel-job-edit").hidden = false;
    document.querySelector("#job-title-input").focus();
    document.querySelector("#job-form").scrollIntoView({ behavior: "smooth", block: "start" });
    feedback.textContent = `Editing ${job.title} at ${job.company}.`;
  } else if (button.dataset.jobAction === "delete") {
    const previousJobs = trackedJobs;
    trackedJobs = trackedJobs.filter(item => item.id !== job.id);
    if (persistTrackedJobs()) {
      renderTrackedJobs();
      feedback.textContent = `${job.title} at ${job.company} removed.`;
      if (document.querySelector("#job-edit-id").value === job.id) resetJobForm();
    } else {
      trackedJobs = previousJobs;
      renderTrackedJobs();
    }
  }
}

function formatTrackerDate(value) {
  if (!value) return "Date not set";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? "Date not set" : new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function isSafeHttpUrl(value) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function createId() {
  return window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getPlainText(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content.textContent || "";
}

function sanitizeResumeHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  const allowedTags = new Set(["B", "STRONG", "I", "EM", "U", "SPAN", "BR", "DIV", "P"]);
  const forbiddenTags = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "SVG"]);
  const allowedStyles = ["fontFamily", "fontSize", "color", "backgroundColor"];
  const walk = parent => [...parent.childNodes].forEach(node => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (forbiddenTags.has(node.tagName)) {
      node.remove();
      return;
    }
    if (!allowedTags.has(node.tagName)) {
      node.replaceWith(document.createTextNode(node.textContent || ""));
      return;
    }
    [...node.attributes].forEach(attribute => {
      if (attribute.name === "style") {
        const styles = allowedStyles.map(property => [property, node.style[property]])
          .filter(([property, value]) => value && CSS.supports(propertyToCss(property), value));
        node.removeAttribute("style");
        styles.forEach(([property, value]) => node.style[property] = value);
      } else if (attribute.name !== "data-added-skills" && attribute.name !== "data-skill-list") {
        node.removeAttribute(attribute.name);
      }
    });
    walk(node);
  });
  walk(template.content);
  return template.innerHTML;
}

function propertyToCss(property) {
  return property.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

function includesSkill(text, skill) {
  const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9+#])${escaped}($|[^a-z0-9+#])`, "i").test(text);
}

function buildAnalysis(text) {
  const normalized = text.toLowerCase();
  const foundByGroup = skillGroups.map(group => ({
    ...group,
    found: group.skills.filter(skill => includesSkill(normalized, skill))
  }));
  const foundSkills = [...new Set(foundByGroup.flatMap(group => group.found))];
  const matchedRoles = roles.map(role => {
    const matched = role.skills.filter(skill => foundSkills.includes(skill));
    return { ...role, matched, score: Math.round(matched.length / role.skills.length * 100) };
  }).sort((a, b) => {
    if (a.title === targetRole.value) return -1;
    if (b.title === targetRole.value) return 1;
    return b.score - a.score;
  }).slice(0, 3);

  const targetSkills = [...new Set(matchedRoles.flatMap(role => role.skills))];
  const missingSkills = targetSkills.filter(skill => !foundSkills.includes(skill)).slice(0, 5);
  const improvements = getImprovements(text, foundByGroup);
  const metrics = calculateStats(text, foundSkills, foundByGroup);
  return { foundByGroup, foundSkills, matchedRoles, missingSkills, improvements, score: metrics.score, metrics };
}

function calculateStats(text, foundSkills, groups) {
  const sections = ["education", "experience", "projects", "skills"].filter(section => new RegExp(`\\b${section}\\b`, "i").test(text)).length;
  const sectionScore = Math.round(sections / 4 * 100);
  const skillScore = Math.min(100, foundSkills.length * 8);
  const impactScore = /\b\d+%|\b\d+\+?\s*(users|students|customers|records|members|attendees|hours|projects)\b/i.test(text) ? 100 : 25;
  const role = roles.find(item => item.title === targetRole.value);
  const roleSkills = role ? role.skills : [...new Set(roles.flatMap(item => item.skills))];
  const matchScore = Math.round(roleSkills.filter(skill => foundSkills.includes(skill)).length / roleSkills.length * 100);
  const score = Math.round(sectionScore * .25 + skillScore * .25 + impactScore * .25 + matchScore * .25);
  return { score, sections: sectionScore, skills: skillScore, impact: impactScore, roleMatch: matchScore };
}

function getImprovements(text, groups) {
  const suggestions = [];
  const hasMetrics = /\b\d+%|\b\d+\+?\s*(users|students|customers|records|members|attendees|hours|projects)\b/i.test(text);
  const actionVerbs = /\b(built|created|developed|implemented|analyzed|led|designed|improved|launched|automated|organized)\b/i.test(text);
  const hasSections = /\b(education|experience|projects|skills)\b/i.test(text);
  const hasContact = /@|linkedin|github|portfolio/i.test(text);

  if (!actionVerbs) suggestions.push("Start project or experience bullets with clear action verbs such as built, analyzed, designed, or improved.");
  if (!hasMetrics) suggestions.push("Add measurable outcomes where you can: users reached, records analyzed, time saved, or event attendance.");
  if (!/\b(project|projects)\b/i.test(text)) suggestions.push("Add a projects section with the problem, your contribution, the tools used, and the result.");
  else suggestions.push("For each project, make your individual contribution and the outcome easy to spot.");
  if (!hasSections) suggestions.push("Use clear section headings so recruiters can quickly scan education, skills, projects, and experience.");
  if (!hasContact) suggestions.push("Include professional contact details and relevant links, such as LinkedIn, GitHub, or a portfolio.");
  if (!/\b(internship|experience|intern|volunteer)\b/i.test(text)) suggestions.push("Include internships, volunteering, club work, or other practical experience—even if it was not a formal job.");
  if (!groups.some(group => group.found.length > 0)) suggestions.push("Use specific skill names and tools in context, rather than relying only on broad descriptions.");
  return suggestions.slice(0, 5);
}

function renderAnalysis(analysis, text) {
  const score = analysis.score;
  document.querySelector("#score-value").textContent = score;
  document.querySelector("#score-fill").style.width = `${score}%`;
  document.querySelector("#score-caption").textContent =
    score >= 75 ? "A strong foundation—polish the details to stand out." :
    score >= 55 ? "Good starting point—with a few clear ways to level up." :
    "Plenty of opportunity to make your experience shine.";
  document.querySelector("#stats-grid").innerHTML = [
    { label: "Section completeness", value: analysis.metrics.sections, detail: "Education, skills, projects & experience" },
    { label: "Skills coverage", value: analysis.metrics.skills, detail: `${analysis.foundSkills.length} skills detected` },
    { label: "Impact evidence", value: analysis.metrics.impact, detail: "Numbers and measurable outcomes" },
    { label: targetRole.value ? "Target role match" : "Role match", value: analysis.metrics.roleMatch, detail: targetRole.value || "Across suggested roles" }
  ].map(stat => `<article class="stat-card"><div class="stat-header"><span>${escapeHtml(stat.label)}</span><strong>${stat.value}%</strong></div><div class="stat-track"><span style="width:${stat.value}%"></span></div><p>${escapeHtml(stat.detail)}</p></article>`).join("");

  const degree = text.match(/\b(B\.?E\.?|B\.?Tech|Bachelor(?:'s)?|M\.?S\.?|M\.?Tech|Master(?:'s)?|MBA|Computer Science|Information Technology|Engineering)\b/i);
  const degreeText = degree ? degree[0].replace(/\s+/g, " ") : "Emerging professional";
  const topSkills = analysis.foundSkills.slice(0, 4);
  document.querySelector("#summary-title").textContent = `${degreeText} candidate with ${analysis.foundSkills.length} identified skills`;
  document.querySelector("#summary-text").textContent = analysis.foundSkills.length
    ? `Your resume highlights ${formatList(topSkills)}${analysis.foundSkills.length > topSkills.length ? ` and ${analysis.foundSkills.length - topSkills.length} more skills` : ""}. Explore the role matches below as possible directions—not a measure of your potential.`
    : "Your resume has been reviewed. Add specific tools, skills, projects, and experience to help surface relevant career directions.";

  document.querySelector("#profile-tags").innerHTML = topSkills.length
    ? topSkills.map(skill => `<span class="tag">${escapeHtml(titleCase(skill))}</span>`).join("")
    : '<span class="tag">Profile review complete</span>';
  document.querySelector("#skill-count").textContent = `${analysis.foundSkills.length} skills identified`;
  document.querySelector("#skill-grid").innerHTML = analysis.foundByGroup.map(group => `
    <article class="skill-card">
      <div class="skill-card-top"><h4>${escapeHtml(group.name)}</h4><span class="skill-match">${group.found.length} found</span></div>
      <p>${escapeHtml(group.description)}</p>
      <div class="skill-chips">${group.found.length
        ? group.found.slice(0, 5).map(skill => `<span class="skill-chip found">${escapeHtml(titleCase(skill))}</span>`).join("")
        : '<span class="skill-chip">No specific skills detected yet</span>'}</div>
    </article>`).join("");

  document.querySelector("#job-list").innerHTML = analysis.matchedRoles.map(role => `
    <article class="job-card">
      <div class="job-card-head"><h4>${escapeHtml(role.title)}</h4><span class="match-badge">${role.score}% skill overlap</span></div>
      <p>${escapeHtml(role.description)}</p>
      <div class="job-skills">${role.matched.length
        ? role.matched.slice(0, 4).map(skill => `<span class="job-skill">${escapeHtml(titleCase(skill))}</span>`).join("")
        : '<span class="job-skill">A fresh direction to explore</span>'}</div>
    </article>`).join("");

  renderRecommendations("#missing-skills", analysis.missingSkills.map(skill => ({
    title: titleCase(skill),
    detail: `A skill that could strengthen your profile for ${bestRoleFor(skill, analysis.matchedRoles)}.`
  })), "Your current skills already map to these role suggestions. Check job descriptions for skills to build next.");

  const learningSuggestions = analysis.missingSkills.slice(0, 3).map(skill => ({
    title: `Explore ${titleCase(skill)}`,
    detail: learningBySkill[skill] || `Try a small hands-on project using ${titleCase(skill)} and add what you learn to your portfolio.`
  }));
  renderRecommendations("#learning-suggestions", learningSuggestions, "Choose one project or course related to your interests, then add the outcome to your resume.");

  document.querySelector("#improvement-list").innerHTML = analysis.improvements.map(suggestion =>
    `<div class="improvement-item"><span>✦</span><div>${escapeHtml(suggestion)}</div></div>`).join("");
}

function renderRoleSkills() {
  const role = roles.find(item => item.title === targetRole.value);
  skillsPicker.hidden = !role;
  if (!role) return;
  roleSkillOptions.innerHTML = role.skills.map(skill => `
    <label class="role-skill-option">
      <input type="checkbox" value="${escapeHtml(skill)}" ${includesSkill(getResumeText(), skill) ? "checked" : ""}>
      <span>${escapeHtml(titleCase(skill))}</span>
    </label>`).join("");
  document.querySelector("#skills-feedback").textContent = "";
}

function addSelectedSkills() {
  const selected = [...roleSkillOptions.querySelectorAll("input:checked")]
    .map(checkbox => checkbox.value)
    .filter(skill => !includesSkill(getResumeText(), skill));
  if (!selected.length) {
    document.querySelector("#skills-feedback").textContent = "Select skills you have that are not already listed.";
    return;
  }
  let addedSkills = input.querySelector("[data-added-skills]");
  if (!addedSkills) {
    addedSkills = document.createElement("div");
    addedSkills.dataset.addedSkills = "";
    addedSkills.innerHTML = "<br><strong>ADDITIONAL SKILLS</strong><br><span data-skill-list></span>";
    input.append(addedSkills);
  }
  const skillList = addedSkills.querySelector("[data-skill-list]");
  const previouslyAdded = skillList.textContent.split(",").map(skill => skill.trim()).filter(Boolean);
  skillList.textContent = [...previouslyAdded, ...selected.map(titleCase)].join(", ");
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
  renderRoleSkills();
  document.querySelector("#skills-feedback").textContent = `${selected.length} skill${selected.length === 1 ? "" : "s"} added. Review your resume and analyze it when ready.`;
}

async function addCertificatePhotos() {
  const maxBytes = 8 * 1024 * 1024;
  const files = [...certificateInput.files];
  const feedback = document.querySelector("#certificate-feedback");
  const issues = [];
  let photosAdded = 0;
  let pdfsAdded = 0;
  let pdfJs;

  feedback.classList.remove("error");
  feedback.textContent = "Reading files locally… PDF file contents are not uploaded.";

  try {
    for (const file of files) {
      if (file.size > maxBytes) {
        issues.push(`${file.name}: file exceeds the 8 MB limit.`);
        continue;
      }
      if (file.type.startsWith("image/")) {
        addCertificatePhotoPreview(file);
        photosAdded += 1;
        continue;
      }
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        issues.push(`${file.name}: choose an image or PDF file.`);
        continue;
      }

      try {
        pdfJs ||= await loadPdfJs();
        const extracted = await extractPdfText(pdfJs, file);
        if (!extracted.text.trim()) {
          issues.push(`${file.name}: no selectable text found. Scanned/image-only PDFs need OCR and cannot be read yet.`);
          continue;
        }
        addExtractedPdf(file, extracted);
        pdfsAdded += 1;
      } catch (error) {
        issues.push(`${file.name}: ${error.message}`);
      }
    }
  } finally {
    certificateInput.value = "";
  }

  const addedMessages = [];
  if (photosAdded) addedMessages.push(`${photosAdded} photo${photosAdded === 1 ? "" : "s"} attached for this session`);
  if (pdfsAdded) addedMessages.push(`text extracted from ${pdfsAdded} PDF${pdfsAdded === 1 ? "" : "s"} and added to your resume`);
  feedback.classList.toggle("error", issues.length > 0);
  feedback.textContent = [...addedMessages, ...issues].join(" · ") || "No supported files were selected.";
}

function addCertificatePhotoPreview(file) {
  const url = URL.createObjectURL(file);
  const item = document.createElement("article");
  item.className = "certificate-preview";
  const image = document.createElement("img");
  image.src = url;
  image.alt = "Certificate photo preview";
  const details = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = file.name;
  const size = document.createElement("span");
  size.textContent = `${(file.size / 1024 / 1024).toFixed(1)} MB · photo`;
  details.append(name, size);
  const remove = document.createElement("button");
  remove.type = "button";
  remove.setAttribute("aria-label", `Remove ${file.name}`);
  remove.textContent = "×";
  remove.addEventListener("click", () => {
    URL.revokeObjectURL(url);
    item.remove();
  });
  item.append(image, details, remove);
  certificatePreviews.append(item);
}

function loadPdfJs() {
  if (!pdfJsPromise) {
    pdfJsPromise = import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs")
      .then(pdfjs => {
        pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";
        return pdfjs;
      })
      .catch(error => {
        pdfJsPromise = undefined;
        throw new Error(`Could not load the PDF reader. Check your internet connection and try again. (${error.message})`);
      });
  }
  return pdfJsPromise;
}

async function extractPdfText(pdfjs, file) {
  const data = await file.arrayBuffer();
  const document = await pdfjs.getDocument({ data }).promise;
  if (document.numPages > 50) {
    await document.destroy();
    throw new Error("PDFs are limited to 50 pages for in-browser extraction.");
  }
  const pages = [];
  try {
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map(item => {
        if (!("str" in item)) return "";
        return item.str + (item.hasEOL ? "\n" : " ");
      }).join("").replace(/[ \t]+\n/g, "\n").trim());
    }
  } finally {
    await document.destroy();
  }
  return { text: pages.filter(Boolean).join("\n\n"), pageCount: pages.length };
}

function addExtractedPdf(file, extracted) {
  const section = document.createElement("div");
  section.dataset.certificatePdf = createId();
  section.dataset.sourceName = file.name;
  section.append(document.createElement("br"));
  const heading = document.createElement("strong");
  heading.textContent = "CERTIFICATIONS";
  const source = document.createElement("div");
  source.textContent = file.name;
  const text = document.createElement("div");
  text.textContent = extracted.text;
  section.append(heading, document.createElement("br"), source, text);
  input.append(section);
  input.dispatchEvent(new Event("input", { bubbles: true }));

  const item = document.createElement("article");
  item.className = "certificate-preview pdf-preview";
  item.dataset.certificateId = section.dataset.certificatePdf;
  const icon = document.createElement("span");
  icon.className = "pdf-file-icon";
  icon.textContent = "PDF";
  const details = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = file.name;
  const info = document.createElement("span");
  info.textContent = `${extracted.pageCount} page${extracted.pageCount === 1 ? "" : "s"} · text added to resume`;
  details.append(name, info);
  const remove = document.createElement("button");
  remove.type = "button";
  remove.setAttribute("aria-label", `Remove extracted text from ${file.name}`);
  remove.textContent = "×";
  remove.addEventListener("click", () => {
    input.querySelector(`[data-certificate-pdf="${CSS.escape(section.dataset.certificatePdf)}"]`)?.remove();
    item.remove();
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
  item.append(icon, details, remove);
  certificatePreviews.append(item);
}

function toggleTheme() {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === "dark";
  document.querySelector("#theme-icon").textContent = dark ? "☀" : "☾";
  document.querySelector("#theme-label").textContent = dark ? "Light mode" : "Dark mode";
  document.querySelector("#theme-toggle").setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  localStorage.setItem("careerlens-theme", theme);
}

function renderRecommendations(selector, items, emptyMessage) {
  const container = document.querySelector(selector);
  container.innerHTML = items.length
    ? items.map(item => `<div class="recommendation"><span class="recommendation-bullet">↗</span><div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p></div></div>`).join("")
    : `<div class="recommendation"><span class="recommendation-bullet">✓</span><div><strong>Keep exploring</strong><p>${escapeHtml(emptyMessage)}</p></div></div>`;
}

function bestRoleFor(skill, matchedRoles) {
  const role = matchedRoles.find(item => item.skills.includes(skill));
  return role ? role.title : "your target roles";
}

function formatList(items) {
  if (items.length < 2) return items[0] || "your experience";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function titleCase(value) {
  return value.replace(/\b\w/g, char => char.toUpperCase());
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}
