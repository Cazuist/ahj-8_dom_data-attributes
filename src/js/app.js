import films from './data';

const wrapper = document.querySelector('.wrapper');
const spans = document.getElementsByTagName('span');

const fragment = new DocumentFragment();
const table = document.createElement('TABLE');
const caption = document.createElement('CAPTION');
const thead = document.createElement('THEAD');
const tbody = document.createElement('TBODY');

caption.innerText = 'Таблица 1. Фильмы и не только...';
thead.innerHTML = `
    <tr>
    <th>id<span></span></th>
    <th>title<span></span></th>
    <th>year<span></span></th>
    <th>imdb<span></span></th>
    </tr>
  `;

let html = '';

films.forEach((film) => {
  html += `
    <tr data-id=${film.id} data-title=${film.title.split(' ').join('-')} data-year=${film.year} data-imdb=${film.imdb}>
    <td>${film.id}</td>
    <td>${film.title}</td>
    <td>${film.year}</td>
    <td>imdb: ${film.imdb.toFixed(2)}</td>
    </tr>
    `;
});

tbody.insertAdjacentHTML('afterBegin', html);
table.append(caption);
table.append(thead);
table.append(tbody);
fragment.append(table);
wrapper.append(fragment);

const children = [...document.querySelector('tbody').children];
const sortOrderList = [[1, 'id'], [0, 'id'],
  [1, 'title'], [0, 'title'],
  [1, 'year'], [0, 'year'],
  [1, 'imdb'], [0, 'imdb']];

let increment = 0;

function sortRows(orderList) {
  let max; let min; let
    position;
  const order = orderList[increment % 8];

  const column = Array.from(thead.querySelectorAll('th'))
    .filter((elem) => elem.innerText === order[1])[0];

  if (+order[0] === 1) {
    position = '-2px center';
    max = 1;
    min = -1;
  } else {
    position = '-18px center';
    max = -1;
    min = 1;
  }

  if (order[1] === 'id' || order[1] === 'year') {
    children.sort((a, b) => (+a.dataset[order[1]] > +b.dataset[order[1]] ? max : min));
  } else {
    children.sort((a, b) => (a.dataset[order[1]] > b.dataset[order[1]] ? max : min));
  }

  Array.from(spans).forEach((span) => {
    const elem = span;
    elem.style.backgroundPosition = '-35px center';
  });

  increment += 1;
  column.querySelector('span').style.backgroundPosition = position;
  tbody.append(...children);
}

setInterval(() => {
  sortRows(sortOrderList);
}, 2000);
