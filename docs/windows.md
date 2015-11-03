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

## Setting the target version of windows

To target Windows 10 you will need to put `<preference name="windows-target-version" value="10.0" />` in your `config.xml` file.
It is possible to target both Windows 8.1 and Windows 10 in the same `config.xml` file:


    <platform name="windows">
      <preference name="windows-target-version" value="8.1" />
    </platform>

or

    <platform name="windows">
      <preference name="windows-target-version" value="10.0" />
    </platform>


See the Cordova for Windows 10 [platform guide](http://cordova.apache.org/docs/en/5.1.1/guide/platforms/win8/win10-support.html) for more details


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


## Known Issues and solutions/work arounds

### `history.back()` or `history.go(-1)` can crash the cordova app

If you have targeted Windows 8.1 in `config.xml` and are running the app on a Windows 10 machine,
using `history.back()` can be problematic. When your applications `history.length` is greater 
than 0, calling `history.back()` or `history.go(-1)` so that the current index should become -1 will cause 
the app to crash, and removing all event listeners from all DOM nodes.

The only fix is to make a build of your app that targets Windows 10, and use that on Windows 10 devices.
See the section above for details on how to target different windows architectures.
