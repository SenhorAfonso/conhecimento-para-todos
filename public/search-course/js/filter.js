/* eslint-disable */
async function navigate(topic, rating) {
  let url;

  if (topic) {
    url = `/courses/search?${topic}&rating=${rating}`
  } else {
    url += `&rating=${rating}`
  }
  window.location.href = url
}

function maintainCheck() {
  const id = localStorage.getItem('checked')
  
  if (id) {
    const option = document.getElementById(id);
    localStorage.setItem('checked', '')
    option.checked = true;
  }

  return;
}

async function checkClassification(event) {
  if (!event) {
    return
  }

  const id = event.target.id;
  const option1 = document.getElementById('search-gte4.5stars');
  const option2 = document.getElementById('search-gte4stars');
  const option3 = document.getElementById('search-gte3.5stars');
  const option4 = document.getElementById('search-gte3stars');

  let rating;

  if (id === 'search-gte4.5stars') {
    rating = 4.5;
    option2.checked = false;
    option3.checked = false;
    option4.checked = false;
  } else if (id === 'search-gte4stars') {
    rating = 4.0;
    option1.checked = false;
    option3.checked = false;
    option4.checked = false;
  } else if (id === 'search-gte3.5stars') {
    rating = 3.5;
    option2.checked = false;
    option1.checked = false;
    option4.checked = false;
  } else if (id === 'search-gte3stars') {
    rating = 3.0;
    option2.checked = false;
    option3.checked = false;
    option1.checked = false;
  }

  localStorage.setItem('checked', id)

  const topic = (window.location.href).split('&')[0].split('?')[1];

  return navigate(topic, rating)
  

}

function checkInstructor(instructor) {
  window.Location.href = `/courses/instructor/${instructor}`
}

function main() {
  maintainCheck()
  const options = document.querySelectorAll('input[type=radio]');

  options.forEach((input) => {
    input.addEventListener('click', checkClassification);
  });
}

main();