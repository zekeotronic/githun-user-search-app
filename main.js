async function fetchUserData(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data;
}

function formatDate(date) {
  const [m, d, y] = new Date(date).toLocaleDateString('en-US').split('/');
  const months = {
    '1': 'Jan',
    '2': 'Feb',
    '3': 'Mar',
    '4': 'Apr',
    '5': 'May',
    '6': 'Jun',
    '7': 'Jul',
    '8': 'Aug',
    '9': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  }
  return `Joined ${d} ${months[m]} ${y}`
}

const user = {
  name: document.getElementById('user-name'),
  link: document.getElementById('user-link'),
  bio: document.getElementById('user-bio'),
  join: document.getElementById('user-join'),
  bio: document.getElementById('user-bio'),
  pic: document.getElementById('user-pic'),
  repos: document.getElementById('repo-num'),
  followers: document.getElementById('follower-num'),
  following: document.getElementById('following-num'),
  location: document.getElementById('location'),
  twitter: document.getElementById('twitter'),
  website: document.getElementById('website'),
  company: document.getElementById('company')

}

function updatePage(data) {
  user.name.textContent = data.login;
  user.link.href = data.html_url;
  user.link.textContent = `@${data.login}`;
  user.bio.textContent = data.bio || 'This profile has no bio';
  user.pic.src = data.avatar_url;
  user.join.textContent = formatDate(data.created_at)
  user.repos.textContent = data.public_repos;
  user.followers.textContent = data.followers;
  user.following.textContent = data.following;
  user.location.textContent = data.location || 'Not Available';
  if (data.location) {
    user.location.textContent = data.location
    document.getElementById('location-box').style.opacity = '100%';
  }
  else {
    user.location.textContent = 'Not Available';
    document.getElementById('location-box').style.opacity = '50%';
  }
  if (data.twitter_username) {
    user.twitter.innerHTML = `<a href="https://twitter.com/${data.twitter_username}">${data.twitter_username}</a>`;
    document.getElementById('twitter-box').style.opacity = '100%';
  } else {
    user.twitter.textContent = 'Not Available';
    document.getElementById('twitter-box').style.opacity = '50%';
  }
  user.twitter.textContent = data.twitter_username || 'Not Available';
  if (data.blog !== '') {
    document.getElementById('website-p').innerHTML = `<a href="${data.blog}">${data.blog}</a>`
    document.getElementById('link-box').style.opacity = '100%';
  } else {
    document.getElementById('website-p').innerHTML = `<p>Not Available</p>`;
    document.getElementById('link-box').style.opacity = '50%';
  }
  if (data.company) {
    user.company.textContent = data.company;
    document.getElementById('company-box').style.opacity = '100%';
  } else {
    user.company.textContent = 'Not Available';
    document.getElementById('company-box').style.opacity = '50%';
  }

}

fetchUserData('zekeotronic').then(data => {
  console.log(data);
  updatePage(data);
})

document.getElementById('search-button').addEventListener('click', () => {
  const username = document.getElementById('search-input').value;
  fetchUserData(username).then(data => {
    updatePage(data);
    console.log(data);
  })
});

document.querySelector('input').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const username = document.getElementById('search-input').value;
    fetchUserData(username).then(data => {
      updatePage(data);
    })
  }
})