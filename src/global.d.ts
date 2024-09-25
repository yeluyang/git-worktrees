import { SimpleGit } from "simple-git";

interface RepoContext {
  parentDir: string;
  name: string;
  path: string;
}

interface RepoWorkingContext {
  root: RepoContext;
  current: RepoContext;
}

declare global {
  interface Context {
    git: SimpleGit;
    repo: RepoWorkingContext;
  }

  interface Worktree {
    path: string;
    branch: string;
    sha1: string;
  }

  interface vsCommand {
    key: string;
    command(ctx: Context): Promise<void>;
  }
}
