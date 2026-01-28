#!/bin/bash

#######################################
# Setup package managers
#######################################
function setup_package_managers() {
  npm install -g npm
  npm i -g @antfu/ni
  npm i -g pnpm
  npm i -g ts-node
}

#######################################
# Install dependencies
#######################################
function install_dependencies() {
  yes | pnpm install
  # pnpm install --no-optional --config.confirmModulesPurge=false
}

#######################################
# Setup git hooks
#######################################
function setup_githooks() {
  npx --yes simple-git-hooks
}

#######################################
# Setup devcontainer
#######################################
setup_package_managers
install_dependencies
setup_githooks

echo "Setup complete!"
