## Getting Started

* fork repo
* clone repo
* from your cloned repo, 
    run `git remote add upstream https://github.com/SFFccCamp/JobMailer.git`
* Get latest code from development `git fetch upstream`
* Jump into the `development` branch. `git checkout development`
* get latest code from upstream/dev `git merge upstream/development`
* Make your own feature branch `git checkout -b <your branch name>` from `origin/development`
* Fetch latest code again before pushing your branch.
  1. Commit or stash your changes
  2. `git checkout development`
  3. `git fetch upstream`
  4. `git checkout <your branch name>`
  5. `git merge upstream/development`
  6. Fix any conflicts
  7. Push your new branch
* Make a pull request from your new branch against the fork against your clone branch