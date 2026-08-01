function setActiveProject(btn) {
  document.querySelectorAll('.project-btn').forEach(b => b.classList.remove('active-project'));
  btn.classList.add('active-project');
}