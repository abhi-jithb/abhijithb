---
title: chumma
seoTitle: oru kadha
seoDescription: kadha parayaam
author: Abhijith B
date: 2026-06-29
summary: "chumma kadha parayan "
category: General
tags:
  - general
coverImage: /assets/images/blog/whatsapp-image-2026-06-12-at-1.35.34-pm.jpg
coverImageAlt: abhi
draft: false
featured: true
---
hello sI reviewed what the LLM reported. 

There are some **good changes**, but there are also a few claims that should be verified instead of accepted at face value.

## ✅ These are good improvements

* Creating `public/assets/images/blog/.gitkeep` is the correct way to ensure the upload directory exists in Git.
* Switching the body editor to **raw Markdown** is a good choice for your use case.
* Adding `revalidate = 60` is reasonable if you want new posts to appear without rebuilding every time.
* Separating features like:

  * ReadingProgressBar
  * ShareButtons
  * BlogReactions
  * GiscusComments

is a clean architecture.

---

## ⚠️ Things I would verify

### 1. "ISR fixes the blog not appearing"

This is **not guaranteed**.

A newly published post may still not appear if:

* the loader is reading the wrong folder
* frontmatter fields don't match
* slug generation is wrong
* markdown parsing fails
* posts are filtered out (`draft`, `featured`, etc.)

So don't assume `revalidate` alone fixed it.

---

### 2. ".gitkeep fixes image uploads"

This is only **partially true**.

A `.gitkeep` fixes the missing folder.

It **does not automatically fix**:

* incorrect `media_folder`
* incorrect `public_folder`
* wrong image URL generation
* GitHub upload permissions
* image path parsing

Since you previously got 404s, I'd verify uploads by actually publishing a post with an image.

---

### 3. "Giscus is integrated"

Check whether it actually works.

Giscus requires:

* Repository ID
* Category ID
* Category
* Mapping
* Theme

If those aren't configured, the component may render a placeholder instead of real comments.

---

### 4. Share buttons

These should generate the **live blog URL**, not `localhost`.

For example:

```
https://abhijithb.vercel.app/blog/code-chaya-read
```

Verify this before considering the feature complete.

---

## Things I would improve

### Reading time

Don't store it manually in the CMS.

Calculate it automatically from the markdown content.

---

### Slug

Instead of auto-generating only from the title, expose the slug field in Decap so you can edit it when needed.

Example:

```
my-open-source-journey
```

instead of a title-derived slug every time.

---

### Cover image

The CMS should allow:

* Upload
* Preview
* Alt text
* Automatic rendering on the blog card
* Automatic rendering on the article page

---

### SEO

The SEO fields should fall back automatically:

If SEO Title is empty:

```
SEO Title = Title
```

If SEO Description is empty:

```
SEO Description = Summary
```

---

## Before adding more features

I would verify these in order:

1. ✅ Publish a post
2. ✅ GitHub commit created
3. ✅ Vercel deployment starts
4. ✅ `/blog` lists the new post
5. ✅ `/blog/[slug]` opens correctly
6. ✅ Cover image loads
7. ✅ Inline images load
8. ✅ Share buttons work
9. ✅ Giscus loads
10. ✅ Publish a post from your phone

Once all ten pass, you'll have the complete workflow you originally envisioned: write on your phone, publish to GitHub, auto-deploy on Vercel, and share a polished blog with comments, reactions, and a great reading experience.
