async function loadProject(file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById('project-detail').innerHTML = html;
}