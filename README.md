# Data Science Modules Website
___

Designed and developed by Tony Zhao @([tonyzhao.org](http://tonyzhao.org))

* Running on Jekyll
	- <https://jekyllrb.com/>
* Designed using Bootstrap 4 
	- <https://getbootstrap.com/>
* Base theme is Litera by Bootswatch
	- <https://bootswatch.com/litera/>
* Icons from Font Awesome
	- <https://fontawesome.com/>
* Use of modified version of Github Widget script
	- <https://github.com/jawj/github-widget>

## Documentation

Typically, the only files that need to be updated/maintained are the `index.md`(homepage), `guide.md`, `library.md`, and `about.md`. Other files that often might be changed are the individual featured modules in `_featured`. Very occaisionally, when site-wide changes need to be made, the `_config.yml` file should be edited. Otherwise, don't change any other files unless you know what you're doing ;).

DO NOT CHANGE THE `docs` FOLDER: It holds the `.html` files for the site, but any changes made in here will be overwritten when jekyll regenerates the site. This folder will be wiped clean and regenerated from the `.md` files everytime. To further understand, read the __How it works__ section of this file.

After making edits to the `.md` files, run `jekyll serve` to host the site locally and see what the changes look like on the site. This command will also rebuild the `docs` folder. If the changes are to be pushed onto the live site, simply stage and and commit everything (including the changes in the `docs` folder MADE BY JEKYLL), and push to origin master.

## Home page

Documentation will be updated soon

## Featured modules

Documentation will be updated soon

## Guide page

Documentation will be updated soon

## Library page

Documentation will be updated soon

## About page

Documentation will be updated soon

## Site-wide maintanence

Documentation will be updated soon

## How it works

Github pages reads from the `docs` folder located at the root directory of the `master` branch. Jekyll regenerates and builds the files in `docs` from the `.md` files. 