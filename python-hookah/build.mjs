import { readFile, access } from 'node:fs/promises';

const required = ['index.html','styles.css','script.js','assets/favicon.svg'];
for (const file of required) await access(new URL(file, import.meta.url));

const html = await readFile(new URL('index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('styles.css', import.meta.url), 'utf8');
const js = await readFile(new URL('script.js', import.meta.url), 'utf8');

const failures = [];
if (!html.includes('<main id="main">')) failures.push('semantic <main> missing');
if (!html.includes('prefers-reduced-motion') && !css.includes('prefers-reduced-motion')) failures.push('reduced motion missing');
if (!html.includes('PYTHON // NIGHT SYSTEM')) failures.push('concept name missing');
if (/lorem ipsum|TODO|PLACEHOLDER/i.test(html + css + js)) failures.push('placeholder content detected');
if (html.includes('href="#"')) failures.push('dead anchor href="#" detected');
if (!css.includes('overflow-x:hidden')) failures.push('horizontal overflow guard missing');
if (!html.includes('data-booking')) failures.push('booking prototype missing');

const openSections = (html.match(/<section\b/g) || []).length;
const closeSections = (html.match(/<\/section>/g) || []).length;
if (openSections !== closeSections) failures.push(`section tag mismatch ${openSections}/${closeSections}`);

if (failures.length) {
  console.error('BUILD FAILED');
  failures.forEach(x => console.error(`- ${x}`));
  process.exit(1);
}

console.log('PYTHON // NIGHT SYSTEM');
console.log(`HTML ${(Buffer.byteLength(html)/1024).toFixed(1)} KB`);
console.log(`CSS  ${(Buffer.byteLength(css)/1024).toFixed(1)} KB`);
console.log(`JS   ${(Buffer.byteLength(js)/1024).toFixed(1)} KB`);
console.log(`Sections: ${openSections}`);
console.log('Production static build validation: PASS');
