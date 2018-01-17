$('document').ready(function(){
    $(".burger-buttons").on("click", function(){
        var id = $(this).data("burger-id");
        if($("#customer-name").val() !== ""){
            $("#customer-error-message").html("").hide();
            $.ajax( "api/burgers/" + id ,{
                type: "PUT",
                data: {
                    devoured: true,
                    customer: $("#customer-name").val().trim()
                }
            }).then(function(){
                location.reload();
            });
        } else {
            $("#customer-error-message").html("Please enter your name to eat the burger.").show();
        }
    });

    $(".clean-buttons").on("click", function(){
        var id = $(this).data("burger-id");
        $.ajax( "api/burgers/" + id ,{
            type: "DELETE",
        }).then(function(){
            location.reload();
        });
    });

    $("#new-burger-form").form({
        fields: {
            newBurger: {
            identifier: 'newBurger',
            rules: [{
                type: 'empty',
                prompt: 'Please enter a burger'
                }]
            }
        },onSuccess:function(e){
            $.ajax("api/burgers", {
                type: "POST",
                data: {
                    "name": $("#new-burger-name").val().trim()
                }
            }).then(function(){
                window.location.reload();
            });
        }
    });
});