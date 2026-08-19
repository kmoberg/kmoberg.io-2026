#!/usr/bin/env node
/**
 * Import posts from a Ghost JSON export into src/posts/.
 *
 * Usage:
 *   node scripts/import-ghost.mjs path/to/ghost-export.json
 *
 * Accepts both export shapes Ghost produces:
 *   { "db": [ { "data": { "posts": [...], ... } } ] }   (full export)
 *   { "data": { "posts": [...] } }                      (older/partial)
 *
 * Only published posts (type "post") are imported. The Ghost HTML body is
 * kept as-is inside the markdown file (markdown passes HTML through), so
 * posts render correctly immediately and can be hand-tidied into pure
 * markdown later, per post, if ever desired.
 *
 * Image URLs pointing at Ghost's /content/images/ are rewritten to
 * /images/ghost/ — copy the old instance's content/images directory to
 * src/images/ghost/ to make them resolve.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src", "posts");

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/import-ghost.mjs path/to/ghost-export.json");
  process.exit(1);
}

const raw = JSON.parse(readFileSync(file, "utf8"));
const data = raw.db?.[0]?.data ?? raw.data;
if (!data?.posts) {
  console.error("Could not find posts in the export — is this a Ghost JSON export?");
  process.exit(1);
}

const tagsById = new Map((data.tags ?? []).map((t) => [t.id, t.name]));
const tagIdsByPost = new Map();
for (const pt of data.posts_tags ?? []) {
  if (!tagIdsByPost.has(pt.post_id)) tagIdsByPost.set(pt.post_id, []);
  tagIdsByPost.get(pt.post_id).push(pt.tag_id);
}

const published = data.posts.filter(
  (p) => p.status === "published" && (p.type ?? "post") === "post"
);

mkdirSync(outDir, { recursive: true });
let written = 0;
let skipped = 0;

for (const post of published) {
  const date = (post.published_at ?? post.created_at).slice(0, 10);
  const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const outFile = join(outDir, `${date}-${slug}.md`);

  if (existsSync(outFile)) {
    skipped++;
    continue;
  }

  let html = post.html ?? "";
  if (!html.trim()) {
    console.warn(`warning: "${post.title}" has no rendered HTML (mobiledoc/lexical only) — imported empty, needs manual attention`);
  }
  html = html
    .replaceAll("__GHOST_URL__/content/images/", "/images/ghost/")
    .replaceAll("/content/images/", "/images/ghost/")
    .replaceAll("__GHOST_URL__/", "/");

  const tagNames = (tagIdsByPost.get(post.id) ?? [])
    .map((id) => tagsById.get(id))
    .filter(Boolean);

  let featureImage = post.feature_image ?? "";
  featureImage = featureImage
    .replace("__GHOST_URL__/content/images/", "/images/ghost/")
    .replace(/^\/content\/images\//, "/images/ghost/");

  const fm = [
    "---",
    `title: ${JSON.stringify(post.title)}`,
    `date: ${date}`,
    ...(featureImage ? [`image: ${JSON.stringify(featureImage)}`] : []),
    ...(tagNames.length ? [`tags: ${JSON.stringify(["posts", ...tagNames])}`] : []),
    ...(post.custom_excerpt ? [`description: ${JSON.stringify(post.custom_excerpt)}`] : []),
    `permalink: /${slug}/`,
    "---",
    ""
  ].join("\n");

  writeFileSync(outFile, fm + html + "\n");
  written++;
  console.log(`imported: ${date}-${slug}.md`);
}

console.log(`\n${written} post(s) imported, ${skipped} already existed, ${published.length} published in export.`);
console.log("Remember: copy the Ghost content/images directory to src/images/ghost/ if posts reference images.");
