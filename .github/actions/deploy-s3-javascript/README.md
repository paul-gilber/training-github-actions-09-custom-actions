# Creating JavaScript Action

## Initialize directory
```sh
cd .github/actions/deploy-s3-javascript
npm init -y
# Adding actions toolkit packages
# https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#adding-actions-toolkit-packages
npm install @actions/core \
            @actions/github \
            @actions/exec

# Note:
# - all required dependencies in `node_modules` directory must be included to the repository
# - github actions will not install and download dependencies
```