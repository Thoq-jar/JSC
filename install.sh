#!/bin/bash

echo "+-------------------------------+"
echo "+ Welcome to the JSC Installer! +"
echo "+       Developed by Thoq       +"
echo "+-------------------------------+"

echo "Checking for dependencies..."
if ! [ -x "$(command -v node)" ]; then
  echo "Error: Node.js is not installed!" >&2
  exit 1
fi

echo "Building files..."
chmod +x src/compiler.js >> /dev/null 2>&1
npm i
echo "Installing files..."
sudo cp src/compiler.js /usr/local/bin/jsc >> /dev/null 2>&1

echo "Finishing up..."
# shellcheck disable=SC1090
[ -f ~/.zshrc ] && source ~/.zshrc >> /dev/null 2>&1
# shellcheck disable=SC1090
[ -f ~/.bashrc ] && source ~/.bashrc >> /dev/null 2>&1
# shellcheck disable=SC1090
[ -f ~/.bash_profile ] && source ~/.bash_profile >> /dev/null 2>&1

echo "Installation complete!"
exit 0
