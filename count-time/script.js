const CURRENT_THEME = 'currentTheme';
const BLACK_THEME = 'blackTheme';
const WHITE_THEME = 'whiteTheme';
const themeClasses = {
  [BLACK_THEME]: 'black-theme',
  [WHITE_THEME]: 'white-theme',
}
let countTime;

function init() {
  let idTime = $('#time p');
  let btnReset = $('#btnReset');

  let getTime = +localStorage.getItem('countTime') || 0;
  idTime.html(formatTime(getTime));

  if (getTime > 0) {
    btnReset.removeClass('d-none');
  }

  initTheme();
}

function handleClick(type) {
  let btnStart = $('#btnStart');
  let btnReset = $('#btnReset');
  let btnPause = $('#btnPause');
  let btnContinue = $('#btnContinue');

  if (!btnStart.find('.d-none').length) btnStart.addClass('d-none');
  if (!btnReset.find('.d-none').length) btnReset.addClass('d-none');
  if (!btnPause.find('.d-none').length) btnPause.addClass('d-none');
  if (!btnContinue.find('.d-none').length) btnContinue.addClass('d-none');

  switch (type) {
    case 'Start':
      startTime();

      btnReset.removeClass('d-none');
      btnPause.removeClass('d-none');
      break;
    case 'Pause':
      pauseTime();

      btnReset.removeClass('d-none');
      btnContinue.removeClass('d-none');
      break;
    case 'Reset':
      resetTime();

      btnStart.removeClass('d-none');
      break;
    case 'Continue':
      startTime();

      btnPause.removeClass('d-none');
      btnReset.removeClass('d-none');
      break;
  }
}

function startTime() {
  let idTime = $('#time p');
  let getTime = +localStorage.getItem('countTime') || 0;
  this.countTime = setInterval(() => {
    getTime++;
    idTime.html(formatTime(getTime));
    localStorage.setItem('countTime', getTime);
  }, 1000);
}

function pauseTime() {
  clearInterval(this.countTime);
}

function resetTime() {
  let idTime = $('#time p');
  idTime.html(formatTime(0));
  localStorage.removeItem('countTime');
  pauseTime();
}

function formatTime(a) {
  let h = parseInt(a / 3600);
  let m = parseInt(a % 3600 / 60);
  let s = (a % 3600 % 60);
  return ((h < 10 ? `0${h}` : h) + ':' + (m < 10 ? `0${m}` : m) + ':' + (s < 10 ? `0${s}` : s));
}

const initTheme = () => {
  const getCurTheme = localStorage.getItem(CURRENT_THEME);

  if (!getCurTheme?.length) {
    removeTheme();
    applyTheme(themeClasses[BLACK_THEME]);
    storeTheme(BLACK_THEME);
  } else {
    removeTheme();
    applyTheme(themeClasses[getCurTheme]);
    storeTheme(getCurTheme === BLACK_THEME ? BLACK_THEME : WHITE_THEME);
  }
}

const changeTheme = () => {
  const getCurTheme = localStorage.getItem(CURRENT_THEME);

  if (!getCurTheme?.length) {
    removeTheme();
    applyTheme(themeClasses[BLACK_THEME]);
    storeTheme(BLACK_THEME);
  } else {
    removeTheme();
    let setTheme = getCurTheme === BLACK_THEME ? WHITE_THEME : BLACK_THEME;
    applyTheme(themeClasses[setTheme]);
    storeTheme(setTheme);
  }
}

const storeTheme = (theme) => {
  localStorage.setItem(CURRENT_THEME, theme);
}

const applyTheme = (theme) => {
  $('body').addClass(theme);
}

const removeTheme = (theme) => {
  $('body').removeClass('black-theme white-theme');
}

init();