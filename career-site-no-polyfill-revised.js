// this a revised version of code to include the function to hide cc-jobs-container by default 
// Date: 9/29/2024 - Franklin M. Tripole
// modified code at line - 780 
// modified code at line - 851

(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c)
                        return c(i, !0);
                    if (u)
                        return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND",
                    a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)
            o(t[i]);
        return o
    }
    return r
}
)()({
    1: [function (require, module, exports) {
        "use strict";
        /// <reference path='../commonInterfaces.d.ts' />
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.LogType = exports.SharingOptionTypeEnum = exports.FilterTypeEnum = exports.FieldTypeEnum = exports.ProviderTypeEnum = exports.SearchLayoutTypeEnum = exports.RequisitionListLayoutTypeEnum = void 0;
        var RequisitionListLayoutTypeEnum;
        (function (RequisitionListLayoutTypeEnum) {
            RequisitionListLayoutTypeEnum["list"] = "list";
            RequisitionListLayoutTypeEnum["tiles"] = "tiles";
        }
        )(RequisitionListLayoutTypeEnum = exports.RequisitionListLayoutTypeEnum || (exports.RequisitionListLayoutTypeEnum = {}));
        var SearchLayoutTypeEnum;
        (function (SearchLayoutTypeEnum) {
            SearchLayoutTypeEnum["top"] = "top";
            SearchLayoutTypeEnum["left"] = "left";
        }
        )(SearchLayoutTypeEnum = exports.SearchLayoutTypeEnum || (exports.SearchLayoutTypeEnum = {}));
        var ProviderTypeEnum;
        (function (ProviderTypeEnum) {
            ProviderTypeEnum["None"] = "none";
            ProviderTypeEnum["Youtube"] = "youtube";
        }
        )(ProviderTypeEnum = exports.ProviderTypeEnum || (exports.ProviderTypeEnum = {}));
        /**
 * Defined field types to display on results/details views.
 */
        var FieldTypeEnum;
        (function (FieldTypeEnum) {
            FieldTypeEnum["positionTitle"] = "positionTitle";
            FieldTypeEnum["secondaryLabel"] = "secondary-label";
            FieldTypeEnum["departmentName"] = "departmentName";
            FieldTypeEnum["location"] = "location";
            FieldTypeEnum["description"] = "description";
            FieldTypeEnum["datePosted"] = "datePosted";
        }
        )(FieldTypeEnum = exports.FieldTypeEnum || (exports.FieldTypeEnum = {}));
        /**
 * Defined filter types.
 */
        var FilterTypeEnum;
        (function (FilterTypeEnum) {
            FilterTypeEnum["keywords"] = "keywords";
            FilterTypeEnum["department"] = "department";
            FilterTypeEnum["office"] = "office";
            FilterTypeEnum["location"] = "location";
            FilterTypeEnum["brand"] = "brand";
            FilterTypeEnum["postalCode"] = "postalCode";
            FilterTypeEnum["distance"] = "distance";
            FilterTypeEnum["distanceValue"] = "distanceValue";
            FilterTypeEnum["distanceUnit"] = "distanceUnit";
        }
        )(FilterTypeEnum = exports.FilterTypeEnum || (exports.FilterTypeEnum = {}));
        /**
 * Defined sharing option types.
 */
        var SharingOptionTypeEnum;
        (function (SharingOptionTypeEnum) {
            SharingOptionTypeEnum["linkedin"] = "LinkedIn";
            SharingOptionTypeEnum["twitter"] = "Twitter";
            SharingOptionTypeEnum["facebook"] = "Facebook";
            SharingOptionTypeEnum["sharableLink"] = "SharableLink";
        }
        )(SharingOptionTypeEnum = exports.SharingOptionTypeEnum || (exports.SharingOptionTypeEnum = {}));
        /**
 * Log severity types.
 * Corresponds to Microsoft.Extensions.Logging.LogLevels.
 */
        var LogType;
        (function (LogType) {
            LogType[LogType["trace"] = 0] = "trace";
            LogType[LogType["information"] = 2] = "information";
            LogType[LogType["warning"] = 3] = "warning";
            LogType[LogType["error"] = 4] = "error";
        }
        )(LogType = exports.LogType || (exports.LogType = {}));
    }
        , {}],
    2: [function (require, module, exports) {
        "use strict";
        /// <reference path="../commonInterfaces.d.ts">
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        const api_1 = require("./api");
        /**
 * Helpers for making HTTP requests
 */
        const data = {
            async http(request, init) {
                const response = await fetch(request, init);
                if (!response.ok) {
                    // TODO deal with the error somehow
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                return response.json().catch(() => undefined);
            },
            async get(request, options) {
                const init = Object.assign({
                    method: 'get'
                }, options);
                return await this.http(request, init);
            },
            async post(request, options) {
                const init = Object.assign({
                    method: 'post'
                }, options);
                return await this.http(request, init);
            }
        };
        /**
 * The default data service that makes API requests to the career site API
 */
        const defaultDataService = {
            previewSettings: (new URLSearchParams(window.location.search).get('preview')) != undefined,
            async getSettings(siteId) {
                const dataUrl = new URL(`https://careers-api.clearcompany.com/v1/settings/${siteId}`);
                if (this.previewSettings) {
                    dataUrl.searchParams.set('preview', 'true');
                }
                return data.get(dataUrl.toString());
            },
            async getJobs(siteId, params) {
                const dataUrl = new URL(`https://careers-api.clearcompany.com/v1/${siteId}`);
                Object.entries(params).forEach(([key, value]) => {
                    dataUrl.searchParams.set(key, value);
                }
                );
                if (this.previewSettings) {
                    dataUrl.searchParams.set('preview', 'true');
                }
                return data.get(dataUrl.toString());
            },
            async getJob(siteId, jobId, source) {
                const dataUrl = new URL(`https://careers-api.clearcompany.com/v1/${siteId}/${jobId}?source=${source}`);
                if (this.previewSettings) {
                    dataUrl.searchParams.set('preview', 'true');
                }
                return data.get(dataUrl.toString());
            },
            async getTeamMembers(jobId) {
                const dataUrl = new URL(`https://careers-api.clearcompany.com/v1/insights/team/${jobId}`);
                if (this.previewSettings) {
                    dataUrl.searchParams.set('preview', 'true');
                }
                return data.get(dataUrl.toString());
            },
            async getCompanyRole(orgId) {
                const dataUrl = new URL(`https://careers-api.clearcompany.com/v1/insights/${orgId}/company-role`);
                if (this.previewSettings) {
                    dataUrl.searchParams.set('preview', 'true');
                }
                return data.get(dataUrl.toString());
            }
        };
        class ClearCompanyJobs {
            constructor() {
                Object.defineProperty(this, "siteId", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "containerElement", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "insightsContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: undefined
                });
                Object.defineProperty(this, "aboutTheCompanyContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: undefined
                });
                Object.defineProperty(this, "filtersContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "shareResultsContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "jobPortalLinkContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "jobsContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "jobSearchContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: undefined
                });
                Object.defineProperty(this, "jobDetailsContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: undefined
                });
                Object.defineProperty(this, "meetTheTeamContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: undefined
                });
                Object.defineProperty(this, "teamMembersCollection", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "teamMembersLeftNav", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: undefined
                });
                Object.defineProperty(this, "teamMembersRightNav", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: undefined
                });
                Object.defineProperty(this, "teamMembersSkeleton", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "errorStateContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: undefined
                });
                Object.defineProperty(this, "skeletonContainer", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "settings", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "currentPageNumber", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: 1
                });
                Object.defineProperty(this, "jobId", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: undefined
                });
                Object.defineProperty(this, "jobModels", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: undefined
                });
                Object.defineProperty(this, "isStylesheetIncluded", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: false
                });
                Object.defineProperty(this, "filters", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: []
                });
                Object.defineProperty(this, "isValid", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: true
                });
                Object.defineProperty(this, "source", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                Object.defineProperty(this, "customFilters", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: []
                });
                Object.defineProperty(this, "openCustomSelect", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: null
                });
                Object.defineProperty(this, "dataService", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: void 0
                });
                if (!document.currentScript) {
                    return;
                }
                const validateElement = (element) => {
                    if (element === null || element === undefined) {
                        this.renderLoadPageError();
                        this.isValid = false;
                        return false;
                    }
                    return true;
                }
                    ;
                // if there's an alternate data service, use that instead of the default one.
                this.dataService = window.ccData || defaultDataService;
                const scriptUrl = new URL(document.currentScript.getAttribute('src').toLowerCase(), document.location.href);
                const scriptParameters = scriptUrl.searchParams;
                const getScriptAttribute = (parameterName, attributeName) => {
                    if (attributeName !== undefined) {
                        return document.currentScript.getAttribute(attributeName) || scriptParameters.get(parameterName);
                    } else {
                        return scriptParameters.get(parameterName);
                    }
                }
                    ;
                const siteId = getScriptAttribute('siteid', 'data-site-id');
                if (!validateElement(siteId)) {
                    return;
                }
                this.siteId = siteId;
                this.jobId = getScriptAttribute('jobid');
                const preview = getScriptAttribute('preview');
                if (preview !== null) {
                    this.dataService.previewSettings = (preview === 'true');
                }
                let contentSelector = getScriptAttribute('contentselector', 'data-content-selector');
                if (!contentSelector) {
                    // if there's no content selector, we'll append where we are, if we can
                    const parentElement = document.currentScript.parentElement;
                    if (parentElement) {
                        const className = 'cc-careers-script-container';
                        parentElement.classList.add(className);
                        contentSelector = `.${className}`;
                    }
                }
                if (!validateElement(contentSelector)) {
                    return;
                }
                const containerElement = document.querySelector(contentSelector);
                if (!validateElement(containerElement)) {
                    return;
                }
                this.containerElement = containerElement;
                const skeletonStyleEl = createHtmlElement('style', {
                    id: 'pre-settings-cc-skeleton-style'
                }, `
        .cc-skeleton {
            cursor: progress;
            height: 1em;
            margin-bottom: 20px;
            border-radius: .25em;
            background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 80% ), rgba(0,0,0,0.11);
            background-repeat: repeat-y;
            background-size: 50px 200px;
            background-position: 0 0;
            animation: gradient 2s infinite;
        }
        .cc-skeleton.filter {
            height: 120px;
        }

        @keyframes gradient {
            to {
                background-position: 100% 0, 0 0;
            }
        }
        @media (prefers-reduced-motion: reduce) {
            .cc-skeleton {
                background-image: none;
                animation: none;
            }
        }`);
                document.head.appendChild(skeletonStyleEl);
                const loaderAttributes = {
                    class: 'cc-skeleton job',
                    tabindex: 0,
                    role: 'progressbar',
                    'aria-hidden': true,
                    'aria-valuemin': 0,
                    'aria-valuemax': 100,
                    'aria-valuetext': 'Please wait..'
                };
                this.skeletonContainer = createHtmlElement('div', {
                    class: 'cc-skeleton-container'
                }, createHtmlElement('div', Object.assign(Object.assign({}, loaderAttributes), {
                    class: 'cc-skeleton filter'
                })), createHtmlElement('div', loaderAttributes), createHtmlElement('div', loaderAttributes), createHtmlElement('div', loaderAttributes), createHtmlElement('div', loaderAttributes), createHtmlElement('div', loaderAttributes), createHtmlElement('div', loaderAttributes));
                this.containerElement.appendChild(this.skeletonContainer);
                this.teamMembersSkeleton = createHtmlElement('div', Object.assign(Object.assign({}, loaderAttributes), {
                    class: 'cc-skeleton meet-the-team'
                }));
                this.parseUrlParams();
                if (this.source == undefined) {
                    // if source wasn't defined, see if the script has a default one specified
                    // this will allow clients to set a default source other than company job board for their careers page
                    const defaultSource = document.currentScript.getAttribute('data-default-source');
                    if (defaultSource) {
                        this.source = defaultSource;
                    } else {
                        // otherwise, default to company job board
                        this.source = 'CJB-0';
                    }
                }
            }
            /**
     * Loads the embedded career site content on the page in the containerElement.
     */
            async load() {
                if (!this.isValid) {
                    return;
                }
                // get the settings first so we can make sure we load everything in the correct style
                try {
                    this.settings = await this.dataService.getSettings(this.siteId);
                } catch (ex) {
                    // if settings return an error, display the load error
                    this.renderLoadPageError();
                    return;
                }
                this.logVisit();
                this.loadStyles();
                this.loadChatbot();
                // this event is triggered by the back and forward events when navigating browser history
                window.addEventListener('popstate', () => {
                    var _a, _b, _c;
                    const state = (_a = window.history.state) !== null && _a !== void 0 ? _a : {};
                    // iterate over each of the filters we have and update their value from the state (or reset what's not set)
                    for (const filter of this.customFilters) {
                        const filterName = filter.getAttribute('name');
                        const value = (_b = state[filterName]) !== null && _b !== void 0 ? _b : '';
                        const options = filter.getElementsByClassName('cc-custom-option');
                        for (const option of options) {
                            if (value == option.getAttribute('data-value')) {
                                this.handleSelectCustomOption(option, filterName);
                            }
                        }
                    }
                    for (const filter of this.filters) {
                        if (filter.classList.contains('native')) {
                            continue;
                        }
                        this.updateFilterValue((_c = state[filter.name]) !== null && _c !== void 0 ? _c : '', filter);
                    }
                    this.parseUrlParams();
                    if (this.jobId !== undefined && this.jobId !== null) {
                        this.loadJobDescription(this.jobId, false);
                    } else {
                        this.renderJobSearch(true);
                    }
                }
                );
                window.addEventListener('resize', () => {
                    var _a;
                    if (this.meetTheTeamContainer) {
                        this.meetTheTeamContainer.style.width = `${(_a = this.jobDetailsContainer) === null || _a === void 0 ? void 0 : _a.clientWidth}px`;
                    }
                }
                );
                this.addClickEventListeners();
                this.handleKeyboardEvents();
                // then finally render the appropriate content
                if (this.jobId !== undefined && this.jobId !== null) {
                    this.loadJobDescription(this.jobId, !this.dataService.previewSettings).then(() => {
                        this.toggleElement(this.skeletonContainer, false);
                        this.triggerPreviewLoadedEvent();
                    }
                    );
                } else {
                    this.renderJobSearch(true);
                }
            }
            /**
     * Dispatches the 'cc-preview-loaded' event if the preview flag is true in the current script.
     */
            triggerPreviewLoadedEvent() {
                if (this.dataService.previewSettings) {
                    window.dispatchEvent(new Event('cc-preview-loaded'));
                }
            }
            /**
     * Parses information from the query params so we can load the correct set of data
     */
            parseUrlParams() {
                // convert parameters to lowercase so we can do a case-insensitive lookup
                const urlParams = new URLSearchParams(window.location.search.toLowerCase());
                if (!this.jobId) {
                    this.jobId = urlParams.get('jobid') || undefined;
                }
                if (this.jobId) {
                    // job ids need to be uppercase, so convert back
                    this.jobId = this.jobId.toUpperCase();
                }
                const page = Number(urlParams.get('p'));
                if (isFinite(page) && page > 0) {
                    this.currentPageNumber = page;
                }
                // check for any source parameters so we can send it along with the API requests so we
                // get the correct apply URLs with the proper source attributed
                // TODO: DEV-15235 persist across browser sessions by saving to local storage
                const sources = ['jb', 'cs'];
                for (const source of sources) {
                    const urlSourceParam = urlParams.get(source);
                    if (urlSourceParam) {
                        this.source = `${source.toUpperCase()}-${urlSourceParam}`;
                        break;
                    }
                }
            }
            /**
     * Logs a message to the logging controller.
     * @param type - The type of log to send.
     * @param message - The message to log.
     * @param ex - Optional. The exception to log.
     */
            log(type, message, ex) {
                try {
                    const logUrl = `https://careers-api.clearcompany.com/v1/logging/${this.siteId}`;
                    const logRequest = {
                        logType: type,
                        message: message,
                        exceptionName: ex === null || ex === void 0 ? void 0 : ex.name,
                        stackTrace: ex === null || ex === void 0 ? void 0 : ex.stack
                    };
                    const httpHeaders = {
                        'Content-Type': 'application/json'
                    };
                    const headers = new Headers(httpHeaders);
                    data.post(logUrl, {
                        headers: headers,
                        body: JSON.stringify(logRequest)
                    });
                } catch (ex) {// Logging failed, but don't stop page load
                }
            }
            /**
     * Logs the visit to the career site, maximum of once per day.
     */
            logVisit() {
                // Log the visitor info if the HasVisited cookie does not exist
                try {
                    const orgId = this.settings.orgId;
                    const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith(`OrgId=${orgId}`));
                    if (!cookieExists) {
                        const logUrl = `https://careers-api.clearcompany.com/v1/logging/${this.siteId}/visit`;
                        data.get(logUrl);
                        // Create a HasVisited cookie that will expire at midnight to prevent any more logging requests today
                        const tomorrow = new Date();
                        tomorrow.setHours(0, 0, 0, 0);
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        document.cookie += `OrgId=${orgId};expires=${tomorrow.toUTCString()};`;
                    }
                } catch (ex) {// Logging failed, but don't stop page load
                }
            }
            /**
     * Loads the correct stylesheet into the DOM
     */
            loadStyles() {
                const layoutStylesheetLink = createHtmlElement('link', {
                    id: 'cc-embedded-stylesheet',
                    type: 'text/css',
                    rel: 'stylesheet',
                    href: `https://careers-content.clearcompany.com/css/${this.settings.stylesheetRelativeUrl}`
                });
                // prepend our stylesheet so that the client's overrides will more likely win
                document.head.prepend(layoutStylesheetLink);
                this.isStylesheetIncluded = true;
            }
            /**
     * Loads chatbot widget
     */
            async loadChatbot() {
                try {
                    const response = await fetch(`https://careers-api.clearcompany.com/v1/chatbot/${this.siteId}/is-available`);
                    if (response.status === 200) {
                        const isChatbotAvailable = await response.json();
                        if (isChatbotAvailable) {
                            const chatbotLink = createHtmlElement('script', {
                                id: 'cc-chatbot-widget',
                                type: 'module',
                                src: `https://careers-chatbot-content.clearcompany.com/chatbot.js?siteId=${this.siteId}&source=${this.source}`
                            });
                            document.head.append(chatbotLink);
                            const chatbotStyles = createHtmlElement('link', {
                                id: 'cc-chatbot-stylesheet',
                                type: 'text/css',
                                rel: 'stylesheet',
                                href: 'https://careers-chatbot-content.clearcompany.com/chatbot.css'
                            });
                            document.head.append(chatbotStyles);
                        }
                    }
                } catch (_a) {
                    console.error('Chatbot cannot load');
                }
            }
            /**
     * Removes the current type, image, title, and url meta tags.
     */
            removeShareMetaTags() {
                // delete current social sharing meta tags, if they exist
                const currentOgTypeTag = document.getElementById('og-type-tag');
                const currentOgImageTag = document.getElementById('og-image-tag');
                const currentOgTitleTag = document.getElementById('og-title-tag');
                const currentOgUrlTag = document.getElementById('og-url-tag');
                currentOgTypeTag === null || currentOgTypeTag === void 0 ? void 0 : currentOgTypeTag.remove();
                currentOgImageTag === null || currentOgImageTag === void 0 ? void 0 : currentOgImageTag.remove();
                currentOgTitleTag === null || currentOgTitleTag === void 0 ? void 0 : currentOgTitleTag.remove();
                currentOgUrlTag === null || currentOgUrlTag === void 0 ? void 0 : currentOgUrlTag.remove();
            }
            /**
     * Adds type, image, title, and url meta tags to specify social sharing info.
     * @param jobTitle - The title of the job being loaded, or 'Careers' if the job search is being loaded.
     * @param currentUrl - The url of the page being loaded.
     */
            addShareMetaTags(jobTitle, currentUrl) {
                // add meta tag to define title of page to display in social post
                const ogTitleTag = createHtmlElement('meta', {
                    id: 'og-title-tag',
                    property: 'og:title',
                    content: jobTitle + ' at ' + this.settings.brandFullName
                });
                document.head.prepend(ogTitleTag);
                // add meta tag to define url that will be linked in social post
                const ogUrlTag = createHtmlElement('meta', {
                    id: 'og-url-tag',
                    property: 'og:url',
                    content: currentUrl
                });
                document.head.prepend(ogUrlTag);
                // add meta tag to define type of page
                const ogTypeTag = createHtmlElement('meta', {
                    id: 'og-type-tag',
                    property: 'og:type',
                    content: 'article'
                });
                document.head.prepend(ogTypeTag);
                // add meta tag to define url of image to display in social post
                const ogImageTag = createHtmlElement('meta', {
                    id: 'og-image-tag',
                    property: 'og:image',
                    content: this.settings.socialSharingLogoUrl
                });
                document.head.prepend(ogImageTag);
            }
            /**
     * Click event delegator
     */
            addClickEventListeners() {
                document.addEventListener('click', (event) => {
                    var _a, _b, _c;
                    let eventTarget = event.target;
                    // if it's not an element, we don't care so exit
                    if (!eventTarget) {
                        return;
                    }
                    // if its not a clickable element exit early
                    eventTarget = eventTarget.closest('.cc-clickable');
                    if (!eventTarget) {
                        this.closeCustomSelect();
                        return;
                    }

                    // this is something we want to care about, so prevent default and stop propagation
                    event.preventDefault();
                    event.stopPropagation();
                    if (eventTarget.matches('.cc-left-arrow')) {
                        const scrollAmount = this.teamMembersCollection.children.length > 0 ? this.teamMembersCollection.children[0].clientWidth : 0;
                        this.teamMembersCollection.scrollBy({
                            top: 0,
                            left: -scrollAmount,
                            behavior: 'smooth'
                        });
                        if (this.teamMembersLeftNav && this.teamMembersRightNav) {
                            if (this.teamMembersCollection.scrollLeft <= scrollAmount) {
                                this.teamMembersLeftNav.classList.add('cc-nav-disabled');
                                this.teamMembersLeftNav.classList.remove('cc-clickable');
                            }
                            this.teamMembersRightNav.classList.remove('cc-nav-disabled');
                            this.teamMembersRightNav.classList.add('cc-clickable');
                        }
                        return;
                    }
                    if (eventTarget.matches('.cc-right-arrow')) {
                        const scrollAmount = this.teamMembersCollection.children.length > 0 ? this.teamMembersCollection.children[0].clientWidth : 0;
                        this.teamMembersCollection.scrollBy({
                            top: 0,
                            left: scrollAmount,
                            behavior: 'smooth'
                        });
                        if (this.teamMembersLeftNav && this.teamMembersRightNav) {
                            // How far the collection is already scrolled to the left (which happens when the user clicks the RIGHT arrow)
                            const scrollLeft = this.teamMembersCollection.scrollLeft;
                            // The maximum amount the collection can scroll to the left and still fill the viewable container
                            const maxScrollLeft = ((_a = this.teamMembersCollection.scrollWidth) !== null && _a !== void 0 ? _a : 0) - ((_b = this.teamMembersCollection.clientWidth) !== null && _b !== void 0 ? _b : 0);
                            // If any further scrolling would exceed the maximum amount, we should disable the option to scroll any further
                            if ((scrollLeft + scrollAmount) >= maxScrollLeft) {
                                this.teamMembersRightNav.classList.add('cc-nav-disabled');
                                this.teamMembersRightNav.classList.remove('cc-clickable');
                            }
                            this.teamMembersLeftNav.classList.remove('cc-nav-disabled');
                            this.teamMembersLeftNav.classList.add('cc-clickable');
                        }
                        return;
                    }
                    if (eventTarget.matches('.cc-page-control')) {
                        this.handleOnClickPageControl(eventTarget);
                        return;
                    }
                        // injected code 
                    /* to show and load the jobs container when submit button is clicked and if the the form is not empty Franklin Tripole 9/26/2024 */
                    if (eventTarget.matches('#cc-submit-search-button-id')) {

                        const keywordsInput = document.querySelector('#cc-filter-keywords');
                        const locationSelect = document.querySelector('.cc-filter-dropdown');
                        const departmentSelect = document.querySelector('.cc-filter-department-input');
                        const distanceSelect = document.querySelector('.cc-filter-distance-input');
                        const postalSelect = document.querySelector('#cc-filter-postalcode-input-id');
                        const jobsContainer = document.querySelector('.cc-jobs-container');

                        if ((keywordsInput && keywordsInput.value.trim() !== '')) {

                            if (jobsContainer) {
                                jobsContainer.style.display = 'block'; // Show the jobs container
                                this.loadJobs(1);
                            }
                            return;
                        }

                        if ((locationSelect && locationSelect.value.trim() !== '')) {

                            if (jobsContainer) {
                                jobsContainer.style.display = 'block'; // Show the jobs container
                                this.loadJobs(1); // Load jobs after showing the container
                            }
                            return;
                        }

                        if ((departmentSelect && departmentSelect.value.trim() !== '')) {

                            if (jobsContainer) {
                                jobsContainer.style.display = 'block';
                                this.loadJobs(1);
                            }
                            return;
                        }

                        if ((distanceSelect && distanceSelect.value.trim() !== '')) {

                            if (jobsContainer) {
                                jobsContainer.style.display = 'block';
                                this.loadJobs(1);
                            }
                            return;
                        }

                        if ((postalSelect && postalSelect.value.trim() !== '')) {

                            if (jobsContainer) {
                                jobsContainer.style.display = 'block';
                                this.loadJobs(1);
                            }
                            return;
                        }
                        return;
                    }

                    if (eventTarget.matches('#cc-reset-search-button-id')) {
                        // reset the filters so that the call to loadJobs will load the correct set
                        for (const filter of this.customFilters) {
                            const filterName = filter.getAttribute('name');
                            this.handleSelectCustomOption(filter.getElementsByClassName('cc-custom-option')[0], filterName);
                        }
                        for (const filter of this.filters) {
                            if (filter.classList.contains('native')) {
                                continue;
                            }
                            this.updateFilterValue('', filter);
                        }
                        this.loadJobs(1);
                        // to hide the jobs container when reset filter button is clicked - Franklin Tripole 9/27/2024
                        const jobsContainer = document.querySelector('.cc-jobs-container');
                        if (jobsContainer) {
                            jobsContainer.style.display = 'none'; // hide the jobs container 
                        }
                        return;
                    }
                    if (eventTarget.matches('.cc-job-title') || eventTarget.matches('.cc-secondary-label')) {
                        this.handleClickOnJob(eventTarget);
                        return;
                    }
                    if (eventTarget.matches('#cc-copy-url-link-id') || eventTarget.matches('#cc-copy-url-logo-id')) {
                        if (navigator && navigator.clipboard) {
                            navigator.clipboard.writeText(window.location.href);
                            const copiedMessage = eventTarget.querySelector('.copied-message');
                            if (copiedMessage) {
                                copiedMessage.classList.remove('cc-hidden');
                                copiedMessage.setAttribute('aria-hidden', 'false');
                                setTimeout(() => {
                                    copiedMessage.classList.add('cc-hidden');
                                    copiedMessage.setAttribute('aria-hidden', 'true');
                                }
                                    , 1000);
                            }
                        }
                    }
                    if (eventTarget.matches('.cc-back-to-jobs-button')) {
                        this.handleClickBackToJobs();
                        return;
                    }
                    if (eventTarget.matches('#cc-copy-email-btn-id')) {
                        if (navigator && navigator.clipboard) {
                            const email = (_c = document.getElementById('cc-copy-email-id')) === null || _c === void 0 ? void 0 : _c.innerHTML;
                            navigator.clipboard.writeText(email !== null && email !== void 0 ? email : '');
                            const successLogo = createHtmlElement('img', {
                                class: 'cc-copy-email-logo',
                                src: 'https://careers-content.clearcompany.com/images/circle-check-solid.svg'
                            });
                            eventTarget.innerHTML = createHtmlElement('div', {}, successLogo, this.getText('apply.by-email.copy.success', undefined)).innerHTML;
                            eventTarget.classList.toggle('success', true);
                        }
                    }
                    if (eventTarget.matches('.cc-filter-dropdown.custom')) {
                        this.handleToggleCustomSelect(eventTarget);
                        return;
                    }
                    if (eventTarget.matches('.cc-custom-option')) {
                        this.handleSelectCustomOption(eventTarget);
                        this.closeCustomSelect();
                        return;
                    }
                }
                );
            }
            /**
     * Keyboard event delegator.
     */
            handleKeyboardEvents() {
                document.addEventListener('keydown', (event) => {
                    var _a, _b;
                    // get the current index to hover over in a dropdown if one is open.
                    const options = (_b = (_a = this.openCustomSelect) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('cc-custom-select-options')[0]) === null || _b === void 0 ? void 0 : _b.children;
                    let currentSelectHoverIndex = 0;
                    if (options) {
                        for (let i = 0; i < options.length; i++) {
                            const option = options[i];
                            if (option.classList.contains('isHover')) {
                                currentSelectHoverIndex = i;
                                break;
                            }
                        }
                    }
                    // press down -> go next
                    if (event.code === 'ArrowDown') {
                        if (options) {
                            event.preventDefault();
                            // move to the next option if possible
                            if (currentSelectHoverIndex < options.length - 1) {
                                options[currentSelectHoverIndex].classList.remove('isHover');
                                const newHoverOption = options[currentSelectHoverIndex + 1];
                                newHoverOption.classList.add('isHover');
                                newHoverOption.tabIndex = -1;
                                newHoverOption.focus();
                            }
                        }
                    }
                    // press up -> go previous
                    if (event.code === 'ArrowUp') {
                        if (options) {
                            event.preventDefault();
                            // prevent page scrolling
                            // move to the previous option if possible
                            if (currentSelectHoverIndex > 0) {
                                options[currentSelectHoverIndex].classList.remove('isHover');
                                const newHoverOption = options[currentSelectHoverIndex - 1];
                                newHoverOption.classList.add('isHover');
                                newHoverOption.tabIndex = -1;
                                newHoverOption.focus();
                            }
                        }
                    }
                    // press Enter or space
                    if (event.code === 'Enter' || event.code === 'Space') {
                        const eventSource = event.srcElement;
                        if (eventSource.classList.contains('cc-filter-dropdown') && eventSource.classList.contains('custom')) {
                            event.preventDefault();
                            this.handleToggleCustomSelect(document.activeElement);
                        } else if (this.openCustomSelect) {
                            event.preventDefault();
                            // -> select the option
                            const hoveredOption = this.openCustomSelect.getElementsByClassName('isHover')[0];
                            const value = hoveredOption && hoveredOption.getAttribute('data-value');
                            if (value) {
                                this.handleSelectCustomOption(hoveredOption);
                                this.openCustomSelect.focus();
                            }
                            this.closeCustomSelect();
                        }
                    }
                    // press ESC
                    if (event.code === 'Escape') {
                        // -> close selectCustom
                        this.closeCustomSelect();
                    }
                }
                );
            }
            /**
     * Loads the job search view
     * @param isFromBrowserAction - a flag indicating whether we are rendering based on a browser action (initial load, popstate) or from a user action
     */
            async renderJobSearch(isFromBrowserAction = false) {
                let isFirstLoad = false;
                if (this.jobSearchContainer === undefined) {
                    // this is the first time we're rendering the job search container, so make sure we load the correct layout
                    isFirstLoad = true;
                    this.filtersContainer = createHtmlElement('form', {
                        class: 'cc-filters-container'
                    });
                    this.shareResultsContainer = createHtmlElement('section', {
                        class: 'cc-share-container'
                    });
                    this.jobPortalLinkContainer = createHtmlElement('section', {
                        class: 'cc-job-portal-container'
                    });
                    const portalShareContainer = createHtmlElement('div', {
                        class: 'cc-portal-share-container'
                    }, this.jobPortalLinkContainer, this.shareResultsContainer);
                    this.jobsContainer = createHtmlElement('section', {
                        class: 'cc-jobs-container',
                        style: 'display:none;',
                        'aria-busy': true
                    });
                    this.jobSearchContainer = createHtmlElement('div', {
                        class: `cc-careers-container search-${this.settings.requisitionList.search.layoutType}`
                    }, this.filtersContainer, portalShareContainer, this.jobsContainer);
                    // render the insights, filters, etc only once since they won't be changing
                    const hasCustomSections = this.settings.requisitionList.insights.customSections && this.settings.requisitionList.insights.customSections.length > 0;
                    if (this.settings.requisitionList.insights.videoContentSettings.isEnabled || this.settings.requisitionList.insights.isAboutTheCompanyEnabled || hasCustomSections) {
                        await this.renderInsights();
                    }
                    if (this.settings.requisitionList.search.filters.length > 0) {
                        this.renderFilters();
                    } else {
                        this.toggleElement(this.filtersContainer, false);
                        this.jobSearchContainer.classList.add('no-filters');
                    }
                    this.renderJobPortalLink();
                    if (this.settings.requisitionList.sharing.isEnabled) {
                        this.renderShareSection(this.shareResultsContainer, this.settings.requisitionList.sharing.sharingOptions);
                    }
                    this.containerElement.prepend(this.jobSearchContainer);
                }
                // remove current social sharing meta tags
                this.removeShareMetaTags();
                // if social sharing is enabled for req list, add social sharing meta tags
                if (this.settings.requisitionList.sharing.isEnabled) {
                    this.addShareMetaTags('Careers', window.location.href.toString());
                }
                // toggle the visibility of the containers
                this.toggleElement(this.errorStateContainer, false);
                this.toggleElement(this.jobSearchContainer, !isFirstLoad);
                this.toggleElement(this.jobDetailsContainer, false);
                // if this isn't the initial load, we can exit early instead of executing the search
                if (!isFromBrowserAction && this.jobModels !== undefined) {
                    return;
                }
                // if the settings say to do an initial request, do the initial request
                if (this.settings.requisitionList.autoLoadJobs) {
                    this.loadJobs(this.currentPageNumber, !isFromBrowserAction).then(() => {
                        var _a;
                        this.toggleElement(this.jobSearchContainer, true);
                        this.toggleElement(this.skeletonContainer, false);
                        this.toggleElement(this.skeletonContainer.getElementsByClassName('filter')[0], false);
                        (_a = this.jobSearchContainer) === null || _a === void 0 ? void 0 : _a.appendChild(this.skeletonContainer);
                        this.triggerPreviewLoadedEvent();
                    }
                    );
                    this.jobsContainer.setAttribute('aria-busy', 'false');
                } else {
                    const emptyStateWelcomeMessage = createHtmlElement('div', {
                        class: 'cc-empty-state-message'
                    }, this.getText('search.results.empty-state.welcome', undefined));
                    this.jobsContainer.append(emptyStateWelcomeMessage);
                    this.triggerPreviewLoadedEvent();
                    this.toggleElement(this.jobSearchContainer, true);
                    this.toggleElement(this.skeletonContainer, false);
                    this.toggleElement(this.skeletonContainer.getElementsByClassName('filter')[0], false);
                }
            }
            /**
     * Toggles element visibility
     * @param element The element
     * @param isVisible A flag indicating whether the element should be visible
     */
            toggleElement(element, isVisible) {
                if (element === undefined) {
                    return;
                }
                if (isVisible) {
                    element.classList.remove('cc-hidden');
                } else {
                    element.classList.add('cc-hidden');
                }
            }
            /**
     * Renders an error when embedded content fails to load. The error can be for the job list
     * or for job description.
     * @param displayTextKey - the text dictionary key of the error message to display. undefined if settings did not load.
     * @param error - the error to optionally log to the console if defined
     */
            renderLoadError(displayTextKey, error) {
                // try to get error text values from settings, but use defaults if settings are undefined
                let errorTextValue;
                // also try to get the load error icon's aria label from the settings, but use defailts if settings are undefined
                let errorIconAriaLabel;
                if (displayTextKey === undefined) {
                    // no text key, so display a generic page load error that won't look in the settings which are undefined
                    errorTextValue = 'We are having trouble loading the page. Please try again later.';
                    errorIconAriaLabel = 'Load Error Icon';
                } else {
                    // display an error loading the jobs list or job description, so check settings for error text based on
                    // the displayTextKey. also use the load error icon label key get the aria-label for the image.
                    errorTextValue = this.getText(displayTextKey, undefined);
                    errorIconAriaLabel = this.getText('load-error-icon.label', undefined);
                }
                // load the css file for error styling only if the stylesheet has not been loaded
                // to avoid requesting a stylesheet multiple times.
                if (!this.isStylesheetIncluded) {
                    const layoutStylesheetLink = createHtmlElement('link', {
                        type: 'text/css',
                        rel: 'stylesheet',
                        href: 'https://careers-content.clearcompany.com/css/v1/list.css'
                    });
                    document.head.prepend(layoutStylesheetLink);
                }
                const errorIcon = createHtmlElement('img', {
                    class: 'cc-error-icon',
                    'aria-label': errorIconAriaLabel
                });
                const errorStateWrapper = createHtmlElement('div', {
                    class: 'cc-error-state',
                    tabIndex: 0
                }, errorIcon, errorTextValue);
                if (this.errorStateContainer === undefined) {
                    // create the error container if we haven't yet
                    this.errorStateContainer = createHtmlElement('section', {
                        class: 'cc-error-state-container'
                    });
                    if (this.containerElement) {
                        this.containerElement.append(this.errorStateContainer);
                    } else {
                        document.body.append(this.errorStateContainer);
                    }
                }
                this.errorStateContainer.innerHTML = '';
                this.errorStateContainer.append(errorStateWrapper);
                if (error !== undefined) {
                    this.log(api_1.LogType.error, error.message, error);
                }
                // toggle the visibility of the containers
                this.toggleElement(this.jobSearchContainer, false);
                this.toggleElement(this.jobDetailsContainer, false);
                this.toggleElement(this.errorStateContainer, true);
                this.toggleElement(this.skeletonContainer, false);
                this.triggerPreviewLoadedEvent();
            }
            /**
     * Render an error when the page fails to load before/during getting the settings.
     */
            renderLoadPageError() {
                this.renderLoadError(undefined, undefined);
            }
            /**
     * Render an error when the jobs list fails to load.
     * @param error - the error to render
     */
            renderLoadJobsError(error = undefined) {
                this.renderLoadError('jobs.load-error-text', error);
            }
            /**
     * Render an error when the job description fail to load.
     * @param error - the error to render
     */
            renderLoadJobDescriptionError(error = undefined) {
                this.renderLoadError('details.load-error-text', error);
            }
            /**
    * Handles when a user clicks on a specific job
    * @param currentTarget - the target element for the click event
    */
            async handleClickOnJob(currentTarget) {
                const jobId = currentTarget.getAttribute('data-id');
                if (jobId !== null) {
                    await this.loadJobDescription(jobId, !this.dataService.previewSettings);
                }
            }
            /**
     * Handles when a user clicks on the button to go back to the jobs list from a job description
     * @param currentTarget - the target element for the click event
     */
            async handleClickBackToJobs() {
                this.jobId = undefined;
                // update url
                const url = new URL(window.location.href);
                url.searchParams.delete('jobId');
                window.history.pushState({}, document.title, url);
                this.renderJobSearch();
            }
            /**
     * Fetches the chosen job and renders the details
     * @param jobId - the id of the job
     * @param updateBrowserState a flag indicating whether we should update the browser history as part of the loading process
     */
            async loadJobDescription(jobId, updateBrowserState = true) {
                try {
                    let jobDetails = undefined;
                    // check if we already have the jobModel loaded
                    if (this.jobModels !== undefined) {
                        jobDetails = this.jobModels.find(job => {
                            return job.id === jobId;
                        }
                        );
                    }
                    // if we don't have the job model fetch it from the API
                    if (jobDetails === undefined) {
                        jobDetails = await this.dataService.getJob(this.siteId, jobId, this.source);
                    }
                    if (updateBrowserState) {
                        // update url
                        const url = new URL(window.location.href);
                        url.searchParams.set('jobId', jobId);
                        window.history.pushState({}, document.title, url);
                    }
                    this.renderJobDescription(jobDetails);
                    // remove current social sharing meta tags
                    this.removeShareMetaTags();
                    // if social sharing is enabled for req details, add social sharing meta tags
                    if (this.settings.requisitionDetails.sharing.isEnabled) {
                        const currentUrl = new URL(window.location.href);
                        currentUrl.searchParams.set('jobId', jobId);
                        this.addShareMetaTags(jobDetails.positionTitle, currentUrl.toString());
                    }
                } catch (ex) {
                    // if loading job description from api returns an error, display the load error.
                    this.renderLoadJobDescriptionError(ex);
                }
            }
            /**
     * Render job description details
     * @param job - model representing the job details
     */
            renderJobDescription(job) {
                if (this.jobDetailsContainer === undefined) {
                    this.jobDetailsContainer = createHtmlElement('div', {
                        class: 'cc-job-description-container'
                    });
                    this.containerElement.append(this.jobDetailsContainer);
                }
                // clear out whatever we had before, we'll always build from scratch
                this.jobDetailsContainer.innerHTML = '';
                const leftArrow = createHtmlElement('img', {
                    src: 'https://careers-content.clearcompany.com/images/angle-left-solid.svg',
                    class: 'cc-clickable',
                    'aria-hidden': true
                });
                const backText = createHtmlElement('span', undefined, this.getText('details.back-to-jobs-button-text', undefined));
                const backToJobsUrl = new URL(window.location.href);
                backToJobsUrl.searchParams.delete('jobId');
                const backToJobsButton = createHtmlElement('a', {
                    class: 'cc-back-to-jobs-button cc-clickable',
                    href: backToJobsUrl.toString()
                }, leftArrow, backText);
                this.jobDetailsContainer.append(backToJobsButton);
                const jobTitle = createHtmlElement('div', {
                    class: 'cc-job-description-title'
                }, job.positionTitle);
                this.jobDetailsContainer.append(jobTitle);
                const isLocationVisible = this.settings.requisitionDetails.displayFields.includes(api_1.FieldTypeEnum.location);
                const isDatePostedVisible = this.settings.requisitionDetails.displayFields.includes(api_1.FieldTypeEnum.datePosted);
                if (isLocationVisible || isDatePostedVisible) {
                    const secondaryLabels = this.getJobDetailsSecondaryLabels(job, 'cc-job-description-secondary-label cc-job-description-location cc-job-description-mobile-border', isLocationVisible, isDatePostedVisible);
                    secondaryLabels.forEach((secondaryLabel) => {
                        var _a;
                        (_a = this.jobDetailsContainer) === null || _a === void 0 ? void 0 : _a.append(secondaryLabel);
                    }
                    );
                } else {
                    // if the secondary label is not displayed, add the cc-job-description-mobile-border class to the title
                    // to get the gray line to display between the header and apply button for mobile browsers.
                    jobTitle.classList.add('cc-job-description-mobile-border');
                }
                let applySection;
                if (job.applyLink.includes('@')) {
                    // this is a email-to-apply job
                    const header = createHtmlElement('span', {
                        class: 'cc-email-apply-header'
                    }, this.getText('apply.by-email.header', undefined));
                    const applyBtnSection = createHtmlElement('div', {
                        class: 'cc-email-apply-inner'
                    });
                    const mailtoString = 'mailto:';
                    const additionalMailToOptions = '?subject=' + this.getText('apply.by-email.subject', undefined) + '&body=' + this.getText('apply.by-email.body', undefined);
                    const mailToLink = mailtoString + job.applyLink + additionalMailToOptions;
                    const emailMailtoElement = createHtmlElement('a', {
                        id: 'cc-copy-email-id',
                        class: 'cc-mailto-btn',
                        href: mailToLink
                    }, job.applyLink);
                    applyBtnSection.appendChild(emailMailtoElement);
                    if (navigator && navigator.clipboard) {
                        const copyUrlLogo = createHtmlElement('img', {
                            class: 'cc-copy-email-logo',
                            src: 'https://careers-content.clearcompany.com/images/copy-solid.svg'
                        });
                        const copyUrlBtn = createHtmlElement('a', {
                            id: 'cc-copy-email-btn-id',
                            class: 'cc-copy-email-btn cc-clickable'
                        }, copyUrlLogo, this.getText('apply.by-email.copy', undefined));
                        applyBtnSection.appendChild(copyUrlBtn);
                    }
                    applySection = createHtmlElement('div', {
                        class: 'cc-email-apply'
                    }, header, createHtmlElement('span', {}, this.getText('apply.by-email.inner', undefined)), applyBtnSection);
                } else {
                    const applyText = job.canSelfSchedule ? 'apply.by-url.schedule' : 'apply.by-url';
                    applySection = createHtmlElement('a', {
                        href: job.applyLink,
                        class: 'cc-apply-button link-button',
                        target: '_blank'
                    }, this.getText(applyText, undefined));
                }
                const applyShareContainer = createHtmlElement('div', {
                    class: 'cc-apply-share-container'
                }, applySection);
                this.jobDetailsContainer.append(applyShareContainer);
                if (this.settings.requisitionDetails.sharing.isEnabled) {
                    const shareContainer = createHtmlElement('div', {
                        class: 'cc-share-container'
                    });
                    applyShareContainer.append(shareContainer);
                    this.renderShareSection(shareContainer, this.settings.requisitionDetails.sharing.sharingOptions);
                }
                const descriptionText = createHtmlElement('div', {
                    class: 'cc-job-description-text'
                });
                // job description is expected to be HTML, and we will do any sanitization during the indexing process so that
                // we can trust what we are getting from our own API
                descriptionText.innerHTML = job.description;
                this.jobDetailsContainer.append(descriptionText);
                const secondApplyButton = applySection.cloneNode(true);
                this.jobDetailsContainer.append(secondApplyButton);
                // render the meet the team insights section
                if (this.settings.requisitionDetails.insights.isMeetTheTeamEnabled) {
                    this.renderMeetTheTeam(job.id);
                } else {
                    this.toggleElement(this.meetTheTeamContainer, false);
                }
                // toggle the visibility of the containers
                this.toggleElement(this.errorStateContainer, false);
                this.toggleElement(this.jobSearchContainer, false);
                this.toggleElement(this.jobDetailsContainer, true);
            }
            /**
     * Render the meet the team insights section
     * @param jobId - the job id to load team members for
     */
            async renderMeetTheTeam(jobId) {
                var _a, _b;
                if (this.teamMembersLeftNav === undefined) {
                    const leftArrowPath = createSvgElement('path', {
                        d: 'M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z'
                    });
                    const leftArrow = createSvgElement('svg', {
                        viewBox: '0 0 448 512',
                        class: 'cc-team-nav-arrow'
                    }, leftArrowPath);
                    this.teamMembersLeftNav = createHtmlElement('button', {
                        class: 'cc-left-arrow cc-team-nav-button cc-nav-disabled'
                    }, leftArrow);
                } else {
                    this.teamMembersLeftNav.classList.add('cc-nav-disabled');
                    this.teamMembersLeftNav.classList.remove('cc-clickable');
                }
                if (this.teamMembersRightNav === undefined) {
                    const rightArrowPath = createSvgElement('path', {
                        d: 'M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z'
                    });
                    const rightArrow = createSvgElement('svg', {
                        viewBox: '0 0 448 512',
                        class: 'cc-team-nav-arrow'
                    }, rightArrowPath);
                    this.teamMembersRightNav = createHtmlElement('button', {
                        class: 'cc-right-arrow cc-clickable cc-team-nav-button'
                    }, rightArrow);
                } else {
                    this.teamMembersRightNav.classList.remove('cc-nav-disabled');
                    this.teamMembersRightNav.classList.add('cc-clickable');
                }
                const meetTheTeamTitle = createHtmlElement('div', {
                    class: 'cc-meet-the-team-title'
                }, this.getText('insights.meet-the-team.title', undefined));
                const meetTheTeamNav = createHtmlElement('div', {
                    class: 'cc-meet-the-team-nav'
                }, this.teamMembersLeftNav, this.teamMembersRightNav);
                const meetTheTeamHeader = createHtmlElement('div', {
                    class: 'cc-meet-the-team-header'
                }, meetTheTeamTitle, meetTheTeamNav);
                this.teamMembersCollection = createHtmlElement('div', {
                    class: 'cc-team-members-collection'
                });
                const teamMembersContainer = createHtmlElement('div', {
                    class: 'cc-team-members-container'
                }, this.teamMembersSkeleton);
                const meetTheTeamSection = createHtmlElement('section', {
                    class: 'cc-team-members-section'
                }, meetTheTeamHeader, teamMembersContainer);
                this.meetTheTeamContainer = createHtmlElement('div', {
                    class: 'cc-meet-the-team-container'
                }, meetTheTeamSection);
                (_a = this.jobDetailsContainer) === null || _a === void 0 ? void 0 : _a.append(this.meetTheTeamContainer);
                if (jobId) {
                    this.toggleElement(this.teamMembersSkeleton, true);
                    const teamMembers = await this.dataService.getTeamMembers(jobId);
                    this.toggleElement(this.teamMembersSkeleton, false);
                    const modifierClass = `cc-team-count-${teamMembers.length}`;
                    meetTheTeamNav.classList.add(modifierClass);
                    if (teamMembers.length < 2) {
                        this.toggleElement(meetTheTeamNav, false);
                    }
                    teamMembers.forEach(teamMember => {
                        this.renderTeamMember(this.teamMembersCollection, teamMember, modifierClass);
                    }
                    );
                    teamMembersContainer.append(this.teamMembersCollection);
                    this.meetTheTeamContainer.style.width = `${(_b = this.jobDetailsContainer) === null || _b === void 0 ? void 0 : _b.clientWidth}px`;
                }
            }
            /**
     * Render an individual team member
     * @param teamContainer - the container to add the team member to
     * @param teamMember - the team member data
     * @param modifierClass - a css class to apply to the team member container
     */
            renderTeamMember(teamContainer, teamMember, modifierClass) {
                const teamMemberProfile = createHtmlElement('div', {
                    class: 'cc-team-member-profile'
                });
                const teamMemberImage = createHtmlElement('div', {
                    class: 'cc-team-member-image'
                });
                if (teamMember.profileImage) {
                    const teamMemberPhoto = createHtmlElement('img', {
                        class: 'cc-team-member-photo',
                        src: 'data:image/jpeg;base64,' + teamMember.profileImage
                    });
                    teamMemberImage.append(teamMemberPhoto);
                } else {
                    const teamMemberInitials = createHtmlElement('span', {
                        class: 'cc-team-member-initials'
                    }, teamMember.initials);
                    teamMemberImage.append(teamMemberInitials);
                }
                teamMemberProfile.append(teamMemberImage);
                if (teamMember.displayName) {
                    const teamMemberName = createHtmlElement('div', {
                        class: 'cc-team-member-name'
                    }, teamMember.displayName);
                    teamMemberProfile.append(teamMemberName);
                    if (!teamMember.funFact && this.dataService.previewSettings) {
                        teamMember.funFact = this.getText('insights.empty-fun-fact.preview', {
                            name: teamMember.displayName
                        });
                    }
                }
                if (teamMember.roleName) {
                    const teamMemberRole = createHtmlElement('div', {
                        class: 'cc-team-member-role'
                    }, teamMember.roleName);
                    teamMemberProfile.append(teamMemberRole);
                }
                const teamMemberAttributesContainer = createHtmlElement('div', {
                    class: 'cc-team-member-attributes'
                });
                const attributeClass = 'cc-team-member-attribute' + (teamMember.funFact ? ' cc-inline-block' : '');
                if (teamMember.joinDate) {
                    const teamMemberJoinContainer = createHtmlElement('div', {
                        class: attributeClass
                    });
                    const teamMemberJoinLabel = createHtmlElement('div', {
                        class: 'cc-team-member-attribute-label'
                    }, 'Joined');
                    teamMemberJoinContainer.append(teamMemberJoinLabel);
                    const teamMemberJoin = createHtmlElement('div', {
                        class: 'cc-team-member-attribute-value'
                    }, teamMember.joinDate);
                    teamMemberJoinContainer.append(teamMemberJoin);
                    teamMemberAttributesContainer.append(teamMemberJoinContainer);
                } else if (!teamMember.funFact) {
                    const attributeSpacer = createHtmlElement('div', {
                        class: 'cc-attribute-spacer'
                    });
                    teamMemberAttributesContainer.append(attributeSpacer);
                }
                if (teamMember.workLocation) {
                    const teamMemberLocationContainer = createHtmlElement('div', {
                        class: attributeClass
                    });
                    const teamMemberLocationLabel = createHtmlElement('div', {
                        class: 'cc-team-member-attribute-label'
                    }, 'Location');
                    teamMemberLocationContainer.append(teamMemberLocationLabel);
                    const teamMemberLocation = createHtmlElement('div', {
                        class: 'cc-team-member-attribute-value'
                    }, teamMember.workLocation);
                    teamMemberLocationContainer.append(teamMemberLocation);
                    teamMemberAttributesContainer.append(teamMemberLocationContainer);
                }
                teamMemberProfile.append(teamMemberAttributesContainer);
                if (teamMember.funFact) {
                    const teamMemberFunFactContainer = createHtmlElement('div', {
                        class: 'cc-team-member-fun-fact'
                    });
                    const teamMemberFunFact = createHtmlElement('span', {}, teamMember.funFact);
                    teamMemberFunFactContainer.append(teamMemberFunFact);
                    teamMemberProfile.append(teamMemberFunFactContainer);
                }
                const teamMemberSpacer = createHtmlElement('div', {
                    class: 'cc-team-member-spacer'
                }, teamMemberProfile);
                const teamMemberContainerClass = `cc-team-member-container${this.dataService.previewSettings ? '-preview' : ''}`;
                const teamMemberContainer = createHtmlElement('div', {
                    class: `${teamMemberContainerClass} ${modifierClass}`
                }, teamMemberSpacer);
                teamContainer.append(teamMemberContainer);
            }
            /**
     * Render the insights section
     */
            async renderInsights() {
                var _a, _b;
                this.insightsContainer = createHtmlElement('div', {
                    class: 'cc-insights-container'
                });
                // render about the company section if video OR mission/vision/values is enabled
                if (this.settings.requisitionList.insights.videoContentSettings.isEnabled || this.settings.requisitionList.insights.isAboutTheCompanyEnabled) {
                    await this.renderAboutTheCompanyInsights();
                }
                const customSections = this.settings.requisitionList.insights.customSections;
                if (customSections && customSections.length > 0) {
                    this.renderCustomSections(customSections);
                }
                if (this.settings.requisitionList.search.layoutType === api_1.SearchLayoutTypeEnum.left) {
                    (_a = this.jobSearchContainer) === null || _a === void 0 ? void 0 : _a.classList.add('include-insights');
                }
                (_b = this.jobSearchContainer) === null || _b === void 0 ? void 0 : _b.prepend(this.insightsContainer);
            }
            /**
     * Render the About the Company portion of the insights section
     */
            async renderAboutTheCompanyInsights() {
                var _a;
                const insightsSettings = this.settings.requisitionList.insights;
                // create container section
                this.aboutTheCompanyContainer = createHtmlElement('section', {
                    class: 'cc-about-the-company-container cc-widget-container'
                });
                // always add title of section
                const aboutTheCompanyTitle = createHtmlElement('span', {
                    class: 'cc-about-the-company-title cc-widget-title',
                    id: 'cc-about-the-company-title'
                });
                aboutTheCompanyTitle.innerHTML = this.getText('insights.about-the-company.title', undefined);
                this.aboutTheCompanyContainer.append(aboutTheCompanyTitle);
                // if video is enabled, add iframe for youtube video embed
                if (insightsSettings.videoContentSettings.isEnabled) {
                    const introVideoContainer = createHtmlElement('section', {
                        class: 'cc-intro-video-container'
                    });
                    const introVideoEmbed = createHtmlElement('iframe', {
                        class: 'cc-intro-video-embed',
                        id: 'cc-intro-video-embed',
                        type: 'text/html',
                        src: this.settings.requisitionList.insights.videoContentSettings.url,
                        frameborder: 0
                    });
                    introVideoContainer.append(introVideoEmbed);
                    this.aboutTheCompanyContainer.append(introVideoContainer);
                }
                // if mission/vision/values is enabled, add them to the section
                let includeMission;
                let includeVision;
                let includeValues;
                if (insightsSettings.isAboutTheCompanyEnabled) {
                    const companyRole = await this.dataService.getCompanyRole(this.settings.orgId);
                    includeMission = this.dataService.previewSettings || companyRole.companyMission;
                    includeVision = this.dataService.previewSettings || companyRole.companyVision;
                    includeValues = this.dataService.previewSettings || (companyRole.companyValues && companyRole.companyValues.length);
                    const missionVisionValuesContainer = createHtmlElement('section', {
                        class: 'cc-mission-vision-values-container'
                    });
                    if (includeMission) {
                        const missionTitle = createHtmlElement('span', {
                            class: 'title'
                        }, this.getText('insights.about-the-company.mission', undefined));
                        const missionContent = companyRole.companyMission ? createHtmlElement('span', {
                            class: 'content'
                        }, companyRole.companyMission) : createHtmlElement('span', {
                            class: 'cc-missing-objective'
                        }, this.getText('insights.about-the-company.missing-objective', {
                            'objective': 'Mission'
                        }));
                        const missionContainer = createHtmlElement('div', {
                            class: 'cc-org-objective',
                            id: 'cc-mission-container'
                        }, missionTitle, missionContent);
                        missionVisionValuesContainer.append(missionContainer);
                    }
                    if (includeVision) {
                        const visionTitle = createHtmlElement('span', {
                            class: 'title'
                        }, this.getText('insights.about-the-company.vision', undefined));
                        const visionContent = companyRole.companyVision ? createHtmlElement('span', {
                            class: 'content'
                        }, companyRole.companyVision) : createHtmlElement('span', {
                            class: 'cc-missing-objective'
                        }, this.getText('insights.about-the-company.missing-objective', {
                            'objective': 'Vision'
                        }));
                        const visionContainer = createHtmlElement('div', {
                            class: 'cc-org-objective',
                            id: 'cc-vision-container'
                        }, visionTitle, visionContent);
                        missionVisionValuesContainer.append(visionContainer);
                    }
                    if (includeValues) {
                        const valuesTitle = createHtmlElement('span', {
                            class: 'title'
                        }, this.getText('insights.about-the-company.values', undefined));
                        const valuesContainer = createHtmlElement('div', {
                            class: 'cc-org-objective',
                            id: 'cc-values-container'
                        }, valuesTitle);
                        if (companyRole.companyValues && companyRole.companyValues.length) {
                            const valuesListContainer = createHtmlElement('div', {
                                class: 'cc-values'
                            });
                            companyRole.companyValues.map((value) => {
                                valuesListContainer.append(createHtmlElement('span', {
                                    'class': 'cc-org-value'
                                }, value));
                            }
                            );
                            valuesContainer.append(valuesListContainer);
                        } else {
                            valuesContainer.append(createHtmlElement('span', {
                                class: 'cc-missing-objective'
                            }, this.getText('insights.about-the-company.missing-objective', {
                                'objective': 'Value'
                            })));
                        }
                        missionVisionValuesContainer.append(valuesContainer);
                    }
                    this.aboutTheCompanyContainer.append(missionVisionValuesContainer);
                }
                // bail before adding if insights and video are both empty, so title doesn't render for empty section
                if (!includeMission && !includeValues && !includeVision && !this.dataService.previewSettings && !insightsSettings.videoContentSettings.isEnabled) {
                    return;
                }
                // add section to insights container
                (_a = this.insightsContainer) === null || _a === void 0 ? void 0 : _a.append(this.aboutTheCompanyContainer);
            }
            /**
     * Renders the provided custom sections.
     * @param customSections - the set of custom sections to render
     */
            renderCustomSections(customSections) {
                customSections.forEach((customSection, customSectionIndex) => {
                    var _a;
                    const customSectionContainer = createHtmlElement('section', {
                        class: 'cc-custom-section-container cc-widget-container'
                    });
                    // add element for custom section's title
                    const customSectionTitle = createHtmlElement('span', {
                        class: 'cc-custom-section-title cc-widget-title',
                        id: 'cc-custom-section-title-' + customSectionIndex
                    });
                    customSectionTitle.innerText = customSection.title;
                    customSectionContainer.append(customSectionTitle);
                    // add element for custom section's content
                    const customSectionContent = createHtmlElement('div', {
                        class: 'cc-custom-section-content',
                        id: 'cc-custom-section-content-' + customSectionIndex
                    });
                    customSectionContent.innerText = customSection.content;
                    customSectionContainer.append(customSectionContent);
                    // add section to insights container
                    (_a = this.insightsContainer) === null || _a === void 0 ? void 0 : _a.append(customSectionContainer);
                }
                );
            }
            /**
     * Render Filter Options
     */
            renderFilters() {
                const filterLayout = this.settings.requisitionList.search.layoutType;
                this.filtersContainer.classList.add(`cc-filters-${filterLayout}`);
                const browserUrl = new URL(window.location.href);
                const filtersToInclude = this.settings.requisitionList.search.filters;
                if (filtersToInclude.includes(api_1.FilterTypeEnum.keywords)) {
                    this.renderKeywordsFilter(this.filtersContainer, browserUrl.searchParams.get(api_1.FilterTypeEnum.keywords));
                }
                // create containers for the filter options based on filter layout type
                let otherFiltersContainer = this.filtersContainer;
                if (filterLayout === 'top') {
                    // if we're doing a top filter layout, then we'll actually put the rest of the filters into a container
                    // so we can better control their layout. since left filters are all vertically stacked, we don't have to
                    // do this for the left layout.
                    otherFiltersContainer = createHtmlElement('div', {
                        class: 'cc-filter-group'
                    });
                    this.filtersContainer.append(otherFiltersContainer);
                }
                if (filtersToInclude.includes(api_1.FilterTypeEnum.location)) {
                    this.renderDropdownFilter(api_1.FilterTypeEnum.location, otherFiltersContainer, browserUrl.searchParams.get(api_1.FilterTypeEnum.location));
                }
                if (filtersToInclude.includes(api_1.FilterTypeEnum.office)) {
                    this.renderDropdownFilter(api_1.FilterTypeEnum.office, otherFiltersContainer, browserUrl.searchParams.get(api_1.FilterTypeEnum.office));
                }
                if (filtersToInclude.includes(api_1.FilterTypeEnum.department)) {
                    this.renderDropdownFilter(api_1.FilterTypeEnum.department, otherFiltersContainer, browserUrl.searchParams.get(api_1.FilterTypeEnum.department));
                }
                if (filtersToInclude.includes(api_1.FilterTypeEnum.brand)) {
                    this.renderDropdownFilter(api_1.FilterTypeEnum.brand, otherFiltersContainer, browserUrl.searchParams.get(api_1.FilterTypeEnum.brand));
                }
                if (filtersToInclude.includes(api_1.FilterTypeEnum.distance)) {
                    this.renderPostalCodeInputGroup(otherFiltersContainer, browserUrl.searchParams.get(api_1.FilterTypeEnum.postalCode), browserUrl.searchParams.get(api_1.FilterTypeEnum.distance));
                }
                this.renderSubmitResetButtons(otherFiltersContainer);
            }
            /**
     * Render text input search
     * @param elementContainer - the container to append the search input to
     * @param value - the current value
     */
            renderKeywordsFilter(elementContainer, value) {
                const searchInput = createHtmlElement('input', {
                    type: 'text',
                    class: `cc-filter-${api_1.FilterTypeEnum.keywords}`,
                    id: `cc-filter-${api_1.FilterTypeEnum.keywords}`,
                    name: api_1.FilterTypeEnum.keywords,
                    placeholder: this.getText(`search.filters.${api_1.FilterTypeEnum.keywords}.placeholder`, undefined),
                    'aria-label': this.getText(`search.filters.${api_1.FilterTypeEnum.keywords}.label`, undefined)
                });
                this.filters.push(searchInput);
                if (value) {
                    searchInput.value = value;
                }
                const searchWrapper = createHtmlElement('div', {
                    class: 'cc-keywords-wrapper'
                }, searchInput);
                elementContainer.append(searchWrapper);
            }
            /**
     * Renders a dropdown for filtering of the given jobs field.
     * @param filterFieldType - Jobs field we are filtering on
     * @param elementContainer - the container to append the input to
     * @param currentFilterValue - the current value
     */
            renderDropdownFilter(filterFieldType, elementContainer, currentFilterValue) {
                const options = this.settings.requisitionList.search.filterOptions[filterFieldType];
                // if there aren't options, don't render the dropdown
                if (!options || options.length === 0) {
                    return;
                }
                // We are using a native select and a custom select to maintain sustainability in cases
                // where users do not use a mouse.
                // Users that use a mouse will see the customizable select and
                // users that navigate with keyboard or voice will use the native select which is way more accessible.
                const ariaLabel = this.getText(`search.filters.${filterFieldType}.label`, undefined);
                const inputNative = createHtmlElement('select', {
                    class: `cc-filter-dropdown native cc-filter-${filterFieldType}-input`,
                    id: `cc-filter-${filterFieldType}-native`,
                    name: filterFieldType,
                    'aria-label': ariaLabel
                });
                const customSelectTriggerSpan = createHtmlElement('div', {
                    class: 'cc-custom-span'
                }, this.getText(`search.filters.${filterFieldType}.placeholder`, undefined));
                const customSelectTriggerArrow = createHtmlElement('div', {
                    class: 'cc-custom-trigger-arrow',
                    'aria-label': this.getText('search.filters.down-arrow.label', undefined)
                }, this.getText('search.filters.down-arrow.icon', undefined));
                const customSelectTrigger = createHtmlElement('div', {
                    class: 'cc-custom-select-trigger',
                    id: `cc-filter-${filterFieldType}-custom`,
                    'aria-hidden': 'true'
                }, customSelectTriggerSpan, customSelectTriggerArrow);
                const customSelectOptions = createHtmlElement('div', {
                    class: 'cc-custom-select-options'
                });
                const customSelect = createHtmlElement('div', {
                    class: `cc-filter-dropdown custom cc-filter-${filterFieldType}-input cc-clickable`,
                    'aria-label': ariaLabel,
                    tabIndex: 0,
                    name: filterFieldType
                }, customSelectTrigger, customSelectOptions);
                let selectedOption = null;
                if (options && options.length > 0) {
                    if (filterFieldType === api_1.FilterTypeEnum.location) {
                        selectedOption = this.renderLocationFilter(inputNative, customSelectOptions, options, currentFilterValue);
                    } else {
                        for (const option of options) {
                            const customOptionEl = this.addNewOptionToInputs(option, inputNative, customSelectOptions, option.isDefaultSelection, filterFieldType, currentFilterValue || '');
                            if ((option.isDefaultSelection && !currentFilterValue) || option.value === currentFilterValue) {
                                selectedOption = customOptionEl;
                                selectedOption.classList.add('isActive', 'isHover');
                            }
                        }
                    }
                }
                selectedOption = selectedOption !== null && selectedOption !== void 0 ? selectedOption : customSelectOptions.getElementsByClassName('cc-custom-option')[0];
                customSelectTriggerSpan.innerHTML = selectedOption.innerHTML;
                this.filters.push(inputNative);
                this.customFilters.push(customSelect);
                elementContainer.append(inputNative);
                elementContainer.append(customSelect);
                this.handleSelectCustomOption(selectedOption, inputNative);
            }
            /**
     * Assembles and assigns options to be displayed for the location filter dropdown.
     * @param nativeSelect - The native browser select (kept for accessibility).
     * @param customSelectOptions -The div that will contain the options in the custom dropdown.
     * @param options - The options to add to both the native and custom select dropdowns.
     * @param value - The active/current filter value
     * @returns the selected option for the filter
     */
            renderLocationFilter(nativeSelect, customSelectOptions, options, value) {
                // get all cities mapped to subdivisions
                const filterType = api_1.FilterTypeEnum.location;
                const map = new Map();
                const noSubdivisionArray = [];
                options.sort((a, b) => {
                    const subdivisionA = a.metadata ? a.metadata['Subdivision'] : null;
                    const subdivisionB = b.metadata ? b.metadata['Subdivision'] : null;
                    if (!subdivisionA && !subdivisionB) {
                        return 0;
                    } else if (subdivisionA && !subdivisionB) {
                        return 1;
                    } else if (subdivisionB && !subdivisionA) {
                        return -1;
                    } else if (subdivisionA && subdivisionB) {
                        return subdivisionA.toLocaleLowerCase().localeCompare(subdivisionB.toLocaleLowerCase());
                    } else {
                        return 0;
                    }
                }
                ).forEach(option => {
                    const subdivisionName = option.metadata ? option.metadata['Subdivision'] : null;
                    if (option.text == '' && option.value == '') {
                        this.addNewOptionToInputs(option, nativeSelect, customSelectOptions, true, filterType, value);
                    } else if (subdivisionName) {
                        let currentArr = map.get(subdivisionName);
                        if (!currentArr) {
                            currentArr = [option];
                            map.set(subdivisionName, currentArr);
                        } else {
                            currentArr.push(option);
                        }
                    } else {
                        // these don't have a nice subdivision name
                        noSubdivisionArray.push(option);
                    }
                }
                );
                let selectedOption = null;
                // then for each subdivision, add the cities with their count
                map.forEach((optionArr, subdivisionName) => {
                    var _a, _b;
                    // first add the subdivision name with a counter for the number of jobs under it.
                    // the value is the same as the first city in the list minus the city for matching.
                    const subdivisionValue = (_a = optionArr[0]) === null || _a === void 0 ? void 0 : _a.value.split('|').slice(1).join('|');
                    const initialCount = 0;
                    const jobsInSubdivisionCount = optionArr.reduce((count, option) => {
                        var _a;
                        return count + ((_a = option.count) !== null && _a !== void 0 ? _a : 0);
                    }
                        , initialCount);
                    const subdivisionOption = {
                        text: subdivisionName,
                        value: subdivisionValue,
                        count: jobsInSubdivisionCount,
                        metadata: {
                            'Subdivision': subdivisionName
                        },
                        isDefaultSelection: false
                    };
                    const subdivisionEl = this.addNewOptionToInputs(subdivisionOption, nativeSelect, customSelectOptions, true, filterType, value);
                    selectedOption = value === subdivisionOption.value ? subdivisionEl : selectedOption;
                    // then for every other city/statewide option in the optionArr, add options in the dropdown
                    for (const option of optionArr) {
                        // use the location text if there is one (just the city's name or statewide without subdivision code)
                        option.text = (_b = option.metadata['Location']) !== null && _b !== void 0 ? _b : option.text;
                        const customOptionEl = this.addNewOptionToInputs(option, nativeSelect, customSelectOptions, false, filterType, value);
                        if (optionArr[optionArr.length - 1] == option) {
                            customOptionEl.className = customOptionEl.className + ' cc-last-option';
                        }
                        if ((option.isDefaultSelection && !value) || option.value === value) {
                            selectedOption = customOptionEl;
                        }
                    }
                }
                );
                // next toss in all of the ones that didnt have pretty subdivisions
                // TODO DEV-15324: This sometimes includes countries without subdivisions due to being international,
                // so we need to work out a longer term solution for these.
                noSubdivisionArray.forEach(option => {
                    option.text = option.metadata ? option.metadata['Location'] : option.text;
                    const customOptionEl = this.addNewOptionToInputs(option, nativeSelect, customSelectOptions, true, filterType, value);
                    if ((option.isDefaultSelection && !value) || option.value === value) {
                        selectedOption = customOptionEl;
                    }
                }
                );
                return selectedOption;
            }
            /**
     * Assembles the option text to be displayed.
     * @param option The option
     * @param filterFieldType The filter type this option is being added to
     * @returns The new option text
     */
            buildOptionText(option, filterFieldType) {
                let text;
                if (!option.text) {
                    text = this.getText(`search.filters.${filterFieldType}.placeholder`, undefined);
                } else {
                    text = option.text;
                }
                return text;
            }
            /**
     * Creates a new option and adds it to a native and custom dropdown.
     * @param option The option
     * @param nativeInputEl The native select
     * @param customInputOptionsEl A div to contain the custom options
     * @param isParent Whether or not the option should be displayed as a parent (bold, etc)
     * @param filterFieldType The filter type
     * @param currentFilterValue The active/current filter value
     * @returns The custom option element
     */
            addNewOptionToInputs(option, nativeInputEl, customInputOptionsEl, isParent, filterFieldType, currentFilterValue) {
                const text = this.buildOptionText(option, filterFieldType);
                const nativeOptionEl = new Option(text, option.value);
                const customOptionEl = createHtmlElement('div', {
                    class: 'cc-custom-option cc-clickable',
                    'data-value': option.value
                }, text);
                if (isParent) {
                    nativeOptionEl.setAttribute('class', 'cc-option-parent');
                    customOptionEl.classList.add('cc-option-parent');
                }
                if (currentFilterValue === option.value) {
                    customOptionEl.classList.add('isActive', 'isHover');
                }
                nativeInputEl.options.add(nativeOptionEl);
                customInputOptionsEl.appendChild(customOptionEl);
                return customOptionEl;
            }
            /**
     * Opens the popup with options to select for the chosen filter.
     * @param currentTarget - The filter that was clicked.
     */
            handleToggleCustomSelect(currentTarget) {
                if (currentTarget == null || !(currentTarget instanceof (HTMLElement))) {
                    return;
                }
                if (currentTarget !== this.openCustomSelect) {
                    this.closeCustomSelect();
                }
                const isActive = currentTarget.classList.contains('isActive');
                if (isActive) {
                    this.closeCustomSelect();
                } else {
                    currentTarget.classList.add('isActive');
                    currentTarget.setAttribute('aria-hidden', 'false');
                    this.openCustomSelect = currentTarget;
                    const options = this.openCustomSelect.getElementsByClassName('cc-custom-select-options')[0];
                    const activeOption = options.getElementsByClassName('isActive')[0];
                    activeOption.classList.add('isHover');
                }
            }
            /**
     * Sets the new selected option in the dropdown.
     * @param currentTarget - The selected option.
     * @param filter - The related dropdown filter element or name.
     */
            handleSelectCustomOption(currentTarget, filter) {
                var _a, _b, _c;
                const value = (_a = currentTarget.getAttribute('data-value')) !== null && _a !== void 0 ? _a : '';
                filter = filter ? filter : (_c = (_b = this.openCustomSelect) === null || _b === void 0 ? void 0 : _b.getAttribute('name')) !== null && _c !== void 0 ? _c : '';
                this.updateFilterValue(value, filter);
                // update the active option
                const filterName = typeof filter === 'string' ? filter : filter.getAttribute('name');
                const customFilter = this.customFilters.find(f => f.getAttribute('name') == filterName);
                if (!customFilter) {
                    return;
                }
                // update the visibly active option in the dropdown list
                const oldActiveOption = customFilter.getElementsByClassName('isActive')[0];
                oldActiveOption === null || oldActiveOption === void 0 ? void 0 : oldActiveOption.classList.remove('isActive', 'isHover');
                currentTarget.classList.add('isActive', 'isHover');
                // update the span
                const span = customFilter.getElementsByClassName('cc-custom-span')[0];
                span.innerHTML = currentTarget.innerHTML;
            }
            /**
     * Closes any open custom select dropdown.
     */
            closeCustomSelect() {
                var _a;
                if (this.openCustomSelect != null) {
                    this.openCustomSelect.classList.remove('isActive');
                    this.openCustomSelect.setAttribute('aria-hidden', 'true');
                    (_a = this.openCustomSelect.getElementsByClassName('isHover')[0]) === null || _a === void 0 ? void 0 : _a.classList.remove('isHover');
                    this.openCustomSelect = null;
                }
            }
            /**
     * Render Postal Code Group Input
     * @param elementContainer - the container to append the input to
     * @param postalCodeValue - the current value for postal code
     * @param distanceValue - the current value for distance
     */
            renderPostalCodeInputGroup(elementContainer, postalCodeValue, distanceValue) {
                const postalCodeTextInput = createHtmlElement('input', {
                    type: 'text',
                    id: 'cc-filter-postalcode-input-id',
                    class: 'cc-filter-postalcode-input',
                    name: api_1.FilterTypeEnum.postalCode,
                    placeholder: this.getText('search.filters.postalCode.placeholder', undefined),
                    'aria-label': this.getText('search.filters.postalCode.label', undefined)
                });
                this.filters.push(postalCodeTextInput);
                if (postalCodeValue) {
                    postalCodeTextInput.value = postalCodeValue;
                }
                const inputGroupContainer = createHtmlElement('div', {
                    class: 'cc-filter-postal-code'
                }, postalCodeTextInput);
                this.renderDropdownFilter(api_1.FilterTypeEnum.distance, inputGroupContainer, distanceValue);
                elementContainer.append(inputGroupContainer);
            }
            /**
     * Render submit and reset buttons
     * @param elementContainer - the container to append the input to
     */
            renderSubmitResetButtons(elementContainer) {
                const buttonContainer = createHtmlElement('div', {
                    class: 'cc-search-button-container'
                }, createHtmlElement('button', {
                    id: 'cc-submit-search-button-id',
                    class: 'cc-submit-search-button cc-clickable',
                    type: 'submit'
                }, this.getText('search.search-button', undefined)), createHtmlElement('button', {
                    id: 'cc-reset-search-button-id',
                    class: 'cc-reset-search-button cc-clickable',
                    type: 'button'
                }, this.getText('search.reset-button', undefined)));
                elementContainer.append(buttonContainer);
            }
            /**
     *  Applies a value to a filter input.
     *  @param value - the new filter value
     *  @param filter - the name of the filter element
    */
            updateFilterValue(value, filter) {
                const htmlElement = typeof filter === 'string' ? document.getElementsByName(filter)[0] : filter;
                if (htmlElement instanceof HTMLInputElement || htmlElement instanceof HTMLSelectElement) {
                    if (htmlElement instanceof HTMLSelectElement) {
                        // check to make sure the value is in the options if it's a select
                        if (!isValidOption(htmlElement, value)) {
                            // if it's not, then just grab the first value and we'll use it
                            value = htmlElement.options[0].value;
                        }
                    }
                    htmlElement.value = value;
                }
            }
            /*
     * Render the job portal link
     */
            renderJobPortalLink() {
                const jobPortalText = createHtmlElement('span', {
                    id: 'cc-job-portal-link-text-id',
                    class: 'cc-job-portal-link-text'
                });
                jobPortalText.innerHTML = this.getText('job-portal-text', this.settings);
                this.jobPortalLinkContainer.append(jobPortalText);
            }
            /**
     * Render the sharing section.
     * @param container - the container element in which to render the section
     * @param sharingOptionsSettingList - the sharing options to render
     */
            renderShareSection(container, sharingOptionsSettingList) {
                const shareText = createHtmlElement('span', {
                    id: 'cc-share-header-id',
                    class: 'cc-share-header-text'
                }, this.getText('share.heading.text', undefined));
                container.append(shareText);
                this.renderShareButtons(container, sharingOptionsSettingList);
            }
            /**
     * Render sharing buttons.
     * Facebook, Twitter, LinkedIn, and Copy URL
     * @param container - the container element in which to render the section
     * @param sharingOptionsSettingList - the sharing options to render
     */
            renderShareButtons(container, sharingOptionsSettingList) {
                const url = window.location.href;
                if (sharingOptionsSettingList.includes(api_1.SharingOptionTypeEnum.facebook)) {
                    // fb share button/dialog
                    const fbShareUrl = new URL('http://www.facebook.com/sharer.php');
                    fbShareUrl.searchParams.set('u', url);
                    fbShareUrl.searchParams.set('_', Date.now().toString());
                    const fbLogo = createHtmlElement('img', {
                        id: 'cc-facebook-logo-id',
                        class: 'cc-share-logo',
                        'aria-label': this.getText('share.facebook.text', undefined),
                        src: 'https://careers-content.clearcompany.com/images/facebook-square.svg',
                        title: this.getText('share.facebook.text', undefined)
                    });
                    const fbLink = createHtmlElement('a', {
                        id: 'cc-facebook-link-id',
                        class: 'cc-share-link',
                        href: fbShareUrl.toString(),
                        rel: 'noopener external',
                        target: '_blank'
                    }, fbLogo);
                    container.append(fbLink);
                }
                if (sharingOptionsSettingList.includes(api_1.SharingOptionTypeEnum.twitter)) {
                    // twitter share button/dialog
                    const twitterIntentUrl = new URL('https://twitter.com/intent/tweet');
                    twitterIntentUrl.searchParams.set('url', url);
                    const twitterLogo = createHtmlElement('img', {
                        id: 'cc-twitter-logo-id',
                        class: 'cc-share-logo',
                        'aria-label': this.getText('share.x.text', undefined),
                        src: 'https://careers-content.clearcompany.com/images/x-square.svg',
                        title: this.getText('share.x.text', undefined)
                    });
                    const twitterLink = createHtmlElement('a', {
                        id: 'cc-twitter-link-id',
                        class: 'cc-share-link',
                        href: twitterIntentUrl.toString(),
                        rel: 'noopener external',
                        target: '_blank'
                    }, twitterLogo);
                    container.append(twitterLink);
                }
                if (sharingOptionsSettingList.includes(api_1.SharingOptionTypeEnum.linkedin)) {
                    // LinkedIn share button/dialog
                    const linkedInShareUrl = new URL('https://www.linkedin.com/sharing/share-offsite');
                    linkedInShareUrl.searchParams.set('url', url);
                    linkedInShareUrl.searchParams.set('_', Date.now().toString());
                    const linkedInLogo = createHtmlElement('img', {
                        id: 'cc-linkedin-logo-id',
                        class: 'cc-share-logo',
                        'aria-label': this.getText('share.linkedin.text', undefined),
                        src: 'https://careers-content.clearcompany.com/images/linkedin.svg',
                        title: this.getText('share.linkedin.text', undefined)
                    });
                    const linkedInLink = createHtmlElement('a', {
                        id: 'cc-linkedIn-link-id',
                        class: 'cc-share-link',
                        href: linkedInShareUrl.toString(),
                        rel: 'noopener external',
                        target: '_blank'
                    }, linkedInLogo);
                    container.append(linkedInLink);
                }
                if (navigator && navigator.clipboard && sharingOptionsSettingList.includes(api_1.SharingOptionTypeEnum.sharableLink)) {
                    // copy url button
                    const copyUrlLogo = createHtmlElement('img', {
                        id: 'cc-copy-url-logo-id',
                        class: 'cc-share-logo',
                        'aria-label': this.getText('share.copy.text', undefined),
                        src: 'https://careers-content.clearcompany.com/images/copy-solid.svg',
                        title: this.getText('share.copy.text', undefined)
                    });
                    const copyUrlSuccess = createHtmlElement('span', {
                        class: 'copied-message cc-hidden',
                        'aria-hidden': true
                    }, this.getText('share.copy.text.success', undefined));
                    const copyUrlBtn = createHtmlElement('button', {
                        id: 'cc-copy-url-link-id',
                        class: 'cc-copy-btn cc-clickable'
                    }, copyUrlLogo, copyUrlSuccess);
                    container.append(copyUrlBtn);
                }
            }
            /**
     * Fetches the available jobs and renders
     * the job list according to settings
     * @param pageNumber The 0-based page number of results to load.
     * @param updateBrowserState a flag indicating whether we should update the browser history as part of the loading process
     */
            async loadJobs(pageNumber, updateBrowserState = true) {
                try {
                    this.currentPageNumber = pageNumber;
                    if (updateBrowserState) {
                        // create a new filter state from the current filter values
                        const filterState = {};
                        // start constructing the URL to put in the history
                        const browserUrl = new URL(window.location.href);
                        for (const filter of this.filters) {
                            const filterType = filter.name;
                            if (Object.values(api_1.FilterTypeEnum).includes(filterType)) {
                                if (filter.value) {
                                    filterState[filterType] = filter.value;
                                    browserUrl.searchParams.set(filterType, filter.value);
                                } else {
                                    browserUrl.searchParams.delete(filterType);
                                }
                            }
                        }
                        // distance needs to be handled differently because we only want to put it in the URL if both parts are set
                        if (filterState[api_1.FilterTypeEnum.distance] && !filterState[api_1.FilterTypeEnum.postalCode]) {
                            browserUrl.searchParams.delete(api_1.FilterTypeEnum.distance);
                        }
                        // if we're past the first page, add the page to the query parameters,
                        // otherwise remove the page parameter to prevent incorrect results when refreshing after filtering
                        if (this.currentPageNumber > 1) {
                            browserUrl.searchParams.set('p', (this.currentPageNumber).toString());
                        } else {
                            browserUrl.searchParams.delete('p');
                        }
                        const title = document.title;
                        // this is unused by most browsers
                        window.history.pushState(filterState, title, browserUrl);
                        this.removeShareMetaTags();
                        this.addShareMetaTags('Careers', window.location.href.toString());
                    }
                    // construct the base url for the request
                    // note that the API is using a 0-based index for paging, while the browser is using a 1-based index because it's more user-friendly
                    const requestParams = {
                        pageIndex: this.currentPageNumber - 1,
                        pageSize: this.settings.pageSize,
                        source: this.source
                    };
                    // add the filter parameters
                    const params = new URLSearchParams(window.location.search);
                    for (const [key, value] of params) {
                        if (Object.values(api_1.FilterTypeEnum).includes(key)) {
                            requestParams[key] = value;
                        }
                    }
                    // clear the current jobs container
                    // TODO - using cloneNode will clear all events from element and child elements
                    this.jobsContainer.innerHTML = '';
                    this.toggleElement(this.skeletonContainer, true);
                    // make the request to the api
                    const data = await this.dataService.getJobs(this.siteId, requestParams);
                    // render the new data
                    this.jobModels = data.results;
                    if (this.jobModels.length > 0) {
                        if (this.settings.requisitionList.layoutType === 'list') {
                            this.renderJobsList();
                        } else {
                            this.renderJobsTiles();
                        }
                        this.renderListPagination(data.totalCount);
                        this.jobPortalLinkContainer.scrollIntoView(true);
                    } else {
                        this.renderEmptyState();
                    }
                    this.toggleElement(this.skeletonContainer, false);
                } catch (ex) {
                    // if loading jobs from api returns an error, display the load error.
                    this.renderLoadJobsError(ex);
                }
            }
            /**
     * Renders the job list empty state based off if any filters are applied
     * */
            renderEmptyState() {
                let emptyStateText = '';
                // check the history state for any search filters
                // that have been pushed
                if (window.history.state && Object.keys(window.history.state).length > 0) {
                    emptyStateText = this.getText('search.results.empty-state.filters-applied', undefined);
                } else {
                    emptyStateText = this.getText('search.results.empty-state.no-filters-applied', undefined);
                }
                const emptyStateMessage = createHtmlElement('div', {
                    class: 'cc-empty-state-message'
                }, emptyStateText);
                this.jobsContainer.append(emptyStateMessage);
            }
            /**
     * Renders the jobs in a list format
     */
            renderJobsList() {
                // render the first department container
                let currentDepartmentId = undefined;
                let departmentContainer = undefined;
                if (this.jobModels === undefined) {
                    return;
                }
                // using forEach instead of map because of the department element logic.
                this.jobModels.forEach(job => {
                    if (this.settings.requisitionList.groupByField == api_1.FieldTypeEnum.departmentName) {
                        if (job.departmentId !== currentDepartmentId || departmentContainer === undefined) {
                            // new department, create a new department container
                            currentDepartmentId = job.departmentId;
                            departmentContainer = createHtmlElement('div', {
                                class: 'cc-department-container'
                            }, {
                                tagName: 'div',
                                attributes: {
                                    class: 'cc-department-name'
                                },
                                children: [job.departmentName]
                            });
                            this.jobsContainer.append(departmentContainer);
                        }
                        const jobContainer = createHtmlElement('div', {
                            class: 'cc-job-container'
                        });
                        this.renderJobContent(job, jobContainer);
                        departmentContainer.append(jobContainer);
                    } else {
                        // default sort from API
                        const jobContainer = createHtmlElement('div', {
                            class: 'cc-job-container'
                        });
                        this.renderJobContent(job, jobContainer);
                        this.jobsContainer.append(jobContainer);
                    }
                }
                );
            }
            /**
     * Renders the jobs in a tile format
     */
            renderJobsTiles() {
                if (this.jobModels === undefined) {
                    return;
                }
                const jobItemElements = this.jobModels.map(job => {
                    const contentContainer = createHtmlElement('div', {
                        class: 'cc-job-tile-content'
                    });
                    this.renderJobContent(job, contentContainer);
                    const jobContainer = createHtmlElement('div', {
                        class: 'cc-job-container-tile'
                    }, contentContainer);
                    return jobContainer;
                }
                );
                const jobListTilesContainer = createHtmlElement('div', {
                    class: 'cc-job-list-tiles-container'
                }, ...jobItemElements);
                this.jobsContainer.append(jobListTilesContainer);
            }
            /**
     * Render the Jobs List Pagination
     * @param totalJobCount - total jobs
     */
            renderListPagination(totalJobCount) {
                const totalPageCount = Math.ceil(totalJobCount / this.settings.pageSize);
                // build pagination controls
                this.buildPaginationControls(totalPageCount);
            }
            /**
     * Builds the pagination control based on the total page count available
     * @param totalPageCount - pages of data available, natural number count
     */
            buildPaginationControls(totalPageCount) {
                if (totalPageCount <= 1) {
                    return;
                }
                const currentPage = this.currentPageNumber;
                const paginationContainer = createHtmlElement('div', {
                    class: 'cc-page-controls'
                });
                if (currentPage > 1 && totalPageCount > 1) {
                    const leftArrow = createHtmlElement('button', {
                        class: 'cc-left-control cc-page-control cc-clickable',
                        'data-page': `${currentPage - 1}`
                    }, '<');
                    paginationContainer.append(leftArrow);
                }
                // If there are 6 or less pages we will just render all the page options in their natural
                // number order
                if (totalPageCount <= 6) {
                    for (let i = 1; i <= totalPageCount; i++) {
                        this.addPageNumberControl(paginationContainer, i);
                    }
                } else {
                    // These controls are built assuming the following
                    // There are 7 0-indexed positions _ _ _ _ _ _ _
                    // position 0 will always render the first page number
                    // position 6 will always render the last page number
                    // the render pattern will be:
                    //  [first page][ellipsis][currentpage-1][current page][current page + 1][ellipsis][last page]
                    // UNLESS
                    // -- 1. The current page is less than or equal to 4 - "in the lower bound"
                    // ----- A. Assuming current page is 2 -- [1][2][3][4][5][...][last page]
                    // -- 2. The difference between the last and current page is less than 4 - "in the upper bound"
                    // ----- A. Assuming current page is 8 and total is 10 -- [1][...][6][7][8][9][10]
                    const inLowerBound = currentPage <= 4;
                    const inUpperBound = (totalPageCount - currentPage) <= 4;
                    // position 0 will always contain the 1st page
                    this.addPageNumberControl(paginationContainer, 1);
                    // position 1
                    if (inLowerBound) {
                        this.addPageNumberControl(paginationContainer, 2);
                    } else {
                        paginationContainer.append(createHtmlElement('span', {
                            class: 'cc-ellipsis'
                        }, '...'));
                    }
                    // position 2
                    if (inLowerBound) {
                        this.addPageNumberControl(paginationContainer, 3);
                    } else if (inUpperBound) {
                        this.addPageNumberControl(paginationContainer, totalPageCount - 4);
                    } else {
                        this.addPageNumberControl(paginationContainer, currentPage - 1);
                    }
                    // position 3
                    if (inLowerBound) {
                        this.addPageNumberControl(paginationContainer, 4);
                    } else if (inUpperBound) {
                        this.addPageNumberControl(paginationContainer, totalPageCount - 3);
                    } else {
                        this.addPageNumberControl(paginationContainer, currentPage);
                    }
                    // position 4
                    if (inLowerBound) {
                        this.addPageNumberControl(paginationContainer, 5);
                    } else if (inUpperBound) {
                        this.addPageNumberControl(paginationContainer, totalPageCount - 2);
                    } else {
                        this.addPageNumberControl(paginationContainer, currentPage + 1);
                    }
                    // position 5
                    if (inUpperBound) {
                        this.addPageNumberControl(paginationContainer, totalPageCount - 1);
                    } else {
                        paginationContainer.append(createHtmlElement('span', {
                            class: 'cc-ellipsis'
                        }, '...'));
                    }
                    // position 6 will always be the last number
                    this.addPageNumberControl(paginationContainer, totalPageCount);
                }
                if (currentPage < totalPageCount && totalPageCount > 1) {
                    const rightArrow = createHtmlElement('button', {
                        class: 'cc-right-control cc-page-control cc-clickable',
                        'data-page': `${currentPage + 1}`
                    }, '>');
                    paginationContainer.append(rightArrow);
                }
                this.jobsContainer.append(paginationContainer);
            }
            /**
     * Creates the page control based on the given page number
     * @param container - the html element to append the control to
     * @param pageNumber - the page number the control represents
     */
            addPageNumberControl(container, pageNumber) {
                const isSelected = pageNumber === this.currentPageNumber;
                const control = createHtmlElement('button', {
                    class: 'cc-page-control cc-clickable',
                    'data-page': `${pageNumber}`
                }, `${pageNumber}`);
                if (isSelected) {
                    control.classList.add('cc-current-page');
                }
                container.append(control);
            }
            /**
     * Handles when a user clicks on a page control/pagination element
     * @param currentTarget - the target element for the click event
     */
            handleOnClickPageControl(currentTarget) {
                const chosenPage = currentTarget.getAttribute('data-page');
                if (chosenPage !== null) {
                    this.jobPortalLinkContainer.scrollIntoView(true);
                    this.loadJobs(Number(chosenPage));
                }
            }
            /**
     * Renders the job title and subtitle information in
     * the given container
     * @param job - model representing the given job
     * @param container - the container to render the information in
     */
            renderJobContent(job, container) {
                // start with the current url
                const jobUrl = new URL(window.location.href);
                // remove any filter parameters
                for (const key of jobUrl.searchParams.keys()) {
                    if (Object.values(api_1.FilterTypeEnum).includes(key)) {
                        jobUrl.searchParams.delete(key);
                    }
                }
                // remove the paging parameter
                jobUrl.searchParams.delete('p');
                // set the job id
                jobUrl.searchParams.set('jobId', job.id);
                // toString() it since we need it twice
                const href = jobUrl.toString();
                const jobTitle = createHtmlElement('a', {
                    class: 'cc-job-title cc-clickable',
                    'data-id': job.id,
                    href: href
                }, job.positionTitle);
                container.append(jobTitle);
                const isLocationVisible = this.settings.requisitionList.displayFields.includes(api_1.FieldTypeEnum.location);
                const isDatePostedVisible = this.settings.requisitionList.displayFields.includes(api_1.FieldTypeEnum.datePosted);
                if (isLocationVisible || isDatePostedVisible) {
                    const jobLabel = this.getJobListSecondaryLabel(job, 'cc-secondary-label', isLocationVisible, isDatePostedVisible);
                    container.append(jobLabel);
                }
            }
            /**
     * Gets the label text containing the job location and/or when it was posted
     * @param job The job model to use.
     * @param className The classname for the containing div
     * @param isLocationVisible Flag indicating if the job location should be included.
     * @param isDatePostedVisible Flat indicating if the job posting date should be included.
     * @returns {HTMLElement[]} The label containing the job location and/or when it was posted
     */
            getJobListSecondaryLabel(job, className, isLocationVisible, isDatePostedVisible) {
                const label = createHtmlElement('div', {
                    class: className,
                    'data-id': job.id
                });
                if (isLocationVisible) {
                    const text = this.getText('results.job-location', job);
                    const locationId = job.id + 'label';
                    const locationsLabel = createHtmlElement('div', {
                        id: locationId,
                        class: 'cc-location-label'
                    }, text);
                    const locationsTooltip = createHtmlElement('div', {
                        class: 'cc-location-tooltip'
                    });
                    locationsLabel.append(locationsTooltip);
                    label.append(locationsLabel);
                    locationsLabel.addEventListener('mouseover', function () {
                        // Check if the content overflows
                        if (locationsLabel.scrollWidth > locationsLabel.clientWidth) {
                            locationsTooltip.innerText = locationsLabel.innerText;
                            locationsTooltip.style.display = 'block';
                        }
                    });
                    locationsLabel.addEventListener('mouseout', function () {
                        locationsTooltip.style.display = 'none';
                    });
                }
                if (isDatePostedVisible) {
                    const dateText = this.getTimeSinceDatePosted(job.postedDate);
                    const dateLabel = createHtmlElement('div', {
                        class: 'cc-date-label'
                    }, dateText);
                    label.append(dateLabel);
                }
                return label;
            }
            /**
     * Gets the labels containing the job location(s) and/or when the jobs was posted
     * @param job The job model to use.
     * @param className The classname for the containing div
     * @param isLocationVisible Flag indicating if the job location should be included.
     * @param isDatePostedVisible Flat indicating if the job posting date should be included.
     * @returns {HTMLElement[]} The labels containing the job location(s) and/or when the jobs was posted
     */
            getJobDetailsSecondaryLabels(job, className, isLocationVisible, isDatePostedVisible) {
                const labels = [];
                if (isLocationVisible) {
                    const locationLabelText = this.getText('results.job-location', job);
                    const locationLabel = createHtmlElement('div', {
                        class: className,
                        'data-id': job.id
                    }, locationLabelText);
                    labels.push(locationLabel);
                }
                if (isDatePostedVisible) {
                    const dateLabelText = this.getTimeSinceDatePosted(job.postedDate);
                    const dateLabel = createHtmlElement('div', {
                        class: className,
                        'data-id': job.id
                    }, dateLabelText);
                    labels.push(dateLabel);
                }
                return labels;
            }
            /**
     * Gets a string representing the time since the date when a job was posted in the form
     * of "Posted 3 days ago", "Posted 2 weeks ago", etc.
     * @param datePostedString The date when the job was posted.
     * @returns {string} The text describing how long ago the job was posted in the form of "Posted x days/weeks/months/years ago"
     */
            getTimeSinceDatePosted(datePostedString) {
                const now = new Date();
                const datePosted = new Date(datePostedString);
                const timeElapsed = now.getTime() - datePosted.getTime();
                const daysPassed = Math.floor(timeElapsed / (1000 * 3600 * 24));
                const weeksPassed = Math.floor(daysPassed / 7);
                const totalMonthsPassed = ((now.getFullYear() - datePosted.getFullYear()) * 12) + (now.getMonth() - datePosted.getMonth());
                const monthsPassed = totalMonthsPassed % 12;
                const yearsPassed = Math.floor(totalMonthsPassed / 12);
                if (daysPassed < 1) {
                    return this.getText('results.date-posted.less-than-a-day', undefined);
                } else if (daysPassed === 1) {
                    return this.getText('results.date-posted.day', undefined);
                } else if (daysPassed < 7) {
                    return this.getText('results.date-posted.days', {
                        amount: daysPassed
                    });
                } else if (weeksPassed === 1) {
                    return this.getText('results.date-posted.week', undefined);
                } else if (totalMonthsPassed < 1) {
                    return this.getText('results.date-posted.weeks', {
                        amount: weeksPassed
                    });
                } else if (totalMonthsPassed === 1) {
                    return this.getText('results.date-posted.month', undefined);
                } else if (yearsPassed < 1) {
                    return this.getText('results.date-posted.months', {
                        amount: monthsPassed
                    });
                } else if (yearsPassed === 1) {
                    if (monthsPassed < 1) {
                        return this.getText('results.date-posted.year', undefined);
                    } else if (monthsPassed === 1) {
                        return this.getText('results.date-posted.year-and-month', undefined);
                    } else {
                        return this.getText('results.date-posted.year-and-months', {
                            amount: monthsPassed
                        });
                    }
                } else {
                    if (monthsPassed < 1) {
                        return this.getText('results.date-posted.years', {
                            amount: yearsPassed
                        });
                    } else if (monthsPassed === 1) {
                        return this.getText('results.date-posted.years-and-month', {
                            amount: yearsPassed
                        });
                    } else {
                        return this.getText('results.date-posted.years-and-months', {
                            amountMonths: monthsPassed,
                            amountYears: yearsPassed
                        });
                    }
                }
            }
            /**
     * Gets formatted text from the settings for the given key. Automatically does replacements from the job model.
     * @param key The string key.
     * @param replacements The current job model or settings to use for formatting the text.
     * @returns {string} The text from the settings, or the key if no key matched.
     */
            getText(key, replacements) {
                const text = this.settings.text[key];
                if (text != undefined) {
                    return replacements ? text.ccFormat(replacements) : text;
                }
                return key;
            }
        }
        /**
 * Function for creating an html element with the given set of attributes and children.
 * @param tagName - element's tag name.
 * @param attributes - set of element's attributes.
 * @param children - optional children of the element.
 * The list of children will be appended in order of passing.
 * @returns - a generated html element (and provided children).
 */
        function createHtmlElement(tagName, attributes, ...children) {
            const element = document.createElement(tagName);
            if (attributes) {
                for (const [key, value] of Object.entries(attributes)) {
                    element.setAttribute(key, value.toString());
                }
            }
            if (children) {
                for (const child of children) {
                    if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                    } else if (child instanceof HTMLElement || child instanceof SVGElement) {
                        element.appendChild(child);
                    } else {
                        const { tagName, attributes, children } = child;
                        element.appendChild(createHtmlElement(tagName, attributes, ...children));
                    }
                }
            }
            return element;
        }
        /**
 * Function for creating an SVG element with the given set of attributes and children.
 * @param tagName - element's tag name.
 * @param attributes - set of element's attributes.
 * @param children - optional children of the element.
 * The list of children will be appended in order of passing.
 * @returns - a generated SVG element (and provided children).
 */
        function createSvgElement(tagName, attributes, ...children) {
            const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
            if (attributes) {
                for (const [key, value] of Object.entries(attributes)) {
                    element.setAttribute(key, value.toString());
                }
            }
            if (children) {
                for (const child of children) {
                    if (child instanceof SVGElement) {
                        element.appendChild(child);
                    }
                }
            }
            return element;
        }
        /**
 * Performs sprintf like formatting on strings so "blah {0}".format('something'); outputs "blah something"
 * It also allows formatting using an object as the source instead of an array, so "blah {name}".format({ name: 'something' }); outputs "blah something"
 * object formatting happens when an object is the first argument
 * @param replacements - the object containing possible replacements
 * @returns {string} The fully formatted string
 */
        String.prototype.ccFormat = function (replacements) {
            // Look for any word characters surrounded by braces
            const sprintfRegex = /\{(\w+)\}/g;
            const sprintf = function (match, value) {
                return value in replacements ? replacements[value] : match;
            };
            return this.replace(sprintfRegex, sprintf);
        }
            ;
        /**
 * Checks if the value is a valid option for the select.
 * @param select The select element
 * @param value The value to check
 * @returns {boolean} true if the value is present in the options, false otherwise.
 */
        function isValidOption(select, value) {
            for (const option of select.options) {
                if (option.value === value) {
                    return true;
                }
            }
            return false;
        }
        const jobs = new ClearCompanyJobs();
        jobs.load();
    }
        , {
        "./api": 1
    }]
}, {}, [2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL3YxL2FwaS50cyIsInNjcmlwdHMvdjEvZW1iZWRkZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUMsaURBQWlEOzs7QUF1Q2xELElBQVksNkJBR1g7QUFIRCxXQUFZLDZCQUE2QjtJQUNyQyw4Q0FBYSxDQUFBO0lBQ2IsZ0RBQWUsQ0FBQTtBQUNuQixDQUFDLEVBSFcsNkJBQTZCLEdBQTdCLHFDQUE2QixLQUE3QixxQ0FBNkIsUUFHeEM7QUFFRCxJQUFZLG9CQUdYO0FBSEQsV0FBWSxvQkFBb0I7SUFDNUIsbUNBQVcsQ0FBQTtJQUNYLHFDQUFhLENBQUE7QUFDakIsQ0FBQyxFQUhXLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBRy9CO0FBRUQsSUFBWSxnQkFHWDtBQUhELFdBQVksZ0JBQWdCO0lBQ3hCLGlDQUFhLENBQUE7SUFDYix1Q0FBbUIsQ0FBQTtBQUN2QixDQUFDLEVBSFcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFHM0I7QUFxRkQ7O0dBRUc7QUFDSCxJQUFZLGFBT1g7QUFQRCxXQUFZLGFBQWE7SUFDckIsZ0RBQStCLENBQUE7SUFDL0IsbURBQWtDLENBQUE7SUFDbEMsa0RBQWlDLENBQUE7SUFDakMsc0NBQXFCLENBQUE7SUFDckIsNENBQTJCLENBQUE7SUFDM0IsMENBQXlCLENBQUE7QUFDN0IsQ0FBQyxFQVBXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBT3hCO0FBRUQ7O0dBRUc7QUFDSCxJQUFZLGNBVVg7QUFWRCxXQUFZLGNBQWM7SUFDdEIsdUNBQXFCLENBQUE7SUFDckIsMkNBQXlCLENBQUE7SUFDekIsbUNBQWlCLENBQUE7SUFDakIsdUNBQXFCLENBQUE7SUFDckIsaUNBQWUsQ0FBQTtJQUNmLDJDQUF5QixDQUFBO0lBQ3pCLHVDQUFxQixDQUFBO0lBQ3JCLGlEQUErQixDQUFBO0lBQy9CLCtDQUE2QixDQUFBO0FBQ2pDLENBQUMsRUFWVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQVV6QjtBQUVEOztHQUVHO0FBQ0gsSUFBWSxxQkFLWDtBQUxELFdBQVkscUJBQXFCO0lBQzdCLDhDQUFxQixDQUFBO0lBQ3JCLDRDQUFtQixDQUFBO0lBQ25CLDhDQUFxQixDQUFBO0lBQ3JCLHNEQUE2QixDQUFBO0FBQ2pDLENBQUMsRUFMVyxxQkFBcUIsR0FBckIsNkJBQXFCLEtBQXJCLDZCQUFxQixRQUtoQztBQUVEOzs7R0FHRztBQUNILElBQVksT0FLWDtBQUxELFdBQVksT0FBTztJQUNmLHVDQUFTLENBQUE7SUFDVCxtREFBZSxDQUFBO0lBQ2YsMkNBQVcsQ0FBQTtJQUNYLHVDQUFTLENBQUE7QUFDYixDQUFDLEVBTFcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBS2xCOzs7QUN2TEQsK0NBQStDOztBQUUvQywrQkFjZTtBQWNmOztHQUVHO0FBQ0gsTUFBTSxJQUFJLEdBQUc7SUFDVCxLQUFLLENBQUMsSUFBSSxDQUFJLE9BQW9CLEVBQUUsSUFBa0I7UUFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ2QsbUNBQW1DO1lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFJLE9BQW9CLEVBQUUsT0FBcUI7UUFDcEQsTUFBTSxJQUFJLG1CQUFrQixNQUFNLEVBQUUsS0FBSyxJQUFLLE9BQU8sQ0FBRSxDQUFDO1FBQ3hELE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFJLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBSSxPQUFvQixFQUFFLE9BQXFCO1FBQ3JELE1BQU0sSUFBSSxtQkFBa0IsTUFBTSxFQUFFLE1BQU0sSUFBSyxPQUFPLENBQUUsQ0FBQztRQUN6RCxPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBSSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNKLENBQUM7QUFFRjs7R0FFRztBQUNILE1BQU0sa0JBQWtCLEdBQWdCO0lBQ3BDLGVBQWUsRUFBRSxDQUFDLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksU0FBUztJQUUxRixLQUFLLENBQUMsV0FBVyxDQUFDLE1BQWM7UUFDNUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsNkNBQTZDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0UsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvQztRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBVyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFjLEVBQUUsTUFBdUI7UUFDakQsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsb0NBQW9DLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFdEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQzVDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDL0M7UUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBYyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ3RELE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLG9DQUFvQyxNQUFNLElBQUksS0FBSyxXQUFXLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFaEcsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvQztRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBVyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFhO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLGtEQUFrRCxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRW5GLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDL0M7UUFFRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQWUsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBYTtRQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyw2Q0FBNkMsS0FBSyxlQUFlLENBQUMsQ0FBQztRQUUzRixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQy9DO1FBRUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFjLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDSixDQUFDO0FBRUYsTUFBTSxnQkFBZ0I7SUErQmxCO1FBOUJBOzs7OztXQUFpQztRQUNqQzs7Ozs7V0FBZ0Q7UUFDaEQ7Ozs7bUJBQTBDLFNBQVM7V0FBQztRQUNwRDs7OzttQkFBaUQsU0FBUztXQUFDO1FBQzNEOzs7OztXQUF1QztRQUN2Qzs7Ozs7V0FBNEM7UUFDNUM7Ozs7O1dBQTZDO1FBQzdDOzs7OztXQUFvQztRQUNwQzs7OzttQkFBMkMsU0FBUztXQUFDO1FBQ3JEOzs7O21CQUE0QyxTQUFTO1dBQUM7UUFDdEQ7Ozs7bUJBQTZDLFNBQVM7V0FBQztRQUN2RDs7Ozs7V0FBNEM7UUFDNUM7Ozs7bUJBQTJDLFNBQVM7V0FBQztRQUNyRDs7OzttQkFBNEMsU0FBUztXQUFDO1FBQ3REOzs7OztXQUEwQztRQUMxQzs7OzttQkFBNEMsU0FBUztXQUFDO1FBQ3REOzs7OztXQUF3QztRQUN4Qzs7Ozs7V0FBNEI7UUFDNUI7Ozs7bUJBQTRCLENBQUM7V0FBQztRQUM5Qjs7OzttQkFBeUIsU0FBUztXQUFDO1FBQ25DOzs7O21CQUFpQyxTQUFTO1dBQUM7UUFDM0M7Ozs7bUJBQXdDLEtBQUs7V0FBQztRQUM5Qzs7OzttQkFBNEQsRUFBRTtXQUFDO1FBQy9EOzs7O21CQUEyQixJQUFJO1dBQUM7UUFDaEM7Ozs7O1dBQXdCO1FBQ3hCOzs7O21CQUF5QyxFQUFFO1dBQUM7UUFDNUM7Ozs7bUJBQStDLElBQUk7V0FBQztRQUVwRDs7Ozs7V0FBa0M7UUFHOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDekIsT0FBTztTQUNWO1FBRUQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxPQUFZLEVBQUUsRUFBRTtZQUNyQyxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUVGLDZFQUE2RTtRQUM3RSxJQUFJLENBQUMsV0FBVyxHQUFJLE1BQWMsQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUM7UUFFaEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFFLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RyxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUM7UUFFaEQsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLGFBQXFCLEVBQUUsYUFBc0IsRUFBRSxFQUFFO1lBQ3pFLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDN0IsT0FBTyxRQUFRLENBQUMsYUFBYyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDckc7aUJBQU07Z0JBQ0gsT0FBTyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDOUM7UUFDTCxDQUFDLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQWdCLENBQUM7UUFFL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQVcsQ0FBQztRQUVuRCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUM7U0FDM0Q7UUFFRCxJQUFJLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDbEIsdUVBQXVFO1lBQ3ZFLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1lBQzNELElBQUksYUFBYSxFQUFFO2dCQUNmLE1BQU0sU0FBUyxHQUFHLDZCQUE2QixDQUFDO2dCQUNoRCxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkMsZUFBZSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7YUFDckM7U0FDSjtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDbkMsT0FBTztTQUNWO1FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQXlCLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDcEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFJLGdCQUFnQyxDQUFDO1FBRTFELE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxnQ0FBZ0MsRUFBRSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQTBCM0YsQ0FBQyxDQUFDO1FBQ0osUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFM0MsTUFBTSxnQkFBZ0IsR0FBRztZQUNyQixLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsSUFBSSxFQUFFLGFBQWE7WUFDbkIsYUFBYSxFQUFFLElBQUk7WUFDbkIsZUFBZSxFQUFFLENBQUM7WUFDbEIsZUFBZSxFQUFFLEdBQUc7WUFDcEIsZ0JBQWdCLEVBQUUsZUFBZTtTQUNwQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFDNUMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsRUFDbEMsaUJBQWlCLENBQUMsS0FBSyxrQ0FBTyxnQkFBZ0IsS0FBRSxLQUFLLEVBQUUsb0JBQW9CLElBQUcsRUFDOUUsaUJBQWlCLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEVBQzFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxFQUMxQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsRUFDMUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEVBQzFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxFQUMxQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLEtBQUssa0NBQU8sZ0JBQWdCLEtBQUUsS0FBSyxFQUFFLDJCQUEyQixJQUFHLENBQUM7UUFFakgsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUU7WUFDMUIsMEVBQTBFO1lBQzFFLHNHQUFzRztZQUN0RyxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pGLElBQUksYUFBYSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO2FBQy9CO2lCQUFNO2dCQUNILDBDQUEwQztnQkFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxJQUFJO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixPQUFPO1NBQ1Y7UUFFRCxxRkFBcUY7UUFDckYsSUFBSTtZQUNBLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkU7UUFBQyxPQUFPLEVBQUUsRUFBRTtZQUNULHNEQUFzRDtZQUN0RCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQix5RkFBeUY7UUFDekYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7O1lBQ3JDLE1BQU0sS0FBSyxHQUFnQixNQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUM7WUFFdEQsMkdBQTJHO1lBQzNHLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDckMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQW1CLENBQUM7Z0JBQ2pFLE1BQU0sS0FBSyxHQUFHLE1BQUEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7Z0JBQ3RDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNsRSxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtvQkFDMUIsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRTt3QkFDNUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztxQkFDckQ7aUJBQ0o7YUFDSjtZQUVELEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDL0IsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDckMsU0FBUztpQkFDWjtnQkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBQSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQXNCLENBQUMsbUNBQUksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzlFO1lBRUQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXRCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzlDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFOztZQUNuQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxNQUFBLElBQUksQ0FBQyxtQkFBbUIsMENBQUUsV0FBVyxJQUFJLENBQUM7YUFDeEY7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLDhDQUE4QztRQUM5QyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUM3RSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLHlCQUF5QjtRQUM3QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ssY0FBYztRQUNsQix5RUFBeUU7UUFDekUsTUFBTSxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUM7U0FDcEQ7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixnREFBZ0Q7WUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pDO1FBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7U0FDakM7UUFFRCxzRkFBc0Y7UUFDdEYsK0RBQStEO1FBQy9ELDZFQUE2RTtRQUM3RSxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QixLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUMxQixNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLElBQUksY0FBYyxFQUFFO2dCQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUMxRCxNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLEdBQUcsQ0FBQyxJQUFhLEVBQUUsT0FBZSxFQUFFLEVBQXFCO1FBQzdELElBQUk7WUFDQSxNQUFNLE1BQU0sR0FBRyw0Q0FBNEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3pFLE1BQU0sVUFBVSxHQUFlO2dCQUMzQixPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsT0FBTztnQkFDaEIsYUFBYSxFQUFFLEVBQUUsYUFBRixFQUFFLHVCQUFGLEVBQUUsQ0FBRSxJQUFJO2dCQUN2QixVQUFVLEVBQUUsRUFBRSxhQUFGLEVBQUUsdUJBQUYsRUFBRSxDQUFFLEtBQUs7YUFDeEIsQ0FBQztZQUNGLE1BQU0sV0FBVyxHQUFHLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUM7WUFDM0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLElBQUksQ0FBTyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuRjtRQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsMkNBQTJDO1NBQzlDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ssUUFBUTtRQUNaLCtEQUErRDtRQUMvRCxJQUFJO1lBQ0EsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDbEMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pHLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2YsTUFBTSxNQUFNLEdBQUcsNENBQTRDLElBQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQztnQkFDL0UsSUFBSSxDQUFDLEdBQUcsQ0FBTyxNQUFNLENBQUMsQ0FBQztnQkFFdkIscUdBQXFHO2dCQUNyRyxNQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUM1QixRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekMsUUFBUSxDQUFDLE1BQU0sSUFBSSxTQUFTLEtBQUssWUFBWSxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQzthQUMxRTtTQUNKO1FBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCwyQ0FBMkM7U0FDOUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxVQUFVO1FBQ2QsTUFBTSxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7WUFDbkQsRUFBRSxFQUFFLHdCQUF3QjtZQUM1QixJQUFJLEVBQUUsVUFBVTtZQUNoQixHQUFHLEVBQUUsWUFBWTtZQUNqQixJQUFJLEVBQUUsK0NBQStDLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUU7U0FDN0YsQ0FBQyxDQUFDO1FBRUgsNkVBQTZFO1FBQzdFLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxLQUFLLENBQUMsV0FBVztRQUNyQixJQUFJO1lBQ0EsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsbURBQW1ELElBQUksQ0FBQyxNQUFNLGVBQWUsQ0FBQyxDQUFDO1lBQzVHLElBQUcsUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLE1BQU0sa0JBQWtCLEdBQUksTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2xELElBQUksa0JBQWtCLEVBQUU7b0JBQ3BCLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRTt3QkFDNUMsRUFBRSxFQUFFLG1CQUFtQjt3QkFDdkIsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsR0FBRyxFQUFFLHVEQUF1RCxJQUFJLENBQUMsTUFBTSxXQUFXLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ2xHLENBQUMsQ0FBQztvQkFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDbEMsTUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFO3dCQUM1QyxFQUFFLEVBQUUsdUJBQXVCO3dCQUMzQixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsR0FBRyxFQUFFLFlBQVk7d0JBQ2pCLElBQUksRUFBRSwrQ0FBK0M7cUJBQ3hELENBQUMsQ0FBQztvQkFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDdkM7YUFDSjtTQUNKO1FBQUMsV0FBTTtZQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLG1CQUFtQjtRQUN2Qix5REFBeUQ7UUFDekQsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRSxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEUsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5RCxnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxNQUFNLEVBQUUsQ0FBQztRQUMzQixpQkFBaUIsYUFBakIsaUJBQWlCLHVCQUFqQixpQkFBaUIsQ0FBRSxNQUFNLEVBQUUsQ0FBQztRQUM1QixpQkFBaUIsYUFBakIsaUJBQWlCLHVCQUFqQixpQkFBaUIsQ0FBRSxNQUFNLEVBQUUsQ0FBQztRQUM1QixlQUFlLGFBQWYsZUFBZSx1QkFBZixlQUFlLENBQUUsTUFBTSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxnQkFBZ0IsQ0FBQyxRQUFnQixFQUFFLFVBQWtCO1FBQ3pELGlFQUFpRTtRQUNqRSxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQ3ZDO1lBQ0ksRUFBRSxFQUFFLGNBQWM7WUFDbEIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsT0FBTyxFQUFFLFFBQVEsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhO1NBQzNELENBQUMsQ0FBQztRQUNQLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWxDLGdFQUFnRTtRQUNoRSxNQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQ3JDO1lBQ0ksRUFBRSxFQUFFLFlBQVk7WUFDaEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsT0FBTyxFQUFFLFVBQVU7U0FDdEIsQ0FBQyxDQUFDO1FBQ1AsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEMsc0NBQXNDO1FBQ3RDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFDdEM7WUFDSSxFQUFFLEVBQUUsYUFBYTtZQUNqQixRQUFRLEVBQUUsU0FBUztZQUNuQixPQUFPLEVBQUUsU0FBUztTQUNyQixDQUFDLENBQUM7UUFDUCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVqQyxnRUFBZ0U7UUFDaEUsTUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUN2QztZQUNJLEVBQUUsRUFBRSxjQUFjO1lBQ2xCLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQjtTQUM5QyxDQUFDLENBQUM7UUFDUCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxzQkFBc0I7UUFDMUIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFOztZQUN6QyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBaUIsQ0FBQztZQUUxQyxnREFBZ0Q7WUFDaEQsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDZCxPQUFPO2FBQ1Y7WUFFRCw0Q0FBNEM7WUFDNUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFZLENBQUM7WUFDOUQsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDZCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDekIsT0FBTzthQUNWO1lBRUQsbUZBQW1GO1lBQ25GLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFeEIsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ3ZDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0gsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQztvQkFDaEMsR0FBRyxFQUFFLENBQUM7b0JBQ04sSUFBSSxFQUFFLENBQUMsWUFBWTtvQkFDbkIsUUFBUSxFQUFFLFFBQVE7aUJBQ3JCLENBQUMsQ0FBQztnQkFDSCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7b0JBQ3JELElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsSUFBSSxZQUFZLEVBQUU7d0JBQ3ZELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7d0JBQ3pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3FCQUM1RDtvQkFDRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUM3RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDMUQ7Z0JBQ0QsT0FBTzthQUNWO1lBRUQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQ3hDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0gsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQztvQkFDaEMsR0FBRyxFQUFFLENBQUM7b0JBQ04sSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLFFBQVEsRUFBRSxRQUFRO2lCQUNyQixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO29CQUVyRCw4R0FBOEc7b0JBQzlHLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUM7b0JBRXpELGlHQUFpRztvQkFDakcsTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFBLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLG1DQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBQSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxtQ0FBSSxDQUFDLENBQUMsQ0FBQztvQkFFcEgsK0dBQStHO29CQUMvRyxJQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxJQUFJLGFBQWEsRUFBRTt3QkFDOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzt3QkFDMUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7cUJBQzdEO29CQUVELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQzVELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUN6RDtnQkFDRCxPQUFPO2FBQ1Y7WUFFRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMzQyxPQUFPO2FBQ1Y7WUFFRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsRUFBRTtnQkFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsT0FBTzthQUNWO1lBRUQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7Z0JBQ25ELDJFQUEyRTtnQkFDM0UsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUNyQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBbUIsQ0FBQztvQkFDakUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNuRztnQkFFRCxLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQy9CLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQ3JDLFNBQVM7cUJBQ1o7b0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDdEM7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsT0FBTzthQUNWO1lBRUQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsRUFBRTtnQkFDcEYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPO2FBQ1Y7WUFFRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEVBQUU7Z0JBQzVGLElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUU7b0JBQ2xDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BELE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQWdCLENBQUM7b0JBQ2xGLElBQUksYUFBYSxFQUFFO3dCQUNmLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUM1QyxhQUFhLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDbkQsVUFBVSxDQUFDLEdBQUcsRUFBRTs0QkFDWixhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDekMsYUFBYSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ3RELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDWjtpQkFDSjthQUNKO1lBRUQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLEVBQUU7Z0JBQ2hELElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUM3QixPQUFPO2FBQ1Y7WUFFRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFBRTtnQkFDOUMsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtvQkFDbEMsTUFBTSxLQUFLLEdBQUcsTUFBQSxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLDBDQUFFLFNBQVMsQ0FBQztvQkFDckUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksRUFBRSxDQUFDLENBQUM7b0JBQzNDLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFDdkM7d0JBQ0ksS0FBSyxFQUFFLG9CQUFvQjt3QkFDM0IsR0FBRyxFQUFFLHVFQUF1RTtxQkFDL0UsQ0FBQyxDQUFDO29CQUNQLFdBQVcsQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDcEksV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNqRDthQUNKO1lBRUQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUEwQixDQUFDLENBQUM7Z0JBQzFELE9BQU87YUFDVjtZQUVELElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixPQUFPO2FBQ1Y7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNLLG9CQUFvQjtRQUN4QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7O1lBQzNDLG9FQUFvRTtZQUNwRSxNQUFNLE9BQU8sR0FBRyxNQUFBLE1BQUEsSUFBSSxDQUFDLGdCQUFnQiwwQ0FBRSxzQkFBc0IsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsMENBQUUsUUFBUSxDQUFDO1lBQ3ZHLElBQUksdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksT0FBTyxFQUFFO2dCQUNULEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNyQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQ3RDLHVCQUF1QixHQUFHLENBQUMsQ0FBQzt3QkFDNUIsTUFBTTtxQkFDVDtpQkFDSjthQUNKO1lBRUQsd0JBQXdCO1lBQ3hCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7Z0JBQzVCLElBQUksT0FBTyxFQUFFO29CQUNULEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsc0NBQXNDO29CQUN0QyxJQUFJLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUM5QyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUM3RCxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxDQUFnQixDQUFDO3dCQUMzRSxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDeEMsY0FBYyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDN0IsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUMxQjtpQkFDSjthQUNKO1lBRUQsMEJBQTBCO1lBQzFCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLElBQUksT0FBTyxFQUFFO29CQUNULEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QjtvQkFDakQsMENBQTBDO29CQUMxQyxJQUFJLHVCQUF1QixHQUFHLENBQUMsRUFBRTt3QkFDN0IsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDN0QsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBZ0IsQ0FBQzt3QkFDM0UsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3hDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDMUI7aUJBQ0o7YUFDSjtZQUVELHVCQUF1QjtZQUN2QixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO2dCQUNsRCxNQUFNLFdBQVcsR0FBSSxLQUFLLENBQUMsVUFBMEIsQ0FBQztnQkFDdEQsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDcEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxhQUE0QixDQUFDLENBQUM7aUJBQ3hFO3FCQUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUM5QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLHVCQUF1QjtvQkFDdkIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRixNQUFNLEtBQUssR0FBRyxhQUFhLElBQUksYUFBYSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFFeEUsSUFBSSxLQUFLLEVBQUU7d0JBQ1AsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7cUJBQ2pDO29CQUNELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2lCQUM1QjthQUNKO1lBRUQsWUFBWTtZQUNaLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3pCLHdCQUF3QjtnQkFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDNUI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSyxLQUFLLENBQUMsZUFBZSxDQUFDLHNCQUErQixLQUFLO1FBQzlELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLEVBQUU7WUFDdkMsMkdBQTJHO1lBQzNHLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUM7WUFDckYsSUFBSSxDQUFDLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7WUFDM0YsSUFBSSxDQUFDLHNCQUFzQixHQUFHLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7WUFDakcsTUFBTSxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQ2hELEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLEVBQ3RDLElBQUksQ0FBQyxzQkFBc0IsRUFDM0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUU7Z0JBQzlDLEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLFdBQVcsRUFBRSxJQUFJO2FBQ3BCLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQzdDO2dCQUNJLEtBQUssRUFBRSwrQkFBK0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTthQUMxRixFQUNELElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsb0JBQW9CLEVBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV4QiwyRUFBMkU7WUFDM0UsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNwSixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTO2dCQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsd0JBQXdCO2dCQUMvRCxpQkFBaUIsRUFBRTtnQkFDbkIsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDL0I7WUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDekQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3hCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN2RDtZQUNELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRTNCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtnQkFDakQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDN0c7WUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTNCLDBFQUEwRTtRQUMxRSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFcEQsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUN0RCxPQUFPO1NBQ1Y7UUFFRCx1RUFBdUU7UUFDdkUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7O2dCQUNsRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckcsTUFBQSxJQUFJLENBQUMsa0JBQWtCLDBDQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDekQ7YUFBTTtZQUNILE1BQU0sd0JBQXdCLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUNwRCxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxFQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLG9DQUFvQyxFQUFFLFNBQVMsQ0FBQyxDQUNoRSxDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEc7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxPQUFnQyxFQUFFLFNBQWtCO1FBQ3RFLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLFNBQVMsRUFBRTtZQUNYLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDSCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGVBQWUsQ0FBQyxjQUFrQyxFQUFFLEtBQXdCO1FBQ2hGLHlGQUF5RjtRQUN6RixJQUFJLGNBQXNCLENBQUM7UUFDM0IsaUhBQWlIO1FBQ2pILElBQUksa0JBQTBCLENBQUM7UUFFL0IsSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQzlCLHdHQUF3RztZQUN4RyxjQUFjLEdBQUcsaUVBQWlFLENBQUM7WUFDbkYsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7U0FDMUM7YUFBTTtZQUNILHVHQUF1RztZQUN2RywrRkFBK0Y7WUFDL0YsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBd0IsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsaUZBQWlGO1FBQ2pGLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzVCLE1BQU0sb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFO2dCQUNuRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsR0FBRyxFQUFFLFlBQVk7Z0JBQ2pCLElBQUksRUFBRSx5REFBeUQ7YUFDbEUsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUMvQztRQUVELE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRTtZQUN2QyxLQUFLLEVBQUUsZUFBZTtZQUN0QixZQUFZLEVBQUUsa0JBQWtCO1NBQ25DLENBQUMsQ0FBQztRQUVILE1BQU0saUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFO1lBQy9DLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsUUFBUSxFQUFFLENBQUM7U0FDZCxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUU5QixJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7WUFDeEMsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDO1lBQy9GLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQzFEO2lCQUFNO2dCQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ2xEO1NBQ0o7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbkQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNLLG1CQUFtQjtRQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssbUJBQW1CLENBQUMsUUFBMkIsU0FBUztRQUM1RCxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7O09BR0c7SUFDSyw2QkFBNkIsQ0FBQyxRQUEyQixTQUFTO1FBQ3RFLElBQUksQ0FBQyxlQUFlLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7TUFHRTtJQUNNLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFzQjtRQUNqRCxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXBELElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNoQixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzNFO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNLLEtBQUssQ0FBQyxxQkFBcUI7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFFdkIsYUFBYTtRQUNiLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssS0FBSyxDQUFDLGtCQUFrQixDQUFDLEtBQWEsRUFBRSxxQkFBOEIsSUFBSTtRQUM5RSxJQUFJO1lBQ0EsSUFBSSxVQUFVLEdBQXlCLFNBQVMsQ0FBQztZQUVqRCwrQ0FBK0M7WUFDL0MsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDOUIsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsdURBQXVEO1lBQ3ZELElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQy9FO1lBRUQsSUFBSSxrQkFBa0IsRUFBRTtnQkFDcEIsYUFBYTtnQkFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3JEO1lBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXRDLDBDQUEwQztZQUMxQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUUzQiw2RUFBNkU7WUFDN0UsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BELE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pELFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDMUU7U0FFSjtRQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsZ0ZBQWdGO1lBQ2hGLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxFQUFXLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSyxvQkFBb0IsQ0FBQyxHQUFhO1FBQ3RDLElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtZQUN4QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLDhCQUE4QixFQUFFLENBQUMsQ0FBQztZQUMvRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXhDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFDckM7WUFDSSxHQUFHLEVBQUUscUVBQXFFO1lBQzFFLEtBQUssRUFBRSxjQUFjO1lBQ3JCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQztRQUNQLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ25ILE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsTUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQzFDLEVBQUUsS0FBSyxFQUFFLHFDQUFxQyxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFDaEYsU0FBUyxFQUNULFFBQVEsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWxELE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSwwQkFBMEIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTFDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLG1CQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUcsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsbUJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU5RyxJQUFJLGlCQUFpQixJQUFJLG1CQUFtQixFQUFFO1lBQzFDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLEVBQUUsaUdBQWlHLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUMxTSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBMkIsRUFBRSxFQUFFOztnQkFDcEQsTUFBQSxJQUFJLENBQUMsbUJBQW1CLDBDQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztTQUVOO2FBQU07WUFDSCx1R0FBdUc7WUFDdkcsMkZBQTJGO1lBQzNGLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDOUQ7UUFFRCxJQUFJLFlBQVksQ0FBQztRQUVqQixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLCtCQUErQjtZQUMvQixNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JDLEtBQUssRUFBRSx1QkFBdUI7YUFDakMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFO2dCQUM3QyxLQUFLLEVBQUUsc0JBQXNCO2FBQ2hDLENBQUMsQ0FBQztZQUVILE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUMvQixNQUFNLHVCQUF1QixHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLFNBQVMsQ0FBQztnQkFDM0YsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDOUQsTUFBTSxVQUFVLEdBQUcsWUFBWSxHQUFHLEdBQUcsQ0FBQyxTQUFTLEdBQUcsdUJBQXVCLENBQUM7WUFFMUUsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQzlDLEVBQUUsRUFBRSxrQkFBa0I7Z0JBQ3RCLEtBQUssRUFBRSxlQUFlO2dCQUN0QixJQUFJLEVBQUUsVUFBVTthQUNuQixFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsQixlQUFlLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFaEQsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtnQkFDbEMsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUN2QztvQkFDSSxLQUFLLEVBQUUsb0JBQW9CO29CQUMzQixHQUFHLEVBQUUsK0RBQStEO2lCQUN2RSxDQUFDLENBQUM7Z0JBQ1AsTUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUNwQztvQkFDSSxFQUFFLEVBQUUsc0JBQXNCO29CQUMxQixLQUFLLEVBQUUsZ0NBQWdDO2lCQUMxQyxFQUNELFdBQVcsRUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELGVBQWUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDM0M7WUFDRCxZQUFZLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFO2dCQUNwQyxLQUFLLEVBQUUsZ0JBQWdCO2FBQzFCLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQy9HO2FBQU07WUFDSCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO1lBQ2pGLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQ2hDO2dCQUNJLElBQUksRUFBRSxHQUFHLENBQUMsU0FBUztnQkFDbkIsS0FBSyxFQUFFLDZCQUE2QjtnQkFDcEMsTUFBTSxFQUFFLFFBQVE7YUFDbkIsRUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsTUFBTSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQy9DLEVBQUUsS0FBSyxFQUFFLDBCQUEwQixFQUFFLEVBQ3JDLFlBQVksQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVyRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNwRCxNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1lBQ2pGLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3BHO1FBRUQsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFLENBQUMsQ0FBQztRQUN2Riw4R0FBOEc7UUFDOUcsb0RBQW9EO1FBQ3BELGVBQWUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUM1QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWpELE1BQU0saUJBQWlCLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbkQsNENBQTRDO1FBQzVDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUU7WUFDaEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQzthQUFNO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEQ7UUFFRCwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNLLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxLQUFhOztRQUV6QyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxTQUFTLEVBQUU7WUFDdkMsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUN6QztnQkFDSSxDQUFDLEVBQUUsMFBBQTBQO2FBQ2hRLENBQUMsQ0FBQztZQUNQLE1BQU0sU0FBUyxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFDcEM7Z0JBQ0ksT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLEtBQUssRUFBRSxtQkFBbUI7YUFDN0IsRUFDRCxhQUFhLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLGtEQUFrRCxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDbkk7YUFBTTtZQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUQ7UUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxTQUFTLEVBQUU7WUFDeEMsTUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUMxQztnQkFDSSxDQUFDLEVBQUUsK1BBQStQO2FBQ3JRLENBQUMsQ0FBQztZQUNQLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFDckM7Z0JBQ0ksT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLEtBQUssRUFBRSxtQkFBbUI7YUFDN0IsRUFDRCxjQUFjLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLGdEQUFnRCxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDbkk7YUFBTTtZQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDMUQ7UUFFRCxNQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsOEJBQThCLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNoSixNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdEksTUFBTSxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUUzSCxJQUFJLENBQUMscUJBQXFCLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLENBQUMsQ0FBQztRQUMvRixNQUFNLG9CQUFvQixHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRXhILE1BQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFLEVBQUUsaUJBQWlCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN2SSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUVsSCxNQUFBLElBQUksQ0FBQyxtQkFBbUIsMENBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRTVELElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVwRCxNQUFNLGFBQWEsR0FBRyxpQkFBaUIsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzVELGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVDLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQzdDO1lBRUQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDakYsQ0FBQyxDQUFDLENBQUM7WUFDSCxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFeEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxNQUFBLElBQUksQ0FBQyxtQkFBbUIsMENBQUUsV0FBVyxJQUFJLENBQUM7U0FDeEY7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxnQkFBZ0IsQ0FBQyxhQUEwQixFQUFFLFVBQXNCLEVBQUUsYUFBcUI7UUFDOUYsTUFBTSxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDO1FBRXhGLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxDQUFDLENBQUM7UUFDcEYsSUFBSSxVQUFVLENBQUMsWUFBWSxFQUFFO1lBQ3pCLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFDM0M7Z0JBQ0ksS0FBSyxFQUFFLHNCQUFzQjtnQkFDN0IsR0FBRyxFQUFFLHlCQUF5QixHQUFHLFVBQVUsQ0FBQyxZQUFZO2FBQzNELENBQUMsQ0FBQztZQUNQLGVBQWUsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNILE1BQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hILGVBQWUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUM5QztRQUNELGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUxQyxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7WUFDeEIsTUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUV6QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRTtnQkFDekQsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQzFHO1NBQ0o7UUFFRCxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDckIsTUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1QztRQUVELE1BQU0sNkJBQTZCLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLENBQUMsQ0FBQztRQUN2RyxNQUFNLGNBQWMsR0FBRywwQkFBMEIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVuRyxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDckIsTUFBTSx1QkFBdUIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztZQUNwRixNQUFNLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxnQ0FBZ0MsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVHLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxnQ0FBZ0MsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsSCx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDL0MsNkJBQTZCLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDakU7YUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUM1QixNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO1lBQ25GLDZCQUE2QixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUN6RDtRQUVELElBQUksVUFBVSxDQUFDLFlBQVksRUFBRTtZQUN6QixNQUFNLDJCQUEyQixHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBQ3hGLE1BQU0sdUJBQXVCLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLGdDQUFnQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbEgsMkJBQTJCLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDNUQsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsZ0NBQWdDLEVBQUUsRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUgsMkJBQTJCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdkQsNkJBQTZCLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDckU7UUFFRCxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUV4RCxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDcEIsTUFBTSwwQkFBMEIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO1lBQ2xHLE1BQU0saUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUUsMEJBQTBCLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDckQsaUJBQWlCLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDeEQ7UUFFRCxNQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDekcsTUFBTSx3QkFBd0IsR0FBRywyQkFBMkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDakgsTUFBTSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyx3QkFBd0IsSUFBSSxhQUFhLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDbEksYUFBYSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNLLEtBQUssQ0FBQyxjQUFjOztRQUN4QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQztRQUV0RixnRkFBZ0Y7UUFDaEYsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsU0FBUztZQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEVBQUU7WUFDakUsTUFBTSxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztTQUM5QztRQUVELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7UUFDN0UsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLDBCQUFvQixDQUFDLElBQUksRUFBRTtZQUMvRSxNQUFBLElBQUksQ0FBQyxrQkFBa0IsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsTUFBQSxJQUFJLENBQUMsa0JBQWtCLDBDQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxLQUFLLENBQUMsNkJBQTZCOztRQUN2QyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUVoRSwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLHdCQUF3QixHQUFHLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxvREFBb0QsRUFBRSxDQUFDLENBQUM7UUFFOUgsOEJBQThCO1FBQzlCLE1BQU0sb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUNqRDtZQUNJLEtBQUssRUFBRSw0Q0FBNEM7WUFDbkQsRUFBRSxFQUFFLDRCQUE0QjtTQUNuQyxDQUNKLENBQUM7UUFDRixvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFM0QsMERBQTBEO1FBQzFELElBQUksZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFO1lBQ2pELE1BQU0sbUJBQW1CLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQztZQUVoRyxNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQzlDO2dCQUNJLEtBQUssRUFBRSxzQkFBc0I7Z0JBQzdCLEVBQUUsRUFBRSxzQkFBc0I7Z0JBQzFCLElBQUksRUFBRSxXQUFXO2dCQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEdBQUc7Z0JBQ3BFLFdBQVcsRUFBRSxDQUFDO2FBQ2pCLENBQ0osQ0FBQztZQUVGLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDN0Q7UUFFRCwrREFBK0Q7UUFDL0QsSUFBSSxjQUFjLENBQUM7UUFDbkIsSUFBSSxhQUFhLENBQUM7UUFDbEIsSUFBSSxhQUFhLENBQUM7UUFDbEIsSUFBSSxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRTtZQUMzQyxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0UsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUM7WUFDaEYsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUM7WUFDOUUsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BILE1BQU0sNEJBQTRCLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLG9DQUFvQyxFQUFFLENBQUMsQ0FBQztZQUVuSCxJQUFJLGNBQWMsRUFBRTtnQkFDaEIsTUFBTSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsb0NBQW9DLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbEksTUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUMvQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQzdFLGlCQUFpQixDQUFDLE1BQU0sRUFDcEIsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsRUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw4Q0FBOEMsRUFBRSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xHLE1BQU0sZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFO29CQUM5QyxLQUFLLEVBQUUsa0JBQWtCO29CQUN6QixFQUFFLEVBQUUsc0JBQXNCO2lCQUM3QixFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDakMsNEJBQTRCLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDekQ7WUFDRCxJQUFJLGFBQWEsRUFBRTtnQkFDZixNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQ0FBbUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNoSSxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzdDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDNUUsaUJBQWlCLENBQUMsTUFBTSxFQUNwQixFQUFFLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxFQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLDhDQUE4QyxFQUFFLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDakcsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFO29CQUM3QyxLQUFLLEVBQUUsa0JBQWtCO29CQUN6QixFQUFFLEVBQUUscUJBQXFCO2lCQUM1QixFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDL0IsNEJBQTRCLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3hEO1lBQ0QsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsbUNBQW1DLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDaEksTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFO29CQUM3QyxLQUFLLEVBQUUsa0JBQWtCO29CQUN6QixFQUFFLEVBQUUscUJBQXFCO2lCQUM1QixFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLFdBQVcsQ0FBQyxhQUFhLElBQUksV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7b0JBQy9ELE1BQU0sbUJBQW1CLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQzdFLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ3BDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDOUYsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsZUFBZSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTTtvQkFDSCxlQUFlLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFDM0MsRUFBRSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsRUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw4Q0FBOEMsRUFBRSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEc7Z0JBQ0QsNEJBQTRCLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3hEO1lBQ0QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQscUdBQXFHO1FBQ3JHLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxhQUFhO1lBQ25ELENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlO1lBQ2pDLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsU0FBUyxFQUFFO1lBQ2xELE9BQU87U0FDVjtRQUVELG9DQUFvQztRQUNwQyxNQUFBLElBQUksQ0FBQyxpQkFBaUIsMENBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRDs7O09BR0c7SUFDSyxvQkFBb0IsQ0FBQyxjQUErQjtRQUV4RCxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFLEVBQUU7O1lBQ3pELE1BQU0sc0JBQXNCLEdBQUcsaUJBQWlCLENBQUMsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLGlEQUFpRCxFQUFFLENBQUMsQ0FBQztZQUUxSCx5Q0FBeUM7WUFDekMsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQy9DO2dCQUNJLEtBQUssRUFBRSx5Q0FBeUM7Z0JBQ2hELEVBQUUsRUFBRSwwQkFBMEIsR0FBRyxrQkFBa0I7YUFDdEQsQ0FDSixDQUFDO1lBRUYsa0JBQWtCLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDbkQsc0JBQXNCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFbEQsMkNBQTJDO1lBQzNDLE1BQU0sb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUNoRDtnQkFDSSxLQUFLLEVBQUUsMkJBQTJCO2dCQUNsQyxFQUFFLEVBQUUsNEJBQTRCLEdBQUcsa0JBQWtCO2FBQ3hELENBQ0osQ0FBQztZQUVGLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ3ZELHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBRXBELG9DQUFvQztZQUNwQyxNQUFBLElBQUksQ0FBQyxpQkFBaUIsMENBQUUsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxhQUFhO1FBQ2pCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFFckUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRWxFLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRXRFLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLG9CQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxvQkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDMUc7UUFFRCx1RUFBdUU7UUFDdkUsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFFbEQsSUFBSSxZQUFZLEtBQUssS0FBSyxFQUFFO1lBQ3hCLHVHQUF1RztZQUN2Ryx5R0FBeUc7WUFDekcsK0JBQStCO1lBQy9CLHFCQUFxQixHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsb0JBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQWMsQ0FBQyxRQUFRLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsb0JBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ25JO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsb0JBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNsRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQWMsQ0FBQyxNQUFNLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsb0JBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQy9IO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsb0JBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQWMsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsb0JBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQ3ZJO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsb0JBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQWMsQ0FBQyxLQUFLLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsb0JBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzdIO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsb0JBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsMEJBQTBCLENBQUMscUJBQXFCLEVBQ2pELFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLG9CQUFjLENBQUMsVUFBVSxDQUFDLEVBQ3RELFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLG9CQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUM3RDtRQUVELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssb0JBQW9CLENBQUMsZ0JBQTZCLEVBQUUsS0FBb0I7UUFDNUUsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUN6QztZQUNJLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLGFBQWEsb0JBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDN0MsRUFBRSxFQUFFLGFBQWEsb0JBQWMsQ0FBQyxRQUFRLEVBQUU7WUFDMUMsSUFBSSxFQUFFLG9CQUFjLENBQUMsUUFBUTtZQUM3QixXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0Isb0JBQWMsQ0FBQyxRQUFRLGNBQWMsRUFBRSxTQUFTLENBQUM7WUFDN0YsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLG9CQUFjLENBQUMsUUFBUSxRQUFRLEVBQUUsU0FBUyxDQUFDO1NBQzNGLENBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxFQUFFO1lBQ1AsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDN0I7UUFFRCxNQUFNLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQ3pDO1lBQ0ksS0FBSyxFQUFFLHFCQUFxQjtTQUMvQixFQUNELFdBQVcsQ0FBQyxDQUFDO1FBRWpCLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxvQkFBb0IsQ0FBQyxlQUErQixFQUFFLGdCQUE2QixFQUFFLGtCQUFpQztRQUMxSCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXBGLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLE9BQU87U0FDVjtRQUVELHVGQUF1RjtRQUN2RixrQ0FBa0M7UUFDbEMsOERBQThEO1FBQzlELHNHQUFzRztRQUN0RyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixlQUFlLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRixNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7WUFDNUMsS0FBSyxFQUFFLHVDQUF1QyxlQUFlLFFBQVE7WUFDckUsRUFBRSxFQUFFLGFBQWEsZUFBZSxTQUFTO1lBQ3pDLElBQUksRUFBRSxlQUFlO1lBQ3JCLFlBQVksRUFBRSxTQUFTO1NBQzFCLENBQUMsQ0FBQztRQUVILE1BQU0sdUJBQXVCLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFO1lBQ3JELEtBQUssRUFBRSxnQkFBZ0I7U0FDMUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixlQUFlLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sd0JBQXdCLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFO1lBQ3RELEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsaUNBQWlDLEVBQUUsU0FBUyxDQUFDO1NBQzNFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sbUJBQW1CLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFO1lBQ2pELEtBQUssRUFBRSwwQkFBMEI7WUFDakMsRUFBRSxFQUFFLGFBQWEsZUFBZSxTQUFTO1lBQ3pDLGFBQWEsRUFBRSxNQUFNO1NBQ3hCLEVBQUUsdUJBQXVCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUN0RCxNQUFNLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRTtZQUNqRCxLQUFLLEVBQUUsMEJBQTBCO1NBQ3BDLENBQUMsQ0FBQztRQUNILE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRTtZQUMxQyxLQUFLLEVBQUUsdUNBQXVDLGVBQWUscUJBQXFCO1lBQ2xGLFlBQVksRUFBRSxTQUFTO1lBQ3ZCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsSUFBSSxFQUFFLGVBQWU7U0FDeEIsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRTdDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQixJQUFJLGVBQWUsS0FBSyxvQkFBYyxDQUFDLFFBQVEsRUFBRTtnQkFDN0MsY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7YUFDN0c7aUJBQU07Z0JBQ0gsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7b0JBQzFCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsa0JBQWtCLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ2pLLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzt3QkFDbEQsTUFBTSxDQUFDLEtBQUssS0FBSyxrQkFBa0IsRUFBRTt3QkFDckMsY0FBYyxHQUFHLGNBQWMsQ0FBQzt3QkFDaEMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3FCQUN2RDtpQkFDSjthQUNKO1NBQ0o7UUFFRCxjQUFjLEdBQUcsY0FBYyxhQUFkLGNBQWMsY0FBZCxjQUFjLEdBQUksbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRyx1QkFBdUIsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUU3RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV0QyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyxvQkFBb0IsQ0FBQyxZQUErQixFQUN4RCxtQkFBZ0MsRUFDaEMsT0FBdUIsRUFDdkIsS0FBb0I7UUFDcEIsd0NBQXdDO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLG9CQUFjLENBQUMsUUFBUSxDQUFDO1FBQzNDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUF1QyxDQUFDO1FBQzNELE1BQU0sa0JBQWtCLEdBQW1CLEVBQUUsQ0FBQztRQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xCLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuRSxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkUsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDaEMsT0FBTyxDQUFDLENBQUM7YUFDWjtpQkFBTSxJQUFJLFlBQVksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEMsT0FBTyxDQUFDLENBQUM7YUFDWjtpQkFBTSxJQUFJLFlBQVksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdEMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNiO2lCQUFNLElBQUksWUFBWSxJQUFJLFlBQVksRUFBRTtnQkFDckMsT0FBTyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQzthQUMzRjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsQ0FBQzthQUNaO1FBQ0wsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hCLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNoRixJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFO2dCQUN6QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2pHO2lCQUFNLElBQUksZUFBZSxFQUFFO2dCQUN4QixJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNiLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDeEM7cUJBQU07b0JBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDM0I7YUFDSjtpQkFBTTtnQkFDSCwyQ0FBMkM7Z0JBQzNDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxjQUFjLEdBQXVCLElBQUksQ0FBQztRQUM5Qyw2REFBNkQ7UUFDN0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUUsRUFBRTs7WUFDdkMsaUZBQWlGO1lBQ2pGLG1GQUFtRjtZQUNuRixNQUFNLGdCQUFnQixHQUFHLE1BQUEsU0FBUyxDQUFDLENBQUMsQ0FBQywwQ0FBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzRSxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDdkIsTUFBTSxzQkFBc0IsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLFdBQUMsT0FBQSxLQUFLLEdBQUcsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLENBQUMsQ0FBQyxDQUFBLEVBQUEsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM5RyxNQUFNLGlCQUFpQixHQUFpQjtnQkFDcEMsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEtBQUssRUFBRSxnQkFBZ0I7Z0JBQ3ZCLEtBQUssRUFBRSxzQkFBc0I7Z0JBQzdCLFFBQVEsRUFBRSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUU7Z0JBQzVDLGtCQUFrQixFQUFFLEtBQUs7YUFDNUIsQ0FBQztZQUNGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvSCxjQUFjLEdBQUcsS0FBSyxLQUFLLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7WUFDcEYsMkZBQTJGO1lBQzNGLEtBQUssTUFBTSxNQUFNLElBQUksU0FBUyxFQUFFO2dCQUM1QixxR0FBcUc7Z0JBQ3JHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxtQ0FBSSxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUN6RCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN0SCxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQU0sRUFBRTtvQkFDM0MsY0FBYyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDO2lCQUMzRTtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixJQUFJLENBQUMsS0FBSyxDQUFDO29CQUNyQyxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtvQkFDeEIsY0FBYyxHQUFHLGNBQWMsQ0FBQztpQkFDbkM7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsbUVBQW1FO1FBQ25FLHFHQUFxRztRQUNyRywyREFBMkQ7UUFDM0Qsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUMxRSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JILElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO2dCQUN4QixjQUFjLEdBQUcsY0FBYyxDQUFDO2FBQ25DO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxlQUFlLENBQUMsTUFBb0IsRUFBRSxlQUErQjtRQUN6RSxJQUFJLElBQVksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixlQUFlLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNuRjthQUFNO1lBQ0gsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDdEI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ssb0JBQW9CLENBQUMsTUFBb0IsRUFDN0MsYUFBZ0MsRUFDaEMsb0JBQWlDLEVBQ2pDLFFBQWlCLEVBQ2pCLGVBQStCLEVBQy9CLGtCQUFpQztRQUNqQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMzRCxNQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RELE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRTtZQUM1QyxLQUFLLEVBQUUsK0JBQStCO1lBQ3RDLFlBQVksRUFBRSxNQUFNLENBQUMsS0FBSztTQUM3QixFQUFFLElBQUksQ0FBQyxDQUFDO1FBRVQsSUFBSSxRQUFRLEVBQUU7WUFDVixjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3pELGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDcEQ7UUFFRCxJQUFJLGtCQUFrQixLQUFLLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDckMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWpELE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7O09BR0c7SUFDSyx3QkFBd0IsQ0FBQyxhQUEwQjtRQUN2RCxJQUFJLGFBQWEsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLGFBQWEsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7WUFDcEUsT0FBTztTQUNWO1FBRUQsSUFBSSxhQUFhLEtBQUssSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO1FBRUQsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFOUQsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjthQUFNO1lBQ0gsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEMsYUFBYSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGFBQWEsQ0FBQztZQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLHdCQUF3QixDQUFDLGFBQXNCLEVBQUUsTUFBc0Q7O1FBQzNHLE1BQU0sS0FBSyxHQUFHLE1BQUEsYUFBYSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQzdELE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBQSxNQUFBLElBQUksQ0FBQyxnQkFBZ0IsMENBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFDN0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV0QywyQkFBMkI7UUFDM0IsTUFBTSxVQUFVLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckYsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDZixPQUFPO1NBQ1Y7UUFFRCx3REFBd0Q7UUFDeEQsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLGVBQWUsYUFBZixlQUFlLHVCQUFmLGVBQWUsQ0FBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN6RCxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbkQsa0JBQWtCO1FBQ2xCLE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQkFBaUI7O1FBQ3JCLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRTtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMxRCxNQUFBLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssMEJBQTBCLENBQUMsZ0JBQTZCLEVBQUUsZUFBOEIsRUFBRSxhQUE0QjtRQUMxSCxNQUFNLG1CQUFtQixHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFDakQ7WUFDSSxJQUFJLEVBQUUsTUFBTTtZQUNaLEVBQUUsRUFBRSwrQkFBK0I7WUFDbkMsS0FBSyxFQUFFLDRCQUE0QjtZQUNuQyxJQUFJLEVBQUUsb0JBQWMsQ0FBQyxVQUFVO1lBQy9CLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVDQUF1QyxFQUFFLFNBQVMsQ0FBQztZQUM3RSxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxTQUFTLENBQUM7U0FDM0UsQ0FBQyxDQUFDO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUV2QyxJQUFJLGVBQWUsRUFBRTtZQUNqQixtQkFBbUIsQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1NBQy9DO1FBRUQsTUFBTSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQy9DO1lBQ0ksS0FBSyxFQUFFLHVCQUF1QjtTQUNqQyxFQUNELG1CQUFtQixDQUFDLENBQUM7UUFFekIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG9CQUFjLENBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZGLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7O09BR0c7SUFDSyx3QkFBd0IsQ0FBQyxnQkFBNkI7UUFDMUQsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUMzQztZQUNJLEtBQUssRUFBRSw0QkFBNEI7U0FDdEMsRUFDRCxpQkFBaUIsQ0FBQyxRQUFRLEVBQ3RCO1lBQ0ksRUFBRSxFQUFFLDRCQUE0QjtZQUNoQyxLQUFLLEVBQUUsc0NBQXNDO1lBQzdDLElBQUksRUFBRSxRQUFRO1NBQ2pCLEVBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUNwRCxpQkFBaUIsQ0FBQyxRQUFRLEVBQ3RCO1lBQ0ksRUFBRSxFQUFFLDJCQUEyQjtZQUMvQixLQUFLLEVBQUUscUNBQXFDO1lBQzVDLElBQUksRUFBRSxRQUFRO1NBQ2pCLEVBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUN0RCxDQUFDO1FBQ0YsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7OztNQUlFO0lBQ00saUJBQWlCLENBQUMsS0FBYSxFQUFFLE1BQXFEO1FBQzFGLE1BQU0sV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVE7WUFDMUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUViLElBQUksV0FBVyxZQUFZLGdCQUFnQixJQUFJLFdBQVcsWUFBWSxpQkFBaUIsRUFBRTtZQUNyRixJQUFJLFdBQVcsWUFBWSxpQkFBaUIsRUFBRTtnQkFDMUMsa0VBQWtFO2dCQUNsRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRTtvQkFDcEMsK0RBQStEO29CQUMvRCxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7aUJBQ3hDO2FBQ0o7WUFDRCxXQUFXLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLG1CQUFtQjtRQUN2QixNQUFNLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQzFDO1lBQ0ksRUFBRSxFQUFFLDRCQUE0QjtZQUNoQyxLQUFLLEVBQUUseUJBQXlCO1NBQ25DLENBQUMsQ0FBQztRQUVQLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGtCQUFrQixDQUFDLFNBQWtCLEVBQUUseUJBQWtEO1FBRTdGLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFDdEM7WUFDSSxFQUFFLEVBQUUsb0JBQW9CO1lBQ3hCLEtBQUssRUFBRSxzQkFBc0I7U0FDaEMsRUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFFbkQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU1QixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLHlCQUF5QixDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssa0JBQWtCLENBQUMsU0FBa0IsRUFBRSx5QkFBa0Q7UUFDN0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFakMsSUFBSSx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsMkJBQXFCLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEUseUJBQXlCO1lBQ3pCLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDakUsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUV4RCxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQ2xDO2dCQUNJLEVBQUUsRUFBRSxxQkFBcUI7Z0JBQ3pCLEtBQUssRUFBRSxlQUFlO2dCQUN0QixZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUM7Z0JBQzVELEdBQUcsRUFBRSxvRUFBb0U7Z0JBQ3pFLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLFNBQVMsQ0FBQzthQUN4RCxDQUFDLENBQUM7WUFFUCxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQ2hDO2dCQUNJLEVBQUUsRUFBRSxxQkFBcUI7Z0JBQ3pCLEtBQUssRUFBRSxlQUFlO2dCQUN0QixJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQkFDM0IsR0FBRyxFQUFFLG1CQUFtQjtnQkFDeEIsTUFBTSxFQUFFLFFBQVE7YUFDbkIsRUFDRCxNQUFNLENBQUMsQ0FBQztZQUVaLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUI7UUFFRCxJQUFJLHlCQUF5QixDQUFDLFFBQVEsQ0FBQywyQkFBcUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNuRSw4QkFBOEI7WUFDOUIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ3JFLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTlDLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFDdkM7Z0JBQ0ksRUFBRSxFQUFFLG9CQUFvQjtnQkFDeEIsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUM7Z0JBQ3JELEdBQUcsRUFBRSw2REFBNkQ7Z0JBQ2xFLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUM7YUFDakQsQ0FBQyxDQUFDO1lBRVAsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxFQUNyQztnQkFDSSxFQUFFLEVBQUUsb0JBQW9CO2dCQUN4QixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsSUFBSSxFQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtnQkFDakMsR0FBRyxFQUFFLG1CQUFtQjtnQkFDeEIsTUFBTSxFQUFFLFFBQVE7YUFDbkIsRUFDRCxXQUFXLENBQUMsQ0FBQztZQUVqQixTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsSUFBSSx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsMkJBQXFCLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEUsK0JBQStCO1lBQy9CLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLENBQUMsZ0RBQWdELENBQUMsQ0FBQztZQUNuRixnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM5QyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUU5RCxNQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQ3hDO2dCQUNJLEVBQUUsRUFBRSxxQkFBcUI7Z0JBQ3pCLEtBQUssRUFBRSxlQUFlO2dCQUN0QixZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUM7Z0JBQzVELEdBQUcsRUFBRSw2REFBNkQ7Z0JBQ2xFLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLFNBQVMsQ0FBQzthQUN4RCxDQUFDLENBQUM7WUFFUCxNQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLEVBQ3RDO2dCQUNJLEVBQUUsRUFBRSxxQkFBcUI7Z0JBQ3pCLEtBQUssRUFBRSxlQUFlO2dCQUN0QixJQUFJLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO2dCQUNqQyxHQUFHLEVBQUUsbUJBQW1CO2dCQUN4QixNQUFNLEVBQUUsUUFBUTthQUNuQixFQUNELFlBQVksQ0FBQyxDQUFDO1lBRWxCLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbEM7UUFFRCxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLHlCQUF5QixDQUFDLFFBQVEsQ0FBQywyQkFBcUIsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM1RyxrQkFBa0I7WUFDbEIsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUN2QztnQkFDSSxFQUFFLEVBQUUscUJBQXFCO2dCQUN6QixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDO2dCQUN4RCxHQUFHLEVBQUUsK0RBQStEO2dCQUNwRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUM7YUFDcEQsQ0FBQyxDQUFDO1lBQ1AsTUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUMzQztnQkFDSSxLQUFLLEVBQUUsMEJBQTBCO2dCQUNqQyxhQUFhLEVBQUUsSUFBSTthQUN0QixFQUNELElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUV4RCxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQ3pDO2dCQUNJLEVBQUUsRUFBRSxxQkFBcUI7Z0JBQ3pCLEtBQUssRUFBRSwwQkFBMEI7YUFDcEMsRUFDRCxXQUFXLEVBQ1gsY0FBYyxDQUFDLENBQUM7WUFFcEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBa0IsRUFBRSxxQkFBOEIsSUFBSTtRQUN6RSxJQUFJO1lBQ0EsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztZQUVwQyxJQUFJLGtCQUFrQixFQUFFO2dCQUNwQiwyREFBMkQ7Z0JBQzNELE1BQU0sV0FBVyxHQUF5QixFQUFFLENBQUM7Z0JBRTdDLG1EQUFtRDtnQkFDbkQsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakQsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUMvQixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBc0IsQ0FBQztvQkFDakQsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQ3BELElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTs0QkFDZCxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzs0QkFDdkMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDekQ7NkJBQU07NEJBQ0gsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQzlDO3FCQUNKO2lCQUNKO2dCQUVELDJHQUEyRztnQkFDM0csSUFBSSxXQUFXLENBQUMsb0JBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUNqRixVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxvQkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMzRDtnQkFFRCxzRUFBc0U7Z0JBQ3RFLG1HQUFtRztnQkFDbkcsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUM1QixVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2lCQUN6RTtxQkFBTTtvQkFDSCxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDdkM7Z0JBRUQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLGtDQUFrQztnQkFDaEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFFekQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUNyRTtZQUVELHlDQUF5QztZQUN6QyxvSUFBb0k7WUFDcEksTUFBTSxhQUFhLEdBQW9CO2dCQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUM7Z0JBQ3JDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7Z0JBQ2hDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDO1lBRUYsNEJBQTRCO1lBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFM0QsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sRUFBRTtnQkFDL0IsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBcUIsQ0FBQyxFQUFFO29CQUMvRCxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUM5QjthQUNKO1lBRUQsbUNBQW1DO1lBQ25DLCtFQUErRTtZQUMvRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFFbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFakQsOEJBQThCO1lBQzlCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztZQUV4RSxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBcUIsQ0FBQztZQUU1QyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO29CQUNyRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQ3pCO3FCQUFNO29CQUNILElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDMUI7Z0JBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFM0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNwRDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQjtZQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JEO1FBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxxRUFBcUU7WUFDckUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQVcsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztJQUVEOztTQUVLO0lBQ0csZ0JBQWdCO1FBQ3BCLElBQUksY0FBYyxHQUFXLEVBQUUsQ0FBQztRQUVoQyxpREFBaUQ7UUFDakQsd0JBQXdCO1FBQ3hCLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEUsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsNENBQTRDLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDMUY7YUFBTTtZQUNILGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLCtDQUErQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzdGO1FBRUQsTUFBTSxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQzdDLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixFQUFFLEVBQ25DLGNBQWMsQ0FDakIsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ0ssY0FBYztRQUNsQix3Q0FBd0M7UUFDeEMsSUFBSSxtQkFBbUIsR0FBdUIsU0FBUyxDQUFDO1FBQ3hELElBQUksbUJBQW1CLEdBQTRCLFNBQVMsQ0FBQztRQUU3RCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQzlCLE9BQU87U0FDVjtRQUVELHdFQUF3RTtRQUN4RSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksSUFBSSxtQkFBYSxDQUFDLGNBQWMsRUFBRTtnQkFDNUUsSUFBSSxHQUFHLENBQUMsWUFBWSxLQUFLLG1CQUFtQixJQUFJLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtvQkFDL0Usb0RBQW9EO29CQUNwRCxtQkFBbUIsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO29CQUN2QyxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQ3pDLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFLEVBQ3BDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUVyRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUNsRDtnQkFFRCxNQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUV6QyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDNUM7aUJBQU0sRUFBRSx3QkFBd0I7Z0JBQzdCLE1BQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzNDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxlQUFlO1FBQ25CLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDOUIsT0FBTztTQUNWO1FBRUQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0MsTUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUM3QyxNQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQ3hDO2dCQUNJLEtBQUssRUFBRSx1QkFBdUI7YUFDakMsRUFDRCxnQkFBZ0IsQ0FDbkIsQ0FBQztZQUVGLE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxxQkFBcUIsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7WUFDbkQsS0FBSyxFQUFFLDZCQUE2QjtTQUN2QyxFQUFFLEdBQUcsZUFBZSxDQUFDLENBQUM7UUFFdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssb0JBQW9CLENBQUMsYUFBcUI7UUFDOUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6RSw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7O09BR0c7SUFDSyx1QkFBdUIsQ0FBQyxjQUFzQjtRQUNsRCxJQUFJLGNBQWMsSUFBSSxDQUFDLEVBQUU7WUFDckIsT0FBTztTQUNWO1FBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBRTNDLE1BQU0sbUJBQW1CLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUMvQyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFFbkMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxJQUFJLGNBQWMsR0FBRyxDQUFDLEVBQUU7WUFDdkMsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLDhDQUE4QyxFQUFFLFdBQVcsRUFBRSxHQUFHLFdBQVcsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2pKLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN6QztRQUVELHlGQUF5RjtRQUN6RixlQUFlO1FBQ2YsSUFBSSxjQUFjLElBQUksQ0FBQyxFQUFFO1lBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyRDtTQUNKO2FBQU07WUFDSCxrREFBa0Q7WUFDbEQsZ0RBQWdEO1lBQ2hELHNEQUFzRDtZQUN0RCxxREFBcUQ7WUFDckQsOEJBQThCO1lBQzlCLDhGQUE4RjtZQUM5RixTQUFTO1lBQ1QsMkVBQTJFO1lBQzNFLHlFQUF5RTtZQUN6RSwrRkFBK0Y7WUFDL0Ysa0ZBQWtGO1lBRWxGLE1BQU0sWUFBWSxHQUFHLFdBQVcsSUFBSSxDQUFDLENBQUM7WUFDdEMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpELDhDQUE4QztZQUM5QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFbEQsYUFBYTtZQUNiLElBQUksWUFBWSxFQUFFO2dCQUNkLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyRDtpQkFBTTtnQkFDSCxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDMUY7WUFFRCxhQUFhO1lBQ2IsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNLElBQUksWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO2lCQUFNO2dCQUNILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbkU7WUFFRCxhQUFhO1lBQ2IsSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNLElBQUksWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO2lCQUFNO2dCQUNILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUMvRDtZQUVELGFBQWE7WUFDYixJQUFJLFlBQVksRUFBRTtnQkFDZCxJQUFJLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDckQ7aUJBQU0sSUFBSSxZQUFZLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdEU7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixFQUFFLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNuRTtZQUVELGFBQWE7WUFDYixJQUFJLFlBQVksRUFBRTtnQkFDZCxJQUFJLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO2lCQUFNO2dCQUNILG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUMxRjtZQUVELDRDQUE0QztZQUM1QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDbEU7UUFFRCxJQUFJLFdBQVcsR0FBRyxjQUFjLElBQUksY0FBYyxHQUFHLENBQUMsRUFBRTtZQUNwRCxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7Z0JBQzNDLEtBQUssRUFBRSwrQ0FBK0MsRUFBRSxXQUFXLEVBQUUsR0FBRyxXQUFXLEdBQUcsQ0FBQyxFQUFFO2FBQzVGLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDUixtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDMUM7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssb0JBQW9CLENBQUMsU0FBc0IsRUFBRSxVQUFrQjtRQUNuRSxNQUFNLFVBQVUsR0FBRyxVQUFVLEtBQUssSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ3pELE1BQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFDdEMsRUFBRSxLQUFLLEVBQUUsOEJBQThCLEVBQUUsV0FBVyxFQUFFLEdBQUcsVUFBVSxFQUFFLEVBQUUsRUFDdkUsR0FBRyxVQUFVLEVBQUUsQ0FDbEIsQ0FBQztRQUVGLElBQUksVUFBVSxFQUFFO1lBQ1osT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUM1QztRQUVELFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHdCQUF3QixDQUFDLGFBQXNCO1FBQ25ELE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFM0QsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGdCQUFnQixDQUFDLEdBQWEsRUFBRSxTQUFzQjtRQUMxRCw2QkFBNkI7UUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QywrQkFBK0I7UUFDL0IsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBYyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQXFCLENBQUMsRUFBRTtnQkFDL0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkM7U0FDSjtRQUNELDhCQUE4QjtRQUM5QixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoQyxpQkFBaUI7UUFDakIsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV6Qyx1Q0FBdUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRS9CLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUFDLEdBQUcsRUFDbEM7WUFDSSxLQUFLLEVBQUUsMkJBQTJCO1lBQ2xDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNqQixJQUFJLEVBQUUsSUFBSTtTQUNiLEVBQ0QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXZCLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0IsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLG1CQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkcsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLG1CQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0csSUFBSSxpQkFBaUIsSUFBSSxtQkFBbUIsRUFBRTtZQUMxQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFFbEgsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssd0JBQXdCLENBQUMsR0FBYSxFQUFFLFNBQWlCLEVBQUUsaUJBQTBCLEVBQUUsbUJBQTRCO1FBQ3ZILE1BQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFDakM7WUFDSSxLQUFLLEVBQUUsU0FBUztZQUNoQixTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7U0FDcEIsQ0FBQyxDQUFDO1FBRVAsSUFBSSxpQkFBaUIsRUFBRTtZQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBQ3BDLE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFDMUM7Z0JBQ0ksRUFBRSxFQUFFLFVBQVU7Z0JBQ2QsS0FBSyxFQUFFLG1CQUFtQjthQUM3QixFQUNELElBQUksQ0FBQyxDQUFDO1lBQ1YsTUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQzVDO2dCQUNJLEtBQUssRUFBRSxxQkFBcUI7YUFDL0IsQ0FBQyxDQUFDO1lBQ1AsY0FBYyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFN0IsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtnQkFDekMsaUNBQWlDO2dCQUNqQyxJQUFJLGNBQWMsQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLFdBQVcsRUFBRTtvQkFDekQsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7b0JBQ3RELGdCQUFnQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2lCQUM1QztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRTtnQkFDeEMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUVELElBQUksbUJBQW1CLEVBQUU7WUFDckIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3RCxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQ3JDO2dCQUNJLEtBQUssRUFBRSxlQUFlO2FBQ3pCLEVBQ0QsUUFBUSxDQUFDLENBQUM7WUFDZCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNCO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyw0QkFBNEIsQ0FBQyxHQUFhLEVBQUUsU0FBaUIsRUFBRSxpQkFBMEIsRUFBRSxtQkFBNEI7UUFDM0gsTUFBTSxNQUFNLEdBQWtCLEVBQUUsQ0FBQztRQUVqQyxJQUFJLGlCQUFpQixFQUFFO1lBQ25CLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVwRSxNQUFNLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQ3pDO2dCQUNJLEtBQUssRUFBRSxTQUFTO2dCQUNoQixTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUU7YUFDcEIsRUFDRCxpQkFBaUIsQ0FDcEIsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDOUI7UUFFRCxJQUFJLG1CQUFtQixFQUFFO1lBQ3JCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFbEUsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUNyQztnQkFDSSxLQUFLLEVBQUUsU0FBUztnQkFDaEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2FBQ3BCLEVBQ0QsYUFBYSxDQUNoQixDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMxQjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHNCQUFzQixDQUFDLGdCQUF3QjtRQUNuRCxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN6RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMvQyxNQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0gsTUFBTSxZQUFZLEdBQUcsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFdkQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN6RTthQUFNLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDN0Q7YUFBTSxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7U0FDM0U7YUFBTSxJQUFJLFdBQVcsS0FBSyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzlEO2FBQU0sSUFBSSxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDN0U7YUFBTSxJQUFJLGlCQUFpQixLQUFLLENBQUMsRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDL0Q7YUFBTSxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDL0U7YUFBTSxJQUFJLFdBQVcsS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDOUQ7aUJBQU0sSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsb0NBQW9DLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDeEU7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDeEY7U0FDSjthQUFNO1lBQ0gsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUM3RTtpQkFBTSxJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZGO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQ0FBc0MsRUFBRSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDekg7U0FDSjtJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLE9BQU8sQ0FBQyxHQUFXLEVBQUUsWUFBZ0M7UUFDekQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFckMsSUFBSSxJQUFJLElBQUksU0FBUyxFQUFFO1lBQ25CLE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDNUQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFTLGlCQUFpQixDQUF3QyxPQUFVLEVBQUUsVUFBMEMsRUFBRSxHQUFHLFFBQTREO0lBQ3JMLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsSUFBSSxVQUFVLEVBQUU7UUFDWixLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNuRCxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMvQztLQUNKO0lBRUQsSUFBSSxRQUFRLEVBQUU7UUFDVixLQUFLLE1BQU0sS0FBSyxJQUFJLFFBQVEsRUFBRTtZQUMxQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDdkQ7aUJBQU0sSUFBSSxLQUFLLFlBQVksV0FBVyxJQUFJLEtBQUssWUFBWSxVQUFVLEVBQUU7Z0JBQ3BFLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0gsTUFBTSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDO2dCQUNoRCxPQUFPLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLE9BQXNDLEVBQUUsVUFBVSxFQUFFLEdBQUcsUUFBUyxDQUFDLENBQUMsQ0FBQzthQUM1RztTQUNKO0tBQ0o7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQVMsZ0JBQWdCLENBQXVDLE9BQVUsRUFBRSxVQUEwQyxFQUFFLEdBQUcsUUFBc0I7SUFDN0ksTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRixJQUFJLFVBQVUsRUFBRTtRQUNaLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ25ELE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQy9DO0tBQ0o7SUFFRCxJQUFJLFFBQVEsRUFBRTtRQUNWLEtBQUssTUFBTSxLQUFLLElBQUksUUFBUSxFQUFFO1lBQzFCLElBQUksS0FBSyxZQUFZLFVBQVUsRUFBRTtnQkFDN0IsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QjtTQUNKO0tBQ0o7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxZQUFxQztJQUN2RSxvREFBb0Q7SUFDcEQsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBRWxDLE1BQU0sT0FBTyxHQUFHLFVBQVUsS0FBVSxFQUFFLEtBQWE7UUFDL0MsT0FBTyxLQUFLLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMvRCxDQUFDLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsU0FBUyxhQUFhLENBQUMsTUFBeUIsRUFBRSxLQUFhO0lBQzNELEtBQUssTUFBTSxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNqQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7QUFDcEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwi77u/Ly8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vY29tbW9uSW50ZXJmYWNlcy5kLnRzJyAvPlxyXG5cclxuLyoqXHJcbiAqIFN0cnVjdHVyZSBvZiBhIGNsaWVudCdzIGNhcmVlciBzaXRlIGNvbmZpZ3VyYXRpb24gc2V0dGluZ3MuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzIHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBOYW1lOiBzdHJpbmc7XHJcbiAgICBvcmdJZDogc3RyaW5nO1xyXG4gICAgcGFnZVNpemU6IG51bWJlcjtcclxuICAgIHN0eWxlc2hlZXRSZWxhdGl2ZVVybDogc3RyaW5nO1xyXG4gICAgam9iUG9ydGFsVXJsOiBzdHJpbmc7XHJcbiAgICBzb2NpYWxTaGFyaW5nTG9nb1VybDogc3RyaW5nO1xyXG4gICAgYnJhbmRGdWxsTmFtZTogc3RyaW5nO1xyXG4gICAgcmVxdWlzaXRpb25MaXN0OiBSZXF1aXNpdGlvbkxpc3RTZXR0aW5ncztcclxuICAgIHJlcXVpc2l0aW9uRGV0YWlsczogUmVxdWlzaXRpb25EZXRhaWxzU2V0dGluZ3M7XHJcbiAgICB0ZXh0OiBSZWFkb25seURpY3Rpb25hcnk8c3RyaW5nPjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1aXNpdGlvbkxpc3RTZXR0aW5ncyB7XHJcbiAgICBzZWFyY2g6IHtcclxuICAgICAgICBsYXlvdXRUeXBlOiBTZWFyY2hMYXlvdXRUeXBlRW51bTtcclxuICAgICAgICBmaWx0ZXJzOiBGaWx0ZXJUeXBlRW51bVtdO1xyXG4gICAgICAgIGZpbHRlck9wdGlvbnM6IEZpbHRlck9wdGlvbnM7XHJcbiAgICB9O1xyXG4gICAgc2hhcmluZzogU2hhcmluZ1NldHRpbmdzO1xyXG4gICAgaW5zaWdodHM6IFJlcXVpc2l0aW9uTGlzdEluc2lnaHRzU2V0dGluZ3M7XHJcbiAgICBhdXRvTG9hZEpvYnM6IGJvb2xlYW47XHJcbiAgICBncm91cEJ5RmllbGQ/OiBzdHJpbmc7XHJcbiAgICBkaXNwbGF5RmllbGRzOiBGaWVsZFR5cGVFbnVtW107XHJcbiAgICBsYXlvdXRUeXBlOiBSZXF1aXNpdGlvbkxpc3RMYXlvdXRUeXBlRW51bTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1aXNpdGlvbkRldGFpbHNTZXR0aW5ncyB7XHJcbiAgICBzaGFyaW5nOiBTaGFyaW5nU2V0dGluZ3M7XHJcbiAgICBkaXNwbGF5RmllbGRzOiBGaWVsZFR5cGVFbnVtW107XHJcbiAgICBpbnNpZ2h0czogUmVxdWlzaXRpb25EZXRhaWxzSW5zaWdodHNTZXR0aW5ncztcclxufVxyXG5cclxuZXhwb3J0IGVudW0gUmVxdWlzaXRpb25MaXN0TGF5b3V0VHlwZUVudW0ge1xyXG4gICAgbGlzdCA9ICdsaXN0JyxcclxuICAgIHRpbGVzID0gJ3RpbGVzJ1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBTZWFyY2hMYXlvdXRUeXBlRW51bSB7XHJcbiAgICB0b3AgPSAndG9wJyxcclxuICAgIGxlZnQgPSAnbGVmdCdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gUHJvdmlkZXJUeXBlRW51bSB7XHJcbiAgICBOb25lID0gJ25vbmUnLFxyXG4gICAgWW91dHViZSA9ICd5b3V0dWJlJ1xyXG59XHJcblxyXG4vKipcclxuICogU29jaWFsIHNoYXJpbmcgc2V0dGluZ3NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmluZ1NldHRpbmdzIHtcclxuICAgIGlzRW5hYmxlZDogYm9vbGVhbjtcclxuICAgIHNoYXJpbmdPcHRpb25zOiBTaGFyaW5nT3B0aW9uVHlwZUVudW1bXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluc2lnaHQgc2V0dGluZ3MgZm9yIHRoZSByZXEgbGlzdC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWlzaXRpb25MaXN0SW5zaWdodHNTZXR0aW5ncyB7XHJcbiAgICBpc0Fib3V0VGhlQ29tcGFueUVuYWJsZWQ6IGJvb2xlYW4sXHJcbiAgICB2aWRlb0NvbnRlbnRTZXR0aW5nczogVmlkZW9Db250ZW50U2V0dGluZ3MsXHJcbiAgICBjdXN0b21TZWN0aW9uczogQ3VzdG9tU2VjdGlvbltdXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmlkZW9Db250ZW50U2V0dGluZ3Mge1xyXG4gICAgaXNFbmFibGVkOiBib29sZWFuLFxyXG4gICAgcHJvdmlkZXJUeXBlOiBQcm92aWRlclR5cGVFbnVtLFxyXG4gICAgdXJsOiBzdHJpbmdcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgY3VzdG9tIGNvbnRlbnQgc2VjdGlvbiBmb3IgaW5zaWdodHMgaW4gdGhlIHJlcSBsaXN0LlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21TZWN0aW9uIHtcclxuICAgIHRpdGxlOiBzdHJpbmcsXHJcbiAgICBjb250ZW50OiBzdHJpbmdcclxufVxyXG5cclxuLyoqXHJcbiAqIEluc2lnaHRzIHNldHRpbmdzIGZvciB0aGUgam9iIGRldGFpbHMgdmlld1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBSZXF1aXNpdGlvbkRldGFpbHNJbnNpZ2h0c1NldHRpbmdzIHtcclxuICAgIGlzTWVldFRoZVRlYW1FbmFibGVkOiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogSm9iIGRhdGFcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSm9iTW9kZWwge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIHVzZXJEZWZpbmVkSWQ6IHN0cmluZztcclxuICAgIHBvc2l0aW9uVGl0bGU6IHN0cmluZztcclxuICAgIGRlcGFydG1lbnRJZDogc3RyaW5nO1xyXG4gICAgZGVwYXJ0bWVudE5hbWU6IHN0cmluZztcclxuICAgIG9mZmljZUlkOiBzdHJpbmc7XHJcbiAgICBvZmZpY2VOYW1lOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgbG9jYXRpb246IHN0cmluZztcclxuICAgIGxvY2F0aW9uQ2l0eTogc3RyaW5nO1xyXG4gICAgbG9jYXRpb25TdWJkaXZpc2lvbjogc3RyaW5nO1xyXG4gICAgbG9jYXRpb25Db3VudHJ5OiBzdHJpbmc7XHJcbiAgICBpc1JlbW90ZTogYm9vbGVhbjtcclxuICAgIGlzTmF0aW9ud2lkZTogYm9vbGVhbjtcclxuICAgIGlzU3RhdGV3aWRlOiBib29sZWFuO1xyXG4gICAgYXBwbHlMaW5rOiBzdHJpbmc7XHJcbiAgICBwb3N0ZWREYXRlOiBzdHJpbmc7XHJcbiAgICBjYW5TZWxmU2NoZWR1bGU6IGJvb2xlYW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPcHRpb24gZm9yIGEgc2VhcmNoIGZpbHRlclxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXJPcHRpb24ge1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIGNvdW50OiBudW1iZXIgfCBudWxsO1xyXG4gICAgaXNEZWZhdWx0U2VsZWN0aW9uOiBib29sZWFuO1xyXG4gICAgbWV0YWRhdGE6IERpY3Rpb25hcnk8c3RyaW5nPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbHRlciBzdGF0ZSBzYXZlZCB0byB0aGUgd2luZG93IGhpc3Rvcnkgc3RhdGVcclxuICovXHJcbmV4cG9ydCB0eXBlIEZpbHRlclN0YXRlID0gUmVjb3JkPEZpbHRlclR5cGVFbnVtLCBzdHJpbmc+O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjb2xsZWN0aW9uIG9mIGZpbHRlciBvcHRpb25zIHBlciBmaWx0ZXIgdHlwZS5cclxuICovXHJcbmV4cG9ydCB0eXBlIEZpbHRlck9wdGlvbnMgPSBSZWFkb25seTxSZWNvcmQ8RmlsdGVyVHlwZUVudW0sIEZpbHRlck9wdGlvbltdPj47XHJcblxyXG4vKipcclxuICogRGVmaW5lZCBmaWVsZCB0eXBlcyB0byBkaXNwbGF5IG9uIHJlc3VsdHMvZGV0YWlscyB2aWV3cy5cclxuICovXHJcbmV4cG9ydCBlbnVtIEZpZWxkVHlwZUVudW0ge1xyXG4gICAgcG9zaXRpb25UaXRsZSA9ICdwb3NpdGlvblRpdGxlJyxcclxuICAgIHNlY29uZGFyeUxhYmVsID0gJ3NlY29uZGFyeS1sYWJlbCcsXHJcbiAgICBkZXBhcnRtZW50TmFtZSA9ICdkZXBhcnRtZW50TmFtZScsXHJcbiAgICBsb2NhdGlvbiA9ICdsb2NhdGlvbicsXHJcbiAgICBkZXNjcmlwdGlvbiA9ICdkZXNjcmlwdGlvbicsXHJcbiAgICBkYXRlUG9zdGVkID0gJ2RhdGVQb3N0ZWQnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVkIGZpbHRlciB0eXBlcy5cclxuICovXHJcbmV4cG9ydCBlbnVtIEZpbHRlclR5cGVFbnVtIHtcclxuICAgIGtleXdvcmRzID0gJ2tleXdvcmRzJyxcclxuICAgIGRlcGFydG1lbnQgPSAnZGVwYXJ0bWVudCcsXHJcbiAgICBvZmZpY2UgPSAnb2ZmaWNlJyxcclxuICAgIGxvY2F0aW9uID0gJ2xvY2F0aW9uJyxcclxuICAgIGJyYW5kID0gJ2JyYW5kJyxcclxuICAgIHBvc3RhbENvZGUgPSAncG9zdGFsQ29kZScsXHJcbiAgICBkaXN0YW5jZSA9ICdkaXN0YW5jZScsXHJcbiAgICBkaXN0YW5jZVZhbHVlID0gJ2Rpc3RhbmNlVmFsdWUnLFxyXG4gICAgZGlzdGFuY2VVbml0ID0gJ2Rpc3RhbmNlVW5pdCdcclxufVxyXG5cclxuLyoqXHJcbiAqIERlZmluZWQgc2hhcmluZyBvcHRpb24gdHlwZXMuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBTaGFyaW5nT3B0aW9uVHlwZUVudW0ge1xyXG4gICAgbGlua2VkaW4gPSAnTGlua2VkSW4nLFxyXG4gICAgdHdpdHRlciA9ICdUd2l0dGVyJyxcclxuICAgIGZhY2Vib29rID0gJ0ZhY2Vib29rJyxcclxuICAgIHNoYXJhYmxlTGluayA9ICdTaGFyYWJsZUxpbmsnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMb2cgc2V2ZXJpdHkgdHlwZXMuXHJcbiAqIENvcnJlc3BvbmRzIHRvIE1pY3Jvc29mdC5FeHRlbnNpb25zLkxvZ2dpbmcuTG9nTGV2ZWxzLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gTG9nVHlwZSB7XHJcbiAgICB0cmFjZSA9IDAsXHJcbiAgICBpbmZvcm1hdGlvbiA9IDIsXHJcbiAgICB3YXJuaW5nID0gMyxcclxuICAgIGVycm9yID0gNFxyXG59XHJcblxyXG4vKipcclxuICogRGF0YSB0byBsb2cuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIExvZ1JlcXVlc3Qge1xyXG4gICAgbG9nVHlwZTogTG9nVHlwZSxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIGV4Y2VwdGlvbk5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICAgIHN0YWNrVHJhY2U6IHN0cmluZyB8IHVuZGVmaW5lZFxyXG59XHJcblxyXG4vKipcclxuICogQW4gaW5kaXZpZHVhbCB0ZWFtIG1lbWJlci5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGVhbU1lbWJlciB7XHJcbiAgICBkaXNwbGF5TmFtZTogc3RyaW5nO1xyXG4gICAgaW5pdGlhbHM6IHN0cmluZztcclxuICAgIHJvbGVOYW1lOiBzdHJpbmc7XHJcbiAgICB3b3JrTG9jYXRpb246IHN0cmluZztcclxuICAgIGpvaW5EYXRlOiBzdHJpbmc7XHJcbiAgICBmdW5GYWN0OiBzdHJpbmc7XHJcbiAgICBwcm9maWxlSW1hZ2U6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21wYW55Um9sZSB7XHJcbiAgICBjb21wYW55TWlzc2lvbjogc3RyaW5nO1xyXG4gICAgY29tcGFueVZpc2lvbjogc3RyaW5nO1xyXG4gICAgY29tcGFueVZhbHVlczogc3RyaW5nW107XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY29tbW9uSW50ZXJmYWNlcy5kLnRzXCI+XHJcblxyXG5pbXBvcnQge1xyXG4gICAgRmlsdGVyVHlwZUVudW0sXHJcbiAgICBGaWVsZFR5cGVFbnVtLFxyXG4gICAgU2V0dGluZ3MsXHJcbiAgICBKb2JNb2RlbCxcclxuICAgIEZpbHRlclN0YXRlLFxyXG4gICAgRmlsdGVyT3B0aW9uLFxyXG4gICAgTG9nVHlwZSxcclxuICAgIExvZ1JlcXVlc3QsXHJcbiAgICBTaGFyaW5nT3B0aW9uVHlwZUVudW0sXHJcbiAgICBTZWFyY2hMYXlvdXRUeXBlRW51bSxcclxuICAgIFRlYW1NZW1iZXIsXHJcbiAgICBDdXN0b21TZWN0aW9uLFxyXG4gICAgQ29tcGFueVJvbGVcclxufSBmcm9tICcuL2FwaSc7XHJcblxyXG4vKipcclxuICogVGhlIGludGVyZmFjZSBmb3IgZ2V0dGluZyBkYXRhLlxyXG4gKi9cclxuaW50ZXJmYWNlIERhdGFTZXJ2aWNlIHtcclxuICAgIHByZXZpZXdTZXR0aW5nczogYm9vbGVhbjtcclxuICAgIGdldFNldHRpbmdzKHNpdGVJZDogc3RyaW5nKTogUHJvbWlzZTxTZXR0aW5ncz47XHJcbiAgICBnZXRKb2JzKHNpdGVJZDogc3RyaW5nLCBwYXJhbXM6IFJlYWRvbmx5RGljdGlvbmFyeTxhbnk+KTogUHJvbWlzZTxQYWdlZFJlc3BvbnNlPEpvYk1vZGVsPj47XHJcbiAgICBnZXRKb2Ioc2l0ZUlkOiBzdHJpbmcsIGpvYklkOiBzdHJpbmcsIHNvdXJjZTogc3RyaW5nKTogUHJvbWlzZTxKb2JNb2RlbD47XHJcbiAgICBnZXRUZWFtTWVtYmVycyhqb2JJZDogc3RyaW5nKTogUHJvbWlzZTxUZWFtTWVtYmVyW10+O1xyXG4gICAgZ2V0Q29tcGFueVJvbGUob3JnSWQ6IHN0cmluZyk6IFByb21pc2U8Q29tcGFueVJvbGU+O1xyXG59XHJcblxyXG4vKipcclxuICogSGVscGVycyBmb3IgbWFraW5nIEhUVFAgcmVxdWVzdHNcclxuICovXHJcbmNvbnN0IGRhdGEgPSB7XHJcbiAgICBhc3luYyBodHRwPFQ+KHJlcXVlc3Q6IFJlcXVlc3RJbmZvLCBpbml0PzogUmVxdWVzdEluaXQpOiBQcm9taXNlPFQ+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QsIGluaXQpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gZGVhbCB3aXRoIHRoZSBlcnJvciBzb21laG93XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyZXNwb25zZS5zdGF0dXN9OiAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+IHVuZGVmaW5lZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldDxUPihyZXF1ZXN0OiBSZXF1ZXN0SW5mbywgb3B0aW9ucz86IFJlcXVlc3RJbml0KSB7XHJcbiAgICAgICAgY29uc3QgaW5pdDogUmVxdWVzdEluaXQgPSB7IG1ldGhvZDogJ2dldCcsIC4uLm9wdGlvbnMgfTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5odHRwPFQ+KHJlcXVlc3QsIGluaXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBwb3N0PFQ+KHJlcXVlc3Q6IFJlcXVlc3RJbmZvLCBvcHRpb25zPzogUmVxdWVzdEluaXQpIHtcclxuICAgICAgICBjb25zdCBpbml0OiBSZXF1ZXN0SW5pdCA9IHsgbWV0aG9kOiAncG9zdCcsIC4uLm9wdGlvbnMgfTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5odHRwPFQ+KHJlcXVlc3QsIGluaXQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IGRhdGEgc2VydmljZSB0aGF0IG1ha2VzIEFQSSByZXF1ZXN0cyB0byB0aGUgY2FyZWVyIHNpdGUgQVBJXHJcbiAqL1xyXG5jb25zdCBkZWZhdWx0RGF0YVNlcnZpY2U6IERhdGFTZXJ2aWNlID0ge1xyXG4gICAgcHJldmlld1NldHRpbmdzOiAobmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKS5nZXQoJ3ByZXZpZXcnKSkgIT0gdW5kZWZpbmVkLFxyXG5cclxuICAgIGFzeW5jIGdldFNldHRpbmdzKHNpdGVJZDogc3RyaW5nKTogUHJvbWlzZTxTZXR0aW5ncz4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGFVcmwgPSBuZXcgVVJMKGAkcHJvY2Vzcy5lbnYuQ2FyZWVyU2l0ZUFwaVVybC92MS9zZXR0aW5ncy8ke3NpdGVJZH1gKTtcclxuICAgICAgICBpZiAodGhpcy5wcmV2aWV3U2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgZGF0YVVybC5zZWFyY2hQYXJhbXMuc2V0KCdwcmV2aWV3JywgJ3RydWUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhLmdldDxTZXR0aW5ncz4oZGF0YVVybC50b1N0cmluZygpKTtcclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgZ2V0Sm9icyhzaXRlSWQ6IHN0cmluZywgcGFyYW1zOiBEaWN0aW9uYXJ5PGFueT4pOiBQcm9taXNlPFBhZ2VkUmVzcG9uc2U8Sm9iTW9kZWw+PiB7XHJcbiAgICAgICAgY29uc3QgZGF0YVVybCA9IG5ldyBVUkwoYCRwcm9jZXNzLmVudi5DYXJlZXJTaXRlQXBpVXJsL3YxLyR7c2l0ZUlkfWApO1xyXG5cclxuICAgICAgICBPYmplY3QuZW50cmllcyhwYXJhbXMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhVXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByZXZpZXdTZXR0aW5ncykge1xyXG4gICAgICAgICAgICBkYXRhVXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3ByZXZpZXcnLCAndHJ1ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZ2V0KGRhdGFVcmwudG9TdHJpbmcoKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldEpvYihzaXRlSWQ6IHN0cmluZywgam9iSWQ6IHN0cmluZywgc291cmNlOiBzdHJpbmcpOiBQcm9taXNlPEpvYk1vZGVsPiB7XHJcbiAgICAgICAgY29uc3QgZGF0YVVybCA9IG5ldyBVUkwoYCRwcm9jZXNzLmVudi5DYXJlZXJTaXRlQXBpVXJsL3YxLyR7c2l0ZUlkfS8ke2pvYklkfT9zb3VyY2U9JHtzb3VyY2V9YCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByZXZpZXdTZXR0aW5ncykge1xyXG4gICAgICAgICAgICBkYXRhVXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3ByZXZpZXcnLCAndHJ1ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGEuZ2V0PEpvYk1vZGVsPihkYXRhVXJsLnRvU3RyaW5nKCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBnZXRUZWFtTWVtYmVycyhqb2JJZDogc3RyaW5nKTogUHJvbWlzZTxUZWFtTWVtYmVyW10+IHtcclxuICAgICAgICBjb25zdCBkYXRhVXJsID0gbmV3IFVSTChgJHByb2Nlc3MuZW52LkNhcmVlclNpdGVBcGlVcmwvdjEvaW5zaWdodHMvdGVhbS8ke2pvYklkfWApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcmV2aWV3U2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgZGF0YVVybC5zZWFyY2hQYXJhbXMuc2V0KCdwcmV2aWV3JywgJ3RydWUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhLmdldDxUZWFtTWVtYmVyW10+KGRhdGFVcmwudG9TdHJpbmcoKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGdldENvbXBhbnlSb2xlKG9yZ0lkOiBzdHJpbmcpOiBQcm9taXNlPENvbXBhbnlSb2xlPiB7XHJcbiAgICAgICAgY29uc3QgZGF0YVVybCA9IG5ldyBVUkwoYCRwcm9jZXNzLmVudi5DYXJlZXJTaXRlQXBpVXJsL3YxL2luc2lnaHRzLyR7b3JnSWR9L2NvbXBhbnktcm9sZWApO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcmV2aWV3U2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgZGF0YVVybC5zZWFyY2hQYXJhbXMuc2V0KCdwcmV2aWV3JywgJ3RydWUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhLmdldDxDb21wYW55Um9sZT4oZGF0YVVybC50b1N0cmluZygpKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNsYXNzIENsZWFyQ29tcGFueUpvYnMge1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzaXRlSWQhOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbnRhaW5lckVsZW1lbnQhOiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgaW5zaWdodHNDb250YWluZXI/OiBIVE1MRWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgYWJvdXRUaGVDb21wYW55Q29udGFpbmVyPzogSFRNTEVsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIGZpbHRlcnNDb250YWluZXIhOiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgc2hhcmVSZXN1bHRzQ29udGFpbmVyITogSFRNTEVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIGpvYlBvcnRhbExpbmtDb250YWluZXIhOiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgam9ic0NvbnRhaW5lciE6IEhUTUxFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBqb2JTZWFyY2hDb250YWluZXI/OiBIVE1MRWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgam9iRGV0YWlsc0NvbnRhaW5lcj86IEhUTUxFbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSBtZWV0VGhlVGVhbUNvbnRhaW5lcj86IEhUTUxFbGVtZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgcHJpdmF0ZSB0ZWFtTWVtYmVyc0NvbGxlY3Rpb24hOiBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgdGVhbU1lbWJlcnNMZWZ0TmF2PzogSFRNTEVsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIHRlYW1NZW1iZXJzUmlnaHROYXY/OiBIVE1MRWxlbWVudCA9IHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgdGVhbU1lbWJlcnNTa2VsZXRvbiE6IEhUTUxFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBlcnJvclN0YXRlQ29udGFpbmVyPzogSFRNTEVsZW1lbnQgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIHNrZWxldG9uQ29udGFpbmVyITogSFRNTEVsZW1lbnQ7XHJcbiAgICBwcml2YXRlIHNldHRpbmdzITogU2V0dGluZ3M7XHJcbiAgICBwcml2YXRlIGN1cnJlbnRQYWdlTnVtYmVyID0gMTtcclxuICAgIHByaXZhdGUgam9iSWQ/OiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIGpvYk1vZGVscz86IEpvYk1vZGVsW10gPSB1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIGlzU3R5bGVzaGVldEluY2x1ZGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGZpbHRlcnM6IChIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQpW10gPSBbXTtcclxuICAgIHByaXZhdGUgaXNWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcml2YXRlIHNvdXJjZSE6IHN0cmluZztcclxuICAgIHByaXZhdGUgY3VzdG9tRmlsdGVyczogKEhUTUxFbGVtZW50KVtdID0gW107XHJcbiAgICBwcml2YXRlIG9wZW5DdXN0b21TZWxlY3Q6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhU2VydmljZSE6IERhdGFTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBpZiAoIWRvY3VtZW50LmN1cnJlbnRTY3JpcHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGVFbGVtZW50ID0gKGVsZW1lbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTG9hZFBhZ2VFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZXJlJ3MgYW4gYWx0ZXJuYXRlIGRhdGEgc2VydmljZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBvbmUuXHJcbiAgICAgICAgdGhpcy5kYXRhU2VydmljZSA9ICh3aW5kb3cgYXMgYW55KS5jY0RhdGEgfHwgZGVmYXVsdERhdGFTZXJ2aWNlO1xyXG5cclxuICAgICAgICBjb25zdCBzY3JpcHRVcmwgPSBuZXcgVVJMKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKCdzcmMnKSEudG9Mb3dlckNhc2UoKSwgZG9jdW1lbnQubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgY29uc3Qgc2NyaXB0UGFyYW1ldGVycyA9IHNjcmlwdFVybC5zZWFyY2hQYXJhbXM7XHJcblxyXG4gICAgICAgIGNvbnN0IGdldFNjcmlwdEF0dHJpYnV0ZSA9IChwYXJhbWV0ZXJOYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZU5hbWU/OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQhLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKSB8fCBzY3JpcHRQYXJhbWV0ZXJzLmdldChwYXJhbWV0ZXJOYW1lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY3JpcHRQYXJhbWV0ZXJzLmdldChwYXJhbWV0ZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHNpdGVJZCA9IGdldFNjcmlwdEF0dHJpYnV0ZSgnc2l0ZWlkJywgJ2RhdGEtc2l0ZS1pZCcpO1xyXG4gICAgICAgIGlmICghdmFsaWRhdGVFbGVtZW50KHNpdGVJZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNpdGVJZCA9IHNpdGVJZCBhcyBzdHJpbmc7XHJcblxyXG4gICAgICAgIHRoaXMuam9iSWQgPSBnZXRTY3JpcHRBdHRyaWJ1dGUoJ2pvYmlkJykgYXMgc3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdCBwcmV2aWV3ID0gZ2V0U2NyaXB0QXR0cmlidXRlKCdwcmV2aWV3Jyk7XHJcbiAgICAgICAgaWYgKHByZXZpZXcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhU2VydmljZS5wcmV2aWV3U2V0dGluZ3MgPSAocHJldmlldyA9PT0gJ3RydWUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb250ZW50U2VsZWN0b3IgPSBnZXRTY3JpcHRBdHRyaWJ1dGUoJ2NvbnRlbnRzZWxlY3RvcicsICdkYXRhLWNvbnRlbnQtc2VsZWN0b3InKTtcclxuICAgICAgICBpZiAoIWNvbnRlbnRTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAvLyBpZiB0aGVyZSdzIG5vIGNvbnRlbnQgc2VsZWN0b3IsIHdlJ2xsIGFwcGVuZCB3aGVyZSB3ZSBhcmUsIGlmIHdlIGNhblxyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAocGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gJ2NjLWNhcmVlcnMtc2NyaXB0LWNvbnRhaW5lcic7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRTZWxlY3RvciA9IGAuJHtjbGFzc05hbWV9YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXZhbGlkYXRlRWxlbWVudChjb250ZW50U2VsZWN0b3IpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRlbnRTZWxlY3RvciBhcyBzdHJpbmcpO1xyXG4gICAgICAgIGlmICghdmFsaWRhdGVFbGVtZW50KGNvbnRhaW5lckVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJFbGVtZW50ID0gKGNvbnRhaW5lckVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpO1xyXG5cclxuICAgICAgICBjb25zdCBza2VsZXRvblN0eWxlRWwgPSBjcmVhdGVIdG1sRWxlbWVudCgnc3R5bGUnLCB7IGlkOiAncHJlLXNldHRpbmdzLWNjLXNrZWxldG9uLXN0eWxlJyB9LCBgXHJcbiAgICAgICAgLmNjLXNrZWxldG9uIHtcclxuICAgICAgICAgICAgY3Vyc29yOiBwcm9ncmVzcztcclxuICAgICAgICAgICAgaGVpZ2h0OiAxZW07XHJcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IC4yNWVtO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCksIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCkgODAlICksIHJnYmEoMCwwLDAsMC4xMSk7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1zaXplOiA1MHB4IDIwMHB4O1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZ3JhZGllbnQgMnMgaW5maW5pdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC5jYy1za2VsZXRvbi5maWx0ZXIge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQGtleWZyYW1lcyBncmFkaWVudCB7XHJcbiAgICAgICAgICAgIHRvIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgMCwgMCAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XHJcbiAgICAgICAgICAgIC5jYy1za2VsZXRvbiB7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBub25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWApO1xyXG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2tlbGV0b25TdHlsZUVsKTtcclxuXHJcbiAgICAgICAgY29uc3QgbG9hZGVyQXR0cmlidXRlcyA9IHtcclxuICAgICAgICAgICAgY2xhc3M6ICdjYy1za2VsZXRvbiBqb2InLFxyXG4gICAgICAgICAgICB0YWJpbmRleDogMCxcclxuICAgICAgICAgICAgcm9sZTogJ3Byb2dyZXNzYmFyJyxcclxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogdHJ1ZSxcclxuICAgICAgICAgICAgJ2FyaWEtdmFsdWVtaW4nOiAwLFxyXG4gICAgICAgICAgICAnYXJpYS12YWx1ZW1heCc6IDEwMCxcclxuICAgICAgICAgICAgJ2FyaWEtdmFsdWV0ZXh0JzogJ1BsZWFzZSB3YWl0Li4nXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNrZWxldG9uQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsXHJcbiAgICAgICAgICAgIHsgY2xhc3M6ICdjYy1za2VsZXRvbi1jb250YWluZXInIH0sXHJcbiAgICAgICAgICAgIGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IC4uLmxvYWRlckF0dHJpYnV0ZXMsIGNsYXNzOiAnY2Mtc2tlbGV0b24gZmlsdGVyJyB9KSxcclxuICAgICAgICAgICAgY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIGxvYWRlckF0dHJpYnV0ZXMpLFxyXG4gICAgICAgICAgICBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JywgbG9hZGVyQXR0cmlidXRlcyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCBsb2FkZXJBdHRyaWJ1dGVzKSxcclxuICAgICAgICAgICAgY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIGxvYWRlckF0dHJpYnV0ZXMpLFxyXG4gICAgICAgICAgICBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JywgbG9hZGVyQXR0cmlidXRlcyksXHJcbiAgICAgICAgICAgIGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCBsb2FkZXJBdHRyaWJ1dGVzKSk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2tlbGV0b25Db250YWluZXIpO1xyXG4gICAgICAgIHRoaXMudGVhbU1lbWJlcnNTa2VsZXRvbiA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IC4uLmxvYWRlckF0dHJpYnV0ZXMsIGNsYXNzOiAnY2Mtc2tlbGV0b24gbWVldC10aGUtdGVhbScgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucGFyc2VVcmxQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc291cmNlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBpZiBzb3VyY2Ugd2Fzbid0IGRlZmluZWQsIHNlZSBpZiB0aGUgc2NyaXB0IGhhcyBhIGRlZmF1bHQgb25lIHNwZWNpZmllZFxyXG4gICAgICAgICAgICAvLyB0aGlzIHdpbGwgYWxsb3cgY2xpZW50cyB0byBzZXQgYSBkZWZhdWx0IHNvdXJjZSBvdGhlciB0aGFuIGNvbXBhbnkgam9iIGJvYXJkIGZvciB0aGVpciBjYXJlZXJzIHBhZ2VcclxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFNvdXJjZSA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuZ2V0QXR0cmlidXRlKCdkYXRhLWRlZmF1bHQtc291cmNlJyk7XHJcbiAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZSA9IGRlZmF1bHRTb3VyY2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UsIGRlZmF1bHQgdG8gY29tcGFueSBqb2IgYm9hcmRcclxuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlID0gJ0NKQi0wJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBlbWJlZGRlZCBjYXJlZXIgc2l0ZSBjb250ZW50IG9uIHRoZSBwYWdlIGluIHRoZSBjb250YWluZXJFbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgbG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIHNldHRpbmdzIGZpcnN0IHNvIHdlIGNhbiBtYWtlIHN1cmUgd2UgbG9hZCBldmVyeXRoaW5nIGluIHRoZSBjb3JyZWN0IHN0eWxlXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IGF3YWl0IHRoaXMuZGF0YVNlcnZpY2UuZ2V0U2V0dGluZ3ModGhpcy5zaXRlSWQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHNldHRpbmdzIHJldHVybiBhbiBlcnJvciwgZGlzcGxheSB0aGUgbG9hZCBlcnJvclxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckxvYWRQYWdlRXJyb3IoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2dWaXNpdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWRTdHlsZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkQ2hhdGJvdCgpO1xyXG5cclxuICAgICAgICAvLyB0aGlzIGV2ZW50IGlzIHRyaWdnZXJlZCBieSB0aGUgYmFjayBhbmQgZm9yd2FyZCBldmVudHMgd2hlbiBuYXZpZ2F0aW5nIGJyb3dzZXIgaGlzdG9yeVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhdGU6IEZpbHRlclN0YXRlID0gd2luZG93Lmhpc3Rvcnkuc3RhdGUgPz8ge307XHJcblxyXG4gICAgICAgICAgICAvLyBpdGVyYXRlIG92ZXIgZWFjaCBvZiB0aGUgZmlsdGVycyB3ZSBoYXZlIGFuZCB1cGRhdGUgdGhlaXIgdmFsdWUgZnJvbSB0aGUgc3RhdGUgKG9yIHJlc2V0IHdoYXQncyBub3Qgc2V0KVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbHRlciBvZiB0aGlzLmN1c3RvbUZpbHRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlck5hbWUgPSBmaWx0ZXIuZ2V0QXR0cmlidXRlKCduYW1lJykgYXMgRmlsdGVyVHlwZUVudW07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0YXRlW2ZpbHRlck5hbWVdID8/ICcnO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGZpbHRlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYy1jdXN0b20tb3B0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG9wdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdEN1c3RvbU9wdGlvbihvcHRpb24sIGZpbHRlck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWx0ZXIgb2YgdGhpcy5maWx0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLmNsYXNzTGlzdC5jb250YWlucygnbmF0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsdGVyVmFsdWUoc3RhdGVbZmlsdGVyLm5hbWUgYXMgRmlsdGVyVHlwZUVudW1dID8/ICcnLCBmaWx0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcnNlVXJsUGFyYW1zKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5qb2JJZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuam9iSWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEpvYkRlc2NyaXB0aW9uKHRoaXMuam9iSWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySm9iU2VhcmNoKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1lZXRUaGVUZWFtQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lZXRUaGVUZWFtQ29udGFpbmVyLnN0eWxlLndpZHRoID0gYCR7dGhpcy5qb2JEZXRhaWxzQ29udGFpbmVyPy5jbGllbnRXaWR0aH1weGA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDbGlja0V2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVLZXlib2FyZEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyB0aGVuIGZpbmFsbHkgcmVuZGVyIHRoZSBhcHByb3ByaWF0ZSBjb250ZW50XHJcbiAgICAgICAgaWYgKHRoaXMuam9iSWQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmpvYklkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpvYkRlc2NyaXB0aW9uKHRoaXMuam9iSWQsICF0aGlzLmRhdGFTZXJ2aWNlLnByZXZpZXdTZXR0aW5ncykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy5za2VsZXRvbkNvbnRhaW5lciwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyUHJldmlld0xvYWRlZEV2ZW50KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVySm9iU2VhcmNoKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3BhdGNoZXMgdGhlICdjYy1wcmV2aWV3LWxvYWRlZCcgZXZlbnQgaWYgdGhlIHByZXZpZXcgZmxhZyBpcyB0cnVlIGluIHRoZSBjdXJyZW50IHNjcmlwdC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0cmlnZ2VyUHJldmlld0xvYWRlZEV2ZW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGFTZXJ2aWNlLnByZXZpZXdTZXR0aW5ncykge1xyXG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NjLXByZXZpZXctbG9hZGVkJykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBxdWVyeSBwYXJhbXMgc28gd2UgY2FuIGxvYWQgdGhlIGNvcnJlY3Qgc2V0IG9mIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZVVybFBhcmFtcygpIHtcclxuICAgICAgICAvLyBjb252ZXJ0IHBhcmFtZXRlcnMgdG8gbG93ZXJjYXNlIHNvIHdlIGNhbiBkbyBhIGNhc2UtaW5zZW5zaXRpdmUgbG9va3VwXHJcbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnRvTG93ZXJDYXNlKCkpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuam9iSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5qb2JJZCA9IHVybFBhcmFtcy5nZXQoJ2pvYmlkJykgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5qb2JJZCkge1xyXG4gICAgICAgICAgICAvLyBqb2IgaWRzIG5lZWQgdG8gYmUgdXBwZXJjYXNlLCBzbyBjb252ZXJ0IGJhY2tcclxuICAgICAgICAgICAgdGhpcy5qb2JJZCA9IHRoaXMuam9iSWQudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSBOdW1iZXIodXJsUGFyYW1zLmdldCgncCcpKTtcclxuICAgICAgICBpZiAoaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZU51bWJlciA9IHBhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVjayBmb3IgYW55IHNvdXJjZSBwYXJhbWV0ZXJzIHNvIHdlIGNhbiBzZW5kIGl0IGFsb25nIHdpdGggdGhlIEFQSSByZXF1ZXN0cyBzbyB3ZVxyXG4gICAgICAgIC8vIGdldCB0aGUgY29ycmVjdCBhcHBseSBVUkxzIHdpdGggdGhlIHByb3BlciBzb3VyY2UgYXR0cmlidXRlZFxyXG4gICAgICAgIC8vIFRPRE86IERFVi0xNTIzNSBwZXJzaXN0IGFjcm9zcyBicm93c2VyIHNlc3Npb25zIGJ5IHNhdmluZyB0byBsb2NhbCBzdG9yYWdlXHJcbiAgICAgICAgY29uc3Qgc291cmNlcyA9IFsnamInLCAnY3MnXTtcclxuICAgICAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybFNvdXJjZVBhcmFtID0gdXJsUGFyYW1zLmdldChzb3VyY2UpO1xyXG4gICAgICAgICAgICBpZiAodXJsU291cmNlUGFyYW0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlID0gYCR7c291cmNlLnRvVXBwZXJDYXNlKCl9LSR7dXJsU291cmNlUGFyYW19YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9ncyBhIG1lc3NhZ2UgdG8gdGhlIGxvZ2dpbmcgY29udHJvbGxlci5cclxuICAgICAqIEBwYXJhbSB0eXBlIC0gVGhlIHR5cGUgb2YgbG9nIHRvIHNlbmQuXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIGxvZy5cclxuICAgICAqIEBwYXJhbSBleCAtIE9wdGlvbmFsLiBUaGUgZXhjZXB0aW9uIHRvIGxvZy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2codHlwZTogTG9nVHlwZSwgbWVzc2FnZTogc3RyaW5nLCBleDogRXJyb3IgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2dVcmwgPSBgJHByb2Nlc3MuZW52LkNhcmVlclNpdGVBcGlVcmwvdjEvbG9nZ2luZy8ke3RoaXMuc2l0ZUlkfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvZ1JlcXVlc3Q6IExvZ1JlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgICAgICBsb2dUeXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIGV4Y2VwdGlvbk5hbWU6IGV4Py5uYW1lLFxyXG4gICAgICAgICAgICAgICAgc3RhY2tUcmFjZTogZXg/LnN0YWNrXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGh0dHBIZWFkZXJzID0geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH07XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhodHRwSGVhZGVycyk7XHJcbiAgICAgICAgICAgIGRhdGEucG9zdDx2b2lkPihsb2dVcmwsIHsgaGVhZGVyczogaGVhZGVycywgYm9keTogSlNPTi5zdHJpbmdpZnkobG9nUmVxdWVzdCkgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcclxuICAgICAgICAgICAgLy8gTG9nZ2luZyBmYWlsZWQsIGJ1dCBkb24ndCBzdG9wIHBhZ2UgbG9hZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZ3MgdGhlIHZpc2l0IHRvIHRoZSBjYXJlZXIgc2l0ZSwgbWF4aW11bSBvZiBvbmNlIHBlciBkYXkuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbG9nVmlzaXQoKSB7XHJcbiAgICAgICAgLy8gTG9nIHRoZSB2aXNpdG9yIGluZm8gaWYgdGhlIEhhc1Zpc2l0ZWQgY29va2llIGRvZXMgbm90IGV4aXN0XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qgb3JnSWQgPSB0aGlzLnNldHRpbmdzLm9yZ0lkO1xyXG4gICAgICAgICAgICBjb25zdCBjb29raWVFeGlzdHMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKS5zb21lKChpdGVtKSA9PiBpdGVtLnRyaW0oKS5zdGFydHNXaXRoKGBPcmdJZD0ke29yZ0lkfWApKTtcclxuICAgICAgICAgICAgaWYgKCFjb29raWVFeGlzdHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvZ1VybCA9IGAkcHJvY2Vzcy5lbnYuQ2FyZWVyU2l0ZUFwaVVybC92MS9sb2dnaW5nLyR7dGhpcy5zaXRlSWR9L3Zpc2l0YDtcclxuICAgICAgICAgICAgICAgIGRhdGEuZ2V0PHZvaWQ+KGxvZ1VybCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgSGFzVmlzaXRlZCBjb29raWUgdGhhdCB3aWxsIGV4cGlyZSBhdCBtaWRuaWdodCB0byBwcmV2ZW50IGFueSBtb3JlIGxvZ2dpbmcgcmVxdWVzdHMgdG9kYXlcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvbW9ycm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRvbW9ycm93LnNldEhvdXJzKDAsIDAsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSArPSBgT3JnSWQ9JHtvcmdJZH07ZXhwaXJlcz0ke3RvbW9ycm93LnRvVVRDU3RyaW5nKCl9O2A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAvLyBMb2dnaW5nIGZhaWxlZCwgYnV0IGRvbid0IHN0b3AgcGFnZSBsb2FkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZHMgdGhlIGNvcnJlY3Qgc3R5bGVzaGVldCBpbnRvIHRoZSBET01cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkU3R5bGVzKCkge1xyXG4gICAgICAgIGNvbnN0IGxheW91dFN0eWxlc2hlZXRMaW5rID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2xpbmsnLCB7XHJcbiAgICAgICAgICAgIGlkOiAnY2MtZW1iZWRkZWQtc3R5bGVzaGVldCcsXHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzcycsXHJcbiAgICAgICAgICAgIHJlbDogJ3N0eWxlc2hlZXQnLFxyXG4gICAgICAgICAgICBocmVmOiBgJHByb2Nlc3MuZW52LkNhcmVlclNpdGVTdGF0aWNDb250ZW50VXJsL2Nzcy8ke3RoaXMuc2V0dGluZ3Muc3R5bGVzaGVldFJlbGF0aXZlVXJsfWBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gcHJlcGVuZCBvdXIgc3R5bGVzaGVldCBzbyB0aGF0IHRoZSBjbGllbnQncyBvdmVycmlkZXMgd2lsbCBtb3JlIGxpa2VseSB3aW5cclxuICAgICAgICBkb2N1bWVudC5oZWFkLnByZXBlbmQobGF5b3V0U3R5bGVzaGVldExpbmspO1xyXG5cclxuICAgICAgICB0aGlzLmlzU3R5bGVzaGVldEluY2x1ZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIGNoYXRib3Qgd2lkZ2V0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgbG9hZENoYXRib3QoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHByb2Nlc3MuZW52LkNhcmVlclNpdGVDaGF0Ym90QXBpVXJsL3YxL2NoYXRib3QvJHt0aGlzLnNpdGVJZH0vaXMtYXZhaWxhYmxlYCk7XHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0NoYXRib3RBdmFpbGFibGUgID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgaWYoIGlzQ2hhdGJvdEF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYXRib3RMaW5rID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3NjcmlwdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdjYy1jaGF0Ym90LXdpZGdldCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdtb2R1bGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IGAkcHJvY2Vzcy5lbnYuQ2FyZWVyU2l0ZUNoYXRib3RVcmwvY2hhdGJvdC5qcz9zaXRlSWQ9JHt0aGlzLnNpdGVJZH0mc291cmNlPSR7dGhpcy5zb3VyY2V9YFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kKGNoYXRib3RMaW5rKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGF0Ym90U3R5bGVzID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2xpbmsnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnY2MtY2hhdGJvdC1zdHlsZXNoZWV0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQvY3NzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsOiAnc3R5bGVzaGVldCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICckcHJvY2Vzcy5lbnYuQ2FyZWVyU2l0ZUNoYXRib3RVcmwvY2hhdGJvdC5jc3MnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQoY2hhdGJvdFN0eWxlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ2hhdGJvdCBjYW5ub3QgbG9hZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIGN1cnJlbnQgdHlwZSwgaW1hZ2UsIHRpdGxlLCBhbmQgdXJsIG1ldGEgdGFncy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW1vdmVTaGFyZU1ldGFUYWdzKCkge1xyXG4gICAgICAgIC8vIGRlbGV0ZSBjdXJyZW50IHNvY2lhbCBzaGFyaW5nIG1ldGEgdGFncywgaWYgdGhleSBleGlzdFxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRPZ1R5cGVUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ctdHlwZS10YWcnKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50T2dJbWFnZVRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZy1pbWFnZS10YWcnKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50T2dUaXRsZVRhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZy10aXRsZS10YWcnKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50T2dVcmxUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ctdXJsLXRhZycpO1xyXG4gICAgICAgIGN1cnJlbnRPZ1R5cGVUYWc/LnJlbW92ZSgpO1xyXG4gICAgICAgIGN1cnJlbnRPZ0ltYWdlVGFnPy5yZW1vdmUoKTtcclxuICAgICAgICBjdXJyZW50T2dUaXRsZVRhZz8ucmVtb3ZlKCk7XHJcbiAgICAgICAgY3VycmVudE9nVXJsVGFnPy5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdHlwZSwgaW1hZ2UsIHRpdGxlLCBhbmQgdXJsIG1ldGEgdGFncyB0byBzcGVjaWZ5IHNvY2lhbCBzaGFyaW5nIGluZm8uXHJcbiAgICAgKiBAcGFyYW0gam9iVGl0bGUgLSBUaGUgdGl0bGUgb2YgdGhlIGpvYiBiZWluZyBsb2FkZWQsIG9yICdDYXJlZXJzJyBpZiB0aGUgam9iIHNlYXJjaCBpcyBiZWluZyBsb2FkZWQuXHJcbiAgICAgKiBAcGFyYW0gY3VycmVudFVybCAtIFRoZSB1cmwgb2YgdGhlIHBhZ2UgYmVpbmcgbG9hZGVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNoYXJlTWV0YVRhZ3Moam9iVGl0bGU6IHN0cmluZywgY3VycmVudFVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gYWRkIG1ldGEgdGFnIHRvIGRlZmluZSB0aXRsZSBvZiBwYWdlIHRvIGRpc3BsYXkgaW4gc29jaWFsIHBvc3RcclxuICAgICAgICBjb25zdCBvZ1RpdGxlVGFnID0gY3JlYXRlSHRtbEVsZW1lbnQoJ21ldGEnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ29nLXRpdGxlLXRhZycsXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ29nOnRpdGxlJyxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGpvYlRpdGxlICsgJyBhdCAnICsgdGhpcy5zZXR0aW5ncy5icmFuZEZ1bGxOYW1lXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmhlYWQucHJlcGVuZChvZ1RpdGxlVGFnKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIG1ldGEgdGFnIHRvIGRlZmluZSB1cmwgdGhhdCB3aWxsIGJlIGxpbmtlZCBpbiBzb2NpYWwgcG9zdFxyXG4gICAgICAgIGNvbnN0IG9nVXJsVGFnID0gY3JlYXRlSHRtbEVsZW1lbnQoJ21ldGEnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ29nLXVybC10YWcnLFxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6ICdvZzp1cmwnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogY3VycmVudFVybFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5oZWFkLnByZXBlbmQob2dVcmxUYWcpO1xyXG5cclxuICAgICAgICAvLyBhZGQgbWV0YSB0YWcgdG8gZGVmaW5lIHR5cGUgb2YgcGFnZVxyXG4gICAgICAgIGNvbnN0IG9nVHlwZVRhZyA9IGNyZWF0ZUh0bWxFbGVtZW50KCdtZXRhJyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdvZy10eXBlLXRhZycsXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogJ29nOnR5cGUnLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogJ2FydGljbGUnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmhlYWQucHJlcGVuZChvZ1R5cGVUYWcpO1xyXG5cclxuICAgICAgICAvLyBhZGQgbWV0YSB0YWcgdG8gZGVmaW5lIHVybCBvZiBpbWFnZSB0byBkaXNwbGF5IGluIHNvY2lhbCBwb3N0XHJcbiAgICAgICAgY29uc3Qgb2dJbWFnZVRhZyA9IGNyZWF0ZUh0bWxFbGVtZW50KCdtZXRhJyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdvZy1pbWFnZS10YWcnLFxyXG4gICAgICAgICAgICAgICAgcHJvcGVydHk6ICdvZzppbWFnZScsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiB0aGlzLnNldHRpbmdzLnNvY2lhbFNoYXJpbmdMb2dvVXJsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmhlYWQucHJlcGVuZChvZ0ltYWdlVGFnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsaWNrIGV2ZW50IGRlbGVnYXRvclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZENsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiBpdCdzIG5vdCBhbiBlbGVtZW50LCB3ZSBkb24ndCBjYXJlIHNvIGV4aXRcclxuICAgICAgICAgICAgaWYgKCFldmVudFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiBpdHMgbm90IGEgY2xpY2thYmxlIGVsZW1lbnQgZXhpdCBlYXJseVxyXG4gICAgICAgICAgICBldmVudFRhcmdldCA9IGV2ZW50VGFyZ2V0LmNsb3Nlc3QoJy5jYy1jbGlja2FibGUnKSBhcyBFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAoIWV2ZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQ3VzdG9tU2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHRoaXMgaXMgc29tZXRoaW5nIHdlIHdhbnQgdG8gY2FyZSBhYm91dCwgc28gcHJldmVudCBkZWZhdWx0IGFuZCBzdG9wIHByb3BhZ2F0aW9uXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50VGFyZ2V0Lm1hdGNoZXMoJy5jYy1sZWZ0LWFycm93JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjcm9sbEFtb3VudCA9IHRoaXMudGVhbU1lbWJlcnNDb2xsZWN0aW9uLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0aGlzLnRlYW1NZW1iZXJzQ29sbGVjdGlvbi5jaGlsZHJlblswXS5jbGllbnRXaWR0aCA6IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlYW1NZW1iZXJzQ29sbGVjdGlvbi5zY3JvbGxCeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IC1zY3JvbGxBbW91bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRlYW1NZW1iZXJzTGVmdE5hdiAmJiB0aGlzLnRlYW1NZW1iZXJzUmlnaHROYXYpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50ZWFtTWVtYmVyc0NvbGxlY3Rpb24uc2Nyb2xsTGVmdCA8PSBzY3JvbGxBbW91bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWFtTWVtYmVyc0xlZnROYXYuY2xhc3NMaXN0LmFkZCgnY2MtbmF2LWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVhbU1lbWJlcnNMZWZ0TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ2NjLWNsaWNrYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlYW1NZW1iZXJzUmlnaHROYXYuY2xhc3NMaXN0LnJlbW92ZSgnY2MtbmF2LWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWFtTWVtYmVyc1JpZ2h0TmF2LmNsYXNzTGlzdC5hZGQoJ2NjLWNsaWNrYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnRUYXJnZXQubWF0Y2hlcygnLmNjLXJpZ2h0LWFycm93JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjcm9sbEFtb3VudCA9IHRoaXMudGVhbU1lbWJlcnNDb2xsZWN0aW9uLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0aGlzLnRlYW1NZW1iZXJzQ29sbGVjdGlvbi5jaGlsZHJlblswXS5jbGllbnRXaWR0aCA6IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRlYW1NZW1iZXJzQ29sbGVjdGlvbi5zY3JvbGxCeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHNjcm9sbEFtb3VudCxcclxuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGVhbU1lbWJlcnNMZWZ0TmF2ICYmIHRoaXMudGVhbU1lbWJlcnNSaWdodE5hdikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBIb3cgZmFyIHRoZSBjb2xsZWN0aW9uIGlzIGFscmVhZHkgc2Nyb2xsZWQgdG8gdGhlIGxlZnQgKHdoaWNoIGhhcHBlbnMgd2hlbiB0aGUgdXNlciBjbGlja3MgdGhlIFJJR0hUIGFycm93KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSB0aGlzLnRlYW1NZW1iZXJzQ29sbGVjdGlvbi5zY3JvbGxMZWZ0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbWF4aW11bSBhbW91bnQgdGhlIGNvbGxlY3Rpb24gY2FuIHNjcm9sbCB0byB0aGUgbGVmdCBhbmQgc3RpbGwgZmlsbCB0aGUgdmlld2FibGUgY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4U2Nyb2xsTGVmdCA9ICh0aGlzLnRlYW1NZW1iZXJzQ29sbGVjdGlvbi5zY3JvbGxXaWR0aCA/PyAwKSAtICh0aGlzLnRlYW1NZW1iZXJzQ29sbGVjdGlvbi5jbGllbnRXaWR0aCA/PyAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYW55IGZ1cnRoZXIgc2Nyb2xsaW5nIHdvdWxkIGV4Y2VlZCB0aGUgbWF4aW11bSBhbW91bnQsIHdlIHNob3VsZCBkaXNhYmxlIHRoZSBvcHRpb24gdG8gc2Nyb2xsIGFueSBmdXJ0aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzY3JvbGxMZWZ0ICsgc2Nyb2xsQW1vdW50KSA+PSBtYXhTY3JvbGxMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVhbU1lbWJlcnNSaWdodE5hdi5jbGFzc0xpc3QuYWRkKCdjYy1uYXYtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWFtTWVtYmVyc1JpZ2h0TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ2NjLWNsaWNrYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWFtTWVtYmVyc0xlZnROYXYuY2xhc3NMaXN0LnJlbW92ZSgnY2MtbmF2LWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZWFtTWVtYmVyc0xlZnROYXYuY2xhc3NMaXN0LmFkZCgnY2MtY2xpY2thYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudFRhcmdldC5tYXRjaGVzKCcuY2MtcGFnZS1jb250cm9sJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlT25DbGlja1BhZ2VDb250cm9sKGV2ZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50VGFyZ2V0Lm1hdGNoZXMoJyNjYy1zdWJtaXQtc2VhcmNoLWJ1dHRvbi1pZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRKb2JzKDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnRUYXJnZXQubWF0Y2hlcygnI2NjLXJlc2V0LXNlYXJjaC1idXR0b24taWQnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgdGhlIGZpbHRlcnMgc28gdGhhdCB0aGUgY2FsbCB0byBsb2FkSm9icyB3aWxsIGxvYWQgdGhlIGNvcnJlY3Qgc2V0XHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpbHRlciBvZiB0aGlzLmN1c3RvbUZpbHRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJOYW1lID0gZmlsdGVyLmdldEF0dHJpYnV0ZSgnbmFtZScpIGFzIEZpbHRlclR5cGVFbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Q3VzdG9tT3B0aW9uKGZpbHRlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYy1jdXN0b20tb3B0aW9uJylbMF0sIGZpbHRlck5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmlsdGVyIG9mIHRoaXMuZmlsdGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCduYXRpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJWYWx1ZSgnJywgZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRKb2JzKDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnRUYXJnZXQubWF0Y2hlcygnLmNjLWpvYi10aXRsZScpIHx8IGV2ZW50VGFyZ2V0Lm1hdGNoZXMoJy5jYy1zZWNvbmRhcnktbGFiZWwnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGlja09uSm9iKGV2ZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50VGFyZ2V0Lm1hdGNoZXMoJyNjYy1jb3B5LXVybC1saW5rLWlkJykgfHwgZXZlbnRUYXJnZXQubWF0Y2hlcygnI2NjLWNvcHktdXJsLWxvZ28taWQnKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvcGllZE1lc3NhZ2UgPSBldmVudFRhcmdldC5xdWVyeVNlbGVjdG9yKCcuY29waWVkLW1lc3NhZ2UnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29waWVkTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3BpZWRNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2NjLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3BpZWRNZXNzYWdlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3BpZWRNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2NjLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29waWVkTWVzc2FnZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnRUYXJnZXQubWF0Y2hlcygnLmNjLWJhY2stdG8tam9icy1idXR0b24nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGlja0JhY2tUb0pvYnMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGV2ZW50VGFyZ2V0Lm1hdGNoZXMoJyNjYy1jb3B5LWVtYWlsLWJ0bi1pZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5jbGlwYm9hcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYy1jb3B5LWVtYWlsLWlkJyk/LmlubmVySFRNTDtcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChlbWFpbCA/PyAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VjY2Vzc0xvZ28gPSBjcmVhdGVIdG1sRWxlbWVudCgnaW1nJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1jb3B5LWVtYWlsLWxvZ28nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAnJHByb2Nlc3MuZW52LkNhcmVlclNpdGVTdGF0aWNDb250ZW50VXJsL2ltYWdlcy9jaXJjbGUtY2hlY2stc29saWQuc3ZnJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFRhcmdldC5pbm5lckhUTUwgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge30sIHN1Y2Nlc3NMb2dvLCB0aGlzLmdldFRleHQoJ2FwcGx5LmJ5LWVtYWlsLmNvcHkuc3VjY2VzcycsIHVuZGVmaW5lZCkpLmlubmVySFRNTDtcclxuICAgICAgICAgICAgICAgICAgICBldmVudFRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdzdWNjZXNzJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudFRhcmdldC5tYXRjaGVzKCcuY2MtZmlsdGVyLWRyb3Bkb3duLmN1c3RvbScpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVRvZ2dsZUN1c3RvbVNlbGVjdChldmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudFRhcmdldC5tYXRjaGVzKCcuY2MtY3VzdG9tLW9wdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdEN1c3RvbU9wdGlvbihldmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQ3VzdG9tU2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEtleWJvYXJkIGV2ZW50IGRlbGVnYXRvci5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVLZXlib2FyZEV2ZW50cygpIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBpbmRleCB0byBob3ZlciBvdmVyIGluIGEgZHJvcGRvd24gaWYgb25lIGlzIG9wZW4uXHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wZW5DdXN0b21TZWxlY3Q/LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NjLWN1c3RvbS1zZWxlY3Qtb3B0aW9ucycpWzBdPy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTZWxlY3RIb3ZlckluZGV4ID0gMDtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2lzSG92ZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2VsZWN0SG92ZXJJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcHJlc3MgZG93biAtPiBnbyBuZXh0XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSAnQXJyb3dEb3duJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgdG8gdGhlIG5leHQgb3B0aW9uIGlmIHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3RIb3ZlckluZGV4IDwgb3B0aW9ucy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNbY3VycmVudFNlbGVjdEhvdmVySW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2lzSG92ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3SG92ZXJPcHRpb24gPSBvcHRpb25zW2N1cnJlbnRTZWxlY3RIb3ZlckluZGV4ICsgMV0gYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hvdmVyT3B0aW9uLmNsYXNzTGlzdC5hZGQoJ2lzSG92ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SG92ZXJPcHRpb24udGFiSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SG92ZXJPcHRpb24uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHByZXNzIHVwIC0+IGdvIHByZXZpb3VzXHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSAnQXJyb3dVcCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBwYWdlIHNjcm9sbGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgdG8gdGhlIHByZXZpb3VzIG9wdGlvbiBpZiBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2VsZWN0SG92ZXJJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1tjdXJyZW50U2VsZWN0SG92ZXJJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnaXNIb3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdIb3Zlck9wdGlvbiA9IG9wdGlvbnNbY3VycmVudFNlbGVjdEhvdmVySW5kZXggLSAxXSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3SG92ZXJPcHRpb24uY2xhc3NMaXN0LmFkZCgnaXNIb3ZlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIb3Zlck9wdGlvbi50YWJJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIb3Zlck9wdGlvbi5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcHJlc3MgRW50ZXIgb3Igc3BhY2VcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09ICdFbnRlcicgfHwgZXZlbnQuY29kZSA9PT0gJ1NwYWNlJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnRTb3VyY2UgPSAoZXZlbnQuc3JjRWxlbWVudCBhcyBIVE1MRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRTb3VyY2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYy1maWx0ZXItZHJvcGRvd24nKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50U291cmNlLmNsYXNzTGlzdC5jb250YWlucygnY3VzdG9tJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVG9nZ2xlQ3VzdG9tU2VsZWN0KGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wZW5DdXN0b21TZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIC0+IHNlbGVjdCB0aGUgb3B0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaG92ZXJlZE9wdGlvbiA9IHRoaXMub3BlbkN1c3RvbVNlbGVjdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpc0hvdmVyJylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBob3ZlcmVkT3B0aW9uICYmIGhvdmVyZWRPcHRpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdEN1c3RvbU9wdGlvbihob3ZlcmVkT3B0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQ3VzdG9tU2VsZWN0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VDdXN0b21TZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcHJlc3MgRVNDXHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgICAgICAgICAgLy8gLT4gY2xvc2Ugc2VsZWN0Q3VzdG9tXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlQ3VzdG9tU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWRzIHRoZSBqb2Igc2VhcmNoIHZpZXdcclxuICAgICAqIEBwYXJhbSBpc0Zyb21Ccm93c2VyQWN0aW9uIC0gYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB3ZSBhcmUgcmVuZGVyaW5nIGJhc2VkIG9uIGEgYnJvd3NlciBhY3Rpb24gKGluaXRpYWwgbG9hZCwgcG9wc3RhdGUpIG9yIGZyb20gYSB1c2VyIGFjdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlbmRlckpvYlNlYXJjaChpc0Zyb21Ccm93c2VyQWN0aW9uOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgaXNGaXJzdExvYWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5qb2JTZWFyY2hDb250YWluZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHdlJ3JlIHJlbmRlcmluZyB0aGUgam9iIHNlYXJjaCBjb250YWluZXIsIHNvIG1ha2Ugc3VyZSB3ZSBsb2FkIHRoZSBjb3JyZWN0IGxheW91dFxyXG4gICAgICAgICAgICBpc0ZpcnN0TG9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyc0NvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdmb3JtJywgeyBjbGFzczogJ2NjLWZpbHRlcnMtY29udGFpbmVyJyB9KTtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZVJlc3VsdHNDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnc2VjdGlvbicsIHsgY2xhc3M6ICdjYy1zaGFyZS1jb250YWluZXInIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmpvYlBvcnRhbExpbmtDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnc2VjdGlvbicsIHsgY2xhc3M6ICdjYy1qb2ItcG9ydGFsLWNvbnRhaW5lcicgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcnRhbFNoYXJlQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsXHJcbiAgICAgICAgICAgICAgICB7IGNsYXNzOiAnY2MtcG9ydGFsLXNoYXJlLWNvbnRhaW5lcicgfSxcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iUG9ydGFsTGlua0NvbnRhaW5lcixcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVSZXN1bHRzQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5qb2JzQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3NlY3Rpb24nLCB7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ2NjLWpvYnMtY29udGFpbmVyJyxcclxuICAgICAgICAgICAgICAgICdhcmlhLWJ1c3knOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5qb2JTZWFyY2hDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogYGNjLWNhcmVlcnMtY29udGFpbmVyIHNlYXJjaC0ke3RoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25MaXN0LnNlYXJjaC5sYXlvdXRUeXBlfWBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcnNDb250YWluZXIsXHJcbiAgICAgICAgICAgICAgICBwb3J0YWxTaGFyZUNvbnRhaW5lcixcclxuICAgICAgICAgICAgICAgIHRoaXMuam9ic0NvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICAvLyByZW5kZXIgdGhlIGluc2lnaHRzLCBmaWx0ZXJzLCBldGMgb25seSBvbmNlIHNpbmNlIHRoZXkgd29uJ3QgYmUgY2hhbmdpbmdcclxuICAgICAgICAgICAgY29uc3QgaGFzQ3VzdG9tU2VjdGlvbnMgPSB0aGlzLnNldHRpbmdzLnJlcXVpc2l0aW9uTGlzdC5pbnNpZ2h0cy5jdXN0b21TZWN0aW9ucyAmJiB0aGlzLnNldHRpbmdzLnJlcXVpc2l0aW9uTGlzdC5pbnNpZ2h0cy5jdXN0b21TZWN0aW9ucy5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5yZXF1aXNpdGlvbkxpc3QuaW5zaWdodHMudmlkZW9Db250ZW50U2V0dGluZ3MuaXNFbmFibGVkIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnJlcXVpc2l0aW9uTGlzdC5pbnNpZ2h0cy5pc0Fib3V0VGhlQ29tcGFueUVuYWJsZWQgfHxcclxuICAgICAgICAgICAgICAgIGhhc0N1c3RvbVNlY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlbmRlckluc2lnaHRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnJlcXVpc2l0aW9uTGlzdC5zZWFyY2guZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckZpbHRlcnMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLmZpbHRlcnNDb250YWluZXIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuam9iU2VhcmNoQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ25vLWZpbHRlcnMnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckpvYlBvcnRhbExpbmsoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnJlcXVpc2l0aW9uTGlzdC5zaGFyaW5nLmlzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTaGFyZVNlY3Rpb24odGhpcy5zaGFyZVJlc3VsdHNDb250YWluZXIsIHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25MaXN0LnNoYXJpbmcuc2hhcmluZ09wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQucHJlcGVuZCh0aGlzLmpvYlNlYXJjaENvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW1vdmUgY3VycmVudCBzb2NpYWwgc2hhcmluZyBtZXRhIHRhZ3NcclxuICAgICAgICB0aGlzLnJlbW92ZVNoYXJlTWV0YVRhZ3MoKTtcclxuXHJcbiAgICAgICAgLy8gaWYgc29jaWFsIHNoYXJpbmcgaXMgZW5hYmxlZCBmb3IgcmVxIGxpc3QsIGFkZCBzb2NpYWwgc2hhcmluZyBtZXRhIHRhZ3NcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5yZXF1aXNpdGlvbkxpc3Quc2hhcmluZy5pc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRTaGFyZU1ldGFUYWdzKCdDYXJlZXJzJywgd2luZG93LmxvY2F0aW9uLmhyZWYudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0b2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGNvbnRhaW5lcnNcclxuICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy5lcnJvclN0YXRlQ29udGFpbmVyLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMuam9iU2VhcmNoQ29udGFpbmVyLCAhaXNGaXJzdExvYWQpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLmpvYkRldGFpbHNDb250YWluZXIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhpcyBpc24ndCB0aGUgaW5pdGlhbCBsb2FkLCB3ZSBjYW4gZXhpdCBlYXJseSBpbnN0ZWFkIG9mIGV4ZWN1dGluZyB0aGUgc2VhcmNoXHJcbiAgICAgICAgaWYgKCFpc0Zyb21Ccm93c2VyQWN0aW9uICYmIHRoaXMuam9iTW9kZWxzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHNldHRpbmdzIHNheSB0byBkbyBhbiBpbml0aWFsIHJlcXVlc3QsIGRvIHRoZSBpbml0aWFsIHJlcXVlc3RcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5yZXF1aXNpdGlvbkxpc3QuYXV0b0xvYWRKb2JzKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpvYnModGhpcy5jdXJyZW50UGFnZU51bWJlciwgIWlzRnJvbUJyb3dzZXJBY3Rpb24pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMuam9iU2VhcmNoQ29udGFpbmVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLnNrZWxldG9uQ29udGFpbmVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy5za2VsZXRvbkNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmaWx0ZXInKVswXSBhcyBIVE1MRWxlbWVudCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qb2JTZWFyY2hDb250YWluZXI/LmFwcGVuZENoaWxkKHRoaXMuc2tlbGV0b25Db250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyUHJldmlld0xvYWRlZEV2ZW50KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmpvYnNDb250YWluZXIuc2V0QXR0cmlidXRlKCdhcmlhLWJ1c3knLCAnZmFsc2UnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBlbXB0eVN0YXRlV2VsY29tZU1lc3NhZ2UgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JyxcclxuICAgICAgICAgICAgICAgIHsgY2xhc3M6ICdjYy1lbXB0eS1zdGF0ZS1tZXNzYWdlJyB9LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUZXh0KCdzZWFyY2gucmVzdWx0cy5lbXB0eS1zdGF0ZS53ZWxjb21lJywgdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmpvYnNDb250YWluZXIuYXBwZW5kKGVtcHR5U3RhdGVXZWxjb21lTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlclByZXZpZXdMb2FkZWRFdmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy5qb2JTZWFyY2hDb250YWluZXIsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy5za2VsZXRvbkNvbnRhaW5lciwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy5za2VsZXRvbkNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmaWx0ZXInKVswXSBhcyBIVE1MRWxlbWVudCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZXMgZWxlbWVudCB2aXNpYmlsaXR5XHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudFxyXG4gICAgICogQHBhcmFtIGlzVmlzaWJsZSBBIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBlbGVtZW50IHNob3VsZCBiZSB2aXNpYmxlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdG9nZ2xlRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCwgaXNWaXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdjYy1oaWRkZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NjLWhpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgYW4gZXJyb3Igd2hlbiBlbWJlZGRlZCBjb250ZW50IGZhaWxzIHRvIGxvYWQuIFRoZSBlcnJvciBjYW4gYmUgZm9yIHRoZSBqb2IgbGlzdFxyXG4gICAgICogb3IgZm9yIGpvYiBkZXNjcmlwdGlvbi5cclxuICAgICAqIEBwYXJhbSBkaXNwbGF5VGV4dEtleSAtIHRoZSB0ZXh0IGRpY3Rpb25hcnkga2V5IG9mIHRoZSBlcnJvciBtZXNzYWdlIHRvIGRpc3BsYXkuIHVuZGVmaW5lZCBpZiBzZXR0aW5ncyBkaWQgbm90IGxvYWQuXHJcbiAgICAgKiBAcGFyYW0gZXJyb3IgLSB0aGUgZXJyb3IgdG8gb3B0aW9uYWxseSBsb2cgdG8gdGhlIGNvbnNvbGUgaWYgZGVmaW5lZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlckxvYWRFcnJvcihkaXNwbGF5VGV4dEtleTogc3RyaW5nIHwgdW5kZWZpbmVkLCBlcnJvcjogRXJyb3IgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyB0cnkgdG8gZ2V0IGVycm9yIHRleHQgdmFsdWVzIGZyb20gc2V0dGluZ3MsIGJ1dCB1c2UgZGVmYXVsdHMgaWYgc2V0dGluZ3MgYXJlIHVuZGVmaW5lZFxyXG4gICAgICAgIGxldCBlcnJvclRleHRWYWx1ZTogc3RyaW5nO1xyXG4gICAgICAgIC8vIGFsc28gdHJ5IHRvIGdldCB0aGUgbG9hZCBlcnJvciBpY29uJ3MgYXJpYSBsYWJlbCBmcm9tIHRoZSBzZXR0aW5ncywgYnV0IHVzZSBkZWZhaWx0cyBpZiBzZXR0aW5ncyBhcmUgdW5kZWZpbmVkXHJcbiAgICAgICAgbGV0IGVycm9ySWNvbkFyaWFMYWJlbDogc3RyaW5nO1xyXG5cclxuICAgICAgICBpZiAoZGlzcGxheVRleHRLZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBubyB0ZXh0IGtleSwgc28gZGlzcGxheSBhIGdlbmVyaWMgcGFnZSBsb2FkIGVycm9yIHRoYXQgd29uJ3QgbG9vayBpbiB0aGUgc2V0dGluZ3Mgd2hpY2ggYXJlIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICBlcnJvclRleHRWYWx1ZSA9ICdXZSBhcmUgaGF2aW5nIHRyb3VibGUgbG9hZGluZyB0aGUgcGFnZS4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nO1xyXG4gICAgICAgICAgICBlcnJvckljb25BcmlhTGFiZWwgPSAnTG9hZCBFcnJvciBJY29uJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBkaXNwbGF5IGFuIGVycm9yIGxvYWRpbmcgdGhlIGpvYnMgbGlzdCBvciBqb2IgZGVzY3JpcHRpb24sIHNvIGNoZWNrIHNldHRpbmdzIGZvciBlcnJvciB0ZXh0IGJhc2VkIG9uXHJcbiAgICAgICAgICAgIC8vIHRoZSBkaXNwbGF5VGV4dEtleS4gYWxzbyB1c2UgdGhlIGxvYWQgZXJyb3IgaWNvbiBsYWJlbCBrZXkgZ2V0IHRoZSBhcmlhLWxhYmVsIGZvciB0aGUgaW1hZ2UuXHJcbiAgICAgICAgICAgIGVycm9yVGV4dFZhbHVlID0gdGhpcy5nZXRUZXh0KGRpc3BsYXlUZXh0S2V5IGFzIHN0cmluZywgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgZXJyb3JJY29uQXJpYUxhYmVsID0gdGhpcy5nZXRUZXh0KCdsb2FkLWVycm9yLWljb24ubGFiZWwnLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbG9hZCB0aGUgY3NzIGZpbGUgZm9yIGVycm9yIHN0eWxpbmcgb25seSBpZiB0aGUgc3R5bGVzaGVldCBoYXMgbm90IGJlZW4gbG9hZGVkXHJcbiAgICAgICAgLy8gdG8gYXZvaWQgcmVxdWVzdGluZyBhIHN0eWxlc2hlZXQgbXVsdGlwbGUgdGltZXMuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU3R5bGVzaGVldEluY2x1ZGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxheW91dFN0eWxlc2hlZXRMaW5rID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2xpbmsnLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dC9jc3MnLFxyXG4gICAgICAgICAgICAgICAgcmVsOiAnc3R5bGVzaGVldCcsXHJcbiAgICAgICAgICAgICAgICBocmVmOiAnJHByb2Nlc3MuZW52LkNhcmVlclNpdGVTdGF0aWNDb250ZW50VXJsL2Nzcy92MS9saXN0LmNzcydcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLnByZXBlbmQobGF5b3V0U3R5bGVzaGVldExpbmspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JJY29uID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2ltZycsIHtcclxuICAgICAgICAgICAgY2xhc3M6ICdjYy1lcnJvci1pY29uJyxcclxuICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiBlcnJvckljb25BcmlhTGFiZWxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZXJyb3JTdGF0ZVdyYXBwZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzczogJ2NjLWVycm9yLXN0YXRlJyxcclxuICAgICAgICAgICAgdGFiSW5kZXg6IDBcclxuICAgICAgICB9LCBlcnJvckljb24sIGVycm9yVGV4dFZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JTdGF0ZUNvbnRhaW5lciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgZXJyb3IgY29udGFpbmVyIGlmIHdlIGhhdmVuJ3QgeWV0XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JTdGF0ZUNvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdzZWN0aW9uJywgeyBjbGFzczogJ2NjLWVycm9yLXN0YXRlLWNvbnRhaW5lcicgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5lckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyRWxlbWVudC5hcHBlbmQodGhpcy5lcnJvclN0YXRlQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMuZXJyb3JTdGF0ZUNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZXJyb3JTdGF0ZUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB0aGlzLmVycm9yU3RhdGVDb250YWluZXIuYXBwZW5kKGVycm9yU3RhdGVXcmFwcGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2coTG9nVHlwZS5lcnJvciwgZXJyb3IubWVzc2FnZSwgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjb250YWluZXJzXHJcbiAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMuam9iU2VhcmNoQ29udGFpbmVyLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMuam9iRGV0YWlsc0NvbnRhaW5lciwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLmVycm9yU3RhdGVDb250YWluZXIsIHRydWUpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLnNrZWxldG9uQ29udGFpbmVyLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHRoaXMudHJpZ2dlclByZXZpZXdMb2FkZWRFdmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGFuIGVycm9yIHdoZW4gdGhlIHBhZ2UgZmFpbHMgdG8gbG9hZCBiZWZvcmUvZHVyaW5nIGdldHRpbmcgdGhlIHNldHRpbmdzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlckxvYWRQYWdlRXJyb3IoKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJMb2FkRXJyb3IodW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGFuIGVycm9yIHdoZW4gdGhlIGpvYnMgbGlzdCBmYWlscyB0byBsb2FkLlxyXG4gICAgICogQHBhcmFtIGVycm9yIC0gdGhlIGVycm9yIHRvIHJlbmRlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlckxvYWRKb2JzRXJyb3IoZXJyb3I6IEVycm9yIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJMb2FkRXJyb3IoJ2pvYnMubG9hZC1lcnJvci10ZXh0JywgZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGFuIGVycm9yIHdoZW4gdGhlIGpvYiBkZXNjcmlwdGlvbiBmYWlsIHRvIGxvYWQuXHJcbiAgICAgKiBAcGFyYW0gZXJyb3IgLSB0aGUgZXJyb3IgdG8gcmVuZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyTG9hZEpvYkRlc2NyaXB0aW9uRXJyb3IoZXJyb3I6IEVycm9yIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJMb2FkRXJyb3IoJ2RldGFpbHMubG9hZC1lcnJvci10ZXh0JywgZXJyb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGVzIHdoZW4gYSB1c2VyIGNsaWNrcyBvbiBhIHNwZWNpZmljIGpvYlxyXG4gICAgKiBAcGFyYW0gY3VycmVudFRhcmdldCAtIHRoZSB0YXJnZXQgZWxlbWVudCBmb3IgdGhlIGNsaWNrIGV2ZW50XHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBoYW5kbGVDbGlja09uSm9iKGN1cnJlbnRUYXJnZXQ6IEVsZW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBqb2JJZCA9IGN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcblxyXG4gICAgICAgIGlmIChqb2JJZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWRKb2JEZXNjcmlwdGlvbihqb2JJZCwgIXRoaXMuZGF0YVNlcnZpY2UucHJldmlld1NldHRpbmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHdoZW4gYSB1c2VyIGNsaWNrcyBvbiB0aGUgYnV0dG9uIHRvIGdvIGJhY2sgdG8gdGhlIGpvYnMgbGlzdCBmcm9tIGEgam9iIGRlc2NyaXB0aW9uXHJcbiAgICAgKiBAcGFyYW0gY3VycmVudFRhcmdldCAtIHRoZSB0YXJnZXQgZWxlbWVudCBmb3IgdGhlIGNsaWNrIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgaGFuZGxlQ2xpY2tCYWNrVG9Kb2JzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuam9iSWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB1cmxcclxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgnam9iSWQnKTtcclxuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB1cmwpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckpvYlNlYXJjaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmV0Y2hlcyB0aGUgY2hvc2VuIGpvYiBhbmQgcmVuZGVycyB0aGUgZGV0YWlsc1xyXG4gICAgICogQHBhcmFtIGpvYklkIC0gdGhlIGlkIG9mIHRoZSBqb2JcclxuICAgICAqIEBwYXJhbSB1cGRhdGVCcm93c2VyU3RhdGUgYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB3ZSBzaG91bGQgdXBkYXRlIHRoZSBicm93c2VyIGhpc3RvcnkgYXMgcGFydCBvZiB0aGUgbG9hZGluZyBwcm9jZXNzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgbG9hZEpvYkRlc2NyaXB0aW9uKGpvYklkOiBzdHJpbmcsIHVwZGF0ZUJyb3dzZXJTdGF0ZTogYm9vbGVhbiA9IHRydWUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgam9iRGV0YWlsczogSm9iTW9kZWwgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBhbHJlYWR5IGhhdmUgdGhlIGpvYk1vZGVsIGxvYWRlZFxyXG4gICAgICAgICAgICBpZiAodGhpcy5qb2JNb2RlbHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgam9iRGV0YWlscyA9IHRoaXMuam9iTW9kZWxzLmZpbmQoam9iID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gam9iLmlkID09PSBqb2JJZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIHRoZSBqb2IgbW9kZWwgZmV0Y2ggaXQgZnJvbSB0aGUgQVBJXHJcbiAgICAgICAgICAgIGlmIChqb2JEZXRhaWxzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGpvYkRldGFpbHMgPSBhd2FpdCB0aGlzLmRhdGFTZXJ2aWNlLmdldEpvYih0aGlzLnNpdGVJZCwgam9iSWQsIHRoaXMuc291cmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHVwZGF0ZUJyb3dzZXJTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHVybFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgnam9iSWQnLCBqb2JJZCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB1cmwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckpvYkRlc2NyaXB0aW9uKGpvYkRldGFpbHMpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgc29jaWFsIHNoYXJpbmcgbWV0YSB0YWdzXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2hhcmVNZXRhVGFncygpO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgc29jaWFsIHNoYXJpbmcgaXMgZW5hYmxlZCBmb3IgcmVxIGRldGFpbHMsIGFkZCBzb2NpYWwgc2hhcmluZyBtZXRhIHRhZ3NcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25EZXRhaWxzLnNoYXJpbmcuaXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50VXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2pvYklkJywgam9iSWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTaGFyZU1ldGFUYWdzKGpvYkRldGFpbHMucG9zaXRpb25UaXRsZSwgY3VycmVudFVybC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGNhdGNoIChleCkge1xyXG4gICAgICAgICAgICAvLyBpZiBsb2FkaW5nIGpvYiBkZXNjcmlwdGlvbiBmcm9tIGFwaSByZXR1cm5zIGFuIGVycm9yLCBkaXNwbGF5IHRoZSBsb2FkIGVycm9yLlxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckxvYWRKb2JEZXNjcmlwdGlvbkVycm9yKGV4IGFzIEVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgam9iIGRlc2NyaXB0aW9uIGRldGFpbHNcclxuICAgICAqIEBwYXJhbSBqb2IgLSBtb2RlbCByZXByZXNlbnRpbmcgdGhlIGpvYiBkZXRhaWxzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVySm9iRGVzY3JpcHRpb24oam9iOiBKb2JNb2RlbCkge1xyXG4gICAgICAgIGlmICh0aGlzLmpvYkRldGFpbHNDb250YWluZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmpvYkRldGFpbHNDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JywgeyBjbGFzczogJ2NjLWpvYi1kZXNjcmlwdGlvbi1jb250YWluZXInIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnQuYXBwZW5kKHRoaXMuam9iRGV0YWlsc0NvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjbGVhciBvdXQgd2hhdGV2ZXIgd2UgaGFkIGJlZm9yZSwgd2UnbGwgYWx3YXlzIGJ1aWxkIGZyb20gc2NyYXRjaFxyXG4gICAgICAgIHRoaXMuam9iRGV0YWlsc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgY29uc3QgbGVmdEFycm93ID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2ltZycsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNyYzogJyRwcm9jZXNzLmVudi5DYXJlZXJTaXRlU3RhdGljQ29udGVudFVybC9pbWFnZXMvYW5nbGUtbGVmdC1zb2xpZC5zdmcnLFxyXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1jbGlja2FibGUnLFxyXG4gICAgICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBiYWNrVGV4dCA9IGNyZWF0ZUh0bWxFbGVtZW50KCdzcGFuJywgdW5kZWZpbmVkLCB0aGlzLmdldFRleHQoJ2RldGFpbHMuYmFjay10by1qb2JzLWJ1dHRvbi10ZXh0JywgdW5kZWZpbmVkKSk7XHJcbiAgICAgICAgY29uc3QgYmFja1RvSm9ic1VybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgIGJhY2tUb0pvYnNVcmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgnam9iSWQnKTtcclxuICAgICAgICBjb25zdCBiYWNrVG9Kb2JzQnV0dG9uID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2EnLFxyXG4gICAgICAgICAgICB7IGNsYXNzOiAnY2MtYmFjay10by1qb2JzLWJ1dHRvbiBjYy1jbGlja2FibGUnLCBocmVmOiBiYWNrVG9Kb2JzVXJsLnRvU3RyaW5nKCkgfSxcclxuICAgICAgICAgICAgbGVmdEFycm93LFxyXG4gICAgICAgICAgICBiYWNrVGV4dCk7XHJcbiAgICAgICAgdGhpcy5qb2JEZXRhaWxzQ29udGFpbmVyLmFwcGVuZChiYWNrVG9Kb2JzQnV0dG9uKTtcclxuXHJcbiAgICAgICAgY29uc3Qgam9iVGl0bGUgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JywgeyBjbGFzczogJ2NjLWpvYi1kZXNjcmlwdGlvbi10aXRsZScgfSwgam9iLnBvc2l0aW9uVGl0bGUpO1xyXG4gICAgICAgIHRoaXMuam9iRGV0YWlsc0NvbnRhaW5lci5hcHBlbmQoam9iVGl0bGUpO1xyXG5cclxuICAgICAgICBjb25zdCBpc0xvY2F0aW9uVmlzaWJsZSA9IHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25EZXRhaWxzLmRpc3BsYXlGaWVsZHMuaW5jbHVkZXMoRmllbGRUeXBlRW51bS5sb2NhdGlvbik7XHJcbiAgICAgICAgY29uc3QgaXNEYXRlUG9zdGVkVmlzaWJsZSA9IHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25EZXRhaWxzLmRpc3BsYXlGaWVsZHMuaW5jbHVkZXMoRmllbGRUeXBlRW51bS5kYXRlUG9zdGVkKTtcclxuXHJcbiAgICAgICAgaWYgKGlzTG9jYXRpb25WaXNpYmxlIHx8IGlzRGF0ZVBvc3RlZFZpc2libGUpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kYXJ5TGFiZWxzID0gdGhpcy5nZXRKb2JEZXRhaWxzU2Vjb25kYXJ5TGFiZWxzKGpvYiwgJ2NjLWpvYi1kZXNjcmlwdGlvbi1zZWNvbmRhcnktbGFiZWwgY2Mtam9iLWRlc2NyaXB0aW9uLWxvY2F0aW9uIGNjLWpvYi1kZXNjcmlwdGlvbi1tb2JpbGUtYm9yZGVyJywgaXNMb2NhdGlvblZpc2libGUsIGlzRGF0ZVBvc3RlZFZpc2libGUpO1xyXG4gICAgICAgICAgICBzZWNvbmRhcnlMYWJlbHMuZm9yRWFjaCgoc2Vjb25kYXJ5TGFiZWw6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpvYkRldGFpbHNDb250YWluZXI/LmFwcGVuZChzZWNvbmRhcnlMYWJlbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBpZiB0aGUgc2Vjb25kYXJ5IGxhYmVsIGlzIG5vdCBkaXNwbGF5ZWQsIGFkZCB0aGUgY2Mtam9iLWRlc2NyaXB0aW9uLW1vYmlsZS1ib3JkZXIgY2xhc3MgdG8gdGhlIHRpdGxlXHJcbiAgICAgICAgICAgIC8vIHRvIGdldCB0aGUgZ3JheSBsaW5lIHRvIGRpc3BsYXkgYmV0d2VlbiB0aGUgaGVhZGVyIGFuZCBhcHBseSBidXR0b24gZm9yIG1vYmlsZSBicm93c2Vycy5cclxuICAgICAgICAgICAgam9iVGl0bGUuY2xhc3NMaXN0LmFkZCgnY2Mtam9iLWRlc2NyaXB0aW9uLW1vYmlsZS1ib3JkZXInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhcHBseVNlY3Rpb247XHJcblxyXG4gICAgICAgIGlmIChqb2IuYXBwbHlMaW5rLmluY2x1ZGVzKCdAJykpIHtcclxuICAgICAgICAgICAgLy8gdGhpcyBpcyBhIGVtYWlsLXRvLWFwcGx5IGpvYlxyXG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnc3BhbicsIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnY2MtZW1haWwtYXBwbHktaGVhZGVyJ1xyXG4gICAgICAgICAgICB9LCB0aGlzLmdldFRleHQoJ2FwcGx5LmJ5LWVtYWlsLmhlYWRlcicsIHVuZGVmaW5lZCkpO1xyXG4gICAgICAgICAgICBjb25zdCBhcHBseUJ0blNlY3Rpb24gPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1lbWFpbC1hcHBseS1pbm5lcidcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYWlsdG9TdHJpbmcgPSAnbWFpbHRvOic7XHJcbiAgICAgICAgICAgIGNvbnN0IGFkZGl0aW9uYWxNYWlsVG9PcHRpb25zID0gJz9zdWJqZWN0PScgKyB0aGlzLmdldFRleHQoJ2FwcGx5LmJ5LWVtYWlsLnN1YmplY3QnLCB1bmRlZmluZWQpICtcclxuICAgICAgICAgICAgICAgICcmYm9keT0nICsgdGhpcy5nZXRUZXh0KCdhcHBseS5ieS1lbWFpbC5ib2R5JywgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgY29uc3QgbWFpbFRvTGluayA9IG1haWx0b1N0cmluZyArIGpvYi5hcHBseUxpbmsgKyBhZGRpdGlvbmFsTWFpbFRvT3B0aW9ucztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsTWFpbHRvRWxlbWVudCA9IGNyZWF0ZUh0bWxFbGVtZW50KCdhJywge1xyXG4gICAgICAgICAgICAgICAgaWQ6ICdjYy1jb3B5LWVtYWlsLWlkJyxcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnY2MtbWFpbHRvLWJ0bicsXHJcbiAgICAgICAgICAgICAgICBocmVmOiBtYWlsVG9MaW5rXHJcbiAgICAgICAgICAgIH0sIGpvYi5hcHBseUxpbmspO1xyXG4gICAgICAgICAgICBhcHBseUJ0blNlY3Rpb24uYXBwZW5kQ2hpbGQoZW1haWxNYWlsdG9FbGVtZW50KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLmNsaXBib2FyZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29weVVybExvZ28gPSBjcmVhdGVIdG1sRWxlbWVudCgnaW1nJyxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY2MtY29weS1lbWFpbC1sb2dvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAnJHByb2Nlc3MuZW52LkNhcmVlclNpdGVTdGF0aWNDb250ZW50VXJsL2ltYWdlcy9jb3B5LXNvbGlkLnN2ZydcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcHlVcmxCdG4gPSBjcmVhdGVIdG1sRWxlbWVudCgnYScsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2NjLWNvcHktZW1haWwtYnRuLWlkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1jb3B5LWVtYWlsLWJ0biBjYy1jbGlja2FibGUnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb3B5VXJsTG9nbyxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRleHQoJ2FwcGx5LmJ5LWVtYWlsLmNvcHknLCB1bmRlZmluZWQpKTtcclxuICAgICAgICAgICAgICAgIGFwcGx5QnRuU2VjdGlvbi5hcHBlbmRDaGlsZChjb3B5VXJsQnRuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcHBseVNlY3Rpb24gPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1lbWFpbC1hcHBseSdcclxuICAgICAgICAgICAgfSwgaGVhZGVyLCBjcmVhdGVIdG1sRWxlbWVudCgnc3BhbicsIHt9LCB0aGlzLmdldFRleHQoJ2FwcGx5LmJ5LWVtYWlsLmlubmVyJywgdW5kZWZpbmVkKSksIGFwcGx5QnRuU2VjdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgYXBwbHlUZXh0ID0gam9iLmNhblNlbGZTY2hlZHVsZSA/ICdhcHBseS5ieS11cmwuc2NoZWR1bGUnIDogJ2FwcGx5LmJ5LXVybCc7XHJcbiAgICAgICAgICAgIGFwcGx5U2VjdGlvbiA9IGNyZWF0ZUh0bWxFbGVtZW50KCdhJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBocmVmOiBqb2IuYXBwbHlMaW5rLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY2MtYXBwbHktYnV0dG9uIGxpbmstYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6ICdfYmxhbmsnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUZXh0KGFwcGx5VGV4dCwgdW5kZWZpbmVkKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhcHBseVNoYXJlQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsXHJcbiAgICAgICAgICAgIHsgY2xhc3M6ICdjYy1hcHBseS1zaGFyZS1jb250YWluZXInIH0sXHJcbiAgICAgICAgICAgIGFwcGx5U2VjdGlvbik7XHJcbiAgICAgICAgdGhpcy5qb2JEZXRhaWxzQ29udGFpbmVyLmFwcGVuZChhcHBseVNoYXJlQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25EZXRhaWxzLnNoYXJpbmcuaXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoYXJlQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6ICdjYy1zaGFyZS1jb250YWluZXInIH0pO1xyXG4gICAgICAgICAgICBhcHBseVNoYXJlQ29udGFpbmVyLmFwcGVuZChzaGFyZUNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU2hhcmVTZWN0aW9uKHNoYXJlQ29udGFpbmVyLCB0aGlzLnNldHRpbmdzLnJlcXVpc2l0aW9uRGV0YWlscy5zaGFyaW5nLnNoYXJpbmdPcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uVGV4dCA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2Mtam9iLWRlc2NyaXB0aW9uLXRleHQnIH0pO1xyXG4gICAgICAgIC8vIGpvYiBkZXNjcmlwdGlvbiBpcyBleHBlY3RlZCB0byBiZSBIVE1MLCBhbmQgd2Ugd2lsbCBkbyBhbnkgc2FuaXRpemF0aW9uIGR1cmluZyB0aGUgaW5kZXhpbmcgcHJvY2VzcyBzbyB0aGF0XHJcbiAgICAgICAgLy8gd2UgY2FuIHRydXN0IHdoYXQgd2UgYXJlIGdldHRpbmcgZnJvbSBvdXIgb3duIEFQSVxyXG4gICAgICAgIGRlc2NyaXB0aW9uVGV4dC5pbm5lckhUTUwgPSBqb2IuZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5qb2JEZXRhaWxzQ29udGFpbmVyLmFwcGVuZChkZXNjcmlwdGlvblRleHQpO1xyXG5cclxuICAgICAgICBjb25zdCBzZWNvbmRBcHBseUJ1dHRvbiA9IGFwcGx5U2VjdGlvbi5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5qb2JEZXRhaWxzQ29udGFpbmVyLmFwcGVuZChzZWNvbmRBcHBseUJ1dHRvbik7XHJcblxyXG4gICAgICAgIC8vIHJlbmRlciB0aGUgbWVldCB0aGUgdGVhbSBpbnNpZ2h0cyBzZWN0aW9uXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25EZXRhaWxzLmluc2lnaHRzLmlzTWVldFRoZVRlYW1FbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTWVldFRoZVRlYW0oam9iLmlkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy5tZWV0VGhlVGVhbUNvbnRhaW5lciwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjb250YWluZXJzXHJcbiAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMuZXJyb3JTdGF0ZUNvbnRhaW5lciwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLmpvYlNlYXJjaENvbnRhaW5lciwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlRWxlbWVudCh0aGlzLmpvYkRldGFpbHNDb250YWluZXIsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBtZWV0IHRoZSB0ZWFtIGluc2lnaHRzIHNlY3Rpb25cclxuICAgICAqIEBwYXJhbSBqb2JJZCAtIHRoZSBqb2IgaWQgdG8gbG9hZCB0ZWFtIG1lbWJlcnMgZm9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVuZGVyTWVldFRoZVRlYW0oam9iSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG5cclxuICAgICAgICBpZiAodGhpcy50ZWFtTWVtYmVyc0xlZnROYXYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBsZWZ0QXJyb3dQYXRoID0gY3JlYXRlU3ZnRWxlbWVudCgncGF0aCcsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZDogJ00yNTcuNSA0NDUuMWwtMjIuMiAyMi4yYy05LjQgOS40LTI0LjYgOS40LTMzLjkgMEw3IDI3M2MtOS40LTkuNC05LjQtMjQuNiAwLTMzLjlMMjAxLjQgNDQuN2M5LjQtOS40IDI0LjYtOS40IDMzLjkgMGwyMi4yIDIyLjJjOS41IDkuNSA5LjMgMjUtLjQgMzQuM0wxMzYuNiAyMTZINDI0YzEzLjMgMCAyNCAxMC43IDI0IDI0djMyYzAgMTMuMy0xMC43IDI0LTI0IDI0SDEzNi42bDEyMC41IDExNC44YzkuOCA5LjMgMTAgMjQuOC40IDM0LjN6J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnRBcnJvdyA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ3N2ZycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld0JveDogJzAgMCA0NDggNTEyJyxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2NjLXRlYW0tbmF2LWFycm93J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxlZnRBcnJvd1BhdGgpO1xyXG4gICAgICAgICAgICB0aGlzLnRlYW1NZW1iZXJzTGVmdE5hdiA9IGNyZWF0ZUh0bWxFbGVtZW50KCdidXR0b24nLCB7IGNsYXNzOiAnY2MtbGVmdC1hcnJvdyBjYy10ZWFtLW5hdi1idXR0b24gY2MtbmF2LWRpc2FibGVkJyB9LCBsZWZ0QXJyb3cpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVhbU1lbWJlcnNMZWZ0TmF2LmNsYXNzTGlzdC5hZGQoJ2NjLW5hdi1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB0aGlzLnRlYW1NZW1iZXJzTGVmdE5hdi5jbGFzc0xpc3QucmVtb3ZlKCdjYy1jbGlja2FibGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRlYW1NZW1iZXJzUmlnaHROYXYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCByaWdodEFycm93UGF0aCA9IGNyZWF0ZVN2Z0VsZW1lbnQoJ3BhdGgnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGQ6ICdNMTkwLjUgNjYuOWwyMi4yLTIyLjJjOS40LTkuNCAyNC42LTkuNCAzMy45IDBMNDQxIDIzOWM5LjQgOS40IDkuNCAyNC42IDAgMzMuOUwyNDYuNiA0NjcuM2MtOS40IDkuNC0yNC42IDkuNC0zMy45IDBsLTIyLjItMjIuMmMtOS41LTkuNS05LjMtMjUgLjQtMzQuM0wzMTEuNCAyOTZIMjRjLTEzLjMgMC0yNC0xMC43LTI0LTI0di0zMmMwLTEzLjMgMTAuNy0yNCAyNC0yNGgyODcuNEwxOTAuOSAxMDEuMmMtOS44LTkuMy0xMC0yNC44LS40LTM0LjN6J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0QXJyb3cgPSBjcmVhdGVTdmdFbGVtZW50KCdzdmcnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdCb3g6ICcwIDAgNDQ4IDUxMicsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjYy10ZWFtLW5hdi1hcnJvdydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICByaWdodEFycm93UGF0aCk7XHJcbiAgICAgICAgICAgIHRoaXMudGVhbU1lbWJlcnNSaWdodE5hdiA9IGNyZWF0ZUh0bWxFbGVtZW50KCdidXR0b24nLCB7IGNsYXNzOiAnY2MtcmlnaHQtYXJyb3cgY2MtY2xpY2thYmxlIGNjLXRlYW0tbmF2LWJ1dHRvbicgfSwgcmlnaHRBcnJvdyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50ZWFtTWVtYmVyc1JpZ2h0TmF2LmNsYXNzTGlzdC5yZW1vdmUoJ2NjLW5hdi1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB0aGlzLnRlYW1NZW1iZXJzUmlnaHROYXYuY2xhc3NMaXN0LmFkZCgnY2MtY2xpY2thYmxlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtZWV0VGhlVGVhbVRpdGxlID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6ICdjYy1tZWV0LXRoZS10ZWFtLXRpdGxlJyB9LCB0aGlzLmdldFRleHQoJ2luc2lnaHRzLm1lZXQtdGhlLXRlYW0udGl0bGUnLCB1bmRlZmluZWQpKTtcclxuICAgICAgICBjb25zdCBtZWV0VGhlVGVhbU5hdiA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2MtbWVldC10aGUtdGVhbS1uYXYnIH0sIHRoaXMudGVhbU1lbWJlcnNMZWZ0TmF2LCB0aGlzLnRlYW1NZW1iZXJzUmlnaHROYXYpO1xyXG4gICAgICAgIGNvbnN0IG1lZXRUaGVUZWFtSGVhZGVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6ICdjYy1tZWV0LXRoZS10ZWFtLWhlYWRlcicgfSwgbWVldFRoZVRlYW1UaXRsZSwgbWVldFRoZVRlYW1OYXYpO1xyXG5cclxuICAgICAgICB0aGlzLnRlYW1NZW1iZXJzQ29sbGVjdGlvbiA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2MtdGVhbS1tZW1iZXJzLWNvbGxlY3Rpb24nIH0pO1xyXG4gICAgICAgIGNvbnN0IHRlYW1NZW1iZXJzQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6ICdjYy10ZWFtLW1lbWJlcnMtY29udGFpbmVyJyB9LCB0aGlzLnRlYW1NZW1iZXJzU2tlbGV0b24pO1xyXG5cclxuICAgICAgICBjb25zdCBtZWV0VGhlVGVhbVNlY3Rpb24gPSBjcmVhdGVIdG1sRWxlbWVudCgnc2VjdGlvbicsIHsgY2xhc3M6ICdjYy10ZWFtLW1lbWJlcnMtc2VjdGlvbicgfSwgbWVldFRoZVRlYW1IZWFkZXIsIHRlYW1NZW1iZXJzQ29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLm1lZXRUaGVUZWFtQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6ICdjYy1tZWV0LXRoZS10ZWFtLWNvbnRhaW5lcicgfSwgbWVldFRoZVRlYW1TZWN0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5qb2JEZXRhaWxzQ29udGFpbmVyPy5hcHBlbmQodGhpcy5tZWV0VGhlVGVhbUNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGlmIChqb2JJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy50ZWFtTWVtYmVyc1NrZWxldG9uLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbU1lbWJlcnMgPSBhd2FpdCB0aGlzLmRhdGFTZXJ2aWNlLmdldFRlYW1NZW1iZXJzKGpvYklkKTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMudGVhbU1lbWJlcnNTa2VsZXRvbiwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbW9kaWZpZXJDbGFzcyA9IGBjYy10ZWFtLWNvdW50LSR7dGVhbU1lbWJlcnMubGVuZ3RofWA7XHJcbiAgICAgICAgICAgIG1lZXRUaGVUZWFtTmF2LmNsYXNzTGlzdC5hZGQobW9kaWZpZXJDbGFzcyk7XHJcbiAgICAgICAgICAgIGlmICh0ZWFtTWVtYmVycy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQobWVldFRoZVRlYW1OYXYsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGVhbU1lbWJlcnMuZm9yRWFjaCh0ZWFtTWVtYmVyID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGVhbU1lbWJlcih0aGlzLnRlYW1NZW1iZXJzQ29sbGVjdGlvbiwgdGVhbU1lbWJlciwgbW9kaWZpZXJDbGFzcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0ZWFtTWVtYmVyc0NvbnRhaW5lci5hcHBlbmQodGhpcy50ZWFtTWVtYmVyc0NvbGxlY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZWV0VGhlVGVhbUNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGAke3RoaXMuam9iRGV0YWlsc0NvbnRhaW5lcj8uY2xpZW50V2lkdGh9cHhgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciBhbiBpbmRpdmlkdWFsIHRlYW0gbWVtYmVyXHJcbiAgICAgKiBAcGFyYW0gdGVhbUNvbnRhaW5lciAtIHRoZSBjb250YWluZXIgdG8gYWRkIHRoZSB0ZWFtIG1lbWJlciB0b1xyXG4gICAgICogQHBhcmFtIHRlYW1NZW1iZXIgLSB0aGUgdGVhbSBtZW1iZXIgZGF0YVxyXG4gICAgICogQHBhcmFtIG1vZGlmaWVyQ2xhc3MgLSBhIGNzcyBjbGFzcyB0byBhcHBseSB0byB0aGUgdGVhbSBtZW1iZXIgY29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyVGVhbU1lbWJlcih0ZWFtQ29udGFpbmVyOiBIVE1MRWxlbWVudCwgdGVhbU1lbWJlcjogVGVhbU1lbWJlciwgbW9kaWZpZXJDbGFzczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGVhbU1lbWJlclByb2ZpbGUgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JywgeyBjbGFzczogJ2NjLXRlYW0tbWVtYmVyLXByb2ZpbGUnIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB0ZWFtTWVtYmVySW1hZ2UgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JywgeyBjbGFzczogJ2NjLXRlYW0tbWVtYmVyLWltYWdlJyB9KTtcclxuICAgICAgICBpZiAodGVhbU1lbWJlci5wcm9maWxlSW1hZ2UpIHtcclxuICAgICAgICAgICAgY29uc3QgdGVhbU1lbWJlclBob3RvID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2ltZycsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjYy10ZWFtLW1lbWJlci1waG90bycsXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgdGVhbU1lbWJlci5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0ZWFtTWVtYmVySW1hZ2UuYXBwZW5kKHRlYW1NZW1iZXJQaG90byk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdGVhbU1lbWJlckluaXRpYWxzID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzOiAnY2MtdGVhbS1tZW1iZXItaW5pdGlhbHMnIH0sIHRlYW1NZW1iZXIuaW5pdGlhbHMpO1xyXG4gICAgICAgICAgICB0ZWFtTWVtYmVySW1hZ2UuYXBwZW5kKHRlYW1NZW1iZXJJbml0aWFscyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlYW1NZW1iZXJQcm9maWxlLmFwcGVuZCh0ZWFtTWVtYmVySW1hZ2UpO1xyXG5cclxuICAgICAgICBpZiAodGVhbU1lbWJlci5kaXNwbGF5TmFtZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtTWVtYmVyTmFtZSA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2MtdGVhbS1tZW1iZXItbmFtZScgfSwgdGVhbU1lbWJlci5kaXNwbGF5TmFtZSk7XHJcbiAgICAgICAgICAgIHRlYW1NZW1iZXJQcm9maWxlLmFwcGVuZCh0ZWFtTWVtYmVyTmFtZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRlYW1NZW1iZXIuZnVuRmFjdCAmJiB0aGlzLmRhdGFTZXJ2aWNlLnByZXZpZXdTZXR0aW5ncykge1xyXG4gICAgICAgICAgICAgICAgdGVhbU1lbWJlci5mdW5GYWN0ID0gdGhpcy5nZXRUZXh0KCdpbnNpZ2h0cy5lbXB0eS1mdW4tZmFjdC5wcmV2aWV3JywgeyBuYW1lOiB0ZWFtTWVtYmVyLmRpc3BsYXlOYW1lIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGVhbU1lbWJlci5yb2xlTmFtZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtTWVtYmVyUm9sZSA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2MtdGVhbS1tZW1iZXItcm9sZScgfSwgdGVhbU1lbWJlci5yb2xlTmFtZSk7XHJcbiAgICAgICAgICAgIHRlYW1NZW1iZXJQcm9maWxlLmFwcGVuZCh0ZWFtTWVtYmVyUm9sZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0ZWFtTWVtYmVyQXR0cmlidXRlc0NvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2MtdGVhbS1tZW1iZXItYXR0cmlidXRlcycgfSk7XHJcbiAgICAgICAgY29uc3QgYXR0cmlidXRlQ2xhc3MgPSAnY2MtdGVhbS1tZW1iZXItYXR0cmlidXRlJyArICh0ZWFtTWVtYmVyLmZ1bkZhY3QgPyAnIGNjLWlubGluZS1ibG9jaycgOiAnJyk7XHJcblxyXG4gICAgICAgIGlmICh0ZWFtTWVtYmVyLmpvaW5EYXRlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1NZW1iZXJKb2luQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6IGF0dHJpYnV0ZUNsYXNzIH0pO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtTWVtYmVySm9pbkxhYmVsID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6ICdjYy10ZWFtLW1lbWJlci1hdHRyaWJ1dGUtbGFiZWwnIH0sICdKb2luZWQnKTtcclxuICAgICAgICAgICAgdGVhbU1lbWJlckpvaW5Db250YWluZXIuYXBwZW5kKHRlYW1NZW1iZXJKb2luTGFiZWwpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtTWVtYmVySm9pbiA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2MtdGVhbS1tZW1iZXItYXR0cmlidXRlLXZhbHVlJyB9LCB0ZWFtTWVtYmVyLmpvaW5EYXRlKTtcclxuICAgICAgICAgICAgdGVhbU1lbWJlckpvaW5Db250YWluZXIuYXBwZW5kKHRlYW1NZW1iZXJKb2luKTtcclxuICAgICAgICAgICAgdGVhbU1lbWJlckF0dHJpYnV0ZXNDb250YWluZXIuYXBwZW5kKHRlYW1NZW1iZXJKb2luQ29udGFpbmVyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0ZWFtTWVtYmVyLmZ1bkZhY3QpIHtcclxuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlU3BhY2VyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6ICdjYy1hdHRyaWJ1dGUtc3BhY2VyJyB9KTtcclxuICAgICAgICAgICAgdGVhbU1lbWJlckF0dHJpYnV0ZXNDb250YWluZXIuYXBwZW5kKGF0dHJpYnV0ZVNwYWNlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGVhbU1lbWJlci53b3JrTG9jYXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgdGVhbU1lbWJlckxvY2F0aW9uQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6IGF0dHJpYnV0ZUNsYXNzIH0pO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtTWVtYmVyTG9jYXRpb25MYWJlbCA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2MtdGVhbS1tZW1iZXItYXR0cmlidXRlLWxhYmVsJyB9LCAnTG9jYXRpb24nKTtcclxuICAgICAgICAgICAgdGVhbU1lbWJlckxvY2F0aW9uQ29udGFpbmVyLmFwcGVuZCh0ZWFtTWVtYmVyTG9jYXRpb25MYWJlbCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1NZW1iZXJMb2NhdGlvbiA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2MtdGVhbS1tZW1iZXItYXR0cmlidXRlLXZhbHVlJyB9LCB0ZWFtTWVtYmVyLndvcmtMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHRlYW1NZW1iZXJMb2NhdGlvbkNvbnRhaW5lci5hcHBlbmQodGVhbU1lbWJlckxvY2F0aW9uKTtcclxuICAgICAgICAgICAgdGVhbU1lbWJlckF0dHJpYnV0ZXNDb250YWluZXIuYXBwZW5kKHRlYW1NZW1iZXJMb2NhdGlvbkNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZWFtTWVtYmVyUHJvZmlsZS5hcHBlbmQodGVhbU1lbWJlckF0dHJpYnV0ZXNDb250YWluZXIpO1xyXG5cclxuICAgICAgICBpZiAodGVhbU1lbWJlci5mdW5GYWN0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1NZW1iZXJGdW5GYWN0Q29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6ICdjYy10ZWFtLW1lbWJlci1mdW4tZmFjdCcgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1NZW1iZXJGdW5GYWN0ID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3NwYW4nLCB7fSwgdGVhbU1lbWJlci5mdW5GYWN0KTtcclxuICAgICAgICAgICAgdGVhbU1lbWJlckZ1bkZhY3RDb250YWluZXIuYXBwZW5kKHRlYW1NZW1iZXJGdW5GYWN0KTtcclxuICAgICAgICAgICAgdGVhbU1lbWJlclByb2ZpbGUuYXBwZW5kKHRlYW1NZW1iZXJGdW5GYWN0Q29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRlYW1NZW1iZXJTcGFjZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JywgeyBjbGFzczogJ2NjLXRlYW0tbWVtYmVyLXNwYWNlcicgfSwgdGVhbU1lbWJlclByb2ZpbGUpO1xyXG4gICAgICAgIGNvbnN0IHRlYW1NZW1iZXJDb250YWluZXJDbGFzcyA9IGBjYy10ZWFtLW1lbWJlci1jb250YWluZXIke3RoaXMuZGF0YVNlcnZpY2UucHJldmlld1NldHRpbmdzID8gJy1wcmV2aWV3JyA6ICcnfWA7XHJcbiAgICAgICAgY29uc3QgdGVhbU1lbWJlckNvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiBgJHt0ZWFtTWVtYmVyQ29udGFpbmVyQ2xhc3N9ICR7bW9kaWZpZXJDbGFzc31gIH0sIHRlYW1NZW1iZXJTcGFjZXIpO1xyXG4gICAgICAgIHRlYW1Db250YWluZXIuYXBwZW5kKHRlYW1NZW1iZXJDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBpbnNpZ2h0cyBzZWN0aW9uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcmVuZGVySW5zaWdodHMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5pbnNpZ2h0c0NvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2MtaW5zaWdodHMtY29udGFpbmVyJyB9KTtcclxuXHJcbiAgICAgICAgLy8gcmVuZGVyIGFib3V0IHRoZSBjb21wYW55IHNlY3Rpb24gaWYgdmlkZW8gT1IgbWlzc2lvbi92aXNpb24vdmFsdWVzIGlzIGVuYWJsZWRcclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5yZXF1aXNpdGlvbkxpc3QuaW5zaWdodHMudmlkZW9Db250ZW50U2V0dGluZ3MuaXNFbmFibGVkIHx8XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25MaXN0Lmluc2lnaHRzLmlzQWJvdXRUaGVDb21wYW55RW5hYmxlZCkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlbmRlckFib3V0VGhlQ29tcGFueUluc2lnaHRzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjdXN0b21TZWN0aW9ucyA9IHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25MaXN0Lmluc2lnaHRzLmN1c3RvbVNlY3Rpb25zO1xyXG4gICAgICAgIGlmIChjdXN0b21TZWN0aW9ucyAmJiBjdXN0b21TZWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ3VzdG9tU2VjdGlvbnMoY3VzdG9tU2VjdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25MaXN0LnNlYXJjaC5sYXlvdXRUeXBlID09PSBTZWFyY2hMYXlvdXRUeXBlRW51bS5sZWZ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuam9iU2VhcmNoQ29udGFpbmVyPy5jbGFzc0xpc3QuYWRkKCdpbmNsdWRlLWluc2lnaHRzJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmpvYlNlYXJjaENvbnRhaW5lcj8ucHJlcGVuZCh0aGlzLmluc2lnaHRzQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgQWJvdXQgdGhlIENvbXBhbnkgcG9ydGlvbiBvZiB0aGUgaW5zaWdodHMgc2VjdGlvblxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJlbmRlckFib3V0VGhlQ29tcGFueUluc2lnaHRzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGluc2lnaHRzU2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLnJlcXVpc2l0aW9uTGlzdC5pbnNpZ2h0cztcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIGNvbnRhaW5lciBzZWN0aW9uXHJcbiAgICAgICAgdGhpcy5hYm91dFRoZUNvbXBhbnlDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnc2VjdGlvbicsIHsgY2xhc3M6ICdjYy1hYm91dC10aGUtY29tcGFueS1jb250YWluZXIgY2Mtd2lkZ2V0LWNvbnRhaW5lcicgfSk7XHJcblxyXG4gICAgICAgIC8vIGFsd2F5cyBhZGQgdGl0bGUgb2Ygc2VjdGlvblxyXG4gICAgICAgIGNvbnN0IGFib3V0VGhlQ29tcGFueVRpdGxlID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3NwYW4nLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ2NjLWFib3V0LXRoZS1jb21wYW55LXRpdGxlIGNjLXdpZGdldC10aXRsZScsXHJcbiAgICAgICAgICAgICAgICBpZDogJ2NjLWFib3V0LXRoZS1jb21wYW55LXRpdGxlJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBhYm91dFRoZUNvbXBhbnlUaXRsZS5pbm5lckhUTUwgPSB0aGlzLmdldFRleHQoJ2luc2lnaHRzLmFib3V0LXRoZS1jb21wYW55LnRpdGxlJywgdW5kZWZpbmVkKTtcclxuICAgICAgICB0aGlzLmFib3V0VGhlQ29tcGFueUNvbnRhaW5lci5hcHBlbmQoYWJvdXRUaGVDb21wYW55VGl0bGUpO1xyXG5cclxuICAgICAgICAvLyBpZiB2aWRlbyBpcyBlbmFibGVkLCBhZGQgaWZyYW1lIGZvciB5b3V0dWJlIHZpZGVvIGVtYmVkXHJcbiAgICAgICAgaWYgKGluc2lnaHRzU2V0dGluZ3MudmlkZW9Db250ZW50U2V0dGluZ3MuaXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGludHJvVmlkZW9Db250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnc2VjdGlvbicsIHsgY2xhc3M6ICdjYy1pbnRyby12aWRlby1jb250YWluZXInIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaW50cm9WaWRlb0VtYmVkID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2lmcmFtZScsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1pbnRyby12aWRlby1lbWJlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdjYy1pbnRyby12aWRlby1lbWJlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQvaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiB0aGlzLnNldHRpbmdzLnJlcXVpc2l0aW9uTGlzdC5pbnNpZ2h0cy52aWRlb0NvbnRlbnRTZXR0aW5ncy51cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVib3JkZXI6IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGludHJvVmlkZW9Db250YWluZXIuYXBwZW5kKGludHJvVmlkZW9FbWJlZCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWJvdXRUaGVDb21wYW55Q29udGFpbmVyLmFwcGVuZChpbnRyb1ZpZGVvQ29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIG1pc3Npb24vdmlzaW9uL3ZhbHVlcyBpcyBlbmFibGVkLCBhZGQgdGhlbSB0byB0aGUgc2VjdGlvblxyXG4gICAgICAgIGxldCBpbmNsdWRlTWlzc2lvbjtcclxuICAgICAgICBsZXQgaW5jbHVkZVZpc2lvbjtcclxuICAgICAgICBsZXQgaW5jbHVkZVZhbHVlcztcclxuICAgICAgICBpZiAoaW5zaWdodHNTZXR0aW5ncy5pc0Fib3V0VGhlQ29tcGFueUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcGFueVJvbGUgPSBhd2FpdCB0aGlzLmRhdGFTZXJ2aWNlLmdldENvbXBhbnlSb2xlKHRoaXMuc2V0dGluZ3Mub3JnSWQpO1xyXG4gICAgICAgICAgICBpbmNsdWRlTWlzc2lvbiA9IHRoaXMuZGF0YVNlcnZpY2UucHJldmlld1NldHRpbmdzIHx8IGNvbXBhbnlSb2xlLmNvbXBhbnlNaXNzaW9uO1xyXG4gICAgICAgICAgICBpbmNsdWRlVmlzaW9uID0gdGhpcy5kYXRhU2VydmljZS5wcmV2aWV3U2V0dGluZ3MgfHwgY29tcGFueVJvbGUuY29tcGFueVZpc2lvbjtcclxuICAgICAgICAgICAgaW5jbHVkZVZhbHVlcyA9IHRoaXMuZGF0YVNlcnZpY2UucHJldmlld1NldHRpbmdzIHx8IChjb21wYW55Um9sZS5jb21wYW55VmFsdWVzICYmIGNvbXBhbnlSb2xlLmNvbXBhbnlWYWx1ZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc3QgbWlzc2lvblZpc2lvblZhbHVlc0NvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdzZWN0aW9uJywgeyBjbGFzczogJ2NjLW1pc3Npb24tdmlzaW9uLXZhbHVlcy1jb250YWluZXInIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluY2x1ZGVNaXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaXNzaW9uVGl0bGUgPSBjcmVhdGVIdG1sRWxlbWVudCgnc3BhbicsIHsgY2xhc3M6ICd0aXRsZScgfSwgdGhpcy5nZXRUZXh0KCdpbnNpZ2h0cy5hYm91dC10aGUtY29tcGFueS5taXNzaW9uJywgdW5kZWZpbmVkKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaXNzaW9uQ29udGVudCA9IGNvbXBhbnlSb2xlLmNvbXBhbnlNaXNzaW9uID9cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVIdG1sRWxlbWVudCgnc3BhbicsIHsgY2xhc3M6ICdjb250ZW50JyB9LCBjb21wYW55Um9sZS5jb21wYW55TWlzc2lvbikgOlxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUh0bWxFbGVtZW50KCdzcGFuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzczogJ2NjLW1pc3Npbmctb2JqZWN0aXZlJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRleHQoJ2luc2lnaHRzLmFib3V0LXRoZS1jb21wYW55Lm1pc3Npbmctb2JqZWN0aXZlJywgeyAnb2JqZWN0aXZlJzogJ01pc3Npb24nIH0pKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pc3Npb25Db250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY2Mtb3JnLW9iamVjdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdjYy1taXNzaW9uLWNvbnRhaW5lcidcclxuICAgICAgICAgICAgICAgIH0sIG1pc3Npb25UaXRsZSwgbWlzc2lvbkNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgbWlzc2lvblZpc2lvblZhbHVlc0NvbnRhaW5lci5hcHBlbmQobWlzc2lvbkNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluY2x1ZGVWaXNpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpc2lvblRpdGxlID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzOiAndGl0bGUnIH0sIHRoaXMuZ2V0VGV4dCgnaW5zaWdodHMuYWJvdXQtdGhlLWNvbXBhbnkudmlzaW9uJywgdW5kZWZpbmVkKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aXNpb25Db250ZW50ID0gY29tcGFueVJvbGUuY29tcGFueVZpc2lvbiA/XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlSHRtbEVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzOiAnY29udGVudCcgfSwgY29tcGFueVJvbGUuY29tcGFueVZpc2lvbikgOlxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUh0bWxFbGVtZW50KCdzcGFuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzczogJ2NjLW1pc3Npbmctb2JqZWN0aXZlJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRleHQoJ2luc2lnaHRzLmFib3V0LXRoZS1jb21wYW55Lm1pc3Npbmctb2JqZWN0aXZlJywgeyAnb2JqZWN0aXZlJzogJ1Zpc2lvbicgfSkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlzaW9uQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2NjLW9yZy1vYmplY3RpdmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnY2MtdmlzaW9uLWNvbnRhaW5lcidcclxuICAgICAgICAgICAgICAgIH0sIHZpc2lvblRpdGxlLCB2aXNpb25Db250ZW50KTtcclxuICAgICAgICAgICAgICAgIG1pc3Npb25WaXNpb25WYWx1ZXNDb250YWluZXIuYXBwZW5kKHZpc2lvbkNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluY2x1ZGVWYWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlc1RpdGxlID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzOiAndGl0bGUnIH0sIHRoaXMuZ2V0VGV4dCgnaW5zaWdodHMuYWJvdXQtdGhlLWNvbXBhbnkudmFsdWVzJywgdW5kZWZpbmVkKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXNDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY2Mtb3JnLW9iamVjdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdjYy12YWx1ZXMtY29udGFpbmVyJ1xyXG4gICAgICAgICAgICAgICAgfSwgdmFsdWVzVGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhbnlSb2xlLmNvbXBhbnlWYWx1ZXMgJiYgY29tcGFueVJvbGUuY29tcGFueVZhbHVlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXNMaXN0Q29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6ICdjYy12YWx1ZXMnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlSb2xlLmNvbXBhbnlWYWx1ZXMubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNMaXN0Q29udGFpbmVyLmFwcGVuZChjcmVhdGVIdG1sRWxlbWVudCgnc3BhbicsIHsgJ2NsYXNzJzogJ2NjLW9yZy12YWx1ZScgfSwgdmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNDb250YWluZXIuYXBwZW5kKHZhbHVlc0xpc3RDb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNDb250YWluZXIuYXBwZW5kKGNyZWF0ZUh0bWxFbGVtZW50KCdzcGFuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzczogJ2NjLW1pc3Npbmctb2JqZWN0aXZlJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRleHQoJ2luc2lnaHRzLmFib3V0LXRoZS1jb21wYW55Lm1pc3Npbmctb2JqZWN0aXZlJywgeyAnb2JqZWN0aXZlJzogJ1ZhbHVlJyB9KSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWlzc2lvblZpc2lvblZhbHVlc0NvbnRhaW5lci5hcHBlbmQodmFsdWVzQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFib3V0VGhlQ29tcGFueUNvbnRhaW5lci5hcHBlbmQobWlzc2lvblZpc2lvblZhbHVlc0NvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBiYWlsIGJlZm9yZSBhZGRpbmcgaWYgaW5zaWdodHMgYW5kIHZpZGVvIGFyZSBib3RoIGVtcHR5LCBzbyB0aXRsZSBkb2Vzbid0IHJlbmRlciBmb3IgZW1wdHkgc2VjdGlvblxyXG4gICAgICAgIGlmICghaW5jbHVkZU1pc3Npb24gJiYgIWluY2x1ZGVWYWx1ZXMgJiYgIWluY2x1ZGVWaXNpb24gJiZcclxuICAgICAgICAgICAgIXRoaXMuZGF0YVNlcnZpY2UucHJldmlld1NldHRpbmdzICYmXHJcbiAgICAgICAgICAgICFpbnNpZ2h0c1NldHRpbmdzLnZpZGVvQ29udGVudFNldHRpbmdzLmlzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgc2VjdGlvbiB0byBpbnNpZ2h0cyBjb250YWluZXJcclxuICAgICAgICB0aGlzLmluc2lnaHRzQ29udGFpbmVyPy5hcHBlbmQodGhpcy5hYm91dFRoZUNvbXBhbnlDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyB0aGUgcHJvdmlkZWQgY3VzdG9tIHNlY3Rpb25zLlxyXG4gICAgICogQHBhcmFtIGN1c3RvbVNlY3Rpb25zIC0gdGhlIHNldCBvZiBjdXN0b20gc2VjdGlvbnMgdG8gcmVuZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyQ3VzdG9tU2VjdGlvbnMoY3VzdG9tU2VjdGlvbnM6IEN1c3RvbVNlY3Rpb25bXSkge1xyXG5cclxuICAgICAgICBjdXN0b21TZWN0aW9ucy5mb3JFYWNoKChjdXN0b21TZWN0aW9uLCBjdXN0b21TZWN0aW9uSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tU2VjdGlvbkNvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdzZWN0aW9uJywgeyBjbGFzczogJ2NjLWN1c3RvbS1zZWN0aW9uLWNvbnRhaW5lciBjYy13aWRnZXQtY29udGFpbmVyJyB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBlbGVtZW50IGZvciBjdXN0b20gc2VjdGlvbidzIHRpdGxlXHJcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbVNlY3Rpb25UaXRsZSA9IGNyZWF0ZUh0bWxFbGVtZW50KCdzcGFuJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2NjLWN1c3RvbS1zZWN0aW9uLXRpdGxlIGNjLXdpZGdldC10aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdjYy1jdXN0b20tc2VjdGlvbi10aXRsZS0nICsgY3VzdG9tU2VjdGlvbkluZGV4XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjdXN0b21TZWN0aW9uVGl0bGUuaW5uZXJUZXh0ID0gY3VzdG9tU2VjdGlvbi50aXRsZTtcclxuICAgICAgICAgICAgY3VzdG9tU2VjdGlvbkNvbnRhaW5lci5hcHBlbmQoY3VzdG9tU2VjdGlvblRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBlbGVtZW50IGZvciBjdXN0b20gc2VjdGlvbidzIGNvbnRlbnRcclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tU2VjdGlvbkNvbnRlbnQgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2NjLWN1c3RvbS1zZWN0aW9uLWNvbnRlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnY2MtY3VzdG9tLXNlY3Rpb24tY29udGVudC0nICsgY3VzdG9tU2VjdGlvbkluZGV4XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjdXN0b21TZWN0aW9uQ29udGVudC5pbm5lclRleHQgPSBjdXN0b21TZWN0aW9uLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGN1c3RvbVNlY3Rpb25Db250YWluZXIuYXBwZW5kKGN1c3RvbVNlY3Rpb25Db250ZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBzZWN0aW9uIHRvIGluc2lnaHRzIGNvbnRhaW5lclxyXG4gICAgICAgICAgICB0aGlzLmluc2lnaHRzQ29udGFpbmVyPy5hcHBlbmQoY3VzdG9tU2VjdGlvbkNvbnRhaW5lcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgRmlsdGVyIE9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW5kZXJGaWx0ZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZpbHRlckxheW91dCA9IHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25MaXN0LnNlYXJjaC5sYXlvdXRUeXBlO1xyXG5cclxuICAgICAgICB0aGlzLmZpbHRlcnNDb250YWluZXIuY2xhc3NMaXN0LmFkZChgY2MtZmlsdGVycy0ke2ZpbHRlckxheW91dH1gKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnJvd3NlclVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlcnNUb0luY2x1ZGUgPSB0aGlzLnNldHRpbmdzLnJlcXVpc2l0aW9uTGlzdC5zZWFyY2guZmlsdGVycztcclxuXHJcbiAgICAgICAgaWYgKGZpbHRlcnNUb0luY2x1ZGUuaW5jbHVkZXMoRmlsdGVyVHlwZUVudW0ua2V5d29yZHMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyS2V5d29yZHNGaWx0ZXIodGhpcy5maWx0ZXJzQ29udGFpbmVyLCBicm93c2VyVXJsLnNlYXJjaFBhcmFtcy5nZXQoRmlsdGVyVHlwZUVudW0ua2V5d29yZHMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBjb250YWluZXJzIGZvciB0aGUgZmlsdGVyIG9wdGlvbnMgYmFzZWQgb24gZmlsdGVyIGxheW91dCB0eXBlXHJcbiAgICAgICAgbGV0IG90aGVyRmlsdGVyc0NvbnRhaW5lciA9IHRoaXMuZmlsdGVyc0NvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgaWYgKGZpbHRlckxheW91dCA9PT0gJ3RvcCcpIHtcclxuICAgICAgICAgICAgLy8gaWYgd2UncmUgZG9pbmcgYSB0b3AgZmlsdGVyIGxheW91dCwgdGhlbiB3ZSdsbCBhY3R1YWxseSBwdXQgdGhlIHJlc3Qgb2YgdGhlIGZpbHRlcnMgaW50byBhIGNvbnRhaW5lclxyXG4gICAgICAgICAgICAvLyBzbyB3ZSBjYW4gYmV0dGVyIGNvbnRyb2wgdGhlaXIgbGF5b3V0LiBzaW5jZSBsZWZ0IGZpbHRlcnMgYXJlIGFsbCB2ZXJ0aWNhbGx5IHN0YWNrZWQsIHdlIGRvbid0IGhhdmUgdG9cclxuICAgICAgICAgICAgLy8gZG8gdGhpcyBmb3IgdGhlIGxlZnQgbGF5b3V0LlxyXG4gICAgICAgICAgICBvdGhlckZpbHRlcnNDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JywgeyBjbGFzczogJ2NjLWZpbHRlci1ncm91cCcgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyc0NvbnRhaW5lci5hcHBlbmQob3RoZXJGaWx0ZXJzQ29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmaWx0ZXJzVG9JbmNsdWRlLmluY2x1ZGVzKEZpbHRlclR5cGVFbnVtLmxvY2F0aW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckRyb3Bkb3duRmlsdGVyKEZpbHRlclR5cGVFbnVtLmxvY2F0aW9uLCBvdGhlckZpbHRlcnNDb250YWluZXIsIGJyb3dzZXJVcmwuc2VhcmNoUGFyYW1zLmdldChGaWx0ZXJUeXBlRW51bS5sb2NhdGlvbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZpbHRlcnNUb0luY2x1ZGUuaW5jbHVkZXMoRmlsdGVyVHlwZUVudW0ub2ZmaWNlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckRyb3Bkb3duRmlsdGVyKEZpbHRlclR5cGVFbnVtLm9mZmljZSwgb3RoZXJGaWx0ZXJzQ29udGFpbmVyLCBicm93c2VyVXJsLnNlYXJjaFBhcmFtcy5nZXQoRmlsdGVyVHlwZUVudW0ub2ZmaWNlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZmlsdGVyc1RvSW5jbHVkZS5pbmNsdWRlcyhGaWx0ZXJUeXBlRW51bS5kZXBhcnRtZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckRyb3Bkb3duRmlsdGVyKEZpbHRlclR5cGVFbnVtLmRlcGFydG1lbnQsIG90aGVyRmlsdGVyc0NvbnRhaW5lciwgYnJvd3NlclVybC5zZWFyY2hQYXJhbXMuZ2V0KEZpbHRlclR5cGVFbnVtLmRlcGFydG1lbnQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmaWx0ZXJzVG9JbmNsdWRlLmluY2x1ZGVzKEZpbHRlclR5cGVFbnVtLmJyYW5kKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckRyb3Bkb3duRmlsdGVyKEZpbHRlclR5cGVFbnVtLmJyYW5kLCBvdGhlckZpbHRlcnNDb250YWluZXIsIGJyb3dzZXJVcmwuc2VhcmNoUGFyYW1zLmdldChGaWx0ZXJUeXBlRW51bS5icmFuZCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZpbHRlcnNUb0luY2x1ZGUuaW5jbHVkZXMoRmlsdGVyVHlwZUVudW0uZGlzdGFuY2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUG9zdGFsQ29kZUlucHV0R3JvdXAob3RoZXJGaWx0ZXJzQ29udGFpbmVyLFxyXG4gICAgICAgICAgICAgICAgYnJvd3NlclVybC5zZWFyY2hQYXJhbXMuZ2V0KEZpbHRlclR5cGVFbnVtLnBvc3RhbENvZGUpLFxyXG4gICAgICAgICAgICAgICAgYnJvd3NlclVybC5zZWFyY2hQYXJhbXMuZ2V0KEZpbHRlclR5cGVFbnVtLmRpc3RhbmNlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlclN1Ym1pdFJlc2V0QnV0dG9ucyhvdGhlckZpbHRlcnNDb250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRleHQgaW5wdXQgc2VhcmNoXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudENvbnRhaW5lciAtIHRoZSBjb250YWluZXIgdG8gYXBwZW5kIHRoZSBzZWFyY2ggaW5wdXQgdG9cclxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIHRoZSBjdXJyZW50IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyS2V5d29yZHNGaWx0ZXIoZWxlbWVudENvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBjcmVhdGVIdG1sRWxlbWVudCgnaW5wdXQnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICBjbGFzczogYGNjLWZpbHRlci0ke0ZpbHRlclR5cGVFbnVtLmtleXdvcmRzfWAsXHJcbiAgICAgICAgICAgICAgICBpZDogYGNjLWZpbHRlci0ke0ZpbHRlclR5cGVFbnVtLmtleXdvcmRzfWAsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBGaWx0ZXJUeXBlRW51bS5rZXl3b3JkcyxcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLmdldFRleHQoYHNlYXJjaC5maWx0ZXJzLiR7RmlsdGVyVHlwZUVudW0ua2V5d29yZHN9LnBsYWNlaG9sZGVyYCwgdW5kZWZpbmVkKSxcclxuICAgICAgICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy5nZXRUZXh0KGBzZWFyY2guZmlsdGVycy4ke0ZpbHRlclR5cGVFbnVtLmtleXdvcmRzfS5sYWJlbGAsIHVuZGVmaW5lZClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzLnB1c2goc2VhcmNoSW5wdXQpO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2VhcmNoV3JhcHBlciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ2NjLWtleXdvcmRzLXdyYXBwZXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlYXJjaElucHV0KTtcclxuXHJcbiAgICAgICAgZWxlbWVudENvbnRhaW5lci5hcHBlbmQoc2VhcmNoV3JhcHBlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIGEgZHJvcGRvd24gZm9yIGZpbHRlcmluZyBvZiB0aGUgZ2l2ZW4gam9icyBmaWVsZC5cclxuICAgICAqIEBwYXJhbSBmaWx0ZXJGaWVsZFR5cGUgLSBKb2JzIGZpZWxkIHdlIGFyZSBmaWx0ZXJpbmcgb25cclxuICAgICAqIEBwYXJhbSBlbGVtZW50Q29udGFpbmVyIC0gdGhlIGNvbnRhaW5lciB0byBhcHBlbmQgdGhlIGlucHV0IHRvXHJcbiAgICAgKiBAcGFyYW0gY3VycmVudEZpbHRlclZhbHVlIC0gdGhlIGN1cnJlbnQgdmFsdWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW5kZXJEcm9wZG93bkZpbHRlcihmaWx0ZXJGaWVsZFR5cGU6IEZpbHRlclR5cGVFbnVtLCBlbGVtZW50Q29udGFpbmVyOiBIVE1MRWxlbWVudCwgY3VycmVudEZpbHRlclZhbHVlOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuc2V0dGluZ3MucmVxdWlzaXRpb25MaXN0LnNlYXJjaC5maWx0ZXJPcHRpb25zW2ZpbHRlckZpZWxkVHlwZV07XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZW4ndCBvcHRpb25zLCBkb24ndCByZW5kZXIgdGhlIGRyb3Bkb3duXHJcbiAgICAgICAgaWYgKCFvcHRpb25zIHx8IG9wdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFdlIGFyZSB1c2luZyBhIG5hdGl2ZSBzZWxlY3QgYW5kIGEgY3VzdG9tIHNlbGVjdCB0byBtYWludGFpbiBzdXN0YWluYWJpbGl0eSBpbiBjYXNlc1xyXG4gICAgICAgIC8vIHdoZXJlIHVzZXJzIGRvIG5vdCB1c2UgYSBtb3VzZS5cclxuICAgICAgICAvLyBVc2VycyB0aGF0IHVzZSBhIG1vdXNlIHdpbGwgc2VlIHRoZSBjdXN0b21pemFibGUgc2VsZWN0IGFuZFxyXG4gICAgICAgIC8vIHVzZXJzIHRoYXQgbmF2aWdhdGUgd2l0aCBrZXlib2FyZCBvciB2b2ljZSB3aWxsIHVzZSB0aGUgbmF0aXZlIHNlbGVjdCB3aGljaCBpcyB3YXkgbW9yZSBhY2Nlc3NpYmxlLlxyXG4gICAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZ2V0VGV4dChgc2VhcmNoLmZpbHRlcnMuJHtmaWx0ZXJGaWVsZFR5cGV9LmxhYmVsYCwgdW5kZWZpbmVkKTtcclxuICAgICAgICBjb25zdCBpbnB1dE5hdGl2ZSA9IGNyZWF0ZUh0bWxFbGVtZW50KCdzZWxlY3QnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzOiBgY2MtZmlsdGVyLWRyb3Bkb3duIG5hdGl2ZSBjYy1maWx0ZXItJHtmaWx0ZXJGaWVsZFR5cGV9LWlucHV0YCxcclxuICAgICAgICAgICAgaWQ6IGBjYy1maWx0ZXItJHtmaWx0ZXJGaWVsZFR5cGV9LW5hdGl2ZWAsXHJcbiAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkVHlwZSxcclxuICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiBhcmlhTGFiZWxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY3VzdG9tU2VsZWN0VHJpZ2dlclNwYW4gPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzczogJ2NjLWN1c3RvbS1zcGFuJ1xyXG4gICAgICAgIH0sIHRoaXMuZ2V0VGV4dChgc2VhcmNoLmZpbHRlcnMuJHtmaWx0ZXJGaWVsZFR5cGV9LnBsYWNlaG9sZGVyYCwgdW5kZWZpbmVkKSk7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tU2VsZWN0VHJpZ2dlckFycm93ID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3M6ICdjYy1jdXN0b20tdHJpZ2dlci1hcnJvdycsXHJcbiAgICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy5nZXRUZXh0KCdzZWFyY2guZmlsdGVycy5kb3duLWFycm93LmxhYmVsJywgdW5kZWZpbmVkKVxyXG4gICAgICAgIH0sIHRoaXMuZ2V0VGV4dCgnc2VhcmNoLmZpbHRlcnMuZG93bi1hcnJvdy5pY29uJywgdW5kZWZpbmVkKSk7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tU2VsZWN0VHJpZ2dlciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnY2MtY3VzdG9tLXNlbGVjdC10cmlnZ2VyJyxcclxuICAgICAgICAgICAgaWQ6IGBjYy1maWx0ZXItJHtmaWx0ZXJGaWVsZFR5cGV9LWN1c3RvbWAsXHJcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xyXG4gICAgICAgIH0sIGN1c3RvbVNlbGVjdFRyaWdnZXJTcGFuLCBjdXN0b21TZWxlY3RUcmlnZ2VyQXJyb3cpO1xyXG4gICAgICAgIGNvbnN0IGN1c3RvbVNlbGVjdE9wdGlvbnMgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzczogJ2NjLWN1c3RvbS1zZWxlY3Qtb3B0aW9ucydcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBjdXN0b21TZWxlY3QgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzczogYGNjLWZpbHRlci1kcm9wZG93biBjdXN0b20gY2MtZmlsdGVyLSR7ZmlsdGVyRmllbGRUeXBlfS1pbnB1dCBjYy1jbGlja2FibGVgLFxyXG4gICAgICAgICAgICAnYXJpYS1sYWJlbCc6IGFyaWFMYWJlbCxcclxuICAgICAgICAgICAgdGFiSW5kZXg6IDAsXHJcbiAgICAgICAgICAgIG5hbWU6IGZpbHRlckZpZWxkVHlwZVxyXG4gICAgICAgIH0sIGN1c3RvbVNlbGVjdFRyaWdnZXIsIGN1c3RvbVNlbGVjdE9wdGlvbnMpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRPcHRpb24gPSBudWxsO1xyXG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyRmllbGRUeXBlID09PSBGaWx0ZXJUeXBlRW51bS5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb24gPSB0aGlzLnJlbmRlckxvY2F0aW9uRmlsdGVyKGlucHV0TmF0aXZlLCBjdXN0b21TZWxlY3RPcHRpb25zLCBvcHRpb25zLCBjdXJyZW50RmlsdGVyVmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBvcHRpb24gb2Ygb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1c3RvbU9wdGlvbkVsID0gdGhpcy5hZGROZXdPcHRpb25Ub0lucHV0cyhvcHRpb24sIGlucHV0TmF0aXZlLCBjdXN0b21TZWxlY3RPcHRpb25zLCBvcHRpb24uaXNEZWZhdWx0U2VsZWN0aW9uLCBmaWx0ZXJGaWVsZFR5cGUsIGN1cnJlbnRGaWx0ZXJWYWx1ZSB8fCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChvcHRpb24uaXNEZWZhdWx0U2VsZWN0aW9uICYmICFjdXJyZW50RmlsdGVyVmFsdWUpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9PT0gY3VycmVudEZpbHRlclZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uID0gY3VzdG9tT3B0aW9uRWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uLmNsYXNzTGlzdC5hZGQoJ2lzQWN0aXZlJywgJ2lzSG92ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkT3B0aW9uID0gc2VsZWN0ZWRPcHRpb24gPz8gY3VzdG9tU2VsZWN0T3B0aW9ucy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYy1jdXN0b20tb3B0aW9uJylbMF07XHJcbiAgICAgICAgY3VzdG9tU2VsZWN0VHJpZ2dlclNwYW4uaW5uZXJIVE1MID0gc2VsZWN0ZWRPcHRpb24uaW5uZXJIVE1MO1xyXG5cclxuICAgICAgICB0aGlzLmZpbHRlcnMucHVzaChpbnB1dE5hdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21GaWx0ZXJzLnB1c2goY3VzdG9tU2VsZWN0KTtcclxuXHJcbiAgICAgICAgZWxlbWVudENvbnRhaW5lci5hcHBlbmQoaW5wdXROYXRpdmUpO1xyXG4gICAgICAgIGVsZW1lbnRDb250YWluZXIuYXBwZW5kKGN1c3RvbVNlbGVjdCk7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0Q3VzdG9tT3B0aW9uKHNlbGVjdGVkT3B0aW9uLCBpbnB1dE5hdGl2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBc3NlbWJsZXMgYW5kIGFzc2lnbnMgb3B0aW9ucyB0byBiZSBkaXNwbGF5ZWQgZm9yIHRoZSBsb2NhdGlvbiBmaWx0ZXIgZHJvcGRvd24uXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlU2VsZWN0IC0gVGhlIG5hdGl2ZSBicm93c2VyIHNlbGVjdCAoa2VwdCBmb3IgYWNjZXNzaWJpbGl0eSkuXHJcbiAgICAgKiBAcGFyYW0gY3VzdG9tU2VsZWN0T3B0aW9ucyAtVGhlIGRpdiB0aGF0IHdpbGwgY29udGFpbiB0aGUgb3B0aW9ucyBpbiB0aGUgY3VzdG9tIGRyb3Bkb3duLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyB0byBhZGQgdG8gYm90aCB0aGUgbmF0aXZlIGFuZCBjdXN0b20gc2VsZWN0IGRyb3Bkb3ducy5cclxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBhY3RpdmUvY3VycmVudCBmaWx0ZXIgdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHRoZSBzZWxlY3RlZCBvcHRpb24gZm9yIHRoZSBmaWx0ZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW5kZXJMb2NhdGlvbkZpbHRlcihuYXRpdmVTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50LFxyXG4gICAgICAgIGN1c3RvbVNlbGVjdE9wdGlvbnM6IEhUTUxFbGVtZW50LFxyXG4gICAgICAgIG9wdGlvbnM6IEZpbHRlck9wdGlvbltdLFxyXG4gICAgICAgIHZhbHVlOiBzdHJpbmcgfCBudWxsKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcclxuICAgICAgICAvLyBnZXQgYWxsIGNpdGllcyBtYXBwZWQgdG8gc3ViZGl2aXNpb25zXHJcbiAgICAgICAgY29uc3QgZmlsdGVyVHlwZSA9IEZpbHRlclR5cGVFbnVtLmxvY2F0aW9uO1xyXG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBOb25FbXB0eUFycmF5PEZpbHRlck9wdGlvbj4+KCk7XHJcbiAgICAgICAgY29uc3Qgbm9TdWJkaXZpc2lvbkFycmF5OiBGaWx0ZXJPcHRpb25bXSA9IFtdO1xyXG4gICAgICAgIG9wdGlvbnMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdWJkaXZpc2lvbkEgPSBhLm1ldGFkYXRhID8gYS5tZXRhZGF0YVsnU3ViZGl2aXNpb24nXSA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YmRpdmlzaW9uQiA9IGIubWV0YWRhdGEgPyBiLm1ldGFkYXRhWydTdWJkaXZpc2lvbiddIDogbnVsbDtcclxuICAgICAgICAgICAgaWYgKCFzdWJkaXZpc2lvbkEgJiYgIXN1YmRpdmlzaW9uQikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViZGl2aXNpb25BICYmICFzdWJkaXZpc2lvbkIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN1YmRpdmlzaW9uQiAmJiAhc3ViZGl2aXNpb25BKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViZGl2aXNpb25BICYmIHN1YmRpdmlzaW9uQikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YmRpdmlzaW9uQS50b0xvY2FsZUxvd2VyQ2FzZSgpLmxvY2FsZUNvbXBhcmUoc3ViZGl2aXNpb25CLnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5mb3JFYWNoKG9wdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YmRpdmlzaW9uTmFtZSA9IG9wdGlvbi5tZXRhZGF0YSA/IG9wdGlvbi5tZXRhZGF0YVsnU3ViZGl2aXNpb24nXSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb24udGV4dCA9PSAnJyAmJiBvcHRpb24udmFsdWUgPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3T3B0aW9uVG9JbnB1dHMob3B0aW9uLCBuYXRpdmVTZWxlY3QsIGN1c3RvbVNlbGVjdE9wdGlvbnMsIHRydWUsIGZpbHRlclR5cGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJkaXZpc2lvbk5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50QXJyID0gbWFwLmdldChzdWJkaXZpc2lvbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50QXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEFyciA9IFtvcHRpb25dO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcC5zZXQoc3ViZGl2aXNpb25OYW1lLCBjdXJyZW50QXJyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEFyci5wdXNoKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGVzZSBkb24ndCBoYXZlIGEgbmljZSBzdWJkaXZpc2lvbiBuYW1lXHJcbiAgICAgICAgICAgICAgICBub1N1YmRpdmlzaW9uQXJyYXkucHVzaChvcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3RlZE9wdGlvbjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvLyB0aGVuIGZvciBlYWNoIHN1YmRpdmlzaW9uLCBhZGQgdGhlIGNpdGllcyB3aXRoIHRoZWlyIGNvdW50XHJcbiAgICAgICAgbWFwLmZvckVhY2goKG9wdGlvbkFyciwgc3ViZGl2aXNpb25OYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGZpcnN0IGFkZCB0aGUgc3ViZGl2aXNpb24gbmFtZSB3aXRoIGEgY291bnRlciBmb3IgdGhlIG51bWJlciBvZiBqb2JzIHVuZGVyIGl0LlxyXG4gICAgICAgICAgICAvLyB0aGUgdmFsdWUgaXMgdGhlIHNhbWUgYXMgdGhlIGZpcnN0IGNpdHkgaW4gdGhlIGxpc3QgbWludXMgdGhlIGNpdHkgZm9yIG1hdGNoaW5nLlxyXG4gICAgICAgICAgICBjb25zdCBzdWJkaXZpc2lvblZhbHVlID0gb3B0aW9uQXJyWzBdPy52YWx1ZS5zcGxpdCgnfCcpLnNsaWNlKDEpLmpvaW4oJ3wnKTtcclxuICAgICAgICAgICAgY29uc3QgaW5pdGlhbENvdW50ID0gMDtcclxuICAgICAgICAgICAgY29uc3Qgam9ic0luU3ViZGl2aXNpb25Db3VudCA9IG9wdGlvbkFyci5yZWR1Y2UoKGNvdW50LCBvcHRpb24pID0+IGNvdW50ICsgKG9wdGlvbi5jb3VudCA/PyAwKSwgaW5pdGlhbENvdW50KTtcclxuICAgICAgICAgICAgY29uc3Qgc3ViZGl2aXNpb25PcHRpb246IEZpbHRlck9wdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IHN1YmRpdmlzaW9uTmFtZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBzdWJkaXZpc2lvblZhbHVlLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IGpvYnNJblN1YmRpdmlzaW9uQ291bnQsXHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogeyAnU3ViZGl2aXNpb24nOiBzdWJkaXZpc2lvbk5hbWUgfSxcclxuICAgICAgICAgICAgICAgIGlzRGVmYXVsdFNlbGVjdGlvbjogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgY29uc3Qgc3ViZGl2aXNpb25FbCA9IHRoaXMuYWRkTmV3T3B0aW9uVG9JbnB1dHMoc3ViZGl2aXNpb25PcHRpb24sIG5hdGl2ZVNlbGVjdCwgY3VzdG9tU2VsZWN0T3B0aW9ucywgdHJ1ZSwgZmlsdGVyVHlwZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZE9wdGlvbiA9IHZhbHVlID09PSBzdWJkaXZpc2lvbk9wdGlvbi52YWx1ZSA/IHN1YmRpdmlzaW9uRWwgOiBzZWxlY3RlZE9wdGlvbjtcclxuICAgICAgICAgICAgLy8gdGhlbiBmb3IgZXZlcnkgb3RoZXIgY2l0eS9zdGF0ZXdpZGUgb3B0aW9uIGluIHRoZSBvcHRpb25BcnIsIGFkZCBvcHRpb25zIGluIHRoZSBkcm9wZG93blxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBvcHRpb25BcnIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgbG9jYXRpb24gdGV4dCBpZiB0aGVyZSBpcyBvbmUgKGp1c3QgdGhlIGNpdHkncyBuYW1lIG9yIHN0YXRld2lkZSB3aXRob3V0IHN1YmRpdmlzaW9uIGNvZGUpXHJcbiAgICAgICAgICAgICAgICBvcHRpb24udGV4dCA9IG9wdGlvbi5tZXRhZGF0YVsnTG9jYXRpb24nXSA/PyBvcHRpb24udGV4dDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1c3RvbU9wdGlvbkVsID0gdGhpcy5hZGROZXdPcHRpb25Ub0lucHV0cyhvcHRpb24sIG5hdGl2ZVNlbGVjdCwgY3VzdG9tU2VsZWN0T3B0aW9ucywgZmFsc2UsIGZpbHRlclR5cGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25BcnJbb3B0aW9uQXJyLmxlbmd0aCAtIDFdID09IG9wdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbU9wdGlvbkVsLmNsYXNzTmFtZSA9IGN1c3RvbU9wdGlvbkVsLmNsYXNzTmFtZSArICcgY2MtbGFzdC1vcHRpb24nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKChvcHRpb24uaXNEZWZhdWx0U2VsZWN0aW9uICYmICF2YWx1ZSkgfHxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPcHRpb24gPSBjdXN0b21PcHRpb25FbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIG5leHQgdG9zcyBpbiBhbGwgb2YgdGhlIG9uZXMgdGhhdCBkaWRudCBoYXZlIHByZXR0eSBzdWJkaXZpc2lvbnNcclxuICAgICAgICAvLyBUT0RPIERFVi0xNTMyNDogVGhpcyBzb21ldGltZXMgaW5jbHVkZXMgY291bnRyaWVzIHdpdGhvdXQgc3ViZGl2aXNpb25zIGR1ZSB0byBiZWluZyBpbnRlcm5hdGlvbmFsLFxyXG4gICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gd29yayBvdXQgYSBsb25nZXIgdGVybSBzb2x1dGlvbiBmb3IgdGhlc2UuXHJcbiAgICAgICAgbm9TdWJkaXZpc2lvbkFycmF5LmZvckVhY2gob3B0aW9uID0+IHtcclxuICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBvcHRpb24ubWV0YWRhdGEgPyBvcHRpb24ubWV0YWRhdGFbJ0xvY2F0aW9uJ10gOiBvcHRpb24udGV4dDtcclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tT3B0aW9uRWwgPSB0aGlzLmFkZE5ld09wdGlvblRvSW5wdXRzKG9wdGlvbiwgbmF0aXZlU2VsZWN0LCBjdXN0b21TZWxlY3RPcHRpb25zLCB0cnVlLCBmaWx0ZXJUeXBlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICgob3B0aW9uLmlzRGVmYXVsdFNlbGVjdGlvbiAmJiAhdmFsdWUpIHx8XHJcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbiA9IGN1c3RvbU9wdGlvbkVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFzc2VtYmxlcyB0aGUgb3B0aW9uIHRleHQgdG8gYmUgZGlzcGxheWVkLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbiBUaGUgb3B0aW9uXHJcbiAgICAgKiBAcGFyYW0gZmlsdGVyRmllbGRUeXBlIFRoZSBmaWx0ZXIgdHlwZSB0aGlzIG9wdGlvbiBpcyBiZWluZyBhZGRlZCB0b1xyXG4gICAgICogQHJldHVybnMgVGhlIG5ldyBvcHRpb24gdGV4dFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJ1aWxkT3B0aW9uVGV4dChvcHRpb246IEZpbHRlck9wdGlvbiwgZmlsdGVyRmllbGRUeXBlOiBGaWx0ZXJUeXBlRW51bSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHRleHQ6IHN0cmluZztcclxuICAgICAgICBpZiAoIW9wdGlvbi50ZXh0KSB7XHJcbiAgICAgICAgICAgIHRleHQgPSB0aGlzLmdldFRleHQoYHNlYXJjaC5maWx0ZXJzLiR7ZmlsdGVyRmllbGRUeXBlfS5wbGFjZWhvbGRlcmAsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGV4dCA9IG9wdGlvbi50ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IG9wdGlvbiBhbmQgYWRkcyBpdCB0byBhIG5hdGl2ZSBhbmQgY3VzdG9tIGRyb3Bkb3duLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbiBUaGUgb3B0aW9uXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlSW5wdXRFbCBUaGUgbmF0aXZlIHNlbGVjdFxyXG4gICAgICogQHBhcmFtIGN1c3RvbUlucHV0T3B0aW9uc0VsIEEgZGl2IHRvIGNvbnRhaW4gdGhlIGN1c3RvbSBvcHRpb25zXHJcbiAgICAgKiBAcGFyYW0gaXNQYXJlbnQgV2hldGhlciBvciBub3QgdGhlIG9wdGlvbiBzaG91bGQgYmUgZGlzcGxheWVkIGFzIGEgcGFyZW50IChib2xkLCBldGMpXHJcbiAgICAgKiBAcGFyYW0gZmlsdGVyRmllbGRUeXBlIFRoZSBmaWx0ZXIgdHlwZVxyXG4gICAgICogQHBhcmFtIGN1cnJlbnRGaWx0ZXJWYWx1ZSBUaGUgYWN0aXZlL2N1cnJlbnQgZmlsdGVyIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyBUaGUgY3VzdG9tIG9wdGlvbiBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTmV3T3B0aW9uVG9JbnB1dHMob3B0aW9uOiBGaWx0ZXJPcHRpb24sXHJcbiAgICAgICAgbmF0aXZlSW5wdXRFbDogSFRNTFNlbGVjdEVsZW1lbnQsXHJcbiAgICAgICAgY3VzdG9tSW5wdXRPcHRpb25zRWw6IEhUTUxFbGVtZW50LFxyXG4gICAgICAgIGlzUGFyZW50OiBib29sZWFuLFxyXG4gICAgICAgIGZpbHRlckZpZWxkVHlwZTogRmlsdGVyVHlwZUVudW0sXHJcbiAgICAgICAgY3VycmVudEZpbHRlclZhbHVlOiBzdHJpbmcgfCBudWxsKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLmJ1aWxkT3B0aW9uVGV4dChvcHRpb24sIGZpbHRlckZpZWxkVHlwZSk7XHJcbiAgICAgICAgY29uc3QgbmF0aXZlT3B0aW9uRWwgPSBuZXcgT3B0aW9uKHRleHQsIG9wdGlvbi52YWx1ZSk7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tT3B0aW9uRWwgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzczogJ2NjLWN1c3RvbS1vcHRpb24gY2MtY2xpY2thYmxlJyxcclxuICAgICAgICAgICAgJ2RhdGEtdmFsdWUnOiBvcHRpb24udmFsdWVcclxuICAgICAgICB9LCB0ZXh0KTtcclxuXHJcbiAgICAgICAgaWYgKGlzUGFyZW50KSB7XHJcbiAgICAgICAgICAgIG5hdGl2ZU9wdGlvbkVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2Mtb3B0aW9uLXBhcmVudCcpO1xyXG4gICAgICAgICAgICBjdXN0b21PcHRpb25FbC5jbGFzc0xpc3QuYWRkKCdjYy1vcHRpb24tcGFyZW50Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3VycmVudEZpbHRlclZhbHVlID09PSBvcHRpb24udmFsdWUpIHtcclxuICAgICAgICAgICAgY3VzdG9tT3B0aW9uRWwuY2xhc3NMaXN0LmFkZCgnaXNBY3RpdmUnLCAnaXNIb3ZlcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmF0aXZlSW5wdXRFbC5vcHRpb25zLmFkZChuYXRpdmVPcHRpb25FbCk7XHJcbiAgICAgICAgY3VzdG9tSW5wdXRPcHRpb25zRWwuYXBwZW5kQ2hpbGQoY3VzdG9tT3B0aW9uRWwpO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VzdG9tT3B0aW9uRWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVucyB0aGUgcG9wdXAgd2l0aCBvcHRpb25zIHRvIHNlbGVjdCBmb3IgdGhlIGNob3NlbiBmaWx0ZXIuXHJcbiAgICAgKiBAcGFyYW0gY3VycmVudFRhcmdldCAtIFRoZSBmaWx0ZXIgdGhhdCB3YXMgY2xpY2tlZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVUb2dnbGVDdXN0b21TZWxlY3QoY3VycmVudFRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY3VycmVudFRhcmdldCA9PSBudWxsIHx8ICEoY3VycmVudFRhcmdldCBpbnN0YW5jZW9mIChIVE1MRWxlbWVudCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50VGFyZ2V0ICE9PSB0aGlzLm9wZW5DdXN0b21TZWxlY3QpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZUN1c3RvbVNlbGVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaXNBY3RpdmUnKTtcclxuXHJcbiAgICAgICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VDdXN0b21TZWxlY3QoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2lzQWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5DdXN0b21TZWxlY3QgPSBjdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcGVuQ3VzdG9tU2VsZWN0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NjLWN1c3RvbS1zZWxlY3Qtb3B0aW9ucycpWzBdO1xyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVPcHRpb24gPSBvcHRpb25zLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2lzQWN0aXZlJylbMF07XHJcbiAgICAgICAgICAgIGFjdGl2ZU9wdGlvbi5jbGFzc0xpc3QuYWRkKCdpc0hvdmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgbmV3IHNlbGVjdGVkIG9wdGlvbiBpbiB0aGUgZHJvcGRvd24uXHJcbiAgICAgKiBAcGFyYW0gY3VycmVudFRhcmdldCAtIFRoZSBzZWxlY3RlZCBvcHRpb24uXHJcbiAgICAgKiBAcGFyYW0gZmlsdGVyIC0gVGhlIHJlbGF0ZWQgZHJvcGRvd24gZmlsdGVyIGVsZW1lbnQgb3IgbmFtZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVTZWxlY3RDdXN0b21PcHRpb24oY3VycmVudFRhcmdldDogRWxlbWVudCwgZmlsdGVyPzogc3RyaW5nIHwgSFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpID8/ICcnO1xyXG4gICAgICAgIGZpbHRlciA9IGZpbHRlciA/IGZpbHRlciA6IHRoaXMub3BlbkN1c3RvbVNlbGVjdD8uZ2V0QXR0cmlidXRlKCduYW1lJykgPz8gJyc7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJWYWx1ZSh2YWx1ZSwgZmlsdGVyKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBhY3RpdmUgb3B0aW9uXHJcbiAgICAgICAgY29uc3QgZmlsdGVyTmFtZSA9IHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnID8gZmlsdGVyIDogZmlsdGVyLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICAgIGNvbnN0IGN1c3RvbUZpbHRlciA9IHRoaXMuY3VzdG9tRmlsdGVycy5maW5kKGYgPT4gZi5nZXRBdHRyaWJ1dGUoJ25hbWUnKSA9PSBmaWx0ZXJOYW1lKTtcclxuICAgICAgICBpZiAoIWN1c3RvbUZpbHRlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZpc2libHkgYWN0aXZlIG9wdGlvbiBpbiB0aGUgZHJvcGRvd24gbGlzdFxyXG4gICAgICAgIGNvbnN0IG9sZEFjdGl2ZU9wdGlvbiA9IGN1c3RvbUZpbHRlci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpc0FjdGl2ZScpWzBdO1xyXG4gICAgICAgIG9sZEFjdGl2ZU9wdGlvbj8uY2xhc3NMaXN0LnJlbW92ZSgnaXNBY3RpdmUnLCAnaXNIb3ZlcicpO1xyXG4gICAgICAgIGN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnaXNBY3RpdmUnLCAnaXNIb3ZlcicpO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIHNwYW5cclxuICAgICAgICBjb25zdCBzcGFuID0gY3VzdG9tRmlsdGVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NjLWN1c3RvbS1zcGFuJylbMF07XHJcbiAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSBjdXJyZW50VGFyZ2V0LmlubmVySFRNTDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlcyBhbnkgb3BlbiBjdXN0b20gc2VsZWN0IGRyb3Bkb3duLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsb3NlQ3VzdG9tU2VsZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9wZW5DdXN0b21TZWxlY3QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5DdXN0b21TZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnaXNBY3RpdmUnKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuQ3VzdG9tU2VsZWN0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5DdXN0b21TZWxlY3QuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaXNIb3ZlcicpWzBdPy5jbGFzc0xpc3QucmVtb3ZlKCdpc0hvdmVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkN1c3RvbVNlbGVjdCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIFBvc3RhbCBDb2RlIEdyb3VwIElucHV0XHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudENvbnRhaW5lciAtIHRoZSBjb250YWluZXIgdG8gYXBwZW5kIHRoZSBpbnB1dCB0b1xyXG4gICAgICogQHBhcmFtIHBvc3RhbENvZGVWYWx1ZSAtIHRoZSBjdXJyZW50IHZhbHVlIGZvciBwb3N0YWwgY29kZVxyXG4gICAgICogQHBhcmFtIGRpc3RhbmNlVmFsdWUgLSB0aGUgY3VycmVudCB2YWx1ZSBmb3IgZGlzdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW5kZXJQb3N0YWxDb2RlSW5wdXRHcm91cChlbGVtZW50Q29udGFpbmVyOiBIVE1MRWxlbWVudCwgcG9zdGFsQ29kZVZhbHVlOiBzdHJpbmcgfCBudWxsLCBkaXN0YW5jZVZhbHVlOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcG9zdGFsQ29kZVRleHRJbnB1dCA9IGNyZWF0ZUh0bWxFbGVtZW50KCdpbnB1dCcsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgIGlkOiAnY2MtZmlsdGVyLXBvc3RhbGNvZGUtaW5wdXQtaWQnLFxyXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1maWx0ZXItcG9zdGFsY29kZS1pbnB1dCcsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBGaWx0ZXJUeXBlRW51bS5wb3N0YWxDb2RlLFxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMuZ2V0VGV4dCgnc2VhcmNoLmZpbHRlcnMucG9zdGFsQ29kZS5wbGFjZWhvbGRlcicsIHVuZGVmaW5lZCksXHJcbiAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6IHRoaXMuZ2V0VGV4dCgnc2VhcmNoLmZpbHRlcnMucG9zdGFsQ29kZS5sYWJlbCcsIHVuZGVmaW5lZClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzLnB1c2gocG9zdGFsQ29kZVRleHRJbnB1dCk7XHJcblxyXG4gICAgICAgIGlmIChwb3N0YWxDb2RlVmFsdWUpIHtcclxuICAgICAgICAgICAgcG9zdGFsQ29kZVRleHRJbnB1dC52YWx1ZSA9IHBvc3RhbENvZGVWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0R3JvdXBDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1maWx0ZXItcG9zdGFsLWNvZGUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBvc3RhbENvZGVUZXh0SW5wdXQpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckRyb3Bkb3duRmlsdGVyKEZpbHRlclR5cGVFbnVtLmRpc3RhbmNlLCBpbnB1dEdyb3VwQ29udGFpbmVyLCBkaXN0YW5jZVZhbHVlKTtcclxuXHJcbiAgICAgICAgZWxlbWVudENvbnRhaW5lci5hcHBlbmQoaW5wdXRHcm91cENvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgc3VibWl0IGFuZCByZXNldCBidXR0b25zXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudENvbnRhaW5lciAtIHRoZSBjb250YWluZXIgdG8gYXBwZW5kIHRoZSBpbnB1dCB0b1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlclN1Ym1pdFJlc2V0QnV0dG9ucyhlbGVtZW50Q29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbkNvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ2NjLXNlYXJjaC1idXR0b24tY29udGFpbmVyJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjcmVhdGVIdG1sRWxlbWVudCgnYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ2NjLXN1Ym1pdC1zZWFyY2gtYnV0dG9uLWlkJyxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2NjLXN1Ym1pdC1zZWFyY2gtYnV0dG9uIGNjLWNsaWNrYWJsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N1Ym1pdCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRleHQoJ3NlYXJjaC5zZWFyY2gtYnV0dG9uJywgdW5kZWZpbmVkKSksXHJcbiAgICAgICAgICAgIGNyZWF0ZUh0bWxFbGVtZW50KCdidXR0b24nLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnY2MtcmVzZXQtc2VhcmNoLWJ1dHRvbi1pZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1yZXNldC1zZWFyY2gtYnV0dG9uIGNjLWNsaWNrYWJsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRleHQoJ3NlYXJjaC5yZXNldC1idXR0b24nLCB1bmRlZmluZWQpKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZWxlbWVudENvbnRhaW5lci5hcHBlbmQoYnV0dG9uQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBBcHBsaWVzIGEgdmFsdWUgdG8gYSBmaWx0ZXIgaW5wdXQuXHJcbiAgICAgKiAgQHBhcmFtIHZhbHVlIC0gdGhlIG5ldyBmaWx0ZXIgdmFsdWVcclxuICAgICAqICBAcGFyYW0gZmlsdGVyIC0gdGhlIG5hbWUgb2YgdGhlIGZpbHRlciBlbGVtZW50XHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVGaWx0ZXJWYWx1ZSh2YWx1ZTogc3RyaW5nLCBmaWx0ZXI6IHN0cmluZyB8IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGh0bWxFbGVtZW50ID0gdHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZydcclxuICAgICAgICAgICAgPyBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShmaWx0ZXIpWzBdXHJcbiAgICAgICAgICAgIDogZmlsdGVyO1xyXG5cclxuICAgICAgICBpZiAoaHRtbEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8IGh0bWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGh0bWxFbGVtZW50IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRvIG1ha2Ugc3VyZSB0aGUgdmFsdWUgaXMgaW4gdGhlIG9wdGlvbnMgaWYgaXQncyBhIHNlbGVjdFxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkT3B0aW9uKGh0bWxFbGVtZW50LCB2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCdzIG5vdCwgdGhlbiBqdXN0IGdyYWIgdGhlIGZpcnN0IHZhbHVlIGFuZCB3ZSdsbCB1c2UgaXRcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGh0bWxFbGVtZW50Lm9wdGlvbnNbMF0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaHRtbEVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIFJlbmRlciB0aGUgam9iIHBvcnRhbCBsaW5rXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVySm9iUG9ydGFsTGluaygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBqb2JQb3J0YWxUZXh0ID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3NwYW4nLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2NjLWpvYi1wb3J0YWwtbGluay10ZXh0LWlkJyxcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAnY2Mtam9iLXBvcnRhbC1saW5rLXRleHQnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBqb2JQb3J0YWxUZXh0LmlubmVySFRNTCA9IHRoaXMuZ2V0VGV4dCgnam9iLXBvcnRhbC10ZXh0JywgdGhpcy5zZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIHRoaXMuam9iUG9ydGFsTGlua0NvbnRhaW5lci5hcHBlbmQoam9iUG9ydGFsVGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIHNoYXJpbmcgc2VjdGlvbi5cclxuICAgICAqIEBwYXJhbSBjb250YWluZXIgLSB0aGUgY29udGFpbmVyIGVsZW1lbnQgaW4gd2hpY2ggdG8gcmVuZGVyIHRoZSBzZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2hhcmluZ09wdGlvbnNTZXR0aW5nTGlzdCAtIHRoZSBzaGFyaW5nIG9wdGlvbnMgdG8gcmVuZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyU2hhcmVTZWN0aW9uKGNvbnRhaW5lcjogRWxlbWVudCwgc2hhcmluZ09wdGlvbnNTZXR0aW5nTGlzdDogU2hhcmluZ09wdGlvblR5cGVFbnVtW10pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgY29uc3Qgc2hhcmVUZXh0ID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3NwYW4nLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2NjLXNoYXJlLWhlYWRlci1pZCcsXHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ2NjLXNoYXJlLWhlYWRlci10ZXh0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGlzLmdldFRleHQoJ3NoYXJlLmhlYWRpbmcudGV4dCcsIHVuZGVmaW5lZCkpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kKHNoYXJlVGV4dCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyU2hhcmVCdXR0b25zKGNvbnRhaW5lciwgc2hhcmluZ09wdGlvbnNTZXR0aW5nTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgc2hhcmluZyBidXR0b25zLlxyXG4gICAgICogRmFjZWJvb2ssIFR3aXR0ZXIsIExpbmtlZEluLCBhbmQgQ29weSBVUkxcclxuICAgICAqIEBwYXJhbSBjb250YWluZXIgLSB0aGUgY29udGFpbmVyIGVsZW1lbnQgaW4gd2hpY2ggdG8gcmVuZGVyIHRoZSBzZWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2hhcmluZ09wdGlvbnNTZXR0aW5nTGlzdCAtIHRoZSBzaGFyaW5nIG9wdGlvbnMgdG8gcmVuZGVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVuZGVyU2hhcmVCdXR0b25zKGNvbnRhaW5lcjogRWxlbWVudCwgc2hhcmluZ09wdGlvbnNTZXR0aW5nTGlzdDogU2hhcmluZ09wdGlvblR5cGVFbnVtW10pOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgaWYgKHNoYXJpbmdPcHRpb25zU2V0dGluZ0xpc3QuaW5jbHVkZXMoU2hhcmluZ09wdGlvblR5cGVFbnVtLmZhY2Vib29rKSkge1xyXG4gICAgICAgICAgICAvLyBmYiBzaGFyZSBidXR0b24vZGlhbG9nXHJcbiAgICAgICAgICAgIGNvbnN0IGZiU2hhcmVVcmwgPSBuZXcgVVJMKCdodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIucGhwJyk7XHJcbiAgICAgICAgICAgIGZiU2hhcmVVcmwuc2VhcmNoUGFyYW1zLnNldCgndScsIHVybCk7XHJcbiAgICAgICAgICAgIGZiU2hhcmVVcmwuc2VhcmNoUGFyYW1zLnNldCgnXycsIERhdGUubm93KCkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmYkxvZ28gPSBjcmVhdGVIdG1sRWxlbWVudCgnaW1nJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ2NjLWZhY2Vib29rLWxvZ28taWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY2Mtc2hhcmUtbG9nbycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLmdldFRleHQoJ3NoYXJlLmZhY2Vib29rLnRleHQnLCB1bmRlZmluZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogJyRwcm9jZXNzLmVudi5DYXJlZXJTaXRlU3RhdGljQ29udGVudFVybC9pbWFnZXMvZmFjZWJvb2stc3F1YXJlLnN2ZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuZ2V0VGV4dCgnc2hhcmUuZmFjZWJvb2sudGV4dCcsIHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZmJMaW5rID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2EnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnY2MtZmFjZWJvb2stbGluay1pZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1zaGFyZS1saW5rJyxcclxuICAgICAgICAgICAgICAgICAgICBocmVmOiBmYlNoYXJlVXJsLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsOiAnbm9vcGVuZXIgZXh0ZXJuYWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogJ19ibGFuaydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYkxvZ28pO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZChmYkxpbmspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNoYXJpbmdPcHRpb25zU2V0dGluZ0xpc3QuaW5jbHVkZXMoU2hhcmluZ09wdGlvblR5cGVFbnVtLnR3aXR0ZXIpKSB7XHJcbiAgICAgICAgICAgIC8vIHR3aXR0ZXIgc2hhcmUgYnV0dG9uL2RpYWxvZ1xyXG4gICAgICAgICAgICBjb25zdCB0d2l0dGVySW50ZW50VXJsID0gbmV3IFVSTCgnaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQnKTtcclxuICAgICAgICAgICAgdHdpdHRlckludGVudFVybC5zZWFyY2hQYXJhbXMuc2V0KCd1cmwnLCB1cmwpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdHdpdHRlckxvZ28gPSBjcmVhdGVIdG1sRWxlbWVudCgnaW1nJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ2NjLXR3aXR0ZXItbG9nby1pZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1zaGFyZS1sb2dvJyxcclxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6IHRoaXMuZ2V0VGV4dCgnc2hhcmUueC50ZXh0JywgdW5kZWZpbmVkKSxcclxuICAgICAgICAgICAgICAgICAgICBzcmM6ICckcHJvY2Vzcy5lbnYuQ2FyZWVyU2l0ZVN0YXRpY0NvbnRlbnRVcmwvaW1hZ2VzL3gtc3F1YXJlLnN2ZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuZ2V0VGV4dCgnc2hhcmUueC50ZXh0JywgdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0d2l0dGVyTGluayA9IGNyZWF0ZUh0bWxFbGVtZW50KCdhJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ2NjLXR3aXR0ZXItbGluay1pZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1zaGFyZS1saW5rJyxcclxuICAgICAgICAgICAgICAgICAgICBocmVmOiB0d2l0dGVySW50ZW50VXJsLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsOiAnbm9vcGVuZXIgZXh0ZXJuYWwnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogJ19ibGFuaydcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0d2l0dGVyTG9nbyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKHR3aXR0ZXJMaW5rKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaGFyaW5nT3B0aW9uc1NldHRpbmdMaXN0LmluY2x1ZGVzKFNoYXJpbmdPcHRpb25UeXBlRW51bS5saW5rZWRpbikpIHtcclxuICAgICAgICAgICAgLy8gTGlua2VkSW4gc2hhcmUgYnV0dG9uL2RpYWxvZ1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rZWRJblNoYXJlVXJsID0gbmV3IFVSTCgnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3NoYXJpbmcvc2hhcmUtb2Zmc2l0ZScpO1xyXG4gICAgICAgICAgICBsaW5rZWRJblNoYXJlVXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3VybCcsIHVybCk7XHJcbiAgICAgICAgICAgIGxpbmtlZEluU2hhcmVVcmwuc2VhcmNoUGFyYW1zLnNldCgnXycsIERhdGUubm93KCkudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsaW5rZWRJbkxvZ28gPSBjcmVhdGVIdG1sRWxlbWVudCgnaW1nJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ2NjLWxpbmtlZGluLWxvZ28taWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY2Mtc2hhcmUtbG9nbycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLmdldFRleHQoJ3NoYXJlLmxpbmtlZGluLnRleHQnLCB1bmRlZmluZWQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNyYzogJyRwcm9jZXNzLmVudi5DYXJlZXJTaXRlU3RhdGljQ29udGVudFVybC9pbWFnZXMvbGlua2VkaW4uc3ZnJyxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5nZXRUZXh0KCdzaGFyZS5saW5rZWRpbi50ZXh0JywgdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsaW5rZWRJbkxpbmsgPSBjcmVhdGVIdG1sRWxlbWVudCgnYScsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdjYy1saW5rZWRJbi1saW5rLWlkJyxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2NjLXNoYXJlLWxpbmsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhyZWY6IGxpbmtlZEluU2hhcmVVcmwudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICByZWw6ICdub29wZW5lciBleHRlcm5hbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiAnX2JsYW5rJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxpbmtlZEluTG9nbyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKGxpbmtlZEluTGluayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5jbGlwYm9hcmQgJiYgc2hhcmluZ09wdGlvbnNTZXR0aW5nTGlzdC5pbmNsdWRlcyhTaGFyaW5nT3B0aW9uVHlwZUVudW0uc2hhcmFibGVMaW5rKSkge1xyXG4gICAgICAgICAgICAvLyBjb3B5IHVybCBidXR0b25cclxuICAgICAgICAgICAgY29uc3QgY29weVVybExvZ28gPSBjcmVhdGVIdG1sRWxlbWVudCgnaW1nJyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ2NjLWNvcHktdXJsLWxvZ28taWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY2Mtc2hhcmUtbG9nbycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLmdldFRleHQoJ3NoYXJlLmNvcHkudGV4dCcsIHVuZGVmaW5lZCksXHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiAnJHByb2Nlc3MuZW52LkNhcmVlclNpdGVTdGF0aWNDb250ZW50VXJsL2ltYWdlcy9jb3B5LXNvbGlkLnN2ZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuZ2V0VGV4dCgnc2hhcmUuY29weS50ZXh0JywgdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvcHlVcmxTdWNjZXNzID0gY3JlYXRlSHRtbEVsZW1lbnQoJ3NwYW4nLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY29waWVkLW1lc3NhZ2UgY2MtaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRUZXh0KCdzaGFyZS5jb3B5LnRleHQuc3VjY2VzcycsIHVuZGVmaW5lZCkpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY29weVVybEJ0biA9IGNyZWF0ZUh0bWxFbGVtZW50KCdidXR0b24nLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnY2MtY29weS11cmwtbGluay1pZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1jb3B5LWJ0biBjYy1jbGlja2FibGUnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29weVVybExvZ28sXHJcbiAgICAgICAgICAgICAgICBjb3B5VXJsU3VjY2Vzcyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKGNvcHlVcmxCdG4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZldGNoZXMgdGhlIGF2YWlsYWJsZSBqb2JzIGFuZCByZW5kZXJzXHJcbiAgICAgKiB0aGUgam9iIGxpc3QgYWNjb3JkaW5nIHRvIHNldHRpbmdzXHJcbiAgICAgKiBAcGFyYW0gcGFnZU51bWJlciBUaGUgMC1iYXNlZCBwYWdlIG51bWJlciBvZiByZXN1bHRzIHRvIGxvYWQuXHJcbiAgICAgKiBAcGFyYW0gdXBkYXRlQnJvd3NlclN0YXRlIGEgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgd2Ugc2hvdWxkIHVwZGF0ZSB0aGUgYnJvd3NlciBoaXN0b3J5IGFzIHBhcnQgb2YgdGhlIGxvYWRpbmcgcHJvY2Vzc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGxvYWRKb2JzKHBhZ2VOdW1iZXI6IG51bWJlciwgdXBkYXRlQnJvd3NlclN0YXRlOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VOdW1iZXIgPSBwYWdlTnVtYmVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKHVwZGF0ZUJyb3dzZXJTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IGZpbHRlciBzdGF0ZSBmcm9tIHRoZSBjdXJyZW50IGZpbHRlciB2YWx1ZXNcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbHRlclN0YXRlOiBQYXJ0aWFsPEZpbHRlclN0YXRlPiA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IGNvbnN0cnVjdGluZyB0aGUgVVJMIHRvIHB1dCBpbiB0aGUgaGlzdG9yeVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYnJvd3NlclVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBmaWx0ZXIgb2YgdGhpcy5maWx0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsdGVyVHlwZSA9IGZpbHRlci5uYW1lIGFzIEZpbHRlclR5cGVFbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QudmFsdWVzKEZpbHRlclR5cGVFbnVtKS5pbmNsdWRlcyhmaWx0ZXJUeXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdGF0ZVtmaWx0ZXJUeXBlXSA9IGZpbHRlci52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXJVcmwuc2VhcmNoUGFyYW1zLnNldChmaWx0ZXJUeXBlLCBmaWx0ZXIudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3NlclVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKGZpbHRlclR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRpc3RhbmNlIG5lZWRzIHRvIGJlIGhhbmRsZWQgZGlmZmVyZW50bHkgYmVjYXVzZSB3ZSBvbmx5IHdhbnQgdG8gcHV0IGl0IGluIHRoZSBVUkwgaWYgYm90aCBwYXJ0cyBhcmUgc2V0XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyU3RhdGVbRmlsdGVyVHlwZUVudW0uZGlzdGFuY2VdICYmICFmaWx0ZXJTdGF0ZVtGaWx0ZXJUeXBlRW51bS5wb3N0YWxDb2RlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXJVcmwuc2VhcmNoUGFyYW1zLmRlbGV0ZShGaWx0ZXJUeXBlRW51bS5kaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgd2UncmUgcGFzdCB0aGUgZmlyc3QgcGFnZSwgYWRkIHRoZSBwYWdlIHRvIHRoZSBxdWVyeSBwYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHJlbW92ZSB0aGUgcGFnZSBwYXJhbWV0ZXIgdG8gcHJldmVudCBpbmNvcnJlY3QgcmVzdWx0cyB3aGVuIHJlZnJlc2hpbmcgYWZ0ZXIgZmlsdGVyaW5nXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZU51bWJlciA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBicm93c2VyVXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3AnLCAodGhpcy5jdXJyZW50UGFnZU51bWJlcikudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyb3dzZXJVcmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgncCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQudGl0bGU7IC8vIHRoaXMgaXMgdW51c2VkIGJ5IG1vc3QgYnJvd3NlcnNcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShmaWx0ZXJTdGF0ZSwgdGl0bGUsIGJyb3dzZXJVcmwpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2hhcmVNZXRhVGFncygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTaGFyZU1ldGFUYWdzKCdDYXJlZXJzJywgd2luZG93LmxvY2F0aW9uLmhyZWYudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnN0cnVjdCB0aGUgYmFzZSB1cmwgZm9yIHRoZSByZXF1ZXN0XHJcbiAgICAgICAgICAgIC8vIG5vdGUgdGhhdCB0aGUgQVBJIGlzIHVzaW5nIGEgMC1iYXNlZCBpbmRleCBmb3IgcGFnaW5nLCB3aGlsZSB0aGUgYnJvd3NlciBpcyB1c2luZyBhIDEtYmFzZWQgaW5kZXggYmVjYXVzZSBpdCdzIG1vcmUgdXNlci1mcmllbmRseVxyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0UGFyYW1zOiBEaWN0aW9uYXJ5PGFueT4gPSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlSW5kZXg6IHRoaXMuY3VycmVudFBhZ2VOdW1iZXIgLSAxLFxyXG4gICAgICAgICAgICAgICAgcGFnZVNpemU6IHRoaXMuc2V0dGluZ3MucGFnZVNpemUsXHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgdGhlIGZpbHRlciBwYXJhbWV0ZXJzXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3QudmFsdWVzKEZpbHRlclR5cGVFbnVtKS5pbmNsdWRlcyhrZXkgYXMgRmlsdGVyVHlwZUVudW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhcmFtc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBjdXJyZW50IGpvYnMgY29udGFpbmVyXHJcbiAgICAgICAgICAgIC8vIFRPRE8gLSB1c2luZyBjbG9uZU5vZGUgd2lsbCBjbGVhciBhbGwgZXZlbnRzIGZyb20gZWxlbWVudCBhbmQgY2hpbGQgZWxlbWVudHNcclxuICAgICAgICAgICAgdGhpcy5qb2JzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50b2dnbGVFbGVtZW50KHRoaXMuc2tlbGV0b25Db250YWluZXIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVxdWVzdCB0byB0aGUgYXBpXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmRhdGFTZXJ2aWNlLmdldEpvYnModGhpcy5zaXRlSWQsIHJlcXVlc3RQYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVuZGVyIHRoZSBuZXcgZGF0YVxyXG4gICAgICAgICAgICB0aGlzLmpvYk1vZGVscyA9IGRhdGEucmVzdWx0cyBhcyBKb2JNb2RlbFtdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuam9iTW9kZWxzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnJlcXVpc2l0aW9uTGlzdC5sYXlvdXRUeXBlID09PSAnbGlzdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckpvYnNMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySm9ic1RpbGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJMaXN0UGFnaW5hdGlvbihkYXRhLnRvdGFsQ291bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuam9iUG9ydGFsTGlua0NvbnRhaW5lci5zY3JvbGxJbnRvVmlldyh0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyRW1wdHlTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUVsZW1lbnQodGhpcy5za2VsZXRvbkNvbnRhaW5lciwgZmFsc2UpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgIC8vIGlmIGxvYWRpbmcgam9icyBmcm9tIGFwaSByZXR1cm5zIGFuIGVycm9yLCBkaXNwbGF5IHRoZSBsb2FkIGVycm9yLlxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckxvYWRKb2JzRXJyb3IoZXggYXMgRXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIGpvYiBsaXN0IGVtcHR5IHN0YXRlIGJhc2VkIG9mZiBpZiBhbnkgZmlsdGVycyBhcmUgYXBwbGllZFxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgcmVuZGVyRW1wdHlTdGF0ZSgpIHtcclxuICAgICAgICBsZXQgZW1wdHlTdGF0ZVRleHQ6IHN0cmluZyA9ICcnO1xyXG5cclxuICAgICAgICAvLyBjaGVjayB0aGUgaGlzdG9yeSBzdGF0ZSBmb3IgYW55IHNlYXJjaCBmaWx0ZXJzXHJcbiAgICAgICAgLy8gdGhhdCBoYXZlIGJlZW4gcHVzaGVkXHJcbiAgICAgICAgaWYgKHdpbmRvdy5oaXN0b3J5LnN0YXRlICYmIE9iamVjdC5rZXlzKHdpbmRvdy5oaXN0b3J5LnN0YXRlKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGVtcHR5U3RhdGVUZXh0ID0gdGhpcy5nZXRUZXh0KCdzZWFyY2gucmVzdWx0cy5lbXB0eS1zdGF0ZS5maWx0ZXJzLWFwcGxpZWQnLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVtcHR5U3RhdGVUZXh0ID0gdGhpcy5nZXRUZXh0KCdzZWFyY2gucmVzdWx0cy5lbXB0eS1zdGF0ZS5uby1maWx0ZXJzLWFwcGxpZWQnLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZW1wdHlTdGF0ZU1lc3NhZ2UgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JyxcclxuICAgICAgICAgICAgeyBjbGFzczogJ2NjLWVtcHR5LXN0YXRlLW1lc3NhZ2UnIH0sXHJcbiAgICAgICAgICAgIGVtcHR5U3RhdGVUZXh0XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmpvYnNDb250YWluZXIuYXBwZW5kKGVtcHR5U3RhdGVNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIGpvYnMgaW4gYSBsaXN0IGZvcm1hdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlckpvYnNMaXN0KCkge1xyXG4gICAgICAgIC8vIHJlbmRlciB0aGUgZmlyc3QgZGVwYXJ0bWVudCBjb250YWluZXJcclxuICAgICAgICBsZXQgY3VycmVudERlcGFydG1lbnRJZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBkZXBhcnRtZW50Q29udGFpbmVyOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuam9iTW9kZWxzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdXNpbmcgZm9yRWFjaCBpbnN0ZWFkIG9mIG1hcCBiZWNhdXNlIG9mIHRoZSBkZXBhcnRtZW50IGVsZW1lbnQgbG9naWMuXHJcbiAgICAgICAgdGhpcy5qb2JNb2RlbHMuZm9yRWFjaChqb2IgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5yZXF1aXNpdGlvbkxpc3QuZ3JvdXBCeUZpZWxkID09IEZpZWxkVHlwZUVudW0uZGVwYXJ0bWVudE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqb2IuZGVwYXJ0bWVudElkICE9PSBjdXJyZW50RGVwYXJ0bWVudElkIHx8IGRlcGFydG1lbnRDb250YWluZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5ldyBkZXBhcnRtZW50LCBjcmVhdGUgYSBuZXcgZGVwYXJ0bWVudCBjb250YWluZXJcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RGVwYXJ0bWVudElkID0gam9iLmRlcGFydG1lbnRJZDtcclxuICAgICAgICAgICAgICAgICAgICBkZXBhcnRtZW50Q29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3M6ICdjYy1kZXBhcnRtZW50LWNvbnRhaW5lcicgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0YWdOYW1lOiAnZGl2JywgYXR0cmlidXRlczogeyBjbGFzczogJ2NjLWRlcGFydG1lbnQtbmFtZScgfSwgY2hpbGRyZW46IFtqb2IuZGVwYXJ0bWVudE5hbWVdIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmpvYnNDb250YWluZXIuYXBwZW5kKGRlcGFydG1lbnRDb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGpvYkNvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2Mtam9iLWNvbnRhaW5lcicgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckpvYkNvbnRlbnQoam9iLCBqb2JDb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlcGFydG1lbnRDb250YWluZXIuYXBwZW5kKGpvYkNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIGRlZmF1bHQgc29ydCBmcm9tIEFQSVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgam9iQ29udGFpbmVyID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsIHsgY2xhc3M6ICdjYy1qb2ItY29udGFpbmVyJyB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySm9iQ29udGVudChqb2IsIGpvYkNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpvYnNDb250YWluZXIuYXBwZW5kKGpvYkNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgdGhlIGpvYnMgaW4gYSB0aWxlIGZvcm1hdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbmRlckpvYnNUaWxlcygpIHtcclxuICAgICAgICBpZiAodGhpcy5qb2JNb2RlbHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBqb2JJdGVtRWxlbWVudHMgPSB0aGlzLmpvYk1vZGVscy5tYXAoam9iID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudENvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLCB7IGNsYXNzOiAnY2Mtam9iLXRpbGUtY29udGVudCcgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVySm9iQ29udGVudChqb2IsIGNvbnRlbnRDb250YWluZXIpO1xyXG4gICAgICAgICAgICBjb25zdCBqb2JDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2NjLWpvYi1jb250YWluZXItdGlsZSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjb250ZW50Q29udGFpbmVyXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gam9iQ29udGFpbmVyO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBqb2JMaXN0VGlsZXNDb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICBjbGFzczogJ2NjLWpvYi1saXN0LXRpbGVzLWNvbnRhaW5lcidcclxuICAgICAgICB9LCAuLi5qb2JJdGVtRWxlbWVudHMpO1xyXG5cclxuICAgICAgICB0aGlzLmpvYnNDb250YWluZXIuYXBwZW5kKGpvYkxpc3RUaWxlc0NvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIEpvYnMgTGlzdCBQYWdpbmF0aW9uXHJcbiAgICAgKiBAcGFyYW0gdG90YWxKb2JDb3VudCAtIHRvdGFsIGpvYnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW5kZXJMaXN0UGFnaW5hdGlvbih0b3RhbEpvYkNvdW50OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0b3RhbFBhZ2VDb3VudCA9IE1hdGguY2VpbCh0b3RhbEpvYkNvdW50IC8gdGhpcy5zZXR0aW5ncy5wYWdlU2l6ZSk7XHJcblxyXG4gICAgICAgIC8vIGJ1aWxkIHBhZ2luYXRpb24gY29udHJvbHNcclxuICAgICAgICB0aGlzLmJ1aWxkUGFnaW5hdGlvbkNvbnRyb2xzKHRvdGFsUGFnZUNvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkcyB0aGUgcGFnaW5hdGlvbiBjb250cm9sIGJhc2VkIG9uIHRoZSB0b3RhbCBwYWdlIGNvdW50IGF2YWlsYWJsZVxyXG4gICAgICogQHBhcmFtIHRvdGFsUGFnZUNvdW50IC0gcGFnZXMgb2YgZGF0YSBhdmFpbGFibGUsIG5hdHVyYWwgbnVtYmVyIGNvdW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYnVpbGRQYWdpbmF0aW9uQ29udHJvbHModG90YWxQYWdlQ291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0b3RhbFBhZ2VDb3VudCA8PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5jdXJyZW50UGFnZU51bWJlcjtcclxuXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbkNvbnRhaW5lciA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLFxyXG4gICAgICAgICAgICB7IGNsYXNzOiAnY2MtcGFnZS1jb250cm9scycgfSk7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50UGFnZSA+IDEgJiYgdG90YWxQYWdlQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnRBcnJvdyA9IGNyZWF0ZUh0bWxFbGVtZW50KCdidXR0b24nLCB7IGNsYXNzOiAnY2MtbGVmdC1jb250cm9sIGNjLXBhZ2UtY29udHJvbCBjYy1jbGlja2FibGUnLCAnZGF0YS1wYWdlJzogYCR7Y3VycmVudFBhZ2UgLSAxfWAgfSwgJzwnKTtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5hcHBlbmQobGVmdEFycm93KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSA2IG9yIGxlc3MgcGFnZXMgd2Ugd2lsbCBqdXN0IHJlbmRlciBhbGwgdGhlIHBhZ2Ugb3B0aW9ucyBpbiB0aGVpciBuYXR1cmFsXHJcbiAgICAgICAgLy8gbnVtYmVyIG9yZGVyXHJcbiAgICAgICAgaWYgKHRvdGFsUGFnZUNvdW50IDw9IDYpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdG90YWxQYWdlQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQYWdlTnVtYmVyQ29udHJvbChwYWdpbmF0aW9uQ29udGFpbmVyLCBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRoZXNlIGNvbnRyb2xzIGFyZSBidWlsdCBhc3N1bWluZyB0aGUgZm9sbG93aW5nXHJcbiAgICAgICAgICAgIC8vIFRoZXJlIGFyZSA3IDAtaW5kZXhlZCBwb3NpdGlvbnMgXyBfIF8gXyBfIF8gX1xyXG4gICAgICAgICAgICAvLyBwb3NpdGlvbiAwIHdpbGwgYWx3YXlzIHJlbmRlciB0aGUgZmlyc3QgcGFnZSBudW1iZXJcclxuICAgICAgICAgICAgLy8gcG9zaXRpb24gNiB3aWxsIGFsd2F5cyByZW5kZXIgdGhlIGxhc3QgcGFnZSBudW1iZXJcclxuICAgICAgICAgICAgLy8gdGhlIHJlbmRlciBwYXR0ZXJuIHdpbGwgYmU6XHJcbiAgICAgICAgICAgIC8vICBbZmlyc3QgcGFnZV1bZWxsaXBzaXNdW2N1cnJlbnRwYWdlLTFdW2N1cnJlbnQgcGFnZV1bY3VycmVudCBwYWdlICsgMV1bZWxsaXBzaXNdW2xhc3QgcGFnZV1cclxuICAgICAgICAgICAgLy8gVU5MRVNTXHJcbiAgICAgICAgICAgIC8vIC0tIDEuIFRoZSBjdXJyZW50IHBhZ2UgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIDQgLSBcImluIHRoZSBsb3dlciBib3VuZFwiXHJcbiAgICAgICAgICAgIC8vIC0tLS0tIEEuIEFzc3VtaW5nIGN1cnJlbnQgcGFnZSBpcyAyIC0tIFsxXVsyXVszXVs0XVs1XVsuLi5dW2xhc3QgcGFnZV1cclxuICAgICAgICAgICAgLy8gLS0gMi4gVGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgbGFzdCBhbmQgY3VycmVudCBwYWdlIGlzIGxlc3MgdGhhbiA0IC0gXCJpbiB0aGUgdXBwZXIgYm91bmRcIlxyXG4gICAgICAgICAgICAvLyAtLS0tLSBBLiBBc3N1bWluZyBjdXJyZW50IHBhZ2UgaXMgOCBhbmQgdG90YWwgaXMgMTAgLS0gWzFdWy4uLl1bNl1bN11bOF1bOV1bMTBdXHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbkxvd2VyQm91bmQgPSBjdXJyZW50UGFnZSA8PSA0O1xyXG4gICAgICAgICAgICBjb25zdCBpblVwcGVyQm91bmQgPSAodG90YWxQYWdlQ291bnQgLSBjdXJyZW50UGFnZSkgPD0gNDtcclxuXHJcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uIDAgd2lsbCBhbHdheXMgY29udGFpbiB0aGUgMXN0IHBhZ2VcclxuICAgICAgICAgICAgdGhpcy5hZGRQYWdlTnVtYmVyQ29udHJvbChwYWdpbmF0aW9uQ29udGFpbmVyLCAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uIDFcclxuICAgICAgICAgICAgaWYgKGluTG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQYWdlTnVtYmVyQ29udHJvbChwYWdpbmF0aW9uQ29udGFpbmVyLCAyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25Db250YWluZXIuYXBwZW5kKGNyZWF0ZUh0bWxFbGVtZW50KCdzcGFuJywgeyBjbGFzczogJ2NjLWVsbGlwc2lzJyB9LCAnLi4uJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBwb3NpdGlvbiAyXHJcbiAgICAgICAgICAgIGlmIChpbkxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUGFnZU51bWJlckNvbnRyb2wocGFnaW5hdGlvbkNvbnRhaW5lciwgMyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5VcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBhZ2VOdW1iZXJDb250cm9sKHBhZ2luYXRpb25Db250YWluZXIsIHRvdGFsUGFnZUNvdW50IC0gNCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBhZ2VOdW1iZXJDb250cm9sKHBhZ2luYXRpb25Db250YWluZXIsIGN1cnJlbnRQYWdlIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uIDNcclxuICAgICAgICAgICAgaWYgKGluTG93ZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQYWdlTnVtYmVyQ29udHJvbChwYWdpbmF0aW9uQ29udGFpbmVyLCA0KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpblVwcGVyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUGFnZU51bWJlckNvbnRyb2wocGFnaW5hdGlvbkNvbnRhaW5lciwgdG90YWxQYWdlQ291bnQgLSAzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUGFnZU51bWJlckNvbnRyb2wocGFnaW5hdGlvbkNvbnRhaW5lciwgY3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBwb3NpdGlvbiA0XHJcbiAgICAgICAgICAgIGlmIChpbkxvd2VyQm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUGFnZU51bWJlckNvbnRyb2wocGFnaW5hdGlvbkNvbnRhaW5lciwgNSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5VcHBlckJvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBhZ2VOdW1iZXJDb250cm9sKHBhZ2luYXRpb25Db250YWluZXIsIHRvdGFsUGFnZUNvdW50IC0gMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBhZ2VOdW1iZXJDb250cm9sKHBhZ2luYXRpb25Db250YWluZXIsIGN1cnJlbnRQYWdlICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uIDVcclxuICAgICAgICAgICAgaWYgKGluVXBwZXJCb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQYWdlTnVtYmVyQ29udHJvbChwYWdpbmF0aW9uQ29udGFpbmVyLCB0b3RhbFBhZ2VDb3VudCAtIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5hcHBlbmQoY3JlYXRlSHRtbEVsZW1lbnQoJ3NwYW4nLCB7IGNsYXNzOiAnY2MtZWxsaXBzaXMnIH0sICcuLi4nKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uIDYgd2lsbCBhbHdheXMgYmUgdGhlIGxhc3QgbnVtYmVyXHJcbiAgICAgICAgICAgIHRoaXMuYWRkUGFnZU51bWJlckNvbnRyb2wocGFnaW5hdGlvbkNvbnRhaW5lciwgdG90YWxQYWdlQ291bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRQYWdlIDwgdG90YWxQYWdlQ291bnQgJiYgdG90YWxQYWdlQ291bnQgPiAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0QXJyb3cgPSBjcmVhdGVIdG1sRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdjYy1yaWdodC1jb250cm9sIGNjLXBhZ2UtY29udHJvbCBjYy1jbGlja2FibGUnLCAnZGF0YS1wYWdlJzogYCR7Y3VycmVudFBhZ2UgKyAxfWBcclxuICAgICAgICAgICAgfSwgJz4nKTtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5hcHBlbmQocmlnaHRBcnJvdyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmpvYnNDb250YWluZXIuYXBwZW5kKHBhZ2luYXRpb25Db250YWluZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGUgcGFnZSBjb250cm9sIGJhc2VkIG9uIHRoZSBnaXZlbiBwYWdlIG51bWJlclxyXG4gICAgICogQHBhcmFtIGNvbnRhaW5lciAtIHRoZSBodG1sIGVsZW1lbnQgdG8gYXBwZW5kIHRoZSBjb250cm9sIHRvXHJcbiAgICAgKiBAcGFyYW0gcGFnZU51bWJlciAtIHRoZSBwYWdlIG51bWJlciB0aGUgY29udHJvbCByZXByZXNlbnRzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkUGFnZU51bWJlckNvbnRyb2woY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcGFnZU51bWJlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHBhZ2VOdW1iZXIgPT09IHRoaXMuY3VycmVudFBhZ2VOdW1iZXI7XHJcbiAgICAgICAgY29uc3QgY29udHJvbCA9IGNyZWF0ZUh0bWxFbGVtZW50KCdidXR0b24nLFxyXG4gICAgICAgICAgICB7IGNsYXNzOiAnY2MtcGFnZS1jb250cm9sIGNjLWNsaWNrYWJsZScsICdkYXRhLXBhZ2UnOiBgJHtwYWdlTnVtYmVyfWAgfSxcclxuICAgICAgICAgICAgYCR7cGFnZU51bWJlcn1gXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29udHJvbC5jbGFzc0xpc3QuYWRkKCdjYy1jdXJyZW50LXBhZ2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoY29udHJvbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHdoZW4gYSB1c2VyIGNsaWNrcyBvbiBhIHBhZ2UgY29udHJvbC9wYWdpbmF0aW9uIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSBjdXJyZW50VGFyZ2V0IC0gdGhlIHRhcmdldCBlbGVtZW50IGZvciB0aGUgY2xpY2sgZXZlbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVPbkNsaWNrUGFnZUNvbnRyb2woY3VycmVudFRhcmdldDogRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IGNob3NlblBhZ2UgPSBjdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlJyk7XHJcblxyXG4gICAgICAgIGlmIChjaG9zZW5QYWdlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuam9iUG9ydGFsTGlua0NvbnRhaW5lci5zY3JvbGxJbnRvVmlldyh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpvYnMoTnVtYmVyKGNob3NlblBhZ2UpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIHRoZSBqb2IgdGl0bGUgYW5kIHN1YnRpdGxlIGluZm9ybWF0aW9uIGluXHJcbiAgICAgKiB0aGUgZ2l2ZW4gY29udGFpbmVyXHJcbiAgICAgKiBAcGFyYW0gam9iIC0gbW9kZWwgcmVwcmVzZW50aW5nIHRoZSBnaXZlbiBqb2JcclxuICAgICAqIEBwYXJhbSBjb250YWluZXIgLSB0aGUgY29udGFpbmVyIHRvIHJlbmRlciB0aGUgaW5mb3JtYXRpb24gaW5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZW5kZXJKb2JDb250ZW50KGpvYjogSm9iTW9kZWwsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAvLyBzdGFydCB3aXRoIHRoZSBjdXJyZW50IHVybFxyXG4gICAgICAgIGNvbnN0IGpvYlVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgYW55IGZpbHRlciBwYXJhbWV0ZXJzXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2Ygam9iVXJsLnNlYXJjaFBhcmFtcy5rZXlzKCkpIHtcclxuICAgICAgICAgICAgaWYgKE9iamVjdC52YWx1ZXMoRmlsdGVyVHlwZUVudW0pLmluY2x1ZGVzKGtleSBhcyBGaWx0ZXJUeXBlRW51bSkpIHtcclxuICAgICAgICAgICAgICAgIGpvYlVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBwYWdpbmcgcGFyYW1ldGVyXHJcbiAgICAgICAgam9iVXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoJ3AnKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBqb2IgaWRcclxuICAgICAgICBqb2JVcmwuc2VhcmNoUGFyYW1zLnNldCgnam9iSWQnLCBqb2IuaWQpO1xyXG5cclxuICAgICAgICAvLyB0b1N0cmluZygpIGl0IHNpbmNlIHdlIG5lZWQgaXQgdHdpY2VcclxuICAgICAgICBjb25zdCBocmVmID0gam9iVXJsLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGpvYlRpdGxlID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2EnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogJ2NjLWpvYi10aXRsZSBjYy1jbGlja2FibGUnLFxyXG4gICAgICAgICAgICAgICAgJ2RhdGEtaWQnOiBqb2IuaWQsXHJcbiAgICAgICAgICAgICAgICBocmVmOiBocmVmXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGpvYi5wb3NpdGlvblRpdGxlKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZChqb2JUaXRsZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzTG9jYXRpb25WaXNpYmxlID0gdGhpcy5zZXR0aW5ncy5yZXF1aXNpdGlvbkxpc3QuZGlzcGxheUZpZWxkcy5pbmNsdWRlcyhGaWVsZFR5cGVFbnVtLmxvY2F0aW9uKTtcclxuICAgICAgICBjb25zdCBpc0RhdGVQb3N0ZWRWaXNpYmxlID0gdGhpcy5zZXR0aW5ncy5yZXF1aXNpdGlvbkxpc3QuZGlzcGxheUZpZWxkcy5pbmNsdWRlcyhGaWVsZFR5cGVFbnVtLmRhdGVQb3N0ZWQpO1xyXG5cclxuICAgICAgICBpZiAoaXNMb2NhdGlvblZpc2libGUgfHwgaXNEYXRlUG9zdGVkVmlzaWJsZSkge1xyXG4gICAgICAgICAgICBjb25zdCBqb2JMYWJlbCA9IHRoaXMuZ2V0Sm9iTGlzdFNlY29uZGFyeUxhYmVsKGpvYiwgJ2NjLXNlY29uZGFyeS1sYWJlbCcsIGlzTG9jYXRpb25WaXNpYmxlLCBpc0RhdGVQb3N0ZWRWaXNpYmxlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoam9iTGFiZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGxhYmVsIHRleHQgY29udGFpbmluZyB0aGUgam9iIGxvY2F0aW9uIGFuZC9vciB3aGVuIGl0IHdhcyBwb3N0ZWRcclxuICAgICAqIEBwYXJhbSBqb2IgVGhlIGpvYiBtb2RlbCB0byB1c2UuXHJcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lIFRoZSBjbGFzc25hbWUgZm9yIHRoZSBjb250YWluaW5nIGRpdlxyXG4gICAgICogQHBhcmFtIGlzTG9jYXRpb25WaXNpYmxlIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgam9iIGxvY2F0aW9uIHNob3VsZCBiZSBpbmNsdWRlZC5cclxuICAgICAqIEBwYXJhbSBpc0RhdGVQb3N0ZWRWaXNpYmxlIEZsYXQgaW5kaWNhdGluZyBpZiB0aGUgam9iIHBvc3RpbmcgZGF0ZSBzaG91bGQgYmUgaW5jbHVkZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnRbXX0gVGhlIGxhYmVsIGNvbnRhaW5pbmcgdGhlIGpvYiBsb2NhdGlvbiBhbmQvb3Igd2hlbiBpdCB3YXMgcG9zdGVkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Sm9iTGlzdFNlY29uZGFyeUxhYmVsKGpvYjogSm9iTW9kZWwsIGNsYXNzTmFtZTogc3RyaW5nLCBpc0xvY2F0aW9uVmlzaWJsZTogYm9vbGVhbiwgaXNEYXRlUG9zdGVkVmlzaWJsZTogYm9vbGVhbik6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogY2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgICAgJ2RhdGEtaWQnOiBqb2IuaWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpc0xvY2F0aW9uVmlzaWJsZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5nZXRUZXh0KCdyZXN1bHRzLmpvYi1sb2NhdGlvbicsIGpvYik7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uSWQgPSBqb2IuaWQgKyAnbGFiZWwnO1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbnNMYWJlbCA9IGNyZWF0ZUh0bWxFbGVtZW50KCdkaXYnLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBsb2NhdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnY2MtbG9jYXRpb24tbGFiZWwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uc1Rvb2x0aXAgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2NjLWxvY2F0aW9uLXRvb2x0aXAnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbG9jYXRpb25zTGFiZWwuYXBwZW5kKGxvY2F0aW9uc1Rvb2x0aXApO1xyXG4gICAgICAgICAgICBsYWJlbC5hcHBlbmQobG9jYXRpb25zTGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgbG9jYXRpb25zTGFiZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNvbnRlbnQgb3ZlcmZsb3dzXHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYXRpb25zTGFiZWwuc2Nyb2xsV2lkdGggPiBsb2NhdGlvbnNMYWJlbC5jbGllbnRXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uc1Rvb2x0aXAuaW5uZXJUZXh0ID0gbG9jYXRpb25zTGFiZWwuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uc1Rvb2x0aXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbG9jYXRpb25zTGFiZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbnNUb29sdGlwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzRGF0ZVBvc3RlZFZpc2libGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZVRleHQgPSB0aGlzLmdldFRpbWVTaW5jZURhdGVQb3N0ZWQoam9iLnBvc3RlZERhdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlTGFiZWwgPSBjcmVhdGVIdG1sRWxlbWVudCgnZGl2JyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogJ2NjLWRhdGUtbGFiZWwnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0ZVRleHQpO1xyXG4gICAgICAgICAgICBsYWJlbC5hcHBlbmQoZGF0ZUxhYmVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBsYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGxhYmVscyBjb250YWluaW5nIHRoZSBqb2IgbG9jYXRpb24ocykgYW5kL29yIHdoZW4gdGhlIGpvYnMgd2FzIHBvc3RlZFxyXG4gICAgICogQHBhcmFtIGpvYiBUaGUgam9iIG1vZGVsIHRvIHVzZS5cclxuICAgICAqIEBwYXJhbSBjbGFzc05hbWUgVGhlIGNsYXNzbmFtZSBmb3IgdGhlIGNvbnRhaW5pbmcgZGl2XHJcbiAgICAgKiBAcGFyYW0gaXNMb2NhdGlvblZpc2libGUgRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBqb2IgbG9jYXRpb24gc2hvdWxkIGJlIGluY2x1ZGVkLlxyXG4gICAgICogQHBhcmFtIGlzRGF0ZVBvc3RlZFZpc2libGUgRmxhdCBpbmRpY2F0aW5nIGlmIHRoZSBqb2IgcG9zdGluZyBkYXRlIHNob3VsZCBiZSBpbmNsdWRlZC5cclxuICAgICAqIEByZXR1cm5zIHtIVE1MRWxlbWVudFtdfSBUaGUgbGFiZWxzIGNvbnRhaW5pbmcgdGhlIGpvYiBsb2NhdGlvbihzKSBhbmQvb3Igd2hlbiB0aGUgam9icyB3YXMgcG9zdGVkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Sm9iRGV0YWlsc1NlY29uZGFyeUxhYmVscyhqb2I6IEpvYk1vZGVsLCBjbGFzc05hbWU6IHN0cmluZywgaXNMb2NhdGlvblZpc2libGU6IGJvb2xlYW4sIGlzRGF0ZVBvc3RlZFZpc2libGU6IGJvb2xlYW4pOiBIVE1MRWxlbWVudFtdIHtcclxuICAgICAgICBjb25zdCBsYWJlbHM6IEhUTUxFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGlzTG9jYXRpb25WaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uTGFiZWxUZXh0ID0gdGhpcy5nZXRUZXh0KCdyZXN1bHRzLmpvYi1sb2NhdGlvbicsIGpvYik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbkxhYmVsID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IGNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAnZGF0YS1pZCc6IGpvYi5pZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uTGFiZWxUZXh0XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBsYWJlbHMucHVzaChsb2NhdGlvbkxhYmVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0RhdGVQb3N0ZWRWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVMYWJlbFRleHQgPSB0aGlzLmdldFRpbWVTaW5jZURhdGVQb3N0ZWQoam9iLnBvc3RlZERhdGUpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGF0ZUxhYmVsID0gY3JlYXRlSHRtbEVsZW1lbnQoJ2RpdicsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IGNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAnZGF0YS1pZCc6IGpvYi5pZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGVMYWJlbFRleHRcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGxhYmVscy5wdXNoKGRhdGVMYWJlbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbGFiZWxzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHRpbWUgc2luY2UgdGhlIGRhdGUgd2hlbiBhIGpvYiB3YXMgcG9zdGVkIGluIHRoZSBmb3JtXHJcbiAgICAgKiBvZiBcIlBvc3RlZCAzIGRheXMgYWdvXCIsIFwiUG9zdGVkIDIgd2Vla3MgYWdvXCIsIGV0Yy5cclxuICAgICAqIEBwYXJhbSBkYXRlUG9zdGVkU3RyaW5nIFRoZSBkYXRlIHdoZW4gdGhlIGpvYiB3YXMgcG9zdGVkLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRleHQgZGVzY3JpYmluZyBob3cgbG9uZyBhZ28gdGhlIGpvYiB3YXMgcG9zdGVkIGluIHRoZSBmb3JtIG9mIFwiUG9zdGVkIHggZGF5cy93ZWVrcy9tb250aHMveWVhcnMgYWdvXCJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUaW1lU2luY2VEYXRlUG9zdGVkKGRhdGVQb3N0ZWRTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBjb25zdCBkYXRlUG9zdGVkID0gbmV3IERhdGUoZGF0ZVBvc3RlZFN0cmluZyk7XHJcbiAgICAgICAgY29uc3QgdGltZUVsYXBzZWQgPSBub3cuZ2V0VGltZSgpIC0gZGF0ZVBvc3RlZC5nZXRUaW1lKCk7XHJcbiAgICAgICAgY29uc3QgZGF5c1Bhc3NlZCA9IE1hdGguZmxvb3IodGltZUVsYXBzZWQgLyAoMTAwMCAqIDM2MDAgKiAyNCkpO1xyXG4gICAgICAgIGNvbnN0IHdlZWtzUGFzc2VkID0gTWF0aC5mbG9vcihkYXlzUGFzc2VkIC8gNyk7XHJcbiAgICAgICAgY29uc3QgdG90YWxNb250aHNQYXNzZWQgPSAoKG5vdy5nZXRGdWxsWWVhcigpIC0gZGF0ZVBvc3RlZC5nZXRGdWxsWWVhcigpKSAqIDEyKSArIChub3cuZ2V0TW9udGgoKSAtIGRhdGVQb3N0ZWQuZ2V0TW9udGgoKSk7XHJcbiAgICAgICAgY29uc3QgbW9udGhzUGFzc2VkID0gdG90YWxNb250aHNQYXNzZWQgJSAxMjtcclxuICAgICAgICBjb25zdCB5ZWFyc1Bhc3NlZCA9IE1hdGguZmxvb3IodG90YWxNb250aHNQYXNzZWQgLyAxMik7XHJcblxyXG4gICAgICAgIGlmIChkYXlzUGFzc2VkIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0KCdyZXN1bHRzLmRhdGUtcG9zdGVkLmxlc3MtdGhhbi1hLWRheScsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXlzUGFzc2VkID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRleHQoJ3Jlc3VsdHMuZGF0ZS1wb3N0ZWQuZGF5JywgdW5kZWZpbmVkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRheXNQYXNzZWQgPCA3KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRleHQoJ3Jlc3VsdHMuZGF0ZS1wb3N0ZWQuZGF5cycsIHsgYW1vdW50OiBkYXlzUGFzc2VkIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2Vla3NQYXNzZWQgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dCgncmVzdWx0cy5kYXRlLXBvc3RlZC53ZWVrJywgdW5kZWZpbmVkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRvdGFsTW9udGhzUGFzc2VkIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0KCdyZXN1bHRzLmRhdGUtcG9zdGVkLndlZWtzJywgeyBhbW91bnQ6IHdlZWtzUGFzc2VkIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodG90YWxNb250aHNQYXNzZWQgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dCgncmVzdWx0cy5kYXRlLXBvc3RlZC5tb250aCcsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyc1Bhc3NlZCA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dCgncmVzdWx0cy5kYXRlLXBvc3RlZC5tb250aHMnLCB7IGFtb3VudDogbW9udGhzUGFzc2VkIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoeWVhcnNQYXNzZWQgPT09IDEpIHtcclxuICAgICAgICAgICAgaWYgKG1vbnRoc1Bhc3NlZCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRleHQoJ3Jlc3VsdHMuZGF0ZS1wb3N0ZWQueWVhcicsIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW9udGhzUGFzc2VkID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0KCdyZXN1bHRzLmRhdGUtcG9zdGVkLnllYXItYW5kLW1vbnRoJywgdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRleHQoJ3Jlc3VsdHMuZGF0ZS1wb3N0ZWQueWVhci1hbmQtbW9udGhzJywgeyBhbW91bnQ6IG1vbnRoc1Bhc3NlZCB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChtb250aHNQYXNzZWQgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0KCdyZXN1bHRzLmRhdGUtcG9zdGVkLnllYXJzJywgeyBhbW91bnQ6IHllYXJzUGFzc2VkIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vbnRoc1Bhc3NlZCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGV4dCgncmVzdWx0cy5kYXRlLXBvc3RlZC55ZWFycy1hbmQtbW9udGgnLCB7IGFtb3VudDogeWVhcnNQYXNzZWQgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUZXh0KCdyZXN1bHRzLmRhdGUtcG9zdGVkLnllYXJzLWFuZC1tb250aHMnLCB7IGFtb3VudE1vbnRoczogbW9udGhzUGFzc2VkLCBhbW91bnRZZWFyczogeWVhcnNQYXNzZWQgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGZvcm1hdHRlZCB0ZXh0IGZyb20gdGhlIHNldHRpbmdzIGZvciB0aGUgZ2l2ZW4ga2V5LiBBdXRvbWF0aWNhbGx5IGRvZXMgcmVwbGFjZW1lbnRzIGZyb20gdGhlIGpvYiBtb2RlbC5cclxuICAgICAqIEBwYXJhbSBrZXkgVGhlIHN0cmluZyBrZXkuXHJcbiAgICAgKiBAcGFyYW0gcmVwbGFjZW1lbnRzIFRoZSBjdXJyZW50IGpvYiBtb2RlbCBvciBzZXR0aW5ncyB0byB1c2UgZm9yIGZvcm1hdHRpbmcgdGhlIHRleHQuXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdGV4dCBmcm9tIHRoZSBzZXR0aW5ncywgb3IgdGhlIGtleSBpZiBubyBrZXkgbWF0Y2hlZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRUZXh0KGtleTogc3RyaW5nLCByZXBsYWNlbWVudHM6IG9iamVjdCB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMuc2V0dGluZ3MudGV4dFtrZXldO1xyXG5cclxuICAgICAgICBpZiAodGV4dCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VtZW50cyA/IHRleHQuY2NGb3JtYXQocmVwbGFjZW1lbnRzKSA6IHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBrZXk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGdW5jdGlvbiBmb3IgY3JlYXRpbmcgYW4gaHRtbCBlbGVtZW50IHdpdGggdGhlIGdpdmVuIHNldCBvZiBhdHRyaWJ1dGVzIGFuZCBjaGlsZHJlbi5cclxuICogQHBhcmFtIHRhZ05hbWUgLSBlbGVtZW50J3MgdGFnIG5hbWUuXHJcbiAqIEBwYXJhbSBhdHRyaWJ1dGVzIC0gc2V0IG9mIGVsZW1lbnQncyBhdHRyaWJ1dGVzLlxyXG4gKiBAcGFyYW0gY2hpbGRyZW4gLSBvcHRpb25hbCBjaGlsZHJlbiBvZiB0aGUgZWxlbWVudC5cclxuICogVGhlIGxpc3Qgb2YgY2hpbGRyZW4gd2lsbCBiZSBhcHBlbmRlZCBpbiBvcmRlciBvZiBwYXNzaW5nLlxyXG4gKiBAcmV0dXJucyAtIGEgZ2VuZXJhdGVkIGh0bWwgZWxlbWVudCAoYW5kIHByb3ZpZGVkIGNoaWxkcmVuKS5cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUh0bWxFbGVtZW50PEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+KHRhZ05hbWU6IEssIGF0dHJpYnV0ZXM/OiBSZWFkb25seURpY3Rpb25hcnk8cHJpbWl0aXZlPiwgLi4uY2hpbGRyZW46IChzdHJpbmcgfCBWaXJ0dWFsRG9tIHwgSFRNTEVsZW1lbnQgfCBTVkdFbGVtZW50KVtdKTogSFRNTEVsZW1lbnRUYWdOYW1lTWFwW0tdIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgaWYgKGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hpbGRyZW4pIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCBjaGlsZCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyB0YWdOYW1lLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiB9ID0gY2hpbGQ7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZUh0bWxFbGVtZW50KHRhZ05hbWUgYXMga2V5b2YgSFRNTEVsZW1lbnRUYWdOYW1lTWFwLCBhdHRyaWJ1dGVzLCAuLi5jaGlsZHJlbiEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIGZvciBjcmVhdGluZyBhbiBTVkcgZWxlbWVudCB3aXRoIHRoZSBnaXZlbiBzZXQgb2YgYXR0cmlidXRlcyBhbmQgY2hpbGRyZW4uXHJcbiAqIEBwYXJhbSB0YWdOYW1lIC0gZWxlbWVudCdzIHRhZyBuYW1lLlxyXG4gKiBAcGFyYW0gYXR0cmlidXRlcyAtIHNldCBvZiBlbGVtZW50J3MgYXR0cmlidXRlcy5cclxuICogQHBhcmFtIGNoaWxkcmVuIC0gb3B0aW9uYWwgY2hpbGRyZW4gb2YgdGhlIGVsZW1lbnQuXHJcbiAqIFRoZSBsaXN0IG9mIGNoaWxkcmVuIHdpbGwgYmUgYXBwZW5kZWQgaW4gb3JkZXIgb2YgcGFzc2luZy5cclxuICogQHJldHVybnMgLSBhIGdlbmVyYXRlZCBTVkcgZWxlbWVudCAoYW5kIHByb3ZpZGVkIGNoaWxkcmVuKS5cclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVN2Z0VsZW1lbnQ8SyBleHRlbmRzIGtleW9mIFNWR0VsZW1lbnRUYWdOYW1lTWFwPih0YWdOYW1lOiBLLCBhdHRyaWJ1dGVzPzogUmVhZG9ubHlEaWN0aW9uYXJ5PHByaW1pdGl2ZT4sIC4uLmNoaWxkcmVuOiBTVkdFbGVtZW50W10pOiBTVkdFbGVtZW50VGFnTmFtZU1hcFtLXSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHRhZ05hbWUpO1xyXG4gICAgaWYgKGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hpbGRyZW4pIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogUGVyZm9ybXMgc3ByaW50ZiBsaWtlIGZvcm1hdHRpbmcgb24gc3RyaW5ncyBzbyBcImJsYWggezB9XCIuZm9ybWF0KCdzb21ldGhpbmcnKTsgb3V0cHV0cyBcImJsYWggc29tZXRoaW5nXCJcclxuICogSXQgYWxzbyBhbGxvd3MgZm9ybWF0dGluZyB1c2luZyBhbiBvYmplY3QgYXMgdGhlIHNvdXJjZSBpbnN0ZWFkIG9mIGFuIGFycmF5LCBzbyBcImJsYWgge25hbWV9XCIuZm9ybWF0KHsgbmFtZTogJ3NvbWV0aGluZycgfSk7IG91dHB1dHMgXCJibGFoIHNvbWV0aGluZ1wiXHJcbiAqIG9iamVjdCBmb3JtYXR0aW5nIGhhcHBlbnMgd2hlbiBhbiBvYmplY3QgaXMgdGhlIGZpcnN0IGFyZ3VtZW50XHJcbiAqIEBwYXJhbSByZXBsYWNlbWVudHMgLSB0aGUgb2JqZWN0IGNvbnRhaW5pbmcgcG9zc2libGUgcmVwbGFjZW1lbnRzXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmdWxseSBmb3JtYXR0ZWQgc3RyaW5nXHJcbiAqL1xyXG5TdHJpbmcucHJvdG90eXBlLmNjRm9ybWF0ID0gZnVuY3Rpb24gKHJlcGxhY2VtZW50czogUmVhZG9ubHlEaWN0aW9uYXJ5PGFueT4pOiBzdHJpbmcge1xyXG4gICAgLy8gTG9vayBmb3IgYW55IHdvcmQgY2hhcmFjdGVycyBzdXJyb3VuZGVkIGJ5IGJyYWNlc1xyXG4gICAgY29uc3Qgc3ByaW50ZlJlZ2V4ID0gL1xceyhcXHcrKVxcfS9nO1xyXG5cclxuICAgIGNvbnN0IHNwcmludGYgPSBmdW5jdGlvbiAobWF0Y2g6IGFueSwgdmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSBpbiByZXBsYWNlbWVudHMgPyByZXBsYWNlbWVudHNbdmFsdWVdIDogbWF0Y2g7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLnJlcGxhY2Uoc3ByaW50ZlJlZ2V4LCBzcHJpbnRmKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgdGhlIHZhbHVlIGlzIGEgdmFsaWQgb3B0aW9uIGZvciB0aGUgc2VsZWN0LlxyXG4gKiBAcGFyYW0gc2VsZWN0IFRoZSBzZWxlY3QgZWxlbWVudFxyXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBwcmVzZW50IGluIHRoZSBvcHRpb25zLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5mdW5jdGlvbiBpc1ZhbGlkT3B0aW9uKHNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHNlbGVjdC5vcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbi52YWx1ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5jb25zdCBqb2JzID0gbmV3IENsZWFyQ29tcGFueUpvYnMoKTtcclxuam9icy5sb2FkKCk7Il19
