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
exports.id = "app/api/upload/route";
exports.ids = ["app/api/upload/route"];
exports.modules = {

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

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_RentoBees_Desktop_NyayaSutra_Final_v2_nyayasutra_final_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/upload/route.ts */ \"(rsc)/./app/api/upload/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/upload/route\",\n        pathname: \"/api/upload\",\n        filename: \"route\",\n        bundlePath: \"app/api/upload/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\RentoBees\\\\Desktop\\\\NyayaSutra-Final-v2\\\\nyayasutra-final\\\\app\\\\api\\\\upload\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_RentoBees_Desktop_NyayaSutra_Final_v2_nyayasutra_final_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/upload/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNSZW50b0JlZXMlNUNEZXNrdG9wJTVDTnlheWFTdXRyYS1GaW5hbC12MiU1Q255YXlhc3V0cmEtZmluYWwlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1JlbnRvQmVlcyU1Q0Rlc2t0b3AlNUNOeWF5YVN1dHJhLUZpbmFsLXYyJTVDbnlheWFzdXRyYS1maW5hbCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDZ0Q7QUFDN0g7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vP2IyZjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcUmVudG9CZWVzXFxcXERlc2t0b3BcXFxcTnlheWFTdXRyYS1GaW5hbC12MlxcXFxueWF5YXN1dHJhLWZpbmFsXFxcXGFwcFxcXFxhcGlcXFxcdXBsb2FkXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS91cGxvYWQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91cGxvYWRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3VwbG9hZC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFJlbnRvQmVlc1xcXFxEZXNrdG9wXFxcXE55YXlhU3V0cmEtRmluYWwtdjJcXFxcbnlheWFzdXRyYS1maW5hbFxcXFxhcHBcXFxcYXBpXFxcXHVwbG9hZFxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvdXBsb2FkL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/upload/route.ts":
/*!*********************************!*\
  !*** ./app/api/upload/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_cloudinary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/cloudinary */ \"(rsc)/./lib/cloudinary.ts\");\n/* harmony import */ var _lib_apiHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/apiHandler */ \"(rsc)/./lib/apiHandler.ts\");\n\n\n\nconst POST = (0,_lib_apiHandler__WEBPACK_IMPORTED_MODULE_2__.withErrorHandling)(async (req)=>{\n    const { image } = await req.json();\n    if (!image) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"No image provided.\"\n    }, {\n        status: 400\n    });\n    const result = await (0,_lib_cloudinary__WEBPACK_IMPORTED_MODULE_1__.uploadImage)(image, \"nyayasutra/blogs\");\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result);\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VwbG9hZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTJDO0FBQ0k7QUFDTTtBQUU5QyxNQUFNRyxPQUFPRCxrRUFBaUJBLENBQUMsT0FBT0U7SUFDM0MsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBRyxNQUFNRCxJQUFJRSxJQUFJO0lBQ2hDLElBQUksQ0FBQ0QsT0FBTyxPQUFPTCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO1FBQUVDLE9BQU87SUFBcUIsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFDcEYsTUFBTUMsU0FBUyxNQUFNUiw0REFBV0EsQ0FBQ0ksT0FBTztJQUN4QyxPQUFPTCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDRztBQUMzQixHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2FwaS91cGxvYWQvcm91dGUudHM/YTg4ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyB1cGxvYWRJbWFnZSB9IGZyb20gJ0AvbGliL2Nsb3VkaW5hcnknO1xuaW1wb3J0IHsgd2l0aEVycm9ySGFuZGxpbmcgfSBmcm9tICdAL2xpYi9hcGlIYW5kbGVyJztcblxuZXhwb3J0IGNvbnN0IFBPU1QgPSB3aXRoRXJyb3JIYW5kbGluZyhhc3luYyAocmVxOiBSZXF1ZXN0KSA9PiB7XG4gIGNvbnN0IHsgaW1hZ2UgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gIGlmICghaW1hZ2UpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm8gaW1hZ2UgcHJvdmlkZWQuJyB9LCB7IHN0YXR1czogNDAwIH0pO1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCB1cGxvYWRJbWFnZShpbWFnZSwgJ255YXlhc3V0cmEvYmxvZ3MnKTtcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlc3VsdCk7XG59KTtcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJ1cGxvYWRJbWFnZSIsIndpdGhFcnJvckhhbmRsaW5nIiwiUE9TVCIsInJlcSIsImltYWdlIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwicmVzdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/upload/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/apiHandler.ts":
/*!***************************!*\
  !*** ./lib/apiHandler.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   withErrorHandling: () => (/* binding */ withErrorHandling)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n/**\n * Wraps an API route handler so that any thrown error (including MongoDB\n * connection failures) returns a clean JSON error response instead of\n * crashing the Next.js server process.\n */ function withErrorHandling(handler) {\n    return async (...args)=>{\n        try {\n            return await handler(...args);\n        } catch (err) {\n            console.error(\"[API ERROR]\", err?.message || err);\n            const isDbError = err?.name === \"MongooseServerSelectionError\" || err?.message?.includes(\"MONGODB_URI\") || err?.message?.includes(\"buffering timed out\") || err?.name === \"MongoNetworkError\";\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: isDbError ? \"Database temporarily unavailable. Please try again shortly.\" : \"Something went wrong. Please try again.\"\n            }, {\n                status: isDbError ? 503 : 500\n            });\n        }\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXBpSGFuZGxlci50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUEyQztBQUUzQzs7OztDQUlDLEdBQ00sU0FBU0Msa0JBQ2RDLE9BQVU7SUFFVixPQUFRLE9BQU8sR0FBR0M7UUFDaEIsSUFBSTtZQUNGLE9BQU8sTUFBTUQsV0FBV0M7UUFDMUIsRUFBRSxPQUFPQyxLQUFVO1lBQ2pCQyxRQUFRQyxLQUFLLENBQUMsZUFBZUYsS0FBS0csV0FBV0g7WUFFN0MsTUFBTUksWUFDSkosS0FBS0ssU0FBUyxrQ0FDZEwsS0FBS0csU0FBU0csU0FBUyxrQkFDdkJOLEtBQUtHLFNBQVNHLFNBQVMsMEJBQ3ZCTixLQUFLSyxTQUFTO1lBRWhCLE9BQU9ULHFEQUFZQSxDQUFDVyxJQUFJLENBQ3RCO2dCQUNFTCxPQUFPRSxZQUNILGdFQUNBO1lBQ04sR0FDQTtnQkFBRUksUUFBUUosWUFBWSxNQUFNO1lBQUk7UUFFcEM7SUFDRjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbGliL2FwaUhhbmRsZXIudHM/MjM4YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5cbi8qKlxuICogV3JhcHMgYW4gQVBJIHJvdXRlIGhhbmRsZXIgc28gdGhhdCBhbnkgdGhyb3duIGVycm9yIChpbmNsdWRpbmcgTW9uZ29EQlxuICogY29ubmVjdGlvbiBmYWlsdXJlcykgcmV0dXJucyBhIGNsZWFuIEpTT04gZXJyb3IgcmVzcG9uc2UgaW5zdGVhZCBvZlxuICogY3Jhc2hpbmcgdGhlIE5leHQuanMgc2VydmVyIHByb2Nlc3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoRXJyb3JIYW5kbGluZzxUIGV4dGVuZHMgKC4uLmFyZ3M6IGFueVtdKSA9PiBQcm9taXNlPE5leHRSZXNwb25zZT4+KFxuICBoYW5kbGVyOiBUXG4pOiBUIHtcbiAgcmV0dXJuIChhc3luYyAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IGhhbmRsZXIoLi4uYXJncyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tBUEkgRVJST1JdJywgZXJyPy5tZXNzYWdlIHx8IGVycik7XG5cbiAgICAgIGNvbnN0IGlzRGJFcnJvciA9XG4gICAgICAgIGVycj8ubmFtZSA9PT0gJ01vbmdvb3NlU2VydmVyU2VsZWN0aW9uRXJyb3InIHx8XG4gICAgICAgIGVycj8ubWVzc2FnZT8uaW5jbHVkZXMoJ01PTkdPREJfVVJJJykgfHxcbiAgICAgICAgZXJyPy5tZXNzYWdlPy5pbmNsdWRlcygnYnVmZmVyaW5nIHRpbWVkIG91dCcpIHx8XG4gICAgICAgIGVycj8ubmFtZSA9PT0gJ01vbmdvTmV0d29ya0Vycm9yJztcblxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7XG4gICAgICAgICAgZXJyb3I6IGlzRGJFcnJvclxuICAgICAgICAgICAgPyAnRGF0YWJhc2UgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGUuIFBsZWFzZSB0cnkgYWdhaW4gc2hvcnRseS4nXG4gICAgICAgICAgICA6ICdTb21ldGhpbmcgd2VudCB3cm9uZy4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgICB9LFxuICAgICAgICB7IHN0YXR1czogaXNEYkVycm9yID8gNTAzIDogNTAwIH1cbiAgICAgICk7XG4gICAgfVxuICB9KSBhcyBUO1xufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIndpdGhFcnJvckhhbmRsaW5nIiwiaGFuZGxlciIsImFyZ3MiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiaXNEYkVycm9yIiwibmFtZSIsImluY2x1ZGVzIiwianNvbiIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/apiHandler.ts\n");

/***/ }),

/***/ "(rsc)/./lib/cloudinary.ts":
/*!***************************!*\
  !*** ./lib/cloudinary.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   deleteImage: () => (/* binding */ deleteImage),\n/* harmony export */   uploadImage: () => (/* binding */ uploadImage)\n/* harmony export */ });\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cloudinary */ \"(rsc)/./node_modules/cloudinary/cloudinary.js\");\n/* harmony import */ var cloudinary__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cloudinary__WEBPACK_IMPORTED_MODULE_0__);\n\ncloudinary__WEBPACK_IMPORTED_MODULE_0__.v2.config({\n    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,\n    api_key: process.env.CLOUDINARY_API_KEY,\n    api_secret: process.env.CLOUDINARY_API_SECRET\n});\nasync function uploadImage(base64, folder = \"nyayasutra\") {\n    const result = await cloudinary__WEBPACK_IMPORTED_MODULE_0__.v2.uploader.upload(base64, {\n        folder,\n        resource_type: \"image\"\n    });\n    return {\n        url: result.secure_url,\n        publicId: result.public_id\n    };\n}\nasync function deleteImage(publicId) {\n    await cloudinary__WEBPACK_IMPORTED_MODULE_0__.v2.uploader.destroy(publicId);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cloudinary__WEBPACK_IMPORTED_MODULE_0__.v2);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvY2xvdWRpbmFyeS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUE4QztBQUU5Q0MsMENBQVVBLENBQUNDLE1BQU0sQ0FBQztJQUNoQkMsWUFBWUMsUUFBUUMsR0FBRyxDQUFDQyxxQkFBcUI7SUFDN0NDLFNBQVNILFFBQVFDLEdBQUcsQ0FBQ0csa0JBQWtCO0lBQ3ZDQyxZQUFZTCxRQUFRQyxHQUFHLENBQUNLLHFCQUFxQjtBQUMvQztBQUVPLGVBQWVDLFlBQVlDLE1BQWMsRUFBRUMsU0FBUyxZQUFZO0lBQ3JFLE1BQU1DLFNBQVMsTUFBTWIsMENBQVVBLENBQUNjLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDSixRQUFRO1FBQUVDO1FBQVFJLGVBQWU7SUFBUTtJQUN6RixPQUFPO1FBQUVDLEtBQUtKLE9BQU9LLFVBQVU7UUFBRUMsVUFBVU4sT0FBT08sU0FBUztJQUFDO0FBQzlEO0FBRU8sZUFBZUMsWUFBWUYsUUFBZ0I7SUFDaEQsTUFBTW5CLDBDQUFVQSxDQUFDYyxRQUFRLENBQUNRLE9BQU8sQ0FBQ0g7QUFDcEM7QUFFQSxpRUFBZW5CLDBDQUFVQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbGliL2Nsb3VkaW5hcnkudHM/ODQ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2MiBhcyBjbG91ZGluYXJ5IH0gZnJvbSAnY2xvdWRpbmFyeSc7XG5cbmNsb3VkaW5hcnkuY29uZmlnKHtcbiAgY2xvdWRfbmFtZTogcHJvY2Vzcy5lbnYuQ0xPVURJTkFSWV9DTE9VRF9OQU1FLFxuICBhcGlfa2V5OiBwcm9jZXNzLmVudi5DTE9VRElOQVJZX0FQSV9LRVksXG4gIGFwaV9zZWNyZXQ6IHByb2Nlc3MuZW52LkNMT1VESU5BUllfQVBJX1NFQ1JFVCxcbn0pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBsb2FkSW1hZ2UoYmFzZTY0OiBzdHJpbmcsIGZvbGRlciA9ICdueWF5YXN1dHJhJykge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbG91ZGluYXJ5LnVwbG9hZGVyLnVwbG9hZChiYXNlNjQsIHsgZm9sZGVyLCByZXNvdXJjZV90eXBlOiAnaW1hZ2UnIH0pO1xuICByZXR1cm4geyB1cmw6IHJlc3VsdC5zZWN1cmVfdXJsLCBwdWJsaWNJZDogcmVzdWx0LnB1YmxpY19pZCB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlSW1hZ2UocHVibGljSWQ6IHN0cmluZykge1xuICBhd2FpdCBjbG91ZGluYXJ5LnVwbG9hZGVyLmRlc3Ryb3kocHVibGljSWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbG91ZGluYXJ5O1xuIl0sIm5hbWVzIjpbInYyIiwiY2xvdWRpbmFyeSIsImNvbmZpZyIsImNsb3VkX25hbWUiLCJwcm9jZXNzIiwiZW52IiwiQ0xPVURJTkFSWV9DTE9VRF9OQU1FIiwiYXBpX2tleSIsIkNMT1VESU5BUllfQVBJX0tFWSIsImFwaV9zZWNyZXQiLCJDTE9VRElOQVJZX0FQSV9TRUNSRVQiLCJ1cGxvYWRJbWFnZSIsImJhc2U2NCIsImZvbGRlciIsInJlc3VsdCIsInVwbG9hZGVyIiwidXBsb2FkIiwicmVzb3VyY2VfdHlwZSIsInVybCIsInNlY3VyZV91cmwiLCJwdWJsaWNJZCIsInB1YmxpY19pZCIsImRlbGV0ZUltYWdlIiwiZGVzdHJveSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/cloudinary.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/lodash","vendor-chunks/cloudinary"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CRentoBees%5CDesktop%5CNyayaSutra-Final-v2%5Cnyayasutra-final&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();