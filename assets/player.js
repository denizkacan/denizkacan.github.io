(() => {
  // ---- Repo config (yours) ----
  const OWNER = "dkacan98";
  const REPO = "dkacan98.github.io";
  const BRANCH = "main";
  const AUDIO_PATH = "audio";
  const ALLOWED = [".mp3", ".m4a", ".ogg", ".wav"];

  // ---- Build player HTML on every page ----
  const dock = document.createElement("div");
  dock.className = "playerDock";
  dock.innerHTML = `
    <div class="playerPanel" id="playerPanel">
      <div class="playerTop">
        <div class="title">music player</div>
        <button class="close" id="playerClose" title="Close">×</button>
      </div>

      <div class="playerBody">
        <div class="lcd">
          <div class="lcdRow">
            <div class="lcdTitle" id="pTitle">Loading…</div>
            <div class="lcdTime" id="pTime">00:00</div>
          </div>
          <div class="progress" id="pProgress" title="Seek">
            <div class="fill" id="pFill"></div>
          </div>
        </div>

        <div class="controls">
          <div class="btn" id="pPrev">⏮</div>
          <div class="btn primary" id="pPlay">▶</div>
          <div class="btn" id="pPause">⏸</div>
          <div class="btn" id="pStop">■</div>
          <div class="btn" id="pNext">⏭</div>
        </div>

        <ul class="playlist" id="pList"></ul>

        <audio id="pAudio" preload="metadata"></audio>
      </div>
    </div>

    <div class="playerFab" id="playerFab" title="Open player">♪</div>
  `;
  document.body.appendChild(dock);

  // ---- Elements ----
  const panel = document.getElementById("playerPanel");
  const fab = document.getElementById("playerFab");
  const closeBtn = document.getElementById("playerClose");

  const audio = document.getElementById("pAudio");
  const titleEl = document.getElementById("pTitle");
  const timeEl = document.getElementById("pTime");
  const listEl = document.getElementById("pList");
  const progress = document.getElementById("pProgress");
  const fill = document.getElementById("pFill");

  const btnPrev = document.getElementById("pPrev");
  const btnPlay = document.getElementById("pPlay");
  const btnPause = document.getElementById("pPause");
  const btnStop = document.getElementById("pStop");
  const btnNext = document.getElementById("pNext");

  // ---- Persist open/close state across pages ----
  const OPEN_KEY = "dk_player_open";
  function setOpen(open){
    panel.style.display = open ? "block" : "none";
    fab.style.display = open ? "none" : "flex";
    localStorage.setItem(OPEN_KEY, open ? "1" : "0");
  }
  setOpen(localStorage.getItem(OPEN_KEY) === "1");



  fab.addEventListener("click", () => setOpen(true));
  closeBtn.addEventListener("click", () => setOpen(false));

  // ---- State ----
  let tracks = [];
  let current = 0;

  function niceTitle(filename){
    return filename
      .replace(/\.[^/.]+$/, "")
      .replace(/[_-]+/g, " ")
      .trim();
  }

  function formatTime(sec){
    if (!isFinite(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
  }

  function setActive(i){
    [...listEl.children].forEach((li, idx) => li.classList.toggle("active", idx === i));
  }

  function loadTrack(i, autoplay=false){
    if (!tracks.length) return;
    current = (i + tracks.length) % tracks.length;
    audio.src = tracks[current].src;
    titleEl.textContent = tracks[current].title;
    setActive(current);
    if (autoplay) audio.play().catch(()=>{});
  }

  function next(){ loadTrack(current + 1, true); }
  function prev(){ loadTrack(current - 1, true); }

  function play(){
    if (!audio.src && tracks.length) loadTrack(0, false);
    audio.play().catch(()=>{});
  }

  function pause(){ audio.pause(); }

  function stop(){
    audio.pause();
    audio.currentTime = 0;
    fill.style.width = "0%";
    timeEl.textContent = "00:00";
  }

  // ---- Controls ----
  btnPlay.addEventListener("click", play);
  btnPause.addEventListener("click", pause);
  btnStop.addEventListener("click", stop);
  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);

  audio.addEventListener("ended", next);

  audio.addEventListener("timeupdate", () => {
    timeEl.textContent = formatTime(audio.currentTime);
    if (audio.duration) fill.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  });

  progress.addEventListener("click", (e) => {
    if (!audio.duration) return;
    const rect = progress.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(audio.duration, pct * audio.duration));
  });

  // ---- Load tracks by listing /audio via GitHub API ----
  async function fetchTracks(){
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${AUDIO_PATH}?ref=${BRANCH}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const items = await res.json();

    const files = items
      .filter(x => x.type === "file")
      .map(x => x.name)
      .filter(name => ALLOWED.some(ext => name.toLowerCase().endsWith(ext)))
      .sort((a,b) => a.localeCompare(b));

    tracks = files.map(name => ({
      title: niceTitle(name),
      src: `/${AUDIO_PATH}/${encodeURIComponent(name)}` // root-relative so it works from subpages
    }));

    listEl.innerHTML = "";
    if (!tracks.length){
      titleEl.textContent = "No audio files in /audio";
      return;
    }

    tracks.forEach((t, i) => {
      const li = document.createElement("li");
      const left = document.createElement("span");
      left.textContent = t.title;

      const right = document.createElement("span");
      right.className = "meta";
      right.textContent = String(i+1).padStart(2,"0");

      li.appendChild(left);
      li.appendChild(right);
      li.addEventListener("click", () => loadTrack(i, true));
      listEl.appendChild(li);
    });

    loadTrack(0, false); // load first track, no autoplay
  }

  fetchTracks().catch(err => {
    console.error(err);
    titleEl.textContent = "Failed to load /audio";
  });
})();
