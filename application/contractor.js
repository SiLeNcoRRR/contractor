Stamplay.init("contractor");

$(document).ready(function() {

    var contractList = $(".ctr-list"),
        addContainer = $(".ctr-add");

    function init() {
        renderAddView();
        renderContracts();
        //observeUploader();
    }

    function renderAddView() {
        var query = {
                sort : "title"
            },
            rendered;

        Stamplay.Object('partners')
            .get(query)
            .then(function(res) {
                console.log(res);
                $.get('/application/views/add.mst', function(template) {
                    rendered = Mustache.render(template, {
                        partners: res.data
                    });
                    addContainer.html(rendered);
                });
            }, function(error) {
                // Handle error
            });
    }

    function renderContracts() {
        var query = {
                sort : "title"
            },
            rendered;

        Stamplay.Object('contracts')
            .get(query)
            .then(function(res) {
                $.get('/application/views/list.mst', function(template) {
                    rendered = Mustache.render(template, {
                        contracts: res.data
                    });
                    contractList.html(rendered);
                });
            }, function(error) {
                // Handle error
            });
    }

    function saveContract(options) {
        var newContract = {
            title: options.title,
            attachment: options.attachment
        }


        // With Promise
        Stamplay.Object('contracts')
            .save(newContract)
            .then(function (res) {
                console.log('success', res);
            }, function (err) {
                console.log('error', err);
            });

    }

    function uploadFile() {
        var formDataResult = new FormData();
        formDataResult.append("attachment", $('.ctr-add-attachment-upload')[0].files[0]);
        formDataResult.append("title", "Blubb");
        $.ajax({
            method: 'POST',
            url: '/api/cobject/v1/contracts',
            data: formDataResult,
            processData: false,
            contentType: false,
            success: function (respObj) {
                console.log(respObj)
            },
            error: function (err) {
                console.log(err)
            }
        });
    }

    function observeUploader() {
        document.getElementById("ctr-add-attachment-upload").onchange = function(){
            uploadFile();
        }
    }

    // click events
    $('.ctr-header-add').on("click", function() {
        var button = $(this);
        if(button.hasClass('active')) {
            button.removeClass('active');
            addContainer.addClass('hidden');
        } else {
            button.addClass('active');
            addContainer.removeClass('hidden');
        }
    });

    init();
});