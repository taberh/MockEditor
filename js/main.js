(function() {
    var fs = require('fs')
    var gui = require('nw.gui')

    var inputOpen   = $('#open')
    var inputSave   = $('#save')
    var inputSaveAs = $('#saveAs')
    var viewport    = $('.viewport')

    var filePath
    var hasWrite

    // bind menu event
    Menu.on('toggle.preview', function() {
        Editor.togglePreviewPanel()
    })
    Menu.on('toggle.help', function() {
        Editor.toggleHelpPanel()
    })
    Menu.on('file.open', function() {
        inputOpen.trigger('click')
    })
    Menu.on('file.new', function() {
        //filePath = null
        //Editor.tplEditor.setValue('')
        var x = window.screenX + 40
        var y = window.screenY + 40
        window.open('index.html', '_blank', 'screenX=' + x + ',screenY=' + y)
    })
    Menu.on('file.save', function() {
        if (filePath) {
            writeEditorToFile(filePath)
        }
        else {
            inputSave.trigger('click')
        }
    })
    Menu.on('file.saveAs', function() {
        inputSaveAs.trigger('click')
    })

    // bind input
    inputOpen.on('change', function(e) {
        filePath = $(this).val()
        readFileIntoEditor(filePath)
    })
    inputSave.on('change', function(e) {
        filePath = $(this).val()
        writeEditorToFile(filePath)
    })
    inputSaveAs.on('change', function(e) {
        filePath = $(this).val() || filePath

        if ($(this).val()) {
            writeEditorToFile(filePath)
        }
    })

    viewport.on('drop', function(e) {
        e.preventDefault()
        filePath = e.originalEvent.dataTransfer.files[0].path
        readFileIntoEditor(filePath)
    })

    // bind gui event
    gui.App.on('open', function(path) {
        filePath = path
        readFileIntoEditor(filePath)
    })


    function readFileIntoEditor(path) {
        fs.readFile(filePath, function(err, data) {
            if (err) {
                return alert('读取文件失败')
            }

            Editor.tplEditor.setValue(String(data))
        })
    }

    function writeEditorToFile(path) {
        path = exportPath(path)

        fs.writeFile(path.mock, Editor.tplEditor.getValue(), function(err) {
            if (err) {
                return alert('保存失败')
            }
        })

        fs.writeFile(path.json, Editor.dataEditor.getValue(), function(err) {
            if (err) {
                return alert('保存失败')
            }
        })
    }

    function exportPath(path) {
        path = path.replace(/\.mock$/, '')

        return {
            mock: path + '.mock',
            json: path + '.json'
        }
    }

}())
