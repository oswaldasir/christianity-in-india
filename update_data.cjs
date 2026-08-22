const fs = require('fs');

const content = fs.readFileSync('src/data.ts', 'utf8');

// Use a trick to get the existing items: compile it to js or just eval it
const script = content.replace(/export const /g, 'const ').replace(/import \{ Era, Item \} from '.\/types';/g, '');

eval(script);

const newItems = [
  { id: '99', name: 'Devasahayam Pillai', role: 'Early Indian Christian Martyr & Lay Witness', eraId: 'era-1', year: '1712–1752 AD', badgeType: 'native', badgeLabel: 'Martyr', icon: 'cross', description: 'Born Neelakanda Pillai, Devasahayam served in the Travancore royal administration before converting to Catholic Christianity in 1745 and taking the name Lazarus/Devasahayam. He faced persecution, imprisonment and execution for his faith, and was shot at Aralvaimozhy on 14 January 1752. He was canonized by Pope Francis in 2022 and is recognized as the first Indian layperson and martyr canonized by the Catholic Church.', image: 'images/devasahayam.jpg' },
  { id: '99', name: 'Nehemiah Goreh', role: 'Indian Theologian, Sanskrit Scholar & Christian Apologist', eraId: 'era-1', year: '1825–1895 AD', badgeType: 'native', badgeLabel: 'Theologian', icon: 'book', description: 'Born Nilakantha Sastri Goreh, Nehemiah Goreh was a Sanskrit scholar from a Brahmin family who converted to Christianity in 1848. He became an ordained Christian minister and wrote extensively on Hindu philosophical systems and Christian theology, seeking to engage Indian intellectual traditions directly. His works included A Rational Refutation of the Hindu Philosophical Systems.', image: 'images/nehemiah-goreh.jpg' },
  { id: '99', name: 'Narayan Vaman Tilak', role: 'Marathi Christian Poet, Hymnist & Indigenous Christian Thinker', eraId: 'era-1', year: '1861–1919 AD', badgeType: 'poet', badgeLabel: 'Poet & Hymnist', icon: 'music', description: 'Narayan Vaman Tilak was a Marathi poet who converted to Christianity and was baptized in 1895. Influenced by the Marathi devotional tradition of Tukaram, he sought to express Christian faith through Indian cultural and poetic forms. He produced numerous Marathi Christian poems and hymns and became an important voice in the development of indigenous Indian Christian hymnody.', image: 'images/tilak.jpg' },
  { id: '99', name: 'Brahmabandhav Upadhyay', role: 'Indian Christian Theologian, Vedantic Thinker & Nationalist', eraId: 'era-1', year: '1861–1907 AD', badgeType: 'native', badgeLabel: 'Theologian', icon: 'church', description: 'Born Bhavani Charan Bandyopadhyay, Brahmabandhav Upadhyay became an influential Bengali Christian thinker who attempted to express Christian theology through Indian philosophical categories. He developed the idea of an indigenous Indian Christian identity and engaged deeply with Vedanta, Catholic theology and Indian nationalism. He also worked as a journalist and public intellectual.', image: 'images/upadhyay.jpg' },
  { id: '99', name: 'Lal Behari Day', role: 'Bengali Christian Writer, Educator & Missionary', eraId: 'era-1', year: '1824–1894 AD', badgeType: 'native', badgeLabel: 'Writer & Educator', icon: 'book', description: 'Lal Behari Day was an Indian Bengali writer, journalist, educator and Christian missionary. Educated at Alexander Duff\'s institution in Calcutta, he became an important voice in Bengali literature and vernacular education. His writings helped preserve Bengali folk traditions, while his Christian ministry and educational work contributed to the development of indigenous Christian intellectual life in Bengal.', image: 'images/lal-behari-day.jpg' }
];

let all60 = [...allItems, ...newItems];

function extractStartYear(yearStr) {
  const match = yearStr.match(/c?\.\s*(\d+)|(\d+)/);
  if (match) {
    return parseInt(match[1] || match[2], 10);
  }
  return 9999;
}

all60.sort((a, b) => {
  const yearA = extractStartYear(a.year);
  const yearB = extractStartYear(b.year);
  return yearA - yearB;
});

// Update IDs and eras
// 60 items -> 12 per era
for (let i = 0; i < all60.length; i++) {
  const num = i + 1;
  all60[i].id = num.toString().padStart(2, '0');
  
  let eraNum = Math.floor(i / 12) + 1;
  all60[i].eraId = 'era-' + eraNum;
}

// Update era subtitles
const updatedEras = eras.map((era, index) => {
  const startId = (index * 12 + 1).toString().padStart(2, '0');
  const endId = (index * 12 + 12).toString().padStart(2, '0');
  
  // Keep old description part, just update the Entries text
  const parts = era.subtitle.split(' • ');
  let subtitleText = parts[1] || '';
  if (subtitleText === '') {
     if (index === 0) subtitleText = 'Apostolic roots, Konkani epics, and classical Tamil inculturation.';
     if (index === 1) subtitleText = 'Vernacular printing, Carnatic Christian lyrics, and Serampore linguistics.';
     if (index === 2) subtitleText = 'Social reformers, Malayalam typography, and Tirunelveli mission builders.';
     if (index === 3) subtitleText = 'The golden age of Tamil Christian Keerthanai, epics, linguistics, and literature.';
     if (index === 4) subtitleText = 'Carnatic musicology, Marathi Christian poetry, Dohnavur, and indigenous bishops.';
  }
  
  return {
    ...era,
    subtitle: `Entries #${startId} to #${endId} • ${subtitleText}`
  };
});

let outStr = `import { Era, Item } from './types';\n\n`;

outStr += `export const eras: Era[] = [\n`;
outStr += updatedEras.map(e => `  { id: '${e.id}', number: ${e.number}, title: '${e.title.replace(/'/g, "\\'")}', subtitle: '${e.subtitle.replace(/'/g, "\\'")}' }`).join(',\n');
outStr += `\n];\n\n`;

outStr += `export const allItems: Item[] = [\n`;
let currentEra = '';
all60.forEach((item, index) => {
  if (item.eraId !== currentEra) {
    currentEra = item.eraId;
    outStr += `\n  // ERA ${currentEra.split('-')[1]}\n`;
  }
  const hl = item.highlights ? `, highlights: ${JSON.stringify(item.highlights)}` : '';
  outStr += `  { id: '${item.id}', name: '${item.name.replace(/'/g, "\\'")}', role: '${item.role.replace(/'/g, "\\'")}', eraId: '${item.eraId}', year: '${item.year.replace(/'/g, "\\'")}', badgeType: '${item.badgeType}', badgeLabel: '${item.badgeLabel.replace(/'/g, "\\'")}', icon: '${item.icon}', description: '${item.description.replace(/'/g, "\\'")}'${hl}, image: '${item.image}' },\n`;
});
outStr += `];\n`;

fs.writeFileSync('src/data.ts', outStr);
console.log("Successfully updated src/data.ts");
