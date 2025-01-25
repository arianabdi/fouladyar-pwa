#!/bin/bash


# Check if pm2 process with the name 'fxpilot-react' exists and delete it
if pm2 list | grep -q "fouladyar-pwa"; then
  echo "Stopping and deleting existing 'fouladyar-pwa' PM2 process..."
  pm2 delete fouladyar-pwa
fi

# Remove the existing 'mrpropfund-react' folder if it exists
if [ -d "fouladyar-pwa" ]; then
  echo "Removing existing 'fouladyar-pwa' directory..."
  rm -rf fouladyar-pwa
fi


# Install Node.js (if not already installed)
if ! command -v node &>/dev/null; then
  echo "Installing Node.js..."
  sudo sudo apt update
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

if ! command -v jq &>/dev/null; then
  echo "Installing jq..."
  sudo apt-get install -y jq
fi

# Install NGinx (if not already installed)
if ! command -v nginx &>/dev/null; then
  echo "Installing NGinx..."
  sudo apt-get install nginx
fi


# Install Pm2 (if not already installed)
if ! command -v pm2 &>/dev/null; then
  echo "Installing pm2..."
  sudo npm install -g pm2
fi


# Install Pm2 (if not already installed)
if ! command -v yarn &>/dev/null; then
  echo "Installing pm2..."
  sudo npm install -g yarn
fi

# Install Serve (if not already installed)
if ! command -v serve &>/dev/null; then
  echo "Installing serve..."
  sudo npm install -g serve
fi


# Clone your GitHub repository (replace <your-github-repository-url> with your actual repository URL)
echo "Cloning your project..."
git clone "https://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@github.com/arianabdi/fouladyar-pwa.git"



# Navigate to the project directory
cd fouladyar-pwa

# Install project dependencies
echo "Installing node modules..."
yarn install

# Build the NestJS application
echo "Building the Next application..."
npm run build:webpack

# Ensure the build process is complete and doesn't hang
if [ $? -ne 0 ]; then
  echo "Webpack build failed. Exiting installation."
  exit 1
fi

echo "Webpack build completed successfully."

# Start the application using pm2 (assuming pm2 is installed)
echo "Starting the application"
#npm start dist/main.js
pm2 start app.config.json

#start application after server reboot
pm2 save

#start application after server reboot
pm2 startup

echo "Installation completed!"
