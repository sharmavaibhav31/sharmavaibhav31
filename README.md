<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=28&duration=2800&pause=1500&color=00E676&center=true&vCenter=true&width=750&lines=Vaibhav+Sharma;Backend+%26+Systems+Engineer;Building+systems+that+don't+fall+over" />

<br/>

**Backend Engineering Intern @ LazyStudents.in · Open Source Project Admin (Arachnode)**  
B.E. Computer Science & Engineering · MITE · 2027 · CGPA 9.43

<br/>

<a href="mailto:sharma31stmay@gmail.com">
  <img src="https://img.shields.io/badge/Email-sharma31stmay@gmail.com-0d0d0d?style=for-the-badge&logo=gmail&logoColor=00e676&labelColor=111111&color=111111"/>
</a>
<a href="https://linkedin.com/in/sharmavaibhav31">
  <img src="https://img.shields.io/badge/LinkedIn-sharmavaibhav31-0d0d0d?style=for-the-badge&logo=linkedin&logoColor=00e676&labelColor=111111&color=111111"/>
</a>
<a href="https://vaibhavsharmaa.me">
  <img src="https://img.shields.io/badge/Portfolio-vaibhavsharmaa.me-0d0d0d?style=for-the-badge&logo=firefox&logoColor=00e676&labelColor=111111&color=111111"/>
</a>

<br/><br/>

<img src="https://komarev.com/ghpvc/?username=sharmavaibhav31&label=Profile+Views&color=00e676&style=flat" />

</div>

---

## `> whoami`

Backend and systems engineering student specializing in **event-driven microservices**, **enterprise workflow backends**, and **secure Linux-level programming**.

I build things because I need them or because the problem is interesting; not to pad a portfolio.

**Currently:** Backend Engineering Intern at LazyStudents.in — building a new product from scratch as the primary backend engineer, and leading the interns team.

