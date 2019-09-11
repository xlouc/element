/** @format */
const cp = require('child_process')
const fs = require('fs-extra')
const path = require('path')
const util = require('util')

/**
 * @constructor
 * @param {number} code Error code.
 * @param {string} message Error message.
 */
function ProcessError(code, message) {
  const callee = arguments.callee
  Error.apply(this, [message])
  Error.captureStackTrace(this, callee)
  this.code = code
  this.message = message
  this.name = callee.name
}
util.inherits(ProcessError, Error)
/**
 * Util function for handling spawned processes as promises.
 * @param {string} exe Executable.
 * @param {Array.<string>} args Arguments.
 * @param {string} cwd Working directory.
 * @return {Promise} A promise.
 */
function spawnSync(exe, args, cwd, stdio = false) {
  let options = { cwd: cwd || process.cwd() }
  if (stdio) {
    options.stdio = 'inherit'
    options.shell = true
  }
  return cp.spawnSync(exe, args, options)
}

/**
 * Util function for handling spawned processes as promises.
 * @param {string} exe Executable.
 * @param {Array.<string>} args Arguments.
 * @param {string} cwd Working directory.
 * @return {Promise} A promise.
 */
function spawn(exe, args, cwd, stdio = false) {
  return new Promise((resolve, reject) => {
    let options = { cwd: cwd || process.cwd() }
    if (stdio) {
      options.stdio = 'inherit'
      options.shell = true
    }
    const child = cp.spawn(exe, args, options)
    const buffer = []
    if (!stdio) {
      child.stderr.on('data', chunk => {
        buffer.push(chunk.toString())
      })
      child.stdout.on('data', chunk => {
        buffer.push(chunk.toString())
      })
    }
    child.on('close', code => {
      const output = buffer.join('')
      if (code) {
        const msg = 'Process failed: ' + code
        reject(new ProcessError(code, msg))
      } else {
        resolve(output)
      }
    })
  })
}

/**
 * Create an object for executing git commands.
 * @param {string} cwd Repository directory.
 * @param {string} exe Git executable (full path if not already on path).
 * @constructor
 */
function Git(cwd, cmd) {
  this.cwd = cwd
  this.cmd = cmd || 'git'
  this.output = ''
}

/**
 * Execute an arbitrary git command.
 * @param {string} var_args Arguments (e.g. 'remote', 'update').
 * @return {Promise} A promise.  The promise will be resolved with this instance
 *     or rejected with an error.
 */
Git.prototype.exec = function() {
  return spawn(this.cmd, [].slice.call(arguments), this.cwd).then(output => {
    this.output = output
    return this
  })
}

/**
 * Execute an arbitrary git command.
 * @param {string} var_args Arguments (e.g. 'remote', 'update').
 * @return {Promise} A promise.  The promise will be resolved with this instance
 *     or rejected with an error.
 */
Git.prototype.logByExec = function() {
  console.log(this.cmd, [].slice.call(arguments).join(' '))
  return spawn(this.cmd, [].slice.call(arguments), this.cwd, true).then(() => {
    return this
  })
}

/**
 * Initialize repository.
 * @return {Promise} A promise.
 */
Git.prototype.init = function() {
  return this.logByExec('init')
}

/**
 * Clean up unversioned files.
 * @return {Promise} A promise.
 */
Git.prototype.clean = function() {
  return this.logByExec('clean', '-f', '-d')
}

/**
 * Hard reset to remote/branch
 * @param {string} remote Remote alias.
 * @param {string} branch Branch name.
 * @return {Promise} A promise.
 */
Git.prototype.reset = function(remote, branch) {
  return this.logByExec('reset', '--hard', remote + '/' + branch)
}

/**
 * Fetch from a remote.
 * @return {Promise} A promise.
 */
Git.prototype.fetch = function(...args) {
  return this.logByExec('fetch', ...args)
}

