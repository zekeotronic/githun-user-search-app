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

function formatLink(link) {
  if (link.includes('https://') || link.includes('http://') ){
    return link;
  } else {
    return `https://${link}`;
  }
}

function toggleTheme() {
  const theme = document.getElementById('theme');
  const name = document.getElementById('theme-name')
  const path = document.getElementById('theme-path');
  const currentTheme = theme.getAttribute('href');
  if (currentTheme === './light.css') {
    theme.href = './dark.css';
    name.textContent = 'LIGHT';
    path.setAttribute('d', 'M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z');
  } else {
    theme.href = './light.css';
    name.textContent = 'DARK';
    path.setAttribute('d', 'M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z');
  }
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
  company: document.getElementById('company'),
  notFound: document.getElementById('not-found')

}

function updatePage(data) {
  if (data.message === 'Not Found') {
    user.notFound.style.display = 'inline'
  } else {
    user.notFound.style.display = 'none'
    user.notFound.classList.remove('hidden')
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
      document.getElementById('website-p').innerHTML = `<a href="${formatLink(data.blog)}">${data.blog}</a>`
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

document.getElementById('theme-chooser').addEventListener('click', toggleTheme);