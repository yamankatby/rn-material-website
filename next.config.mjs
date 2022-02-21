/** @type {import('next').NextConfig} */
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { parse } from "acorn";
import MDX from "@next/mdx";
import remarkPrism from "remark-prism";

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts", "js", "jsx", "md", "mdx"]
};

const remarkGetStaticProps = () => (tree, file) => {
  tree.children.push({
    type: "mdxjsEsm",
    data: {
      estree: parse(
        `
export const getStaticProps = async () => {
  const fs = require("fs/promises");
  const matter = require("gray-matter");
  const readDir = async (dir) => {
    const files = await fs.readdir(dir);
    return await Promise.all(
      files.map(async (file) => {
        const filePath = dir + "/" + file;
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
          const config = await fs.readFile(filePath + "/_category_.json", "utf8");
          const items = (await readDir(filePath)).filter(Boolean);
          return { ...JSON.parse(config), items };
        } else if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) {
          const content = await fs.readFile(filePath, "utf8");
          return {
            ...matter(content).data,
            path: filePath.replace("pages", "").replace(".mdx", "").replace(".md", "").replace("index", ""),
          };
        }
      })
    );
  };
  const sidebar = (await readDir("pages")).filter(Boolean);
  console.log(JSON.stringify(sidebar, null, 2));
  return {
    props: { sidebar },
  };
};

      `,
        {
          sourceType: "module",
          ecmaVersion: 2020
        }
      )
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
