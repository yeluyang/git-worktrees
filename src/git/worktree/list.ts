import { SimpleGit } from "simple-git";

export async function listWorktrees(git: SimpleGit): Promise<Worktree[]> {
  const result = await git.raw(["worktree", "list", "--porcelain"]);
  const worktrees: Worktree[] = [];
  const lines = result.split("\n");
  for (const line of lines) {
    if (line.trim() === "") {
      continue;
    }

    const current: Worktree = {
      path: "",
      branch: "",
      sha1: "",
    };
    const [key, ...value] = line.split(" ");
    switch (key) {
      case "worktree":
        current.path = value.join(" ").trim();
        break;
      case "branch":
        current.branch = value.join(" ").trim();
        break;
      case "HEAD":
        current.sha1 = value.join(" ").trim();
        break;
    }

    if (current.path.length !== 0) {
      worktrees.push(current as Worktree);
    }
  }

  return worktrees;
}
