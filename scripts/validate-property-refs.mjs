#!/usr/bin/env node
/**
 * Build-time validation of property (stay) references.
 *
 * Source of truth for valid slugs: data/stays.json
 *
 * Property-reference fields checked (and nothing else):
 *   - data/blogs.json            -> [].relatedStays[]
 *   - data/semantic-pages.json   -> [].manualStaySlugs[]
 *
 * Also fails on duplicate stay slugs, because they make reference
 * resolution ambiguous.
 *
 * Invalid references are never filtered out or substituted: the build fails
 * with the file, the blog/page identifier, the field, and the bad slug.
 *
 * Usage:
 *   node scripts/validate-property-refs.mjs
 *   node scripts/validate-property-refs.mjs --data-dir <dir>   (e.g. a temp copy for testing)
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const dirFlag = args.indexOf("--data-dir");
const dataDir =
  dirFlag !== -1 && args[dirFlag + 1]
    ? path.resolve(args[dirFlag + 1])
    : path.resolve(here, "..", "data");

const problems = [];

function load(file) {
  const full = path.join(dataDir, file);
  try {
    return JSON.parse(readFileSync(full, "utf8"));
  } catch (err) {
    problems.push(`${rel(full)}: cannot read or parse JSON (${err.message})`);
    return null;
  }
}

function rel(p) {
  return path.relative(process.cwd(), p) || p;
}

function nearest(slug, validSlugs) {
  // Suggestion only (never applied): valid slugs that share a prefix with the bad one.
  const matches = [...validSlugs].filter(
    (v) => v.startsWith(slug) || slug.startsWith(v)
  );
  if (matches.length) return matches;
  const stem = slug.split("-").slice(0, 3).join("-");
  return [...validSlugs].filter((v) => v.startsWith(stem));
}

const stays = load("stays.json");
const blogs = load("blogs.json");
const pages = load("semantic-pages.json");

const validSlugs = new Set();

if (Array.isArray(stays)) {
  const seen = new Map();
  stays.forEach((stay, i) => {
    const slug = stay && stay.slug;
    if (typeof slug !== "string" || !slug) {
      problems.push(
        `data/stays.json: entry #${i} (${stay && stay.id ? stay.id : "no id"}) has no valid "slug"`
      );
      return;
    }
    if (seen.has(slug)) {
      problems.push(
        `data/stays.json: duplicate stay slug "${slug}" (${seen.get(slug)} and ${stay.id ?? `entry #${i}`}) - property references would be ambiguous`
      );
    } else {
      seen.set(slug, stay.id ?? `entry #${i}`);
    }
    validSlugs.add(slug);
  });
} else if (stays !== null) {
  problems.push("data/stays.json: expected a top-level array of stays");
}

function checkRefs({ file, items, idOf, field }) {
  if (items === null) return;
  if (!Array.isArray(items)) {
    problems.push(`${file}: expected a top-level array`);
    return;
  }
  items.forEach((item, i) => {
    const refs = item?.[field];
    if (refs === undefined) return;
    const id = idOf(item, i);
    if (!Array.isArray(refs)) {
      problems.push(`${file} -> ${id}: "${field}" must be an array of stay slugs`);
      return;
    }
    refs.forEach((slug, j) => {
      if (typeof slug === "string" && validSlugs.has(slug)) return;
      const hint =
        typeof slug === "string" ? nearest(slug, validSlugs) : [];
      problems.push(
        `${file} -> ${id}: ${field}[${j}] = ${JSON.stringify(slug)} is not a current stay slug` +
          (hint.length ? ` (did you mean: ${hint.join(", ")}?)` : "")
      );
    });
  });
}

if (validSlugs.size > 0) {
  checkRefs({
    file: "data/blogs.json",
    items: blogs,
    idOf: (b, i) => `blog "${b?.slug ?? `#${i}`}"${b?.title ? ` (${b.title})` : ""}`,
    field: "relatedStays",
  });
  checkRefs({
    file: "data/semantic-pages.json",
    items: pages,
    idOf: (p, i) => `page "${p?.slug ?? `#${i}`}"`,
    field: "manualStaySlugs",
  });
}

if (problems.length) {
  console.error("\nProperty reference validation FAILED:\n");
  problems.forEach((p) => console.error("  x " + p));
  console.error(
    `\n${problems.length} problem(s). Fix the slug in the file above, or update data/stays.json if the stay itself changed.\n`
  );
  process.exit(1);
}

console.log(
  `Property reference validation passed: ${validSlugs.size} stay slugs, ` +
    `${Array.isArray(blogs) ? blogs.length : 0} blogs, ` +
    `${Array.isArray(pages) ? pages.length : 0} semantic pages checked.`
);
