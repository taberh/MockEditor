Menu = (function() {
    var EventEmitter = require('events').EventEmitter
    var Menu = new EventEmitter()

    var gui = require('nw.gui')

    // Get the current window
    var win = gui.Window.get();

    // Create a menubar for window menu
    var menubar = new gui.Menu({ type: 'menubar' });

    var file = new gui.Menu();

    file.append(new gui.MenuItem({
        label: 'New',
        key: 'n',
        click: function() {
            Menu.emit('file.new')
        }
    }));
    file.append(new gui.MenuItem({
        label: 'Open',
        key: 'o',
        click: function() {
            Menu.emit('file.open')
        }
    }));
    file.append(new gui.MenuItem({
        type: 'separator'
    }));
    file.append(new gui.MenuItem({
        label: 'Save',
        key: 's',
        click: function() {
            Menu.emit('file.save')
        }
    }));
    file.append(new gui.MenuItem({
        label: 'Save as ...',
        key: 's',
        modifiers: 'cmd-shift',
        click: function() {
            Menu.emit('file.saveAs')
        }
    }));

    var view = new gui.Menu()

    view.append(new gui.MenuItem({
        label: 'Toggle Preview',
        key: 'p',
        modifiers: 'cmd-shift',
        click: function() {
            Menu.emit('toggle.preview')
        }
    }))
    view.append(new gui.MenuItem({
        label: 'Toggle Help',
        key: 'l',
        modifiers: 'cmd-shift',
        click: function() {
            Menu.emit('toggle.help')
        }
    }))

    menubar.createMacBuiltin('Mock Editor')

    menubar.insert(new gui.MenuItem({ label: 'File', submenu: file}), 1);
    menubar.insert(new gui.MenuItem({ label: 'View', submenu: view}), 3);

    //assign the menubar to window menu
    win.menu = menubar;

    return Menu
}())
