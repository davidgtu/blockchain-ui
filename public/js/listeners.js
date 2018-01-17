const chartNavButtons = document.querySelectorAll('.chart-nav__button');

chartNavButtons.forEach(element => {
  element.addEventListener('click', e => {
    document.querySelector(".chart-nav__button.active").classList.remove('active');
    e.currentTarget.classList.add('active');
    setChart(e.currentTarget.id);
  });
});
