import * as assert from 'assert';
import { gitUrlToWebUrl } from '../open';
import { UrlParsed, UrlPlatform }  from '../git';
import { Selection } from '../editor';

suite('gitUrlToWebUrl', () => {
	test('Github single line', () => {
        const url = new UrlParsed('github.com', '/andrei-m/vscode-open-in-web-scm.git');
        const selection = new Selection('src/open.ts', 1, 1);
        const webUrl = gitUrlToWebUrl(url, UrlPlatform.Github, 'deadbeef', selection);
		assert.strictEqual('https://github.com/andrei-m/vscode-open-in-web-scm/blob/deadbeef/src/open.ts#L1', webUrl);
	});

	test('Github multi line', () => {
        const url = new UrlParsed('github.com', '/andrei-m/vscode-open-in-web-scm.git');
        const selection = new Selection('src/open.ts', 3, 5);
        const webUrl = gitUrlToWebUrl(url, UrlPlatform.Github, 'deadbeef', selection);
		assert.strictEqual('https://github.com/andrei-m/vscode-open-in-web-scm/blob/deadbeef/src/open.ts#L3-L5', webUrl);
	});

    test('Gitlab single line', () => {
        const url = new UrlParsed('gitlab.com', '/andrei-m/vscode-open-in-web-scm.git');
        const selection = new Selection('src/open.ts', 1, 1);
        const webUrl = gitUrlToWebUrl(url, UrlPlatform.Stash, 'deadbeef', selection);
		assert.strictEqual('https://gitlab.com/andrei-m/vscode-open-in-web-scm/-/blob/deadbeef/src/open.ts#L1', webUrl);
	});

	test('Gitlab multi line', () => {
        const url = new UrlParsed('gitlab.com', '/andrei-m/vscode-open-in-web-scm.git');
        const selection = new Selection('src/open.ts', 3, 5);
        const webUrl = gitUrlToWebUrl(url, UrlPlatform.Gitlab, 'deadbeef', selection);
		assert.strictEqual('https://gitlab.com/andrei-m/vscode-open-in-web-scm/-/blob/deadbeef/src/open.ts#L3-L5', webUrl);
	});

    test('Stash single line', () => {
        const url = new UrlParsed('stash.example.org', '/project/repo.git');
        const selection = new Selection('src/open.ts', 1, 1);
        const webUrl = gitUrlToWebUrl(url, UrlPlatform.Stash, 'deadbeef', selection);
		assert.strictEqual('https://stash.example.org/projects/project/repos/repo/browse/src/open.ts?at=deadbeef#1', webUrl);
	});

    test('Stash mult line', () => {
        const url = new UrlParsed('stash.example.org', '/project/repo.git');
        const selection = new Selection('src/open.ts', 3, 5);
        const webUrl = gitUrlToWebUrl(url, UrlPlatform.Stash, 'deadbeef', selection);
		assert.strictEqual('https://stash.example.org/projects/project/repos/repo/browse/src/open.ts?at=deadbeef#3-5', webUrl);
	});
});