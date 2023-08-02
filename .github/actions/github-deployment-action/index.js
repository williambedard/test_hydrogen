const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

async function main() {
  const ref = core.getInput('ref', { required: true });
  const sha = core.getInput('sha', { required: true });
  const environment = core.getInput('environment', { required: true });
  const description = core.getInput('description');

  const { owner, repo } = context.repo;
  const req = {
    owner,
    repo,
    ref,
    sha,
    environment,
    description
  };

  const payload = core.getInput('payload');
  if (payload) {
    req['payload'] = JSON.parse(payload);
  }

  const github = new GitHub(
    process.env.GITHUB_TOKEN,
    { previews: ["ant-man-preview", "flash-preview"]});

  const resp = await github.repos.createDeployment(req);

  if (resp.status >= 400) {
    throw new Error("Failed to create a new deployment");
  }
}

main().catch(function(error) {
  core.setFailed(error.message);
});