**Open source:** Project Admin for [Arachnode](https://github.com/sharmavaibhav31/arachnode) — a distributed job-discovery platform with **26 stars · 47 forks · 143 commits**, contributing community from GSSoC and ELUSOC.

**Targeting:** SDE-1 / Junior Backend Engineer or relevant roles at product companies and startups.

---

## `> ls systems/`

### [`arachnode`](https://github.com/sharmavaibhav31/arachnode) — Automated Job Discovery & Outreach Platform
> *Built because I genuinely needed it. Manual job tracking was unscalable.*

![Stars](https://img.shields.io/github/stars/sharmavaibhav31/arachnode?color=00e676&style=flat-square&labelColor=111111)
![Forks](https://img.shields.io/github/forks/sharmavaibhav31/arachnode?color=00e676&style=flat-square&labelColor=111111)

7 independent microservices · Redis Streams consumer groups · 4-tier test suite (unit / integration via testcontainers / contract / e2e) · OSINT recruiter enrichment · Ollama-powered cold-email drafting · APScheduler automation

`Python` `FastAPI` `Redis Streams` `PostgreSQL` `Docker` `Scrapy` `Playwright` `pytest` `testcontainers`

**Why Redis Streams over Kafka:** sufficient at-least-once delivery semantics with zero broker overhead for a self-hosted deployment.

---

### `hpms` — Hostel Permission Management System
> *Paper-based hostel permission slips. No audit trail. Wardens unavailable. I built the digital replacement.*

5-role permission workflow (Student / Warden / Chief Warden / Admin / Security) · JWT-signed QR certificates valid for exactly 2 scans · Modular monolith (Node.js + Prisma) across 7 modules · Nginx reverse proxy with SSL termination · node-cron overdue detection · SMTP parent notifications

Attempted Tatvik TMF20 biometric integration via a .NET 4.8 bridge — hit a firmware wall; pivoted to the QR-based flow. Full SRS with 40+ FRs, ERD, and 4 system process flow diagrams.

`Node.js` `Express` `PostgreSQL` `Prisma` `JWT` `Docker` `Nginx` `QR Codes` `node-cron`

---

### [`timetable_management`](https://github.com/sharmavaibhav31/timetable_management) — Academic Timetable Scheduling Engine
> *Departments spend days generating timetables manually. The constraint-satisfaction problem hooked me.*

Greedy constraint-propagation engine · **8 hard constraints** (no double-booking across faculty/room/section, 55-min gap, load caps, room-type matching, break isolation) · Section-first generation strategy · Fallback faculty assignment · Generates conflict-free schedules in **under 2 minutes** vs. days manually · H2 integration tests · Flyway V1–V10 · Excel/PDF export

`Java 17` `Spring Boot 3` `PostgreSQL` `Flyway` `H2` `Apache POI` `Docker`

---

### `appraisal-management` — Faculty Appraisal Workflow Backend
> *Paper-based faculty appraisal process. No consistency, no audit trail. Built the backend to replace it.*

State-machine workflow: `DRAFT → SUBMITTED → HOD_REVIEWED → FINALIZED → LOCKED` · Full audit trail (userId, timestamp, old/new value) · JWT auth + RBAC across 4 roles · Configurable scoring weights validated to sum to 100% · 13 Flyway migrations · `@Valid` on all endpoints

`Java 21` `Spring Boot 4` `Spring Security` `PostgreSQL` `Flyway` `JWT` `Docker` `OpenAPI`

---

### [`mini-shell-C-programming`](https://github.com/sharmavaibhav31/mini-shell-C-programming) — Offline AI Assistant Shell
> *I wanted AI in my terminal, locally, no internet. Making it safe on a live system turned it into a security problem.*

Sandboxed C shell integrating TinyLlama-1.1B via `llama.cpp` · Fully offline, air-gapped post-setup · Four-layer security: Seccomp syscall whitelist · PID/mount namespace isolation · Capability dropping · rlimit caps · First query ~2–3s (model load) · Subsequent ~1–2s · 10–20 tok/s on CPU

`C` `llama.cpp` `Seccomp` `Linux Namespaces` `rlimits` `CMake`

---

### `MoodHarmonics` — End-to-End AI Music Generation System
> *The goal wasn't another AI music app. The goal was: can multiple ML models with different runtimes be orchestrated reliably?*

3 heterogeneous ML models behind a single Flask orchestration layer: MusicGen (audio) · Fine-tuned GPT lyric model (verse/chorus structure enforcement) · YAMNet + GTZAN classifier (genre + confidence) · Model preloading + graceful Hugging Face fallback · **45% latency reduction** (2.2s → 1.2s avg init)

`Python` `Flask` `MusicGen` `YAMNet` `PyTorch` `TensorFlow` `MongoDB` `React`

---

### [`air-notepad`](https://github.com/sharmavaibhav31/air-notepad) — Gesture-Based Drawing System
> *Built for fun. Ended up at 176,000 LinkedIn impressions. Not everything needs to be enterprise-grade.*

21 hand landmarks tracked per hand via MediaPipe · Weighted moving-average smoothing (factor 0.3) · Dual-hand control: pinch gesture for tool selection, index-finger extension for drawing · HD canvas 1280×720

`Python` `OpenCV` `MediaPipe` `NumPy`

---

## `> cat tech_stack.json`

```json
{
  "languages":    ["Java", "Python", "SQL", "C", "JavaScript (Node.js)"],
  "backend":      ["Spring Boot", "Spring Security", "FastAPI", "Flask", "Express.js", "JWT", "RBAC"],
  "databases":    ["PostgreSQL", "Redis Streams", "MongoDB", "MySQL", "Firestore", "Flyway", "Prisma"],
  "devops":       ["Docker", "Docker Compose", "Nginx", "GitHub Actions", "Linux", "Bash", "Git"],
  "testing":      ["pytest", "testcontainers", "H2 integration", "Unit / Contract / e2e"],
  "architecture": ["Event-Driven Microservices", "Consumer Groups", "Modular Monolith",
                   "State Machines", "Audit Trails", "Constraint Scheduling"],
  "systems":      ["Linux Namespaces", "Seccomp", "rlimits", "llama.cpp", "Syscall Analysis"],
  "ml_cv":        ["PyTorch", "TensorFlow", "MusicGen", "YAMNet", "MediaPipe", "OpenCV", "Ollama"]
}
```

---

## `> cat certifications.txt`

```
Oracle (4)
  ├── OCI 2025 DevOps Professional          [Nov 2025]
  ├── OCI 2025 Data Science Professional    [Oct 2025]
  ├── OCI 2025 Generative AI Professional   [Oct 2025]
  └── OCI 2025 GenAI Foundations Associate  [Sep 2025]

Google Cloud / Coursera (3)
  ├── Cloud Security Engineer Specialization     [Jul 2024]
  ├── Security in Google Cloud Specialization    [Sep 2024]
  └── Google Cybersecurity Professional Cert.
```

---

## `> git log --oneline`

```
open source   Project Admin @ Arachnode · GSSoC / ELUSOC · 25+ PRs reviewed
leadership    President, Coders Club @ MITE · Hack n' Seek: 700+ online · 180 on-site
hackathon     FusionX Dizzy Mega Hackathon · built VulnGraph (attack path visualization)
community     TCS TechBytes Regional Round · DevFest 2025 GDG Cloud Mangalore
education     MITE · B.E. CSE · CGPA 9.43 · Sep 2023 – Jun 2027
```

---

## `> github_stats`

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=sharmavaibhav31&show_icons=true&count_private=true&include_all_commits=true&theme=github_dark&hide_border=true&title_color=00e676&icon_color=00e676&text_color=c8c8c8&bg_color=0d0d0d" height="160"/>
  &nbsp;
  <img src="https://streak-stats.demolab.com?user=sharmavaibhav31&theme=github-dark-blue&hide_border=true&stroke=00e676&ring=00e676&fire=ff4444&currStreakLabel=00e676&background=0D0D0D" height="160"/>
</p>

---

## `> cat directive.txt`

I want to build things that require real thinking — where the decision I make about a message queue or a transaction boundary actually matters.

Interested in security-aware systems engineering. Considering an MS in Security down the line.

**Right now:** looking for SDE-1 / Junior Backend Engineer roles at product companies and startups.

→ [vaibhavsharmaa.me](https://vaibhavsharmaa.me) &nbsp;·&nbsp; [linkedin.com/in/sharmavaibhav31](https://linkedin.com/in/sharmavaibhav31)

---

<div align="center">
<sub><code>// backend engineer · systems thinker · open source admin</code></sub>
</div>
