# HackYourFuture Assignment Template
> [!TIP]
> Need any help with git? Feel free to reach out on [#git-support](https://hackyourfuture-cph.slack.com/archives/CU1K85X3R)

## About this repo
This is a template repo that, as a trainee, you can fork to your own GitHub account, so you can submit your assignments.

A _"Fork"_ is a copy of a repository that is connected to the original repository it was copied from, and can be used to collaborate.

You can read more about forks here: [Github - Working with Forks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#about-forks)

## Trainee instructions
### Set up
If this is your first time using this repo, follow these steps:

1. Scroll to the top of this repo, and click "Fork" and "Create a new fork":

    ![Fork](./assets/create-fork.png)

2. Follow the instructions to create a new repository under your own account, as shown below:

    ![Create Repo](./assets/create-repo.png)

3. After the repo has been created, clone it locally as you would with any repo (see ["Cloning a respository"](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) for help):

    ![Clone](./assets/clone.png)

### Updating with the latest changes
Sometimes we make changes to the assignment templates, which you will need to get a hold of. If you have already forked this repo, you won't get these changes automatically. You will need to copy the changes from the HackYourFuture repo to your own. Luckily, the "Sync fork" feature on GitHub makes it easy!

![Sync Fork](./assets/sync-fork.png)

1. Click "Sync fork" at the top of your repo
1. Click "Update branch"
1. If there are any conflicts, GitHub will prompt you to create a PR and resolve them. For any assignments you've already completed, you should keep your own changes. For any assignments that you haven't done yet (or don't recognise), you should keep the changes from the parent.
1. Congrats! It's now up to date. You can confirm this by checking next to the "Sync fork" button which should now read something like "This branch is up to date with...".

### Completing the assignments
> [!TIP]
  > Before we get into the instructions, remember that Git has a steep learning curve, and if you get stuck, refer back to your previous Git sessions for a refresher or reach out for help on slack.
  >
  > Here's some general tips to keep in mind:
  > - Before creating a new branch for your assignment, make sure you start from `main`: `git checkout main`.
  > - Keep your local `main` up to date with the remote `main`, especially after any merges.
  > - Write meaningful commit messages, to make it easier to follow your progress and review.

#### 1. Starting your assignment
1. Open your local assignment repo and check which branch you are on.
2. If you're on another assignment branch, make sure any unsaved changes are committed (or discarded), and then move to `main`.
3. Make sure `main` is up to date (`git pull origin main`)
4. If you're already on `main`, you're ready for the next step!
5. Create a new assignment branch with the following naming scheme `module-name-weeknumber/yourname`

Now you're ready to complete your assignment. Remember to commit often, with useful messages.

#### 2. Submission process
1. When you're ready to submit your assignment, make sure you're in your local repo and on the correct branch.
2. Push the assignment branch to Github
3. Create a Pull Request (PR) **by Wednesday end of day** (unless otherwise agreed)
4. **Important** Make sure you are creating a PR against your own repo (Fork), And not the HackYourFuture-CPH one.

   _You may need to manually select your own repository as a "base" when creating a pull request as shown here:_

   ![Pull Request Creation from Fork](./assets/pull-request-fork-selection.png)

5. Find the "Assignment Submission" Google Sheet (bookmarked in your team's slack channel) and follow the instructions there. It will look something like this:

   ![Submission Sheet](./assets/submission-sheet.png)

## Mentor instructions
### Reviewing assignments
If you're an Assignment Reviewer, follow these steps each week:
1. Find the "Assignment Submission" Google Sheet (bookmarked in the team's slack channel)
2. Look through the relevant week/module and choose a red PR to review
3. Once you've left your initial feedback, set it to yellow.
  > [!TIP]
  > You should default to use the "Request changes" option when reviewing a PR. It should be clear to the trainee when they need to change something. Once you are happy with the changes, then use "Approve".
  >
  > If you are not requesting any specific changes, it's ok to leave comments, but be sure to approve the PR as well so we don't leave anyone hanging.
4. Once any discussion/changes have been completed, it's up to the trainee to merge the PR and set it to green.
