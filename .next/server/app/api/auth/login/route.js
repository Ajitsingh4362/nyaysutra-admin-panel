"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_RentoBees_Desktop_NyayaSutra_Final_v2_nyayasutra_final_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/login/route.ts */ \"(rsc)/./app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\RentoBees\\\\Desktop\\\\NyayaSutra-Final-v2\\\\nyayasutra-final\\\\app\\\\api\\\\auth\\\\login\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_RentoBees_Desktop_NyayaSutra_Final_v2_nyayasutra_final_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/login/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNSZW50b0JlZXMlNUNEZXNrdG9wJTVDTnlheWFTdXRyYS1GaW5hbC12MiU1Q255YXlhc3V0cmEtZmluYWwlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1JlbnRvQmVlcyU1Q0Rlc2t0b3AlNUNOeWF5YVN1dHJhLUZpbmFsLXYyJTVDbnlheWFzdXRyYS1maW5hbCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDcUQ7QUFDbEk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vPzE5ZjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcUmVudG9CZWVzXFxcXERlc2t0b3BcXFxcTnlheWFTdXRyYS1GaW5hbC12MlxcXFxueWF5YXN1dHJhLWZpbmFsXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxsb2dpblxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvbG9naW5cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvbG9naW4vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxSZW50b0JlZXNcXFxcRGVza3RvcFxcXFxOeWF5YVN1dHJhLUZpbmFsLXYyXFxcXG55YXlhc3V0cmEtZmluYWxcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXGxvZ2luXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/login/route.ts":
/*!*************************************!*\
  !*** ./app/api/auth/login/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_apiHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/apiHandler */ \"(rsc)/./lib/apiHandler.ts\");\n\n\n\nconst POST = (0,_lib_apiHandler__WEBPACK_IMPORTED_MODULE_2__.withErrorHandling)(async (req)=>{\n    const { email, password } = await req.json();\n    const adminEmail = process.env.ADMIN_EMAIL;\n    const adminPass = process.env.ADMIN_PASSWORD;\n    if (!adminEmail || !adminPass) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Admin credentials not configured on server.\"\n        }, {\n            status: 500\n        });\n    }\n    if (email !== adminEmail || password !== adminPass) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Invalid credentials\"\n        }, {\n            status: 401\n        });\n    }\n    const token = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.signToken)({\n        email,\n        role: \"admin\"\n    });\n    const res = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true\n    });\n    res.cookies.set(\"admin_token\", token, {\n        httpOnly: true,\n        maxAge: 60 * 60 * 24 * 7,\n        path: \"/\"\n    });\n    return res;\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEyQztBQUNKO0FBQ2M7QUFFOUMsTUFBTUcsT0FBT0Qsa0VBQWlCQSxDQUFDLE9BQU9FO0lBQzNDLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUUsR0FBRyxNQUFNRixJQUFJRyxJQUFJO0lBQzFDLE1BQU1DLGFBQWFDLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztJQUMxQyxNQUFNQyxZQUFZSCxRQUFRQyxHQUFHLENBQUNHLGNBQWM7SUFDNUMsSUFBSSxDQUFDTCxjQUFjLENBQUNJLFdBQVc7UUFDN0IsT0FBT1oscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFTyxPQUFPO1FBQThDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ25HO0lBQ0EsSUFBSVYsVUFBVUcsY0FBY0YsYUFBYU0sV0FBVztRQUNsRCxPQUFPWixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVPLE9BQU87UUFBc0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDM0U7SUFDQSxNQUFNQyxRQUFRZixvREFBU0EsQ0FBQztRQUFFSTtRQUFPWSxNQUFNO0lBQVE7SUFDL0MsTUFBTUMsTUFBTWxCLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7UUFBRVksU0FBUztJQUFLO0lBQzlDRCxJQUFJRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxlQUFlTCxPQUFPO1FBQUVNLFVBQVU7UUFBTUMsUUFBUSxLQUFLLEtBQUssS0FBSztRQUFHQyxNQUFNO0lBQUk7SUFDNUYsT0FBT047QUFDVCxHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzPzRmMjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuaW1wb3J0IHsgc2lnblRva2VuIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5pbXBvcnQgeyB3aXRoRXJyb3JIYW5kbGluZyB9IGZyb20gJ0AvbGliL2FwaUhhbmRsZXInO1xuXG5leHBvcnQgY29uc3QgUE9TVCA9IHdpdGhFcnJvckhhbmRsaW5nKGFzeW5jIChyZXE6IFJlcXVlc3QpID0+IHtcbiAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gIGNvbnN0IGFkbWluRW1haWwgPSBwcm9jZXNzLmVudi5BRE1JTl9FTUFJTDtcbiAgY29uc3QgYWRtaW5QYXNzID0gcHJvY2Vzcy5lbnYuQURNSU5fUEFTU1dPUkQ7XG4gIGlmICghYWRtaW5FbWFpbCB8fCAhYWRtaW5QYXNzKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdBZG1pbiBjcmVkZW50aWFscyBub3QgY29uZmlndXJlZCBvbiBzZXJ2ZXIuJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG4gIGlmIChlbWFpbCAhPT0gYWRtaW5FbWFpbCB8fCBwYXNzd29yZCAhPT0gYWRtaW5QYXNzKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnZhbGlkIGNyZWRlbnRpYWxzJyB9LCB7IHN0YXR1czogNDAxIH0pO1xuICB9XG4gIGNvbnN0IHRva2VuID0gc2lnblRva2VuKHsgZW1haWwsIHJvbGU6ICdhZG1pbicgfSk7XG4gIGNvbnN0IHJlcyA9IE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgcmVzLmNvb2tpZXMuc2V0KCdhZG1pbl90b2tlbicsIHRva2VuLCB7IGh0dHBPbmx5OiB0cnVlLCBtYXhBZ2U6IDYwICogNjAgKiAyNCAqIDcsIHBhdGg6ICcvJyB9KTtcbiAgcmV0dXJuIHJlcztcbn0pO1xuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInNpZ25Ub2tlbiIsIndpdGhFcnJvckhhbmRsaW5nIiwiUE9TVCIsInJlcSIsImVtYWlsIiwicGFzc3dvcmQiLCJqc29uIiwiYWRtaW5FbWFpbCIsInByb2Nlc3MiLCJlbnYiLCJBRE1JTl9FTUFJTCIsImFkbWluUGFzcyIsIkFETUlOX1BBU1NXT1JEIiwiZXJyb3IiLCJzdGF0dXMiLCJ0b2tlbiIsInJvbGUiLCJyZXMiLCJzdWNjZXNzIiwiY29va2llcyIsInNldCIsImh0dHBPbmx5IiwibWF4QWdlIiwicGF0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/apiHandler.ts":
