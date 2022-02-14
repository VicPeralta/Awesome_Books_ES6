function navToSection(element, sectionName) {
  document.querySelectorAll('.navlinks li a').forEach((link) => link.classList.remove('selected'));
  element.classList.add('selected');
  document.querySelectorAll('section').forEach((section) => section.classList.remove('active'));
  document.querySelector(sectionName).classList.add('active');
}

export default navToSection;