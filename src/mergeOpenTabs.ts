import * as vscode from 'vscode';
import * as path from 'path';
export const mergeOpenTabs = vscode.commands.registerCommand('extension.mergeOpenTabs', async () => {
	
	try {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			vscode.window.showErrorMessage('No workspace folder is open.');
			return;
		}

		const allTabs = vscode.window.tabGroups.all.flatMap(group => group.tabs);

		const textTabs = allTabs.filter(tab => tab.input instanceof vscode.TabInputText);

		if (textTabs.length === 0) {
			vscode.window.showWarningMessage('No open text tabs to merge.');
			return;
		}

		const directoryStructure = textTabs
			.map((tab) => {
				const input = tab.input as vscode.TabInputText;
				const filePath = input.uri.fsPath;
				return path.relative(workspaceFolders[0].uri.fsPath, filePath);
			})
			.map((relativePath) => `- ${relativePath}`)
			.join('\n');

		const mergedContent = await Promise.all(textTabs.map(async (tab) => {
			const input = tab.input as vscode.TabInputText;
			const filePath = input.uri.fsPath;
			const fileName = path.relative(workspaceFolders[0].uri.fsPath, filePath);
			const fileContent = await vscode.workspace.fs.readFile(input.uri);
			const fileContentString = Buffer.from(fileContent).toString('utf8');
			return `File: ${fileName}\nContent:\n${fileContentString}`;
		}));

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
		vscode.window.showErrorMessage('An error occurred while merging the open tabs.');
	}
});