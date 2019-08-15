$(document).ready(function(){
    var date = new Date().getFullYear();
    var classr = $("#class").find(":selected").val();
    var branch = $("#branch").children("option:selected").val();
    $("#footer").text(date + " © Nagy Szabolcs");

    $("#forms-container").load("php/load-forms.php",{class:classr, branch:branch});

    $("#forms-container").on( "click",".card",function() {
        var id = $(this).attr("id");
        
        window.location.href = "view/?id="+id;
    });

    $(".create-new").click(function(){
        window.location.href = "create/";
    });

    $("#class").change(function(){
        $("#forms-container").fadeOut(100,function(){
            $("#forms-container").empty();

            classr = $("#class").find(":selected").val();
            branch = $("#branch").children("option:selected").val();

            $("#forms-container").load("php/load-forms.php",{class:classr, branch:branch},function(){
            $("#forms-container").fadeIn(100);
            });
        });
    });
    $("#branch").change(function(){
        $("#forms-container").fadeOut(100,function(){
            $("#forms-container").empty();

            classr = $("#class").find(":selected").val();
            branch = $("#branch").children("option:selected").val();

            $("#forms-container").load("php/load-forms.php",{class:classr, branch:branch},function(){
            $("#forms-container").fadeIn(100);
            });
        });
    });
});