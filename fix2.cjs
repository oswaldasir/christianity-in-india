const fs = require('fs');

const content = fs.readFileSync('src/data.ts', 'utf8');

// manual extraction, but this time just JSON-ify the output
const newItems = [
  { name: 'Devasahayam Pillai', role: 'Early Indian Christian Martyr & Lay Witness', year: '1712–1752 AD', badgeType: 'native', badgeLabel: 'Martyr', icon: 'cross', description: 'Born Neelakanda Pillai, Devasahayam served in the Travancore royal administration before converting to Catholic Christianity in 1745 and taking the name Lazarus/Devasahayam. He faced persecution, imprisonment and execution for his faith, and was shot at Aralvaimozhy on 14 January 1752. He was canonized by Pope Francis in 2022 and is recognized as the first Indian layperson and martyr canonized by the Catholic Church.', image: 'images/devasahayam.jpg' },
  { name: 'Lal Behari Day', role: 'Bengali Christian Writer, Educator & Missionary', year: '1824–1894 AD', badgeType: 'native', badgeLabel: 'Writer & Educator', icon: 'book', description: 'Lal Behari Day was an Indian Bengali writer, journalist, educator and Christian missionary. Educated at Alexander Duff\'s institution in Calcutta, he became an important voice in Bengali literature and vernacular education. His writings helped preserve Bengali folk traditions, while his Christian ministry and educational work contributed to the development of indigenous Christian intellectual life in Bengal.', image: 'images/lal-behari-day.jpg' },
  { name: 'Nehemiah Goreh', role: 'Indian Theologian, Sanskrit Scholar & Christian Apologist', year: '1825–1895 AD', badgeType: 'native', badgeLabel: 'Theologian', icon: 'book', description: 'Born Nilakantha Sastri Goreh, Nehemiah Goreh was a Sanskrit scholar from a Brahmin family who converted to Christianity in 1848. He became an ordained Christian minister and wrote extensively on Hindu philosophical systems and Christian theology, seeking to engage Indian intellectual traditions directly. His works included A Rational Refutation of the Hindu Philosophical Systems.', image: 'images/nehemiah-goreh.jpg' },
  { name: 'Narayan Vaman Tilak', role: 'Marathi Christian Poet, Hymnist & Indigenous Christian Thinker', year: '1861–1919 AD', badgeType: 'poet', badgeLabel: 'Poet & Hymnist', icon: 'music', description: 'Narayan Vaman Tilak was a Marathi poet who converted to Christianity and was baptized in 1895. Influenced by the Marathi devotional tradition of Tukaram, he sought to express Christian faith through Indian cultural and poetic forms. He produced numerous Marathi Christian poems and hymns and became an important voice in the development of indigenous Indian Christian hymnody.', image: 'images/tilak.jpg' },
  { name: 'Brahmabandhav Upadhyay', role: 'Indian Christian Theologian, Vedantic Thinker & Nationalist', year: '1861–1907 AD', badgeType: 'native', badgeLabel: 'Theologian', icon: 'church', description: 'Born Bhavani Charan Bandyopadhyay, Brahmabandhav Upadhyay became an influential Bengali Christian thinker who attempted to express Christian theology through Indian philosophical categories. He developed the idea of an indigenous Indian Christian identity and engaged deeply with Vedanta, Catholic theology and Indian nationalism. He also worked as a journalist and public intellectual.', image: 'images/upadhyay.jpg' }
];

const itemsRegex = /\{ id: '(\d+)', name: '([^']+)', role: '([^']+)', eraId: '([^']+)', year: '([^']+)', badgeType: '([^']+)', badgeLabel: '([^']+)', icon: '([^']+)', description: '((?:\\'|[^'])+)'(?:, highlights: (\[[^\]]+\]))?(?:, image: '([^']+)')? \}/g;

let match;
let allItems = [];
while ((match = itemsRegex.exec(content)) !== null) {
  let item = {
    id: match[1],
    name: match[2],
    role: match[3],
    eraId: match[4],
    year: match[5],
    badgeType: match[6],
    badgeLabel: match[7],
    icon: match[8],
    description: match[9].replace(/\\'/g, "'")
  };
  if (match[10]) {
    // eval safely
    item.highlights = eval(match[10]);
  }
  item.image = match[11] || '';
  allItems.push(item);
}

const all60 = [...allItems, ...newItems];

function extractStartYear(yearStr) {
  const m = yearStr.match(/c?\.\s*(\d+)|(\d+)/);
  if (m) {
    return parseInt(m[1] || m[2], 10);
  }
  return 9999;
}

all60.sort((a, b) => {
  return extractStartYear(a.year) - extractStartYear(b.year);
});

for (let i = 0; i < all60.length; i++) {
  const num = i + 1;
  all60[i].id = num.toString().padStart(2, '0');
  let eraNum = Math.floor(i / 12) + 1;
  all60[i].eraId = 'era-' + eraNum;
}

function escapeStr(s) {
  if(!s) return '';
  return s.replace(/'/g, "\\'");
}

let outStr = `import { Era, Item } from './types';\n\n`;
outStr += `export const eras: Era[] = [\n`;
outStr += `  { id: 'era-1', number: 1, title: 'Apostolic Foundations & Early Classical Inculturation', subtitle: 'Entries #01 to #12 • Apostolic roots, Konkani epics, and classical Tamil inculturation.' },\n`;
outStr += `  { id: 'era-2', number: 2, title: 'Tranquebar, First Native Hymnologists & Serampore', subtitle: 'Entries #13 to #24 • Vernacular printing, Carnatic Christian lyrics, and Serampore linguistics.' },\n`;
outStr += `  { id: 'era-3', number: 3, title: 'Southern & Regional Institutional Pioneers', subtitle: 'Entries #25 to #36 • Social reformers, Malayalam typography, and Tirunelveli mission builders.' },\n`;
outStr += `  { id: 'era-4', number: 4, title: 'Classical Poets, Keerthanai Masters & Scholars', subtitle: 'Entries #37 to #48 • The golden age of Tamil Christian Keerthanai, epics, linguistics, and literature.' },\n`;
outStr += `  { id: 'era-5', number: 5, title: 'Musicologists, Revivalists, Medical Pioneers & Indigenous Bishops', subtitle: 'Entries #49 to #60 • Carnatic musicology, Marathi Christian poetry, Dohnavur, and indigenous bishops.' }\n];\n\n`;

outStr += `export const allItems: Item[] = [\n`;
let curr = '';
all60.forEach(i => {
  if (i.eraId !== curr) {
    curr = i.eraId;
    outStr += `\n  // ERA ${curr.split('-')[1]}\n`;
  }
  let line = `  { id: '${i.id}', name: '${escapeStr(i.name)}', role: '${escapeStr(i.role)}', eraId: '${i.eraId}', year: '${escapeStr(i.year)}', badgeType: '${i.badgeType}', badgeLabel: '${escapeStr(i.badgeLabel)}', icon: '${i.icon}', description: '${escapeStr(i.description)}'`;
  if (i.highlights) {
    line += `, highlights: [${i.highlights.map(h => "'" + escapeStr(h) + "'").join(', ')}]`;
  }
  if (i.image) {
    line += `, image: '${i.image}'`;
  }
  line += ` },\n`;
  outStr += line;
});
outStr += `];\n`;

fs.writeFileSync('src/data.ts', outStr);
console.log("Written 60 items!");
