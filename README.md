Whitelist
=========


whitelist is a free, easy to use, to do list by chip cressman

Visit [whitelist.cressmancm.com](whitelist.cressmancm.com) for a demo.

#Install

To run this app locally from the source files, you need [bower](http://bower.io/) and [gulp](http://gulpjs.com/). Once installed, open the directory in Terminal and run the following:

```
gulp serve
```

This will start a local server and open the app in the browser.



#Distribution Build

To build the distribution version of the app, run the following:

```
gulp clear clean

```

and then:

```
gulp
```

This will compile all the SCSS, prefix all CSS, lint the scripts, optimize the images, minify and concat all scripts/styles, add all the Bower dependencies, and create a dist folder ready for deployment.


#Fun

Open the app in two different devices and change the background, edit, complete, and delete todos :)
