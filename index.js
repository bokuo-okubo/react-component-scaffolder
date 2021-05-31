const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

const TEMPLATES_DIR = path.resolve(__dirname, "templates");

let readdirRecursively = (dir, files = []) => {
  const paths = fs.readdirSync(dir);
  const dirs = [];
  for (const path of paths) {
    const stats = fs.statSync(`${dir}/${path}`);
    if (stats.isDirectory()) {
      dirs.push(`${dir}/${path}`);
    } else {
      files.push(`${dir}/${path}`);
    }
  }
  for (const d of dirs) {
    files = readdirRecursively(d, files);
  }
  return files;
};

const argv = yargs
  .option("componentType", {
    alias: "c",
    description: "atoms | molecules | organisms",
    demandOption: true,
  })
  .option("componentName", {
    alias: "n",
    description: "コンポーネントの名前",
    demandOption: true,
  })
  .help().argv;

const main = (ComponentName, StoryPage) => {
  let config = require(`${process.cwd()}/.scaffold.config.js`);
  const rootDir = process.cwd();

  if (config.componentDir) {
    config = {
      componentDir: Object.entries(config.componentDir).reduce(
        (prev, cur) => ({
          ...prev,
          [cur[0]]: cur[1].replace("<rootdir>", rootDir),
        }),
        {}
      ),
    };
  }

  const outDir = config.componentDir[StoryPage];

  const fileList = readdirRecursively(TEMPLATES_DIR);

  const outpath = path.join(outDir, ComponentName);
  fs.mkdirSync(outpath);

  for (const filePath of fileList) {
    const filename = path.basename(filePath);
    const outputFilename = Mustache.render(filename.replace(".template", ""), {
      ComponentName,
      StoryPage,
    });

    const fileStr = fs.readFileSync(filePath).toString();
    const replaced = Mustache.render(fileStr, { ComponentName, StoryPage });

    fs.writeFileSync(path.join(outpath, outputFilename), replaced);
  }
};

main(argv.componentName, argv.componentType);
