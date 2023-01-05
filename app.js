const cursor = document.querySelector('#cursor');
const link = document.querySelectorAll('.cursor-none');
const shuriken = document.querySelector('.cursor--inner');
let mouse = { x: 300, y: 300 };
let pos = { x: 0, y: 0 };
const speed = 0.1; // between 0 and 1

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

console.log(link);

link.forEach((el) => {
  el.addEventListener('mouseleave', () => {
    shuriken.classList.remove('hovered');
  });

  el.addEventListener('mouseenter', () => {
    shuriken.classList.add('hovered');
  });
});
