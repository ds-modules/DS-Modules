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

Make sure you have installed [Jekyll](https://jekyllrb.com/docs/installation/).

After making edits to the `.md` files, run `jekyll serve` to host the site locally and see what the changes look like on the site. This command will also rebuild and overwrite the `docs` folder with the new content. If the changes are to be pushed onto the live site, simply stage and and commit everything (including the changes in the `docs` folder MADE BY JEKYLL), and push to `origin master`. In other words run

```
jekyll build
git add *
git commit -m "this is a commit"
git push origin master
```

If you've made changes and you want to cancel and delete your edits instead.

```
git reset --hard
```

## Home page

Documentation will be updated soon

## Featured modules

These individual blocks are found in the `_featured` folder in the root directory. They can be named anything (`3.md`, `a.md`, `linguistics100.md`, `sdf!!!!123_8.md`), but the order in which they are loaded will be alphanumeric.

These files have fields in the front-matter (header) which exhaustively include `title`,`course_name`,`instructor`,`github_link`, `datahub_link`,`nbviewer_link`, `bindr_link`. The links should (obviously) be links (`https://example.com`). Any field can be left blank. It just won't show up. The buttons will still be rendered correctly, just no longer having the missing fields.

The content of the file below the header should be the description of the module. This section does not support markdown, and will simply render in plain-text. 

## Guide page

The file corresponding to the guide page is unsuprisingly `guide.md`. The file is relatively straight-forward and is essentially all markdown. Remember that headings need to have three hashtags (#) in order for padding/rendering to look correct/nice.

## Library page

Similarly to the Guide page, the corresponding file (`library.md`) to the library page is just the content below the front-matter (header) rendered in markdown. Below the content will be a dynamically loaded section that grabs the repos from Github. This is using the Github widget, but modified so that the only repos pulled are the ones that are mostly composed of Jupyter Notebooks, which prevents repos such as this site (which is primarily HTML/CSS) to show up.

## About page

Again, very similar to the Guide and Library pages, the corresponding file (`about.md`) is the content below the front-matter (header) rendered in markdown. Nothing particularly remarkable to note.

## Site-wide maintanence (Footer)

`_config.yml` holds all of the site-wide variables. Most of these variables are completely useless, so I put the ones of particular interest at the top. These variables control the links of the footer and the message of the footer. I don't expect this to need to be changed very often.

## How it works

Jekyll is a framework in the Ruby programming language that allows highly readable markdown to be rendered in nice looking web pages built in HTML/CSS. It does this by taking mardown files (files with the extension`.md`), and formatting them into our HTML templates in the `_layouts` folder.

Github pages reads from the `docs` folder located at the root directory of the `master` branch. Anything in this folder is reachable via the website. 

Jekyll regenerates and builds the files in `docs` from the `.md` files when you run `jekyll build` or `jekyll serve` in the command line. Treat any changs in the `docs` folder as temporary.

## Misc

The header, navbar, and footer templates are located in the `_includes` folder. All static resources (JavaScript, images, custom CSS) is located in the `static` folder. The `old_site` folder includes all the resources that was the original DSEP Modules website. Finally `Gemfile` and `Gemfile.lock` are simply there so that Jekyll can do its job.