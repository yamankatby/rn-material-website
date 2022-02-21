/** @type {import('next').NextConfig} */
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { parse } from "acorn";
import MDX from "@next/mdx";
import remarkPrism from "remark-prism";

const getStaticProps = `
export const getStaticProps = async () => {
  const fs = require("fs/promises");
  const matter = require("gray-matter");

  const fetch = async (dir) => {
    const files = await fs.readdir(dir);

    const val = [];
    
    for (let file of files) {
      const filePath = \`${dir}/${file}\`;

      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        const items = await fetch(filePath);
        const _category_ = JSON.parse(await fs.readFile(\`${filePath}/_category_.json\`, "utf8"));
        val.push({ ..._category_, items });
      } else if (filePath.endsWith(".mdx") || filePath.endsWith(".md")) {
        const frontmatter = matter(await fs.readFile(filePath, "utf8")).data;
        const path = filePath.replace(".mdx", "").replace(".md", "").replace("pages", "").replace("index", "");

        val.push({ ...frontmatter, path });
      }
    }

    return val;
  };

  const sidebar = await fetch("pages");

  return {
    props: {
      sidebar
    }
  };
};
`;

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts", "js", "jsx", "md", "mdx"]
};

const remarkGetStaticProps = () => (tree) => {
  tree.children.push({
    type: "mdxjsEsm",
    data: {
      estree: parse(getStaticProps, { sourceType: "module", ecmaVersion: 2020 })
    }
  });
};

const withVanillaExtract = createVanillaExtractPlugin();

const withMDX = MDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGetStaticProps, remarkPrism]
  }
});

export default withVanillaExtract(withMDX(nextConfig));
