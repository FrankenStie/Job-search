// this a revised version of code to include the function to hide cc-jobs-container by default 
// Date: 9/29/2024 - Franklin M. Tripole

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
if (document.currentScript) {
    // document.currentScript is a good enough check for us, so since we feel good about the browser
    // go ahead and construct the script for the real stuff
    const scriptUrl = new URL(document.currentScript.getAttribute('src').toLowerCase(), document.location.href);
    const scriptParameters = scriptUrl.searchParams;
    const siteId = getScriptAttribute('siteid', scriptParameters, 'data-site-id');
    const contentSelector = getScriptAttribute('contentselector', scriptParameters, 'data-content-selector') || '';
    const jobId = getScriptAttribute('jobId', scriptParameters);
    const preview = getScriptAttribute('preview', scriptParameters);
    // attempt to load it where the career site should be embedded, but if we can't, then append to the body.
    let container = null;
    // first see if there's a content selector in the attributes
    if (contentSelector) {
        container = document.querySelector(contentSelector);
    }
    // if not, then try to get the script's parent
    if (!container) {
        const parentElement = document.currentScript.parentElement;
        if (parentElement) {
            const className = 'cc-careers-script-container';
            parentElement.classList.add(className);
            container = document.querySelector(`.${className}`);
            // if the parent is the head, we don't want to put it there, so let's go back to the default
            if ((container === null || container === void 0 ? void 0 : container.tagName) === 'HEAD') {
                container = null;
            }
        }
    }
    // if we didn't have a valid container, default to the body
    if (!container) {
        container = document.body;
    }
    // finally, add the script
    const script = document.createElement('script');
    script.id = 'cc-career-site-script';                                           // revised - 9/29/2024
    const url = 'https://careers-content.clearcompany.com/js/v1/career-site-no-polyfill-revised.js' +
        '?siteId=' + siteId +
        (jobId !== null ? '&jobId=' + jobId : '') +
        (preview !== null ? '&preview=' + preview : '') +
        '&contentSelector=' + encodeURIComponent(contentSelector);
    script.setAttribute('src', url);
    const existingScript = document.getElementById('cc-career-site-script');
    existingScript === null || existingScript === void 0 ? void 0 : existingScript.remove();
    container.append(script);
}
else {
    // show unsupported browser message
    const customMessage = window.unsupportedBrowserMessage;
    document.write(customMessage || '<span style="font-weight:bold;">Job listings are not supported on Internet Explorer or Opera Mini. Please try other browsers.</span>');
}
function getScriptAttribute(parameterName, scriptParameters, attributeName) {
    if (attributeName !== undefined) {
        return document.currentScript.getAttribute(attributeName) || scriptParameters.get(parameterName.toLowerCase());
    }
    else {
        return scriptParameters.get(parameterName.toLowerCase());
    }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL3YxL2Jyb3dzZXJDaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7SUFDekIsZ0dBQWdHO0lBQ2hHLHVEQUF1RDtJQUN2RCxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdHLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztJQUVoRCxNQUFNLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDOUUsTUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsdUJBQXVCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0csTUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDNUQsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFFaEUseUdBQXlHO0lBQ3pHLElBQUksU0FBUyxHQUFtQixJQUFJLENBQUM7SUFFckMsNERBQTREO0lBQzVELElBQUksZUFBZSxFQUFFO1FBQ2pCLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ3ZEO0lBRUQsOENBQThDO0lBQzlDLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDWixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUMzRCxJQUFJLGFBQWEsRUFBRTtZQUNmLE1BQU0sU0FBUyxHQUFHLDZCQUE2QixDQUFDO1lBQ2hELGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztZQUVwRCw0RkFBNEY7WUFDNUYsSUFBSSxDQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxPQUFPLE1BQUssTUFBTSxFQUFFO2dCQUMvQixTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3BCO1NBQ0o7S0FDSjtJQUVELDJEQUEyRDtJQUMzRCxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ1osU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7S0FDN0I7SUFFRCwwQkFBMEI7SUFDMUIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxNQUFNLENBQUMsRUFBRSxHQUFHLHVCQUF1QixDQUFDO0lBQ3BDLE1BQU0sR0FBRyxHQUFHLDBFQUEwRTtRQUNsRixVQUFVLEdBQUcsTUFBTTtRQUNuQixDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN6QyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvQyxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM5RCxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDeEUsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDNUI7S0FBTTtJQUNILG1DQUFtQztJQUNuQyxNQUFNLGFBQWEsR0FBWSxNQUFjLENBQUMseUJBQXlCLENBQUM7SUFDeEUsUUFBUSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksc0lBQXNJLENBQUMsQ0FBQztDQUMzSztBQUVELFNBQVMsa0JBQWtCLENBQUMsYUFBcUIsRUFBRSxnQkFBaUMsRUFBRSxhQUFzQjtJQUN4RyxJQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7UUFDN0IsT0FBTyxRQUFRLENBQUMsYUFBYyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDbkg7U0FBTTtRQUNILE9BQU8sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0tBQzVEO0FBQ0wsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIu+7v2lmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XHJcbiAgICAvLyBkb2N1bWVudC5jdXJyZW50U2NyaXB0IGlzIGEgZ29vZCBlbm91Z2ggY2hlY2sgZm9yIHVzLCBzbyBzaW5jZSB3ZSBmZWVsIGdvb2QgYWJvdXQgdGhlIGJyb3dzZXJcclxuICAgIC8vIGdvIGFoZWFkIGFuZCBjb25zdHJ1Y3QgdGhlIHNjcmlwdCBmb3IgdGhlIHJlYWwgc3R1ZmZcclxuICAgIGNvbnN0IHNjcmlwdFVybCA9IG5ldyBVUkwoZG9jdW1lbnQuY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoJ3NyYycpIS50b0xvd2VyQ2FzZSgpLCBkb2N1bWVudC5sb2NhdGlvbi5ocmVmKTtcclxuICAgIGNvbnN0IHNjcmlwdFBhcmFtZXRlcnMgPSBzY3JpcHRVcmwuc2VhcmNoUGFyYW1zO1xyXG5cclxuICAgIGNvbnN0IHNpdGVJZCA9IGdldFNjcmlwdEF0dHJpYnV0ZSgnc2l0ZWlkJywgc2NyaXB0UGFyYW1ldGVycywgJ2RhdGEtc2l0ZS1pZCcpO1xyXG4gICAgY29uc3QgY29udGVudFNlbGVjdG9yID0gZ2V0U2NyaXB0QXR0cmlidXRlKCdjb250ZW50c2VsZWN0b3InLCBzY3JpcHRQYXJhbWV0ZXJzLCAnZGF0YS1jb250ZW50LXNlbGVjdG9yJykgfHwgJyc7XHJcbiAgICBjb25zdCBqb2JJZCA9IGdldFNjcmlwdEF0dHJpYnV0ZSgnam9iSWQnLCBzY3JpcHRQYXJhbWV0ZXJzKTtcclxuICAgIGNvbnN0IHByZXZpZXcgPSBnZXRTY3JpcHRBdHRyaWJ1dGUoJ3ByZXZpZXcnLCBzY3JpcHRQYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAvLyBhdHRlbXB0IHRvIGxvYWQgaXQgd2hlcmUgdGhlIGNhcmVlciBzaXRlIHNob3VsZCBiZSBlbWJlZGRlZCwgYnV0IGlmIHdlIGNhbid0LCB0aGVuIGFwcGVuZCB0byB0aGUgYm9keS5cclxuICAgIGxldCBjb250YWluZXI6IEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAvLyBmaXJzdCBzZWUgaWYgdGhlcmUncyBhIGNvbnRlbnQgc2VsZWN0b3IgaW4gdGhlIGF0dHJpYnV0ZXNcclxuICAgIGlmIChjb250ZW50U2VsZWN0b3IpIHtcclxuICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRlbnRTZWxlY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgbm90LCB0aGVuIHRyeSB0byBnZXQgdGhlIHNjcmlwdCdzIHBhcmVudFxyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIGlmIChwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9ICdjYy1jYXJlZXJzLXNjcmlwdC1jb250YWluZXInO1xyXG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIHBhcmVudCBpcyB0aGUgaGVhZCwgd2UgZG9uJ3Qgd2FudCB0byBwdXQgaXQgdGhlcmUsIHNvIGxldCdzIGdvIGJhY2sgdG8gdGhlIGRlZmF1bHRcclxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lcj8udGFnTmFtZSA9PT0gJ0hFQUQnKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHdlIGRpZG4ndCBoYXZlIGEgdmFsaWQgY29udGFpbmVyLCBkZWZhdWx0IHRvIHRoZSBib2R5XHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmluYWxseSwgYWRkIHRoZSBzY3JpcHRcclxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgc2NyaXB0LmlkID0gJ2NjLWNhcmVlci1zaXRlLXNjcmlwdCc7XHJcbiAgICBjb25zdCB1cmwgPSAnJHByb2Nlc3MuZW52LkNhcmVlclNpdGVTdGF0aWNDb250ZW50VXJsL2pzL3YxL2NhcmVlci1zaXRlLW5vLXBvbHlmaWxsLmpzJyArXHJcbiAgICAgICAgJz9zaXRlSWQ9JyArIHNpdGVJZCArXHJcbiAgICAgICAgKGpvYklkICE9PSBudWxsID8gJyZqb2JJZD0nICsgam9iSWQgOiAnJykgK1xyXG4gICAgICAgIChwcmV2aWV3ICE9PSBudWxsID8gJyZwcmV2aWV3PScgKyBwcmV2aWV3IDogJycpICtcclxuICAgICAgICAnJmNvbnRlbnRTZWxlY3Rvcj0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbnRlbnRTZWxlY3Rvcik7XHJcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmwpO1xyXG4gICAgY29uc3QgZXhpc3RpbmdTY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2MtY2FyZWVyLXNpdGUtc2NyaXB0Jyk7XHJcbiAgICBleGlzdGluZ1NjcmlwdD8ucmVtb3ZlKCk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kKHNjcmlwdCk7XHJcbn0gZWxzZSB7XHJcbiAgICAvLyBzaG93IHVuc3VwcG9ydGVkIGJyb3dzZXIgbWVzc2FnZVxyXG4gICAgY29uc3QgY3VzdG9tTWVzc2FnZTogc3RyaW5nID0gKHdpbmRvdyBhcyBhbnkpLnVuc3VwcG9ydGVkQnJvd3Nlck1lc3NhZ2U7XHJcbiAgICBkb2N1bWVudC53cml0ZShjdXN0b21NZXNzYWdlIHx8ICc8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OmJvbGQ7XCI+Sm9iIGxpc3RpbmdzIGFyZSBub3Qgc3VwcG9ydGVkIG9uIEludGVybmV0IEV4cGxvcmVyIG9yIE9wZXJhIE1pbmkuIFBsZWFzZSB0cnkgb3RoZXIgYnJvd3NlcnMuPC9zcGFuPicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTY3JpcHRBdHRyaWJ1dGUocGFyYW1ldGVyTmFtZTogc3RyaW5nLCBzY3JpcHRQYXJhbWV0ZXJzOiBVUkxTZWFyY2hQYXJhbXMsIGF0dHJpYnV0ZU5hbWU/OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIGlmIChhdHRyaWJ1dGVOYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3VycmVudFNjcmlwdCEuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpIHx8IHNjcmlwdFBhcmFtZXRlcnMuZ2V0KHBhcmFtZXRlck5hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBzY3JpcHRQYXJhbWV0ZXJzLmdldChwYXJhbWV0ZXJOYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgfVxyXG59Il19
