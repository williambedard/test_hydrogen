const core = require('@actions/core');
const github = require('@actions/github');

async function main() {
  const ref = core.getInput('ref', { required: true });
  const sha = core.getInput('sha', { required: true });
  const environment = core.getInput('environment', {
    required: true,
  });
  const preview_url = core.getInput('preview_url', {
    required: true,
  });
  const description = core.getInput('description');
  const creator = core.getInput('creator', {
    required: true,
  });
  const token = core.getInput('token', { required: true });

  const octokit = github.getOctokit(token, {
    previews: ['ant-man-preview', 'flash-preview'],
  });

  const { owner, repo } = github.context.repo;
  const req = {
    owner,
    repo,
    ref,
    environment,
    description,
    auto_merge: false,
    required_contexts: [],
    payload: {
      ref,
      sha,
      creator,
      environment,
      preview_url,
      description,
    }
  };

  const resp = await octokit.rest.repos.createDeployment(req);

  if (resp.status >= 400) {
    throw new Error('Failed to create a new deployment');
  }

  await octokit.rest.repos.createDeploymentStatus({
    repo,
    owner,
    deployment_id: resp.data.id,
    environment_url: preview_url,
    state: 'success',
  });
}

main().catch(function (error) {
  core.setFailed(error.message);
  process.exit(1);
});
