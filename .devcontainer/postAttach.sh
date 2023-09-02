#!/bin/sh
set -e

# This should not be needed but at the time of this writing the install is not working for me.
if [ -f /home/vscode/dotfiles/install.sh ] && [ ! -f /home/vscode/.dotfilesinstalled ]; then
  /home/vscode/dotfiles/install.sh
  touch /home/vscode/.dotfilesinstalled
fi
