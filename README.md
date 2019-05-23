# textlint-rule-no-dead-image-link

This is a [textlint rule](https://github.com/textlint/textlint/wiki/Collection-of-textlint-rule) that validates image links in markdown documents. It does the following
- It ignores external link. The `RegExp` used to filter out such links is `/^[a-z][a-z0-9+.-]*:/i`  
- For all image links, it checks that the linked image file is present at the specified location.  

## Installation
- Since this is a textlint rule, first install textlint by following the [textlint getting started guide](https://textlint.github.io/docs/getting-started.html). 
- This rule is available as an npm package and can be installed using
    - `npm install --save-dev textlint-rule-no-dead-image-link`
    or 
    - `yarn add --dev textlint-rule-no-dead-image-link` and then `yarn install`

## Usage

If you are unfamiliar with textlint then refer to [configuring textlint](https://textlint.github.io/docs/configuring.html) for textlint configuration details.  

Add one of the following to `.textlintrc` file
- without any options

```json
{
    "rules": {
        "no-dead-image-link": true
    }
}
```
or

- with options 
```json
{
    "rules": {
        "no-dead-image-link": {
            "image-base-path": "../docs"
        }
    }
}
```

Via CLI

```
textlint --rule no-dead-image-link README.md
```
## Option

### image-base-path

This option takes a string input that represents the base path for all the image url's that are relative. If the value of this option itself is relative, then it is considered to be relative to the location of textlint configuration file (i.e. `.textlintrc`).  

## License

MIT © Parth Patel
