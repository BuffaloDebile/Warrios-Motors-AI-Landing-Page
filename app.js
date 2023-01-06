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

// SWITCH BETWEEN WARRIORS

function switchWarrior() {
  const radioRed = document.querySelector('.form-check-input--red');
  const radioDark = document.querySelector('.form-check-input--dark');
  const inputs = document.querySelectorAll('input');

  const textName = document.querySelector('.text__name');
  const textDescription = document.querySelector('.text__description');
  const header = document.querySelector('.header');

  if (radioRed.checked) {
    displaySailjaani();
  } else if (radioDark.checked) {
    displayYori();
  }

  inputs.forEach((input) => {
    input.addEventListener('click', switchWarrior);
  });

  function displaySailjaani() {
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
  }

  function displayYori() {
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
  }
}

switchWarrior();
