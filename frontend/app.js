const API_URL = 'https://my-tiny-fullstack-app.onrender.com';

async function create() {
  const content = document.getElementById('input').value;
  await fetch(API_URL + '/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  alert('Created!');
    document.getElementById('input').value = '';
}

async function remove() {
  await fetch(API_URL + '/delete', { method: 'DELETE' });
  alert('Deleted last record!');
    document.getElementById('input').value = '';
}

async function getEntries() {
  const res = await fetch(API_URL + '/entries');
  const data = await res.json();
  document.getElementById('output').textContent = JSON.stringify(data, null, 2);
}