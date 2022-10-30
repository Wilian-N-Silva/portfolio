const header = document.querySelector('header');

function toggleNavTransparency() {
  const headerTopOff = header.offsetTop;
  const headerHeight = header.clientHeight;

  if (headerTopOff >= headerHeight) {
    header.classList.add('bg-active');
  } else {
    header.classList.remove('bg-active');
  };
}

document.addEventListener('scroll', toggleNavTransparency)

const navbar = header.querySelector('nav')
const btn_navigation = document.getElementById('btn-navigation-toggle')

function handleNavbar(event) {
  navbar.classList.toggle('active')
}

btn_navigation.addEventListener('click', handleNavbar)


