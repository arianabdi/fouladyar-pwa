#!/bin/bash

# Install Node.js (if not already installed)
if ! command -v node &>/dev/null; then
  echo "Installing Node.js..."
  curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v jq &>/dev/null; then
  echo "Installing jq..."
  sudo apt-get install -y jq
fi

# Install NestJS CLI (if not already installed)
if ! command -v nest &>/dev/null; then
  echo "Installing NestJS CLI..."
  sudo npm install -g @nestjs/cli
fi


# Install NestJS CLI (if not already installed)
if ! command -v pm2 &>/dev/null; then
  echo "Installing pm2..."
  sudo npm install -g pm2
fi


# Clone your GitHub repository (replace <your-github-repository-url> with your actual repository URL)
echo "Cloning your project..."
git clone "https://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@github.com/arianabdi/cliconsult-web.git"

# Navigate to the project directory
cd cliconsult-web
#sudo chmod +x ./scripts/set_users.sh
#sudo chmod +x ./scripts/reboot.sh

# Install project dependencies
echo "Installing node modules..."
npm install --legacy-peer-deps

# Build the NestJS application
echo "Building the React application..."
npm run build

# Start the application using pm2 (assuming pm2 is installed)
echo "Starting the application"
#npm start dist/main.js
npm start:prod

#start application after server reboot
pm2 startup

echo "Installation completed!"
