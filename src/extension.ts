import * as vscode from 'vscode';
import { mergeOpenTabs } from './mergeOpenTabs';
import { mergeSelectedFiles } from './mergeSelectedFiles';

export function activate(context: vscode.ExtensionContext) {
	let disposable = mergeSelectedFiles;

	let disposableOpenTabs = mergeOpenTabs;
	context.subscriptions.push(disposable, disposableOpenTabs);
}

export function deactivate() { }
