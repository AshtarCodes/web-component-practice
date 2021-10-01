import fs from 'fs';
import { unified } from 'unified';
import parse from 'rehype-parse';
import html from 'rehype-stringify';
import transform from './transform';

const tree = () => tree => console.log(JSON.stringify(tree, null, 2));

const contents = unified()
  .use(parse)
  .use(transform)
  .use(html)
  .processSync(fs.readFileSync(`${process.cwd()}/html/counterElement.html`))
  .toString();

const outputDir = `${process.cwd()}/html`;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(`${outputDir}/transform.html`, contents);