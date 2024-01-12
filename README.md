# BeeReal

## Github Repo

<https://github.com/BeeRealTheRealOne/BeeReal>

## Installation

To install all dependencies run "npm install"
To start the app use "npx expo start"

if you want to see what an account with data might look like:
username: testUser
password: testUser

## Devices

tldr: we advice on using an android emulator

Android:
The app was developed and tested using an android emulation of a "pixel 3A" using android studio.

Web:
We put some effort into fixing bugs with the web version. Some dependencies didn't work but we were able to fix most of them.
When using firefox the Camera view doesnt work because Firefox doesnt support some neccessary features for our camera-permission plugin, so we advice to use a Chromium based browser instead.
The Styles for Web look different and break compared to Android emulation, but we wrote some OS dependant code to negate that as good as possible. (Still known problems: "Background images dont work, some styles look different")

IOS:
Using an ios device, the aspect ratio of the camera is most likeley broken. It should be 1:1, but we had no device to test that and this is just a guess based on documentation and forum posts.

## Backends

There are 2 different selectable backends (see .env file). By default the instance running on our personal server is selected. On the same server there are different Machine-Learning services running, so sometimes response times can be long.
If this is the case there is a backup on "pockerhost.io", just comment out our the "mitschl.de" variable and uncomment the "pockethost.io" variable
