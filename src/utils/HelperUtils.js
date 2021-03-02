export const EvaluateDomainName = (url = '') => {
    if(!url) { return ''; }
    const domainCaptureExp = new RegExp(/[/]{1,2}(?:.*\.)?(.+\..{1,5})[/]/);
    const result = domainCaptureExp.exec(url);
    return result?.[1] || ''; 
}