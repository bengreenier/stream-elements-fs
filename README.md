# stream-elements-fs

> Note: Only tested on windows.

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/bengreenier/stream-elements-fs)

A full-screen in desktop viewer for [stream elements](https://streamelements.com) overlays. I wanted to be able to overlay my overlays on top of stuff while I work.

## Usage

- Download a release (there's a zip with the installer inside)
- Run the installer
- [Modify](https://windows.tips.net/T010869_Changing_Shortcut_Properties.html) the installed shortcut (right click, open file location, right click, properties)
- Add `-- <yourUrl>` to the end of the shortcut (target field)
- Hit apply
- Now when you run `stream-elements-fs` (from the start menu) you get a little icon in your taskbar, and your overlay is on top of everything
- Click the taskbar icon and choose close to close it

Alternatively, you can build it yourself:

- Clone this repo
- Run `npm install`
- Run `npm run build` to build the installer
- Run `npm start -- <yourUrl>` to just run it

## License

MIT
