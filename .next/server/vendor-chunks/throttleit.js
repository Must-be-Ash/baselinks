/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/throttleit";
exports.ids = ["vendor-chunks/throttleit"];
exports.modules = {

/***/ "(rsc)/./node_modules/throttleit/index.js":
/*!******************************************!*\
  !*** ./node_modules/throttleit/index.js ***!
  \******************************************/
/***/ ((module) => {

eval("function throttle(function_, wait) {\n    if (typeof function_ !== \"function\") {\n        throw new TypeError(`Expected the first argument to be a \\`function\\`, got \\`${typeof function_}\\`.`);\n    }\n    // TODO: Add `wait` validation too in the next major version.\n    let timeoutId;\n    let lastCallTime = 0;\n    return function throttled(...arguments_) {\n        clearTimeout(timeoutId);\n        const now = Date.now();\n        const timeSinceLastCall = now - lastCallTime;\n        const delayForNextCall = wait - timeSinceLastCall;\n        if (delayForNextCall <= 0) {\n            lastCallTime = now;\n            function_.apply(this, arguments_);\n        } else {\n            timeoutId = setTimeout(()=>{\n                lastCallTime = Date.now();\n                function_.apply(this, arguments_);\n            }, delayForNextCall);\n        }\n    };\n}\nmodule.exports = throttle;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcnlwdG8tZG9uYXRpb25zLXByb21wdC1nZW5lcmF0b3IvLi9ub2RlX21vZHVsZXMvdGhyb3R0bGVpdC9pbmRleC5qcz83ZGM4Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHRocm90dGxlKGZ1bmN0aW9uXywgd2FpdCkge1xuXHRpZiAodHlwZW9mIGZ1bmN0aW9uXyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIHRoZSBmaXJzdCBhcmd1bWVudCB0byBiZSBhIFxcYGZ1bmN0aW9uXFxgLCBnb3QgXFxgJHt0eXBlb2YgZnVuY3Rpb25ffVxcYC5gKTtcblx0fVxuXG5cdC8vIFRPRE86IEFkZCBgd2FpdGAgdmFsaWRhdGlvbiB0b28gaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbi5cblxuXHRsZXQgdGltZW91dElkO1xuXHRsZXQgbGFzdENhbGxUaW1lID0gMDtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdGhyb3R0bGVkKC4uLmFyZ3VtZW50c18pIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWVzXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG5cblx0XHRjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXHRcdGNvbnN0IHRpbWVTaW5jZUxhc3RDYWxsID0gbm93IC0gbGFzdENhbGxUaW1lO1xuXHRcdGNvbnN0IGRlbGF5Rm9yTmV4dENhbGwgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cblx0XHRpZiAoZGVsYXlGb3JOZXh0Q2FsbCA8PSAwKSB7XG5cdFx0XHRsYXN0Q2FsbFRpbWUgPSBub3c7XG5cdFx0XHRmdW5jdGlvbl8uYXBwbHkodGhpcywgYXJndW1lbnRzXyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRsYXN0Q2FsbFRpbWUgPSBEYXRlLm5vdygpO1xuXHRcdFx0XHRmdW5jdGlvbl8uYXBwbHkodGhpcywgYXJndW1lbnRzXyk7XG5cdFx0XHR9LCBkZWxheUZvck5leHRDYWxsKTtcblx0XHR9XG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iXSwibmFtZXMiOlsidGhyb3R0bGUiLCJmdW5jdGlvbl8iLCJ3YWl0IiwiVHlwZUVycm9yIiwidGltZW91dElkIiwibGFzdENhbGxUaW1lIiwidGhyb3R0bGVkIiwiYXJndW1lbnRzXyIsImNsZWFyVGltZW91dCIsIm5vdyIsIkRhdGUiLCJ0aW1lU2luY2VMYXN0Q2FsbCIsImRlbGF5Rm9yTmV4dENhbGwiLCJhcHBseSIsInNldFRpbWVvdXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxTQUFTQyxTQUFTLEVBQUVDLElBQUk7SUFDaEMsSUFBSSxPQUFPRCxjQUFjLFlBQVk7UUFDcEMsTUFBTSxJQUFJRSxVQUFVLENBQUMsd0RBQXdELEVBQUUsT0FBT0YsVUFBVSxHQUFHLENBQUM7SUFDckc7SUFFQSw2REFBNkQ7SUFFN0QsSUFBSUc7SUFDSixJQUFJQyxlQUFlO0lBRW5CLE9BQU8sU0FBU0MsVUFBVSxHQUFHQyxVQUFVO1FBQ3RDQyxhQUFhSjtRQUViLE1BQU1LLE1BQU1DLEtBQUtELEdBQUc7UUFDcEIsTUFBTUUsb0JBQW9CRixNQUFNSjtRQUNoQyxNQUFNTyxtQkFBbUJWLE9BQU9TO1FBRWhDLElBQUlDLG9CQUFvQixHQUFHO1lBQzFCUCxlQUFlSTtZQUNmUixVQUFVWSxLQUFLLENBQUMsSUFBSSxFQUFFTjtRQUN2QixPQUFPO1lBQ05ILFlBQVlVLFdBQVc7Z0JBQ3RCVCxlQUFlSyxLQUFLRCxHQUFHO2dCQUN2QlIsVUFBVVksS0FBSyxDQUFDLElBQUksRUFBRU47WUFDdkIsR0FBR0s7UUFDSjtJQUNEO0FBQ0Q7QUFFQUcsT0FBT0MsT0FBTyxHQUFHaEIiLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvdGhyb3R0bGVpdC9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/throttleit/index.js\n");

/***/ })

};
;