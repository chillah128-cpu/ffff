let _timer = null;
let _startTime = 0;

export function startTimer(onTick) {
  if (_timer) return;
  _startTime = Date.now();
  _timer = setInterval(() => {
    const elapsed = new Date(Date.now() - _startTime);
    const h = elapsed.getUTCHours();
    const m = elapsed.getUTCMinutes();
    const s = elapsed.getUTCSeconds();
    onTick(format(h, m, s));
  }, 1000);
}

export function resetTimer(onTick) {
  if (_timer) {
    clearInterval(_timer);
    _timer = null;
  }
  _startTime = 0;
  onTick("00:00:00");
}

function format(h, m, s) {
  const pad = n => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}