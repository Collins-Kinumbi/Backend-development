import fs from "fs";

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a filename");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async getAll() {
    // Open the file called this.name
    const contents = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });

    // Read its contents
    console.log(contents);

    // Parse the contents

    // Return the parsed data
  }
}

async function test() {
  const repo = new UsersRepository("users.json");
  await repo.getAll();
}

test();
