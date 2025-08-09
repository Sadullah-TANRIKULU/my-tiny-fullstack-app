const API_URL = 'http://localhost:3000';

async function create() {
  const content = document.getElementById('input').value;
  await fetch(API_URL + '/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  alert('Created!');
}

async function remove() {
  await fetch(API_URL + '/delete', { method: 'DELETE' });
  alert('Deleted last record!');
}
