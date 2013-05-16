(function () {
    var filesUpload = document.getElementById("files-upload"),
        fileList = document.getElementById("file-list");

    function uploadFile (file) {
        var img,
            reader,
            xhr,
            fileInfo;


        if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
            img = document.getElementById("uploadImg");
            reader = new FileReader();
            reader.onload = (function (theImg) {
                return function (evt) {
                    theImg.src = evt.target.result;
                };
            }(img));
            reader.readAsDataURL(file);
        }
    }

    function traverseFiles (files) {
        if (typeof files !== "undefined") {
            for (var i=0, l=files.length; i<l; i++) {
                uploadFile(files[i]);
            }
        }
        else {
            fileList.innerHTML = "No support for the File API in this web browser";
        }
    }

    filesUpload.addEventListener("change", function () {
        traverseFiles(this.files);
    }, false);
})();	