/**
 * Checkout a branch (create an orphan if it doesn't exist on the remote).
 * @param {string} remote Remote alias.
 * @param {string} branch Branch name.
 * @return {Promise} A promise.
 */
Git.prototype.checkout = function(remote, branch) {
  const treeish = remote + '/' + branch
  return this.logByExec('ls-remote', '--exit-code', '.', treeish).then(
    () => {
      // branch exists on remote, hard reset
      return this.logByExec('checkout', branch)
        .then(() => this.clean())
        .then(() => this.reset(remote, branch))
    },
    error => {
      if (error instanceof ProcessError && error.code === 2) {
        // branch doesn't exist, create an orphan
        return this.logByExec('checkout', '--orphan', branch)
      } else {
        // unhandled error
        throw error
      }
    }
  )
}

Git.prototype.rebase = function(branch) {
  return this.logByExec('rebase', branch)
}

Git.prototype.merge = function(...args) {
  return this.logByExec('merge', ...args)
}

/**
 * Remove all unversioned files.
 * @param {string} files Files argument.
 * @return {Promise} A promise.
 */
Git.prototype.rm = function(files) {
  return this.logByExec('rm', '--ignore-unmatch', '-r', '-f', files)
}

/**
 * Add files.
 * @return {Promise} A promise.
 */
Git.prototype.add = function(...args) {
  return this.logByExec('add', ...args)
}

/**
 * Commit (if there are any changes).
 * @param {string} message Commit message.
 * @return {Promise} A promise.
 */
Git.prototype.commit = function(message) {
  return this.logByExec('diff-index', '--quiet', 'HEAD').catch(() => this.logByExec('commit', '-m', message))
}

/**
 * Add tag
 * @param {string} name Name of tag.
 * @return {Promise} A promise.
 */
Git.prototype.tag = function(name) {
  return this.logByExec('tag', name)
}

/**
 * Push a branch.
 * @param {string} remote Remote alias.
 * @param {string} branch Branch name.
 * @return {Promise} A promise.
 */
Git.prototype.push = function(...args) {
  return this.logByExec('push', ...args)
}

Git.prototype.pull = function() {
  return this.logByExec('pull')
}

Git.prototype.setRemoteUrl = function(remote, url) {
  return this.exec('remote', 'add', remote, url)
}

/**
 * Get the URL for a remote.
 * @param {string} remote Remote alias.
 * @return {Promise<string>} A promise for the remote URL.
 */
Git.prototype.getRemoteUrl = function(remote) {
  return this.exec('config', '--get', 'remote.' + remote + '.url')
    .then(git => {
      const repo = git.output && git.output.split(/[\n\r]/).shift()
      if (repo) {
        return repo
      } else {
        throw new Error('Failed to get repo URL from options or current directory.')
      }
    })
    .catch(err => {
      throw new Error(
        'Failed to get remote.' +
          remote +
          '.url (task must either be ' +
          'run in a git repository with a configured ' +
          remote +
          ' remote ' +
          'or must be configured with the "repo" option).'
      )
    })
}

Git.prototype.config = function(...args) {
  return this.logByExec('config', ...args)
}

/**
 * Clone a repo into the given dir if it doesn't already exist.
 * @param {string} repo Repository URL.
 * @param {string} dir Target directory.
 * @param {string} branch Branch name.
 * @return {Promise<Git>} A promise.
 */
Git.clone = function clone(repo, dir, ...args) {
  return fs.exists(dir).then(exists => {
    if (exists) {
      return Promise.resolve(new Git(dir, 'git'))
    } else {
      return fs.mkdirp(path.dirname(path.resolve(dir))).then(() => {
        return spawn('git', ['clone', repo, dir].concat([].slice.call(args)), process.cwd(), true).then(() => new Git(dir, 'git'))
      })
    }
  })
}

Git.spawn = spawn
Git.spawnSync = spawnSync

module.exports = Git
