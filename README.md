#note

##What's this?

This is a cui-based note application.

##How to install

```
$ npm install -g note-js
```

Unfortunately, this tool is not deployed to npm yet. So, you need install it by this command.

```
$ npm install -g https://github.com/yujilow1220/note-js.git
```

##How to use

###Create new note

```
$ note [note name]
```
Once you type it, you can edit your note by vim.  
You can change your editor by writing 
```
.noterc
```
file.

###Show your note

You can see your list of note by this command.

```
$ note show
```

And you can see your note contents by this command.

```
$ note show [note name]
```

###Edit config

```
$ note config
```

If you want example of config, you can show it.

```
$ note config example
```
THIS FUNCTION DOESN'T WORK NOW!!

##Future works

 - Add function of deployment to Git Repository
 - Deploy it into npm
