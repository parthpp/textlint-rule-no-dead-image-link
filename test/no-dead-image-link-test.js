import TextLintTester from 'textlint-tester';
import rule from '../src/no-dead-image-link';
import path from 'path';
// import path from 'path';
const tester = new TextLintTester();

tester.run("no-dead-image-link", rule, {
    valid: [
        "![Emptyurl]()",
        "![ExternalLink](https://example.com/example.png",
        "![Relative existing file](test/fixtures/image1.png)",
        {
            text: "![Relative link with options](image1.png)",
            options: {
                "image-base-path": "test/fixtures"
            }
        },
    ],
    invalid: [{
        text: "![invalidLink](invalidLink.png)",
        errors: [{
            messages: `invalidLink.png does not exist at ${path.resolve("invalidLink.png")}`,
            line: 1,
            column: 16 
        }]
    }]
});