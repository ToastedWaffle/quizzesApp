$(document).ready(function(){
    var date = new Date().getFullYear();
    var form;
    var numq = 0;
    $("#footer").text(date + " © Nagy Szabolcs");


    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    $.get("../php/getData.php",{id: vars.id},function(response){
        form = response;
        form = JSON.parse(form);

        if (form === null){
        window.location.href = "../";
        }
        
        $("#header > h3").text(form.name);
        $("#header > h5").text("by "+form.author);
        $("#header > h6").append("Class: "+form.class+"<br>Art branch: "+form.branch);

        for ( var i = 1; form.question[i] != undefined; i++){
            $(".form-group").append('<div class="container" id="q-'+i+'"'+'></div>');

            if ( form.question[i].img != "NO_VALUE"){
                $("#q-"+i).append('<div class="text-center"><img class="img-thumbnail" src="'+form.question[i].img+'"></div>');
            }

            $("#q-"+i).append('<p>'+form.question[i].text+'</p>');

            $("#q-"+i).append('<div id="answer-group-'+i+'"></div>');
            numq++;
        }
        $(".form-group").append('<div class="container" id="btn-div"></div>');
        $("#btn-div").append('<button type="button" class="btn btn-dark submit" style="margin-right: 10px;">Submit</button>');
        $("#btn-div").append('<button type="button" class="btn btn-dark back" style="margin-right: 10px;">Go back</button>');
        $("#btn-div").on( "click",'.back', function(){
            window.location.href = '../';
        });
        $("#btn-div").append('<button type="button" class="btn btn-dark retry">Retry</button>');
        $("#btn-div").on( "click",'.retry', function(){
            window.location.href = '';
        });

        for( var i = 1; form.question[i] != undefined; i++ ){
            $("#answer-group-"+i).load('options.html',function(){
                for(var show_q = 1; show_q <= numq; show_q++){
                if ( form.question[show_q].img != "NO_VALUE"){
                    $("#q-"+show_q).children()[2].children[0].children[0].name = "answer-"+show_q;
                    $("#q-"+show_q).children()[2].children[0].children[0].id = "a1-"+show_q;
                    $("#q-"+show_q).children()[2].children[0].children[1].setAttribute('for','a1-'+show_q);
                    $("#q-"+show_q).children()[2].children[0].children[1].innerHTML = form.question[show_q].a1;


                    $("#q-"+show_q).children()[2].children[1].children[0].name = "answer-"+show_q;
                    $("#q-"+show_q).children()[2].children[1].children[0].id = "a2-"+show_q;
                    $("#q-"+show_q).children()[2].children[1].children[1].setAttribute('for','a2-'+show_q);
                    $("#q-"+show_q).children()[2].children[1].children[1].innerHTML = form.question[show_q].a2;

                    $("#q-"+show_q).children()[2].children[2].children[0].name = "answer-"+show_q;
                    $("#q-"+show_q).children()[2].children[2].children[0].id = "a3-"+show_q;
                    $("#q-"+show_q).children()[2].children[2].children[1].setAttribute('for','a3-'+show_q);
                    $("#q-"+show_q).children()[2].children[2].children[1].innerHTML = form.question[show_q].a3;

                    $("#q-"+show_q).children()[2].children[3].children[0].name = "answer-"+show_q;
                    $("#q-"+show_q).children()[2].children[3].children[0].id = "a4-"+show_q;
                    $("#q-"+show_q).children()[2].children[3].children[1].setAttribute('for','a4-'+show_q);
                    $("#q-"+show_q).children()[2].children[3].children[1].innerHTML = form.question[show_q].a4;
                    }
                    else{
                    $("#q-"+show_q).children()[1].children[0].children[0].name = "answer-"+show_q;
                    $("#q-"+show_q).children()[1].children[0].children[0].id = "a1-"+show_q;
                    $("#q-"+show_q).children()[1].children[0].children[1].setAttribute('for','a1-'+show_q);
                    $("#q-"+show_q).children()[1].children[0].children[1].innerHTML = form.question[show_q].a1;


                    $("#q-"+show_q).children()[1].children[1].children[0].name = "answer-"+show_q;
                    $("#q-"+show_q).children()[1].children[1].children[0].id = "a2-"+show_q;
                    $("#q-"+show_q).children()[1].children[1].children[1].setAttribute('for','a2-'+show_q);
                    $("#q-"+show_q).children()[1].children[1].children[1].innerHTML = form.question[show_q].a2;

                    $("#q-"+show_q).children()[1].children[2].children[0].name = "answer-"+show_q;
                    $("#q-"+show_q).children()[1].children[2].children[0].id = "a3-"+show_q;
                    $("#q-"+show_q).children()[1].children[2].children[1].setAttribute('for','a3-'+show_q);
                    $("#q-"+show_q).children()[1].children[2].children[1].innerHTML = form.question[show_q].a3;

                    $("#q-"+show_q).children()[1].children[3].children[0].name = "answer-"+show_q;
                    $("#q-"+show_q).children()[1].children[3].children[0].id = "a4-"+show_q;
                    $("#q-"+show_q).children()[1].children[3].children[1].setAttribute('for','a4-'+show_q);
                    $("#q-"+show_q).children()[1].children[3].children[1].innerHTML = form.question[show_q].a4;
                    }
                }
            });
        }

        $("#btn-div").on( "click",'.submit', function(){
            var points = 0;

            var all_filled = 1;

            for ( var i = 1; i <= numq; i++){
                var input = $("input[name='" + "answer-"+i + "']:checked").parent().children()[1];
                if( input == undefined ){
                    $("#q-"+i).css("border","1px solid rgb(255, 0, 0)");
                    all_filled = 0;
                }
            }
            if(all_filled == 1){
                for ( var i = 1; i <= numq; i++){
                    var inputDiv = $("input[name='" + "answer-"+i + "']:checked").parent()[0];
                    var input = $("input[name='" + "answer-"+i + "']:checked").parent().children()[1];
                    var val = $("input[name='" + "answer-"+i + "']:checked").attr('id')[1];
                    if( val == form.question[i].crrct) {
                        points++;
                        inputDiv.style.background = "#1c6e1c";
                        inputDiv.style.borderRadius = "5px";
                        input.style.color = "white";
                    }
                    else{
                        inputDiv.style.background = "#bc4444";
                        inputDiv.style.borderRadius = "5px";
                        input.style.color = "white";
                    }
                }
                
                $("#btn-div").append('<h1 style="background-color: white;border: solid;border-radius: 20px;padding: 15px;text-align: center;margin-top: 15px;">You scored '+Math.round((points/numq)*100)+'%</h1>');
                $("input[type=radio]").attr('disabled', true);
                $(".submit").attr('disabled',true);
                $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            }

            
        });

        $("#btn-div").on( "click",'.back', function(){
            window.location.href = "../";
        });
    });

});