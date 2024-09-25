import { SimpleGit } from "simple-git";
import { RepoContext } from "./global";
import path from "path";

export async function BuildRepoContext(git: SimpleGit): RepoContext {
  const rootPath = await git.revparse("--show-toplevel");
  return {
    parentDir: path.dirname(rootPath),
  };
}
