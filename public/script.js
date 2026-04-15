// Store all members globally for search/filter
let allMembers = [];

// Fetch team members from database
async function fetchTeamMembers() {
  try {
    const response = await fetch('http://localhost:3000/api/team');
    const members = await response.json();
    allMembers = members;
    displayMembers(members);
  } catch (err) {
    console.error('Error fetching team members:', err);
  }
}

// Display members on page
function displayMembers(members) {
  const grid = document.getElementById('teamGrid');

  if (members.length === 0) {
    grid.innerHTML = '<p style="color:#aaa">No team members found.</p>';
    return;
  }

  grid.innerHTML = members.map(member => `
    <div class="team-card">
      <img src="${member.image}" alt="${member.name}"/>
      <h3>${member.name}</h3>
      <p class="role">${member.role}</p>
      <p class="bio">${member.bio}</p>
      <div class="social-links">
        <a href="${member.linkedin}" target="_blank">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="${member.github}" target="_blank">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// Search by name
document.getElementById('searchInput').addEventListener('input', function() {
  const searchValue = this.value.toLowerCase();
  const roleValue = document.getElementById('roleFilter').value;
  filterMembers(searchValue, roleValue);
});

// Filter by role
document.getElementById('roleFilter').addEventListener('change', function() {
  const roleValue = this.value;
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  filterMembers(searchValue, roleValue);
});

// Filter function
function filterMembers(search, role) {
  let filtered = allMembers;

  if (search) {
    filtered = filtered.filter(member =>
      member.name.toLowerCase().includes(search)
    );
  }

  if (role !== 'all') {
    filtered = filtered.filter(member => member.role === role);
  }

  displayMembers(filtered);
}

// Load members when page opens
fetchTeamMembers();