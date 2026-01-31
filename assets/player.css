/* Fixed bottom-right player */
.playerDock{
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 999;
  width: 320px;
  max-width: calc(100vw - 36px);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
}

/* Collapsed launcher */
.playerFab{
  margin-left: auto;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  border: 1px solid #000;
  background: linear-gradient(#2a2a2a, #0d0d0d);
  box-shadow: 0 0 0 2px #2a2a2a inset, 10px 10px 0 rgba(0,0,0,0.18);
  color: #ffd000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}
.playerFab:active{ transform: translateY(1px); }

.playerPanel{
  display: none; /* toggled by JS */
  background: linear-gradient(#1a1a1a, #0c0c0c);
  border: 2px solid #000;
  box-shadow:
    0 0 0 2px #2a2a2a inset,
    0 0 0 3px #050505 inset,
    10px 10px 0 rgba(0,0,0,0.18);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 10px;
}

.playerTop{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 8px 10px;
  background: linear-gradient(90deg, #2b2b2b, #141414);
  border-bottom: 1px solid #000;
  font-size: 12px;
  color: #ddd;
}
.playerTop .title{
  letter-spacing: 0.3px;
}
.playerTop .close{
  width: 28px;
  height: 28px;
  border-radius: 10px;
  border: 1px solid #000;
  background: #111;
  box-shadow: 0 0 0 1px #2a2a2a inset;
  color: #ddd;
  cursor: pointer;
}
.playerTop .close:active{ transform: translateY(1px); }

.playerBody{ padding: 10px; display:grid; gap:10px; }

.lcd{
  background: linear-gradient(#0f3a18, #0b2a10);
  border: 2px solid #000;
  box-shadow: 0 0 0 1px #2d6f3f inset, 0 0 14px rgba(39,255,106,0.12);
  border-radius: 10px;
  padding: 8px;
}
.lcdRow{ display:flex; justify-content:space-between; gap:10px; align-items:baseline; }
.lcdTitle{
  color: #27ff6a;
  text-shadow: 0 0 6px rgba(39,255,106,0.25);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 210px;
}
.lcdTime{ color:#27ff6a; font-weight:700; font-size:12px; min-width: 60px; text-align:right; }

.progress{
  margin-top: 8px;
  height: 10px;
  background: #071a0c;
  border: 1px solid #000;
  box-shadow: 0 0 0 1px #2d6f3f inset;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}
.progress .fill{
  position:absolute; inset:0 auto 0 0;
  width:0%;
  background: linear-gradient(90deg, #10b647, #27ff6a);
}

.controls{
  display:grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}
.btn{
  user-select:none;
  background: linear-gradient(#2a2a2a, #161616);
  border: 1px solid #000;
  box-shadow: 0 0 0 1px #2c2c2c inset, 0 2px 0 rgba(0,0,0,0.3);
  border-radius: 10px;
  padding: 10px 0;
  text-align:center;
  cursor:pointer;
  font-size: 12px;
  color:#ddd;
}
.btn:active{ transform: translateY(1px); }
.btn.primary{
  color:#000;
  background: linear-gradient(#ffe66a, #ffd000);
  box-shadow: 0 0 0 1px #5b4b00 inset, 0 2px 0 rgba(0,0,0,0.3);
  font-weight: 800;
}

.playlist{
  list-style:none;
  margin: 0;
  padding: 0;
  max-height: 190px;
  overflow:auto;
  border: 1px solid #000;
  border-radius: 12px;
  background: #0a0a0a;
}
.playlist li{
  display:flex;
  justify-content:space-between;
  gap:10px;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  cursor:pointer;
  color:#ddd;
  font-size: 12px;
}
.playlist li:hover{ background: rgba(39,255,106,0.10); }
.playlist li.active{
  background: rgba(39,255,106,0.18);
  color: #b9ffd1;
  font-weight: 800;
}
.playlist .meta{
  color:#9a9a9a;
  min-width: 36px;
  text-align:right;
  font-variant-numeric: tabular-nums;
}

audio{ display:none; } /* we use it for playback */

