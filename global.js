console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// navLinks = $$("nav a")

// let currentLink = navLinks.find(
//   (a) => a.host === location.host && a.pathname === location.pathname,
// );

// currentLink?.classList.add('current');

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'resume/', title: 'Resume' },
  { url: 'contact/', title: 'Contact' },
];

let nav = document.createElement('nav');
document.body.prepend(nav);

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/website/";         // GitHub Pages repo name

for (let p of pages) {
  let url = p.url.startsWith('http') ? p.url : BASE_PATH + p.url;
  let title = p.title;
  let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
}
}

let links = $$('nav a');
links.forEach(link => {
    if (link.host !== location.host) {
        link.target="_blank";
        link.rel="noopener noreferrer";
    } else {
        link.target="_self"
    }
});

// Highlight the current page
const navLinks = $$("nav a");
const currentLink = navLinks.find(
  a => a.host === location.host && a.pathname === location.pathname
);
currentLink?.classList.add('current');

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			<option value="light">Light</option>
            <option value="dark">Dark</option>
		</select>
	</label>
    `
);

const select = document.querySelector('.color-scheme select');

const currentScheme = getComputedStyle(document.documentElement).getPropertyValue('color-scheme').trim();
if (currentScheme) {
    select.value = currentScheme;
}

if ("colorScheme" in localStorage) {
    const savedScheme = localStorage.colorScheme;
    document.documentElement.style.setProperty('color-scheme', savedScheme);
    select.value = savedScheme;
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultScheme = prefersDark ? 'dark' : 'light';
    document.documentElement.style.setProperty('color-scheme', defaultScheme);
    select.value = defaultScheme;
}

select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);
  document.documentElement.style.setProperty('color-scheme', event.target.value);
  localStorage.colorScheme = event.target.value;
});