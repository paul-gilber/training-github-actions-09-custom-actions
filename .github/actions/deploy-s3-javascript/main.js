const core   = require('@actions/core');
const github = require('@actions/github');
const exec   = require('@actions/exec');

function run() {
  // Get inputs
  const bucket_name   = core.getInput('bucket-name'  , {required: true} );
  const bucket_region = core.getInput('bucket-region', {required: true} );  // values with default value will always be available
  const dist_folder   = core.getInput('dist-folder'  , {required: true} );

  // GitHub Octokit client can be used to communicate with GitHub APIs (from @actions/github)
  // github.getOctokit()

  // GitHub context is provided by @actions/github
  // github.context

  // AWS CLI is pre-installed in GitHub-hosted runners
  // https://github.com/actions/runner-images/blob/main/images/linux/Ubuntu2204-Readme.md#cli-tools
  const s3_uri = `s3://${bucket_name}`
  // Sync(Upload) files from `dist_folder` to AWS S3 bucket
  // AWS CLI Environment Variables - can be set in Step's `env`
  // - AWS_ACCESS_KEY_ID
  // - AWS_SECRET_ACCESS_KEY
  exec.exec(`aws s3 sync ${dist_folder} ${s3_uri} --region ${bucket_region}`) // Run command from terminal

  core.notice('Hello from my custom JavaScript Action!');
}

run();
