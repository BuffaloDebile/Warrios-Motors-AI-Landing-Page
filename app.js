// CUSTOM CURSOR

const cursor = document.querySelector('#cursor');
const link = document.querySelectorAll('.cursor-none');
const shuriken = document.querySelector('.cursor--inner');
let mouse = { x: 300, y: 300 };
let pos = { x: 0, y: 0 };
const speed = 0.27; // between 0 and 1

const updatePosition = () => {
  pos.x += (mouse.x - pos.x) * speed;
  pos.y += (mouse.y - pos.y) * speed;
  cursor.style.transform = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';
};

const updateCoordinates = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

window.addEventListener('mousemove', updateCoordinates);

function loop() {
  updatePosition();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

link.forEach((el) => {
  el.addEventListener('mouseleave', () => {
    shuriken.classList.remove('hovered');
  });

  el.addEventListener('mouseenter', () => {
    shuriken.classList.add('hovered');
  });
});

// grow cursor on click

document.addEventListener('mousedown', () => {
  if (shuriken.classList.contains('cursorExpand')) {
    return;
  } else {
    shuriken.classList.add('cursorExpand');

    setTimeout(() => {
      shuriken.classList.remove('cursorExpand');
    }, 200);
  }
});

// SWITCH BETWEEN WARRIORS

function switchWarrior() {
  const radioRed = document.querySelector('.form-check-input--red');
  const radioDark = document.querySelector('.form-check-input--dark');

  const textName = document.querySelector('.text__name');
  const textDescription = document.querySelector('.text__description');
  const header = document.querySelector('.header');

  if (radioRed.checked) {
    displaySailjaani();
  } else if (radioDark.checked) {
    displayYori();
  }

  function displaySailjaani() {
    var audio = new Audio('ressources/template/edit/kawasaki-zx-10r.mp3');
    audio.volume = 0.1;
    audio.play();

    textName.textContent = 'SAILJAANI';
    textDescription.textContent =
      'Sailjaani zoomed through the streets on her cherry red motorbike, a fierce Japanese warrior at the helm. She was known throughout the land for her speed and skill on the road. With her sword by her side and the wind in her hair, Sailjaani was unstoppable.';

    header.classList.remove(
      "bg-[url('ressources/template/edit/sm-YORITANAKA-BG.webp')]",
      "sm:bg-[url('ressources/template/edit/xl-YORITANAKA-BG.webp')]",
    );

    header.classList.add(
      "bg-[url('ressources/template/edit/sm-SAILJANI-BG.webp')]",
      "sm:bg-[url('ressources/template/edit/xl-SAILJANI-BG.webp')]",
    );

    tl.restart();
  }

  function displayYori() {
    var audio = new Audio('ressources/template/edit/yamaha-xr-100.mp3');
    audio.volume = 0.1;
    audio.play();

    textName.textContent = 'YORI TANAKA';
    textDescription.textContent =
      "Yori Tanaka roared through the streets on his sleek black motorbike. As a skilled Japanese warrior, he was always ready for battle. But with the wind in his hair and the thrill of the ride, Yori couldn't help but feel alive. He was unstoppable, a force to be reckoned with, and nothing could stand in his way.";

    header.classList.remove(
      "bg-[url('ressources/template/edit/sm-SAILJANI-BG.webp')]",
      "sm:bg-[url('ressources/template/edit/xl-SAILJANI-BG.webp')]",
    );

    header.classList.add(
      "bg-[url('ressources/template/edit/sm-YORITANAKA-BG.webp')]",
      "sm:bg-[url('ressources/template/edit/xl-YORITANAKA-BG.webp')]",
    );

    tl.restart();
  }
}

document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('click', switchWarrior);
});

// MODAL WINDOW

var openmodal = document.querySelectorAll('.modal-open');
for (var i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener('click', function (event) {
    event.preventDefault();
    toggleModal();
  });
}

const overlay = document.querySelector('.modal-overlay');
overlay.addEventListener('click', toggleModal);

var closemodal = document.querySelectorAll('.modal-close');
for (var i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener('click', toggleModal);
}

document.onkeydown = function (evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ('key' in evt) {
    isEscape = evt.key === 'Escape' || evt.key === 'Esc';
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape && document.body.classList.contains('modal-active')) {
    toggleModal();
  }
};

function toggleModal() {
  const body = document.querySelector('body');
  const modal = document.querySelector('.modal');
  modal.classList.toggle('opacity-0');
  modal.classList.toggle('pointer-events-none');
  body.classList.toggle('modal-active');
}

// GSAP ANIMATION

const logo = document.querySelector('.logo');
const hero = document.querySelector('.header');
const textName = document.querySelector('.text__name');
const textDescription = document.querySelector('.text__description');
const textJapanese = document.querySelector('.text__japanese');
const textSignature = document.querySelector('.text__signature');
const colorPicker = document.querySelector('.color-picker');
const cta = document.querySelector('.btn');

const tl = new TimelineMax();

tl.fromTo(
  textName,
  0.6,
  { yPercent: -100, opacity: 0 },
  { yPercent: 0, opacity: 1 },
);

tl.from(textSignature, 1.2, {
  y: 40,
  opacity: 0,
  ease: 'power4.out',
  skewY: 10,
});

tl.fromTo(
  textJapanese,
  0.7,
  { y: 20, opacity: 0 },
  { y: 0, opacity: 1 },
  '-=1',
);
tl.fromTo(
  textDescription,
  0.7,
  { y: 10, opacity: 0 },
  { y: 0, opacity: 1 },
  '-=0.8',
);

tl.fromTo(logo, 0.8, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '-=0.8');
tl.fromTo(colorPicker, 0.3, { scaleY: 0 }, { scaleY: 1 }, '-=1.5');
tl.fromTo(cta, 0.5, { opacity: 0, x: 60 }, { opacity: 1, x: 0 }, '-=1.6');

tl.play();
