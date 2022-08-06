# Fun with playwright

1. Clone repository `git@github.com:dz1dz1on/fun-with-playwright.git`
2. After clonning repository you need to run inside a project: `npm install` to install all needed dependencies
3. To run test on local machine you need to be in the project directory and use:
`npm run test`

Due to only one avalaiable user tests are running one after another - parallel testing is off.

# Things that should be done (sadly I didn't made on time):
- create dockerfile for CI/CD which will pull playwright image and build it then  publish to docker site or any cloud
- create proper workflow for CI/CD with above dockerfile where we copy tests to the builded image
- create wrapper class around axios to do API requests
- automate via API creation and logging of the user (would need knowledge about backend and API and documentation)
- adding visual regression for doing screenshots comparison after adding folder inside folder (maybe Percy will be good for it or just use build in playwright)
- extend number of date-test-id in whole system (needed access to front-end)
- add url builder instead of using hardcoded values
- remove any hardcoded user or envs from the code and use it via env variables
- move some repetetive stuff to shared-components catalogue and create new utils
- artifacts are too big to be stored in github => maybe we should store them in S3 and somehow add them links to download them?


