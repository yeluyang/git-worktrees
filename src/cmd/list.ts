import * as vscode from "vscode";
import { ExtensionID } from "../constants";
import { listWorktrees } from "../git/worktree/list";

export const key = `${ExtensionID}.list`;
export async function command(ctx: Context) {
  const worktrees = await listWorktrees(ctx.git);

  const items = worktrees.map((wt) => ({
    label: wt.branch,
    description: wt.path,
    path: wt.path,
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: "选择要打开的 worktree",
  });

  if (!selected) return;

  const openOption = await vscode.window.showQuickPick(
    [
      { label: "在当前窗口打开", value: "current" },
      { label: "在新窗口打开", value: "new" },
    ],
    { placeHolder: "选择打开方式" }
  );

  if (!openOption) return;

  const openPath = selected.path;

  vscode.commands.executeCommand(
    "vscode.openFolder",
    vscode.Uri.file(openPath),
    openOption.value === "current"
  );
}