/*!***************************!*\
  !*** ./lib/apiHandler.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   withErrorHandling: () => (/* binding */ withErrorHandling)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n/**\n * Wraps an API route handler so that any thrown error (including MongoDB\n * connection failures) returns a clean JSON error response instead of\n * crashing the Next.js server process.\n */ function withErrorHandling(handler) {\n    return async (...args)=>{\n        try {\n            return await handler(...args);\n        } catch (err) {\n            console.error(\"[API ERROR]\", err?.message || err);\n            const isDbError = err?.name === \"MongooseServerSelectionError\" || err?.message?.includes(\"MONGODB_URI\") || err?.message?.includes(\"buffering timed out\") || err?.name === \"MongoNetworkError\";\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: isDbError ? \"Database temporarily unavailable. Please try again shortly.\" : \"Something went wrong. Please try again.\"\n            }, {\n                status: isDbError ? 503 : 500\n            });\n        }\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXBpSGFuZGxlci50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQztBQUUzQzs7OztDQUlDLEdBQ00sU0FBU0Msa0JBQ2RDLE9BQVU7SUFFVixPQUFRLE9BQU8sR0FBR0M7UUFDaEIsSUFBSTtZQUNGLE9BQU8sTUFBTUQsV0FBV0M7UUFDMUIsRUFBRSxPQUFPQyxLQUFVO1lBQ2pCQyxRQUFRQyxLQUFLLENBQUMsZUFBZUYsS0FBS0csV0FBV0g7WUFFN0MsTUFBTUksWUFDSkosS0FBS0ssU0FBUyxrQ0FDZEwsS0FBS0csU0FBU0csU0FBUyxrQkFDdkJOLEtBQUtHLFNBQVNHLFNBQVMsMEJBQ3ZCTixLQUFLSyxTQUFTO1lBRWhCLE9BQU9ULHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO2dCQUNFTCxPQUFPRSxZQUNILGdFQUNBO1lBQ04sR0FDQTtnQkFBRUksUUFBUUosWUFBWSxNQUFNO1lBQUk7UUFFcEM7SUFDRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbGliL2FwaUhhbmRsZXIudHM/MjM4YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5cbi8qKlxuICogV3JhcHMgYW4gQVBJIHJvdXRlIGhhbmRsZXIgc28gdGhhdCBhbnkgdGhyb3duIGVycm9yIChpbmNsdWRpbmcgTW9uZ29EQlxuICogY29ubmVjdGlvbiBmYWlsdXJlcykgcmV0dXJucyBhIGNsZWFuIEpTT04gZXJyb3IgcmVzcG9uc2UgaW5zdGVhZCBvZlxuICogY3Jhc2hpbmcgdGhlIE5leHQuanMgc2VydmVyIHByb2Nlc3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoRXJyb3JIYW5kbGluZzxUIGV4dGVuZHMgKC4uLmFyZ3M6IGFueVtdKSA9PiBQcm9taXNlPE5leHRSZXNwb25zZT4+KFxuICBoYW5kbGVyOiBUXG4pOiBUIHtcbiAgcmV0dXJuIChhc3luYyAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGhhbmRsZXIoLi4uYXJncyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tBUEkgRVJST1JdJywgZXJyPy5tZXNzYWdlIHx8IGVycik7XG5cbiAgICAgIGNvbnN0IGlzRGJFcnJvciA9XG4gICAgICAgIGVycj8ubmFtZSA9PT0gJ01vbmdvb3NlU2VydmVyU2VsZWN0aW9uRXJyb3InIHx8XG4gICAgICAgIGVycj8ubWVzc2FnZT8uaW5jbHVkZXMoJ01PTkdPREJfVVJJJykgfHxcbiAgICAgICAgZXJyPy5tZXNzYWdlPy5pbmNsdWRlcygnYnVmZmVyaW5nIHRpbWVkIG91dCcpIHx8XG4gICAgICAgIGVycj8ubmFtZSA9PT0gJ01vbmdvTmV0d29ya0Vycm9yJztcblxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7XG4gICAgICAgICAgZXJyb3I6IGlzRGJFcnJvclxuICAgICAgICAgICAgPyAnRGF0YWJhc2UgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGUuIFBsZWFzZSB0cnkgYWdhaW4gc2hvcnRseS4nXG4gICAgICAgICAgICA6ICdTb21ldGhpbmcgd2VudCB3cm9uZy4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgICB9LFxuICAgICAgICB7IHN0YXR1czogaXNEYkVycm9yID8gNTAzIDogNTAwIH1cbiAgICAgICk7XG4gICAgfVxuICB9KSBhcyBUO1xufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIndpdGhFcnJvckhhbmRsaW5nIiwiaGFuZGxlciIsImFyZ3MiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiaXNEYkVycm9yIiwibmFtZSIsImluY2x1ZGVzIiwianNvbiIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/apiHandler.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAdminFromCookie: () => (/* binding */ getAdminFromCookie),\n/* harmony export */   signToken: () => (/* binding */ signToken),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nconst JWT_SECRET = process.env.JWT_SECRET;\nfunction signToken(payload) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign(payload, JWT_SECRET, {\n        expiresIn: \"7d\"\n    });\n}\nfunction verifyToken(token) {\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, JWT_SECRET);\n    } catch  {\n        return null;\n    }\n}\nfunction getAdminFromCookie() {\n    try {\n        const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n        const token = cookieStore.get(\"admin_token\")?.value;\n        if (!token) return null;\n        return verifyToken(token);\n    } catch  {\n        return null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBK0I7QUFDUTtBQUV2QyxNQUFNRSxhQUFhQyxRQUFRQyxHQUFHLENBQUNGLFVBQVU7QUFFbEMsU0FBU0csVUFBVUMsT0FBZTtJQUN2QyxPQUFPTix3REFBUSxDQUFDTSxTQUFTSixZQUFZO1FBQUVNLFdBQVc7SUFBSztBQUN6RDtBQUVPLFNBQVNDLFlBQVlDLEtBQWE7SUFDdkMsSUFBSTtRQUFFLE9BQU9WLDBEQUFVLENBQUNVLE9BQU9SO0lBQW9CLEVBQ25ELE9BQU07UUFBRSxPQUFPO0lBQU07QUFDdkI7QUFFTyxTQUFTVTtJQUNkLElBQUk7UUFDRixNQUFNQyxjQUFjWixxREFBT0E7UUFDM0IsTUFBTVMsUUFBUUcsWUFBWUMsR0FBRyxDQUFDLGdCQUFnQkM7UUFDOUMsSUFBSSxDQUFDTCxPQUFPLE9BQU87UUFDbkIsT0FBT0QsWUFBWUM7SUFDckIsRUFBRSxPQUFNO1FBQUUsT0FBTztJQUFNO0FBQ3pCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSAnbmV4dC9oZWFkZXJzJztcblxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgYXMgc3RyaW5nO1xuXG5leHBvcnQgZnVuY3Rpb24gc2lnblRva2VuKHBheWxvYWQ6IG9iamVjdCkge1xuICByZXR1cm4gand0LnNpZ24ocGF5bG9hZCwgSldUX1NFQ1JFVCwgeyBleHBpcmVzSW46ICc3ZCcgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlUb2tlbih0b2tlbjogc3RyaW5nKSB7XG4gIHRyeSB7IHJldHVybiBqd3QudmVyaWZ5KHRva2VuLCBKV1RfU0VDUkVUKSBhcyBhbnk7IH1cbiAgY2F0Y2ggeyByZXR1cm4gbnVsbDsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWRtaW5Gcm9tQ29va2llKCkge1xuICB0cnkge1xuICAgIGNvbnN0IGNvb2tpZVN0b3JlID0gY29va2llcygpO1xuICAgIGNvbnN0IHRva2VuID0gY29va2llU3RvcmUuZ2V0KCdhZG1pbl90b2tlbicpPy52YWx1ZTtcbiAgICBpZiAoIXRva2VuKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdmVyaWZ5VG9rZW4odG9rZW4pO1xuICB9IGNhdGNoIHsgcmV0dXJuIG51bGw7IH1cbn1cbiJdLCJuYW1lcyI6WyJqd3QiLCJjb29raWVzIiwiSldUX1NFQ1JFVCIsInByb2Nlc3MiLCJlbnYiLCJzaWduVG9rZW4iLCJwYXlsb2FkIiwic2lnbiIsImV4cGlyZXNJbiIsInZlcmlmeVRva2VuIiwidG9rZW4iLCJ2ZXJpZnkiLCJnZXRBZG1pbkZyb21Db29raWUiLCJjb29raWVTdG9yZSIsImdldCIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();