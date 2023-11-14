
const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.optimizeJson', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No JSON file is open');
            return;
        }

        // Check if the opened file is a JSON file
        if (editor.document.languageId !== "json") {
            vscode.window.showErrorMessage('Opened file is not a JSON file');
            return;
        }

        const text = editor.document.getText();
        try {
            const json = JSON.parse(text);

            // Здесь ваш код для оптимизации JSON (удаление дубликатов, группировка, etc.)

            const optimizedJson = JSON.stringify(json, null, 2);
            const range = new vscode.Range(
                editor.document.positionAt(0),
                editor.document.positionAt(text.length)
            );

            // Handle the promise returned by edit
            await editor.edit((editBuilder) => {
                editBuilder.replace(range, optimizedJson);
            });
        } catch (error) {
            // Show the error message to help with debugging
            vscode.window.showErrorMessage('Invalid JSON: ' + error.message);
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
    activate,
    deactivate
}


function optimizeJson(jsonData) {
    return beautify_json(minimize_json(optimize_json(jsonData)));
}
