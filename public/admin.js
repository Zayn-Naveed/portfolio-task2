// Store all members globally
let allMembers = [];
let editingId = null;

// Fetch and display members in admin panel
async function fetchMembers() {
  try {
    const response = await fetch('http://localhost:3000/api/team');
    const members = await response.json();
    allMembers = members;
    displayAdminMembers(members);
  } catch (err) {
    console.error('Error fetching members:', err);
  }
}

// Display members in admin list
function displayAdminMembers(members) {
  const list = document.getElementById('adminTeamList');

  if (members.length === 0) {
    list.innerHTML = '<p style="color:#aaa">No team members found.</p>';
    return;
  }

  list.innerHTML = members.map(member => `
    <div class="admin-member-card">
      <img src="${member.image}" alt="${member.name}"/>
      <div class="admin-member-info">
        <h3>${member.name}</h3>
        <p class="role">${member.role}</p>
        <p class="bio">${member.bio}</p>
      </div>
      <div class="admin-member-actions">
        <button class="edit-btn" onclick="editMember('${member._id}')">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="delete-btn" onclick="deleteMember('${member._id}')">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  `).join('');
}

// Submit — Add or Edit member
async function submitMember() {
  const name = document.getElementById('memberName').value.trim();
  const role = document.getElementById('memberRole').value.trim();
  const image = document.getElementById('memberImage').value.trim();
  const bio = document.getElementById('memberBio').value.trim();
  const linkedin = document.getElementById('memberLinkedin').value.trim();
  const github = document.getElementById('memberGithub').value.trim();

  // Basic validation
  if (!name || !role || !bio) {
    alert('Please fill in Name, Role and Bio at minimum!');
    return;
  }

  const memberData = {
    name,
    role,
    image: image || 'https://picsum.photos/200/200?random=99',
    bio,
    linkedin: linkedin || '#',
    github: github || '#'
  };

  try {
    if (editingId) {
      // UPDATE existing member
      await fetch(`http://localhost:3000/api/team/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
      alert('Member updated successfully!');
    } else {
      // ADD new member
      await fetch('http://localhost:3000/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
      alert('Member added successfully!');
    }

    // Reset form and refresh list
    cancelEdit();
    fetchMembers();

  } catch (err) {
    console.error('Error saving member:', err);
  }
}

// Edit member — fill form with existing data
function editMember(id) {
  const member = allMembers.find(m => m._id === id);
  if (!member) return;

  editingId = id;

  // Fill form with member data
  document.getElementById('memberName').value = member.name;
  document.getElementById('memberRole').value = member.role;
  document.getElementById('memberImage').value = member.image;
  document.getElementById('memberBio').value = member.bio;
  document.getElementById('memberLinkedin').value = member.linkedin;
  document.getElementById('memberGithub').value = member.github;

  // Update form UI
  document.getElementById('formTitle').textContent = 'Edit Member';
  document.getElementById('submitBtn').textContent = 'Update Member';
  document.getElementById('cancelBtn').style.display = 'inline-block';

  // Scroll to form
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete member
async function deleteMember(id) {
  if (!confirm('Are you sure you want to delete this member?')) return;

  try {
    await fetch(`http://localhost:3000/api/team/${id}`, {
      method: 'DELETE'
    });
    alert('Member deleted successfully!');
    fetchMembers();
  } catch (err) {
    console.error('Error deleting member:', err);
  }
}

// Cancel edit — reset form
function cancelEdit() {
  editingId = null;
  document.getElementById('memberName').value = '';
  document.getElementById('memberRole').value = '';
  document.getElementById('memberImage').value = '';
  document.getElementById('memberBio').value = '';
  document.getElementById('memberLinkedin').value = '';
  document.getElementById('memberGithub').value = '';
  document.getElementById('formTitle').textContent = 'Add New Member';
  document.getElementById('submitBtn').textContent = 'Add Member';
  document.getElementById('cancelBtn').style.display = 'none';
}

// Load members on page open
fetchMembers();