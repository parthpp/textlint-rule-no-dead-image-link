import fs from 'fs';
import path from 'path'
import util from 'util';
import { wrapReportHandler} from 'textlint-rule-helper';

const fileExists = util.promisify(fs.exists);

//https://stackoverflow.com/a/31991870
const externalLinkRegex = new RegExp(/^[a-z][a-z0-9+.-]*:/, 'i');

export default function(context, options) {
    return wrapReportHandler(context, {
        ignoreNodeTypes: [context.Syntax.BlockQuote, context.Syntax.code]
    }, () => handler(context, options));
}

function handler(context, options) {
    return {
        [context.Syntax.Image] (imageNode) {
            return validateImageNode(imageNode, context, options);
        }
    }
}

async function validateImageNode(imageNode, context, options) {
    if (!imageNode.url || externalLinkRegex.test(imageNode.url)) {
        return;
    } else {
        return validateImageLink(imageNode, context, options);
    }
}

async function validateImageLink(imageNode, context, options) {
    let imageAbsolutePath;
    let imageBasePath = options["image-base-path"];
    if (!imageBasePath) {
        imageAbsolutePath = path.resolve(imageNode.url);
    } else if(path.isAbsolute(imageBasePath) || !context.getConfigBaseDir()) {
        imageAbsolutePath = path.resolve(imageBasePath, imageNode.url);
    } else {
        imageAbsolutePath = path.resolve(context.getConfigBaseDir(), 
            imageBasePath, imageNode.url);
    }
    
    if (!await fileExists(imageAbsolutePath)) {
        let errorMessage = `${path.basename(imageNode.url)} does not exist at ${path.dirname(imageAbsolutePath)}`
        context.report(imageNode, new context.RuleError(errorMessage, {
            index: imageNode.raw.indexOf(imageNode.url) || 0
        }));
    } 
}