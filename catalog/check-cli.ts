import { catalog } from "./index";

const slug = process.argv[2];

if (!slug) {
  console.error("usage: npm run check-book -- <slug>");
  process.exit(2);
}

const report = catalog.check(slug);

if (!report) {
  console.error(`No Book loaded for slug "${slug}"`);
  process.exit(2);
}

console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
