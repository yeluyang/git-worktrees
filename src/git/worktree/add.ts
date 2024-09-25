import path from "path";
import * as vscode from "vscode";
import * as fs from "fs";
import { exec } from "child_process";

async function create() {
  if (!vscode.workspace.workspaceFolders) {
    vscode.window.showErrorMessage("Please open a workspace");
    return;
  }
  if (vscode.workspace.workspaceFolders?.length !== 1) {
    vscode.window.showErrorMessage(
      "Not support multi-workspaces yet. Please open only one workspace"
    );
    return;
  }
  const repoRoot = vscode.workspace.workspaceFolders[0].uri.fsPath; // TODO: 考虑在 worktrees 下新建 worktrees 的 case
  const projName = path.basename(repoRoot);
  const parentDir = path.dirname(repoRoot);
  const treeRoot = path.join(parentDir, `${projName}.worktrees`);
}
