// frontend/script.js
const API = 'http://localhost:4000';

// --- Authentication (Simple placeholder) ---
const authContainer = document.getElementById('auth-container');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authMessage = document.getElementById('auth-message');
const logoutBtn = document.getElementById('logout-btn');

let isLoggedIn = false;

// Show/hide UI
function showMainApp() {
  authContainer.style.display = 'none';
  mainApp.style.display = '';
  renderSubjects();
}
function showAuth() {
  authContainer.style.display = '';
  mainApp.style.display = 'none';
}

// Register (no-op for single-user)
registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  authMessage.textContent = 'Registration done. Please login.';
  authMessage.style.color = 'green';
  registerForm.reset();
});

// Login
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const u = document.getElementById('login-username').value;
  const p = document.getElementById('login-password').value;
  if (!u || !p) {
    authMessage.textContent = 'Enter credentials';
    authMessage.style.color = 'red';
    return;
  }
  isLoggedIn = true;
  showMainApp();
});

logoutBtn.addEventListener('click', () => {
  isLoggedIn = false;
  showAuth();
});

// --- Tracker Logic ---
async function renderSubjects() {
  const listEl = document.getElementById('subjects-list');
  listEl.innerHTML = '';
  const subjects = await fetch(`${API}/subjects`).then(r => r.json());

  subjects.forEach(sub => {
    const card = document.createElement('div');
    card.className = 'subject-card';

    const header = document.createElement('div');
    header.className = 'subject-header';
    header.textContent = sub.name;
    card.appendChild(header);

    const ul = document.createElement('ul');
    sub.topics.forEach(topic => {
      const li = document.createElement('li');
      li.textContent = topic.name;
      li.style.textDecoration = topic.completed ? 'line-through' : 'none';
      li.onclick = () => onToggleTopic(sub._id, topic._id);
      ul.appendChild(li);
    });
    card.appendChild(ul);

    const input = document.createElement('input');
    input.placeholder = 'New topic...';
    input.id = `new-topic-${sub._id}`;
    card.appendChild(input);

    const btn = document.createElement('button');
    btn.textContent = 'Add Topic';
    btn.onclick = () => onAddTopic(sub._id);
    card.appendChild(btn);

    listEl.appendChild(card);
  });
}

// Add subject
document.getElementById('subject-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('subject-input').value.trim();
  if (!name) return;
  await fetch(`${API}/subjects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  document.getElementById('subject-input').value = '';
  renderSubjects();
});

// Add topic
async function onAddTopic(subId) {
  const input = document.getElementById(`new-topic-${subId}`);
  const name = input.value.trim();
  if (!name) return;
  await fetch(`${API}/subjects/${subId}/topics`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  renderSubjects();
}

// Toggle topic
async function onToggleTopic(subId, topicId) {
  await fetch(`${API}/subjects/${subId}/topics/${topicId}`, { method: 'PATCH' });
  renderSubjects();
}

// Initial state
window.onload = showAuth;