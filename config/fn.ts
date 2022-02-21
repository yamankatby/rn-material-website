import { GetStaticProps } from "next";
import fs from "fs/promises";

export const getStaticProps: GetStaticProps = async (context) => {
  const readDir = async (dir: string) => {
    const files = await fs.readdir(dir);
    return await Promise.all(
      files.map(async (file) => {
        const filePath = `${dir}/${file}`;
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
          return readDir(filePath);
        } else if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) {
          return { path: filePath.replace("pages", "").replace(".mdx", "").replace(".md", "").replace("index", "") };
        }
      }),
    );
  };

  const sidebar = (await readDir("pages")).filter(Boolean);
  return {
    props: { sidebar },
  };
};
