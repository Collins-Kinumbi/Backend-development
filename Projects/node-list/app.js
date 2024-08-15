#!/usr/bin/env node
import fs from "fs";
import { lstat } from "node:fs/promises";
import chalk from "chalk";
import path from "path";

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, fileNames) => {
  // EITHER
  // err === an error obj
  // OR
  // err === null, everything is ok
  if (err) {
    console.log(err);
    return;
  }
  // console.log(fileNames);
  const statPromises = fileNames.map((fileName) => {
    return lstat(path.join(targetDir, fileName));
    nod;
  });

  const allStats = await Promise.all(statPromises);
  allStats.forEach((stats) => {
    const index = allStats.indexOf(stats);
    if (stats.isFile()) {
      console.log(chalk.blue(fileNames[index]));
    } else {
      console.log(chalk.green(fileNames[index] + "/"));
    }
  });
});

// Install dependencies then run
// run 'npm link' to link it
