# Windows


## Prerequisites

- Windows app development requires [VisualStudio](http://visualstudio.com/)
  Express 2013 or Community 2015 or better

- follow the build instructions: [howto-cordova.md](howto-cordova.md)

- customised config.xml (as appropriate)


## Visual Studio

The Cordova build process will generate a Solution containing one or more Projects for use within Visual Studio.
You can find the Solution ".sln" file in the "platforms/windows" directory.

You may use Visual Studio to add SDKs (e.g. Bing Maps) to the desired Projects:

- Solution Explorer -> right-click on the Project -> Add -> Reference...


## Enterprise Distribution (Side-Loading)

To create the package:

1. Solution Explorer -> right-click on the Project -> Store -> Create App Packages...

2. when asked "Do you want to build packages to upload to the Windows Store", choose "No"

3. customise settings in the wizard as desired, then click Create

You will find the generated ".appxupload" file and your built package directory in the "platforms/windows/AppPackages" directory.

To prepare the package for distribution:

1. within your built package directory, edit the PowerShell script "Add-AppDevPackage.ps1"

2. comment out (with a "#") the line: `$NeedDeveloperLicense = CheckIfNeedDeveloperLicense`

3. add the line: `$NeedDeveloperLicense = $false` and save the PowerShell script

Congratulations!
Now you are ready to distribute this package to any Windows 8.x or 10 device that allows side-loading.

Side-loading in Windows 8.x is available when:

- the machine is a member of an Active Directory Domain

- the local user logged in using an Active Directory account

Side-loading in Windows 10 is a Developer option in the Settings app.
