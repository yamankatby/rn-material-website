/** @type {import('next').NextConfig} */
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { parse } from "acorn";
import MDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkPrism from "remark-prism";

const getStaticProps = (path) =>
  `
export const getStaticProps = async () => {
  const fs = require("fs/promises");
  const matter = require("gray-matter");

  const fetch = async (dir, breadcrumbs = []) => {
    const files = await fs.readdir(dir);

    const val = [];

    for (let file of files) {
      const filePath = dir + "/" + file;

      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        const _category_ = JSON.parse(await fs.readFile(filePath + "/_category_.json", "utf8"));
        const items = await fetch(filePath, [...breadcrumbs, _category_]);
        val.push({ ..._category_, items });
      } else if (filePath.endsWith(".mdx") || filePath.endsWith(".md")) {
        const frontmatter = matter(await fs.readFile(filePath, "utf8")).data;
        const path = filePath.replace(".mdx", "").replace(".md", "").replace("pages", "").replace("index", "");

        val.push({ ...frontmatter, breadcrumbs, path });
      }
    }

    return val;
  };

  const sidebar = (await fetch("pages"))
    .sort((a, b) => (a.sidebar_position || 0) - (b.sidebar_position || 0))
    .map((item) =>
      "items" in item
        ? { ...item, items: item.items.sort((a, b) => (a.sidebar_position || 0) - (b.sidebar_position || 0)) }
        : item
    );

  const path = "$path";
  const flatten = sidebar.flatMap((item) => item.items || [item]);
  const index = flatten.findIndex((item) => item.path === path);
  const current = flatten[index];
  const prev = index > 0 ? flatten[index - 1] : null;
  const next = index < flatten.length - 1 ? flatten[index + 1] : null;

  return {
    props: {
      sidebar,
      current,
      prev,
      next,
    },
  };
};
`.replace("$path", path);

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts", "js", "jsx", "md", "mdx"]
};

const remarkLayout = () => (tree, file) => {
  const path = file.history[0]
    .replace(file.cwd, "")
    .replace(".mdx", "")
    .replace(".md", "")
    .replace("/pages", "")
    .replace("index", "");

  tree.children.unshift({
    type: "mdxjsEsm",
    data: {
      estree: parse(
        `import { withLayout } from "${path
          .split("/")
          .slice(1)
          .map(() => "../")
          .join("")}components/Layout";`,
        {
          sourceType: "module",
          ecmaVersion: 2020
        }
      )
    }
  });

  tree.children.push(
    {
      type: "mdxjsEsm",
      data: {
        estree: parse(getStaticProps(path), { sourceType: "module", ecmaVersion: 2020 })
      }
    },
    {
      type: "mdxjsEsm",
      data: {
        estree: parse(`export default (props) => withLayout(props);`, { sourceType: "module", ecmaVersion: 2020 })
      }
    }
  );
};

const withVanillaExtract = createVanillaExtractPlugin();

const withMDX = MDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkLayout, remarkGfm, remarkPrism]
  }
});

export default withVanillaExtract(withMDX(nextConfig));
