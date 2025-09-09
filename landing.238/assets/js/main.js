window.addEventListener('load', () => {
  try {
    const lang = navigator.language.replace(/-\w+$/, '');
    const preloader = document.querySelector('#preloader');

    getTranslates(lang).then(data => {
      document.documentElement.lang = lang;
      translate(data);
      preloader.classList.remove('active');
      setTimeout(() => { preloader.remove() }, 2000);
    });    
  } catch(err) {
    console.log(err);
  }
  


});

function translate(data) {
  if (!data) return

  const topLinks = document.querySelectorAll('.menu li');
  const primaryBtn = document.querySelector('#primaryBtn');
  const secondaryBtn = document.querySelector('#secondaryBtn');
  const description = document.querySelector('.description');

  document.title = data.title;
  topLinks[0].innerText = data.topLinks[0];
  topLinks[1].innerText = data.topLinks[1];
  primaryBtn.innerHTML = data.primaryBtn;
  secondaryBtn.innerHTML = data.secondaryBtn;
  description.innerText = data.description;
}

async function getTranslates(lang) {
  try {
    if (!lang) return false

    const req = await fetch('translates.json');
    const data = await req.json();

    if (!data[lang]) {
      return data['en']
    }

    return data[lang];

  } catch(err) {
    console.log(err);
  }
}
