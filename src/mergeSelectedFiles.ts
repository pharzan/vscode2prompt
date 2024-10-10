import * as vscode from 'vscode';
import * as path from 'path';

export const mergeSelectedFiles = vscode.commands.registerCommand('extension.mergeSelectedFiles', async () => {
	try {
		const workspaceFolders = vscode.workspace.workspaceFolders;

		if (!workspaceFolders) {
			vscode.window.showErrorMessage('No workspace folder is open.');
			return;
		}

		const files = await vscode.workspace.findFiles('**/*');

		const selectedFiles = await vscode.window.showQuickPick(
			files.map((file) => file.fsPath),
			{ canPickMany: true, placeHolder: 'Select files to include in the merged output' }
		);

		if (!selectedFiles || selectedFiles.length === 0) {
			vscode.window.showWarningMessage('No files selected.');
			return;
		}

		const directoryStructure = selectedFiles
			.map((filePath) => path.relative(workspaceFolders[0].uri.fsPath, filePath))
			.map((relativePath) => `- ${relativePath}`)
			.join('\n');

		const mergedContent = await Promise.all(
			selectedFiles.map(async (filePath) => {
				const fileName = path.relative(workspaceFolders[0].uri.fsPath, filePath);
				const fileContent = await fs.promises.readFile(filePath, 'utf8');
				return `File: ${fileName}\nContent:\n${fileContent}`;
			})
		);

		const mergedText = `Directory Structure:\n${directoryStructure}\n\nMerged Content:\n\n${mergedContent.join('\n\n')}`;

		const options = ['Copy to Clipboard', 'Show as File in Memory'];
		const action = await vscode.window.showQuickPick(options, {
			placeHolder: 'What do you want to do with the merged content?',
		});

		if (!action) {
			vscode.window.showWarningMessage('No action selected.');
			return;
		}

		if (action === 'Copy to Clipboard') {
			await vscode.env.clipboard.writeText(mergedText);
			vscode.window.showInformationMessage('Merged content and copy to clipboard!');
		} else if (action === 'Show as File') {
			const document = await vscode.workspace.openTextDocument({
				language: 'plaintext',
				content: mergedText,
			});
			await vscode.window.showTextDocument(document);
		}

	} catch (error) {
		console.error(error);
		vscode.window.showErrorMessage('An error occurred while merging the selected files.');
	}
});