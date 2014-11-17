Whitelist
=========


whitelist is a free, easy to use, to do list by chip cressman

Visit [whitelist.cressmancm.com](http://whitelist.cressmancm.com) for a demo.

#Install

To run this app locally from the source files, you need [bower](http://bower.io/) and [gulp](http://gulpjs.com/). Once installed, open the directory in Terminal and run the following:

```
npm install
bower install
```

#View Locally

To start the built in preview server, run the following:

```
gulp serve
```


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

#Thanks

Thanks to [Subtle Patterns](http://subtlepatterns.com/) for their awesome backgrounds!

#Fun

Open the app in two different devices and change the background, edit, complete, and delete todos. Also, on mobile, save the page to your home screen.

Enjoy :]
