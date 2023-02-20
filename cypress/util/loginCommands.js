// /* global Cypress, cy */
// import "@testing-library/cypress/add-commands";

// const USERNAME = Cypress.env("USERNAME");
// const PASSWORD = Cypress.env("PASSWORD");
// const FARMHOUSE_BASE_URL = Cypress.env("FARMHOUSE_BASE_URL");
// const AUTH_BASE_URL = Cypress.env("AUTH_BASE_URL");

// export function loginToApplication(username = USERNAME, password = PASSWORD) {
//     cy.visit(FARMHOUSE_BASE_URL).then(()=>{
//         navigateToLogin(FARMHOUSE_BASE_URL)
//         .then((x) => redirectToKeymasterAuthorize(x))
//         .then((x) => redirectToKeymasterLogin(x, AUTH_BASE_URL))
//         .then((x) => postLogin(x, AUTH_BASE_URL, username, password))
//         .then((x) => farmhouseCallback(x))
//     });
// }


// export function navigateToLogin(farmhouse_base_url) {
//     const loginPath = `/login?sub=&loginMethodId=`
//     cy.log("Target URL = ", `${farmhouse_base_url}${loginPath}`);
//     return cy
//         .request({
//             url: `${farmhouse_base_url}${loginPath}`,
//             method: "GET",
//             followRedirect: false,
//         })
//         .then((response) => {
//             let headers = response.headers;
//             let location = headers.location;
//             let client_id = location.split("?")[1].split("&")[0].split("=")[1];
//             let state = location.split("?")[1].split("&")[4].split("=")[1];

//             let result = {
//                 location: location,
//                 client_id: client_id,
//                 state: state,
//             };

//             cy.log("navigateToLogin result", result);
//             return cy.wrap(result);
//         });
// }

// export function redirectToKeymasterAuthorize(args) {
//     cy.log("Target URL = ", args.location);
//     return cy
//         .request({
//             url: args.location,
//             method: "GET",
//             followRedirect: false,
//         })
//         .then((response) => {
//             let headers = response.headers;
//             let cookies = headers["set-cookie"];
//             let km_sess_cookie = cookies[0];
//             let km_sess_sig_cookie = cookies[1];

//             let location = headers.location;
//             let keymaster_session = location.split("/")[2]; //the uuid

//             let result = {
//                 km_sess_cookie: km_sess_cookie,
//                 km_sess_sig_cookie: km_sess_sig_cookie,
//                 keymaster_session: keymaster_session,
//                 location: location,
//             };

//             cy.log("redirectToKeymasterAuthorize result", result);
//             return cy.wrap(result);
//         });
// }

// export function redirectToKeymasterLogin(args, auth_base_url) {
//     cy.log("Target URL = ", `${auth_base_url}${args.location}`);
//     return cy
//         .request({
//             url: `${auth_base_url}${args.location}`,
//             method: "GET",
//             followRedirect: false,
//             headers: {
//                 Cookie: `{args.km_sess_cookie}; {args.km_sess_sig_cookie}`,

//                 // Cookie: args.km_sess_cookie,
//                 // Cookie: args.km_sess_sig_cookie,
//             },
//         })
//         .then(() => {
//             let result = {
//                 km_sess_cookie: args.km_sess_cookie,
//                 km_sess_sig_cookie: args.km_sess_sig_cookie,
//                 keymaster_session: args.keymaster_session,
//                 location: args.location,
//             };

//             cy.log("redirectToKeymasterLogin result", result);
//             return cy.wrap(result);
//         });
// }

// export function postLogin(args, auth_base_url, username, password) {
//     cy.log("Target URL = ", `${auth_base_url}${args.location}`);
//     cy.log("Logging in as: ", username);
//     return cy
//         .request({
//             url: `${auth_base_url}${args.location}`,
//             method: "POST",
//             followRedirect: false,
//             form: true,
//             headers: {
//                 Cookie: `{args.km_sess_cookie}; {args.km_sess_sig_cookie}`,

//                 // Cookie: args.km_sess_cookie,
//                 // Cookie: args.km_sess_sig_cookie,
//             },
//             body: {
//                 loginMethodId: "00000000-0000-0000-0000-000000000000",
//                 session: args.keymaster_session,
//                 email: username,
//                 page: "password",
//                 password: password,
//             },
//         })
//         .then((response) => {
//             let headers = response.headers;
//             let result = {
//                 km_sess_cookie: args.km_sess_cookie,
//                 km_sess_sig_cookie: args.km_sess_sig_cookie,
//                 location: headers.location,
//             };

//             cy.log("postLogin result", response);
//             return cy.wrap(response);
//         });
// }

// export function farmhouseCallback(args) {
//     cy.log("Target URL = ", args.location);
//     return cy
//         .request({
//             url: `${args.location}`,
//             method: "GET",
//             followRedirect: false,
//             headers: {
//                 Cookie: `{args.km_sess_cookie}; {args.km_sess_sig_cookie}`,
//             },
//         })
//         .then((response) => {
//             // let headers = response.headers;
//             // let location = headers.location;
//             // let farmhouse_session_cookie = headers["set-cookie"][0];
//             // let qparams = location.split("?")[1].split("&");
//             // let token = qparams[0].split("=")[1];
//             // let sub = qparams[1].split("=")[1];
//             // let pdftron = qparams[2].split("=")[1];
//             // let result = {
//             //     farmhouse_session_cookie: farmhouse_session_cookie,
//             //     location: location,
//             //     token: token,
//             //     sub: sub,
//             //     pdftron: pdftron,
//             // };

//             cy.log("farmhouseCallback", response);
//             return cy.wrap(response);
//         });
// }

// export function farmhouseSuccess(args) {
//     cy.log("Target URL = ", args.location);
//     return cy
//         .request({
//             url: `${args.location}`,
//             method: "GET",
//             followRedirect: false,
//             headers: {
//                 Cookie: args.farmhouse_session_cookie,
//             },
//         })
//         .then(() => {
//             let result = {
//                 farmhouse_session_cookie: args.farmhouse_session_cookie,
//                 location: args.location,
//                 token: args.token,
//                 sub: args.sub,
//                 pdftron: args.pdftron,
//             };

//             cy.log("farmhouseSuccess", result);
//             return cy.wrap(result);
//         });
// }

// export function logout() {
//     return cy.visit(FARMHOUSE_BASE_URL).then(() => {
//         cy.get('[class*="AccountMenu__target"]').click();
//         cy.get('[class*="AccountMenu__accountMenu__logOut_"]').click();
//     });
// }
