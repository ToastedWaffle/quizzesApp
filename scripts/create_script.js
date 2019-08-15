$(document).ready(function(){
    var date = new Date().getFullYear();
    var q_number = 1;
    var max_q_number = 20;
    var is_empty_q = 0;

    $("#footer").text(date + " © Nagy Szabolcs");
 
    $("#add-question-btn").click(function(){
        q_number++;
        if ( q_number <= max_q_number ){
        $("#questions").append('<div id="question-'+q_number+'" class="question-section hidden">');
        
        $("#question-"+q_number).append('Picture:');
        $("#question-"+q_number).append('<div class="custom-file"></div>');
        $("#question-"+q_number+'> .custom-file').append('<input type="file" class="custom-file-input" id="picture-input" aria-describedby="inputGroupFileAddon01" accept="image/*" data-max-size="5000">');
        $("#question-"+q_number+'> .custom-file').append('<label class="custom-file-label" for="picture-input">Choose file</label>');
        $("#question-"+q_number+'> .custom-file').append('<br> <br>');
        

        $("#question-"+q_number).append('Question:');
        $("#question-"+q_number).append('<input type="text" class="form-control" required> <br>');
        $("#question-"+q_number).append('Answer nr.1:'+'<input'+' id="answer-'+q_number+'-1'+'"'+' type="text" class="form-control">');
        $("#question-"+q_number).append('Answer nr.2:'+'<input'+' id="answer-'+q_number+'-2'+'"'+' type="text" class="form-control">');
        $("#question-"+q_number).append('Answer nr.3:'+'<input'+' id="answer-'+q_number+'-3'+'"'+' type="text" class="form-control">');
        $("#question-"+q_number).append('Answer nr.4:'+'<input'+' id="answer-'+q_number+'-4'+'"'+' type="text" class="form-control">');
        $("#question-"+q_number).append('Right answer:');
        $("#question-"+q_number).append('<select class="custom-select" id="right-answer-'+q_number+'">');
        $("#question-"+q_number).find("select").append('<option selected >1</option>');
        $("#question-"+q_number).find("select").append('<option>2</option>');
        $("#question-"+q_number).find("select").append('<option>3</option>');
        $("#question-"+q_number).find("select").append('<option>4</option>');
        $("#question-"+q_number).append('</select>');
        $("#question-"+q_number).append('<button type="button" class="btn btn-dark remove-question-btn">Remove question</button>');
        $("#question-"+q_number).fadeIn(400);
        }else{ 
        alert("You can have at most "+max_q_number+" questions!");
        q_number--;
        }
        $("#question-"+q_number).removeClass("hidden");

        $(".custom-file-input").change(function(e){pictureUpload(e);});
    });

    $(".custom-file-input").change(function(e){pictureUpload(e);});
    //picture upload
    function pictureUpload(e){
        $(".modal-title").text("Uploading picture");
        $(".modal-body > p").text("Please wait.");
        $(".close").css("display","none");
        $('#modal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
        
        var input = e.currentTarget;

        var file = input.files[0];
            
            var apiUrl = 'https://api.imgur.com/3/image';
            var apiKey = '7105c4f5f0fb2f1';

            var settings = {
                async: true,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                url: apiUrl,
                headers: {
                  Authorization: 'Client-ID ' + apiKey,
                  Accept: 'application/json'
                },
                mimeType: 'multipart/form-data'
              };

            var formData = new FormData();
            formData.append("image", file);
            settings.data = formData;

            $.ajax(settings).done(function(response) {
                responseJSON = $.parseJSON(response);
                
                if( $(input).parent().parent().first().find("img")[0] == undefined ){
                    $(input).parent().parent().prepend('<div class="text-center"><img src="'+responseJSON.data.link+'" class="img-thumbnail" id="question-picture"></div>');
                }
                else{
                    $(input).parent().parent().first().find("img").attr("src",responseJSON.data.link);
                }
                $("#modal").modal('hide');
              });
    }


    $("#upload-questions-btn").click(function(){
        var name = $("#name").val();
        var author = $("#author").val();
        var classr = $("#class").find(":selected").val();
        var branch = $("#branch").children("option:selected").val();
        
        //constructor
        function Question(text,a1,a2,a3,a4,ra,pictureLink){
            this.questionText = text;
            this.a1 = a1;
            this.a2 = a2;
            this.a3 = a3;
            this.a4 = a4;
            this.rightAnswer = ra;
            this.pictureLink = pictureLink;
        }
        var questions = [];

        if ( $("#name").val() == "" || $("#name").val() == " " ){
            is_empty_q = 1;
            $("#name").attr("placeholder", "Please fill input.");
        }
        else is_empty_q = 0;
        if ( $("#author").val() == "" || $("#author").val() == " " ){
            is_empty_q = 1;
            $("#author").attr("placeholder", "Please fill input.");
        }
        else is_empty_q = 0;
        
        

        for ( var i = 0; i < q_number; i++ ){
            
            var text = $("#question-"+(i+1)+'> input.form-control:first');
            if ( text.val() == "" || text.val() == " " ){
                is_empty_q = 1;
                text.attr("placeholder", "Please fill input.");
            }
            var a1 = $("#answer-"+(i+1)+"-1");
            if ( a1.val() == "" || a1.val() == " " ){
                is_empty_q = 1;
                a1.attr("placeholder", "Please fill input.");
            }
            var a2 = $("#answer-"+(i+1)+"-2");
            if ( a2.val() == "" || a2.val() == " " ){
                is_empty_q = 1;
                a2.attr("placeholder", "Please fill input.");
            }
            var a3 = $("#answer-"+(i+1)+"-3");
            if ( a3.val() == "" || a3.val() == " " ){
                is_empty_q = 1;
                a3.attr("placeholder", "Please fill input.");
            }
            var a4 = $("#answer-"+(i+1)+"-4");
            if ( a4.val() == "" || a4.val() == " " ){
                is_empty_q = 1;
                a4.attr("placeholder", "Please fill input.");
            }
            var ra = Number($("#right-answer-"+(i+1)).children("option:selected").val());

            var imgLink = $("#question-"+(i+1)).find("img").attr('src');
            if (imgLink == undefined) imgLink = "NO_VALUE";
            questions[i] = new Question(text.val(),a1.val(),a2.val(),a3.val(),a4.val(),ra,imgLink);
        }

        if ( is_empty_q == 0 ){
            var st = JSON.stringify(questions);
        $.ajax({
            url:'../php/upload.php',
            method:'POST',
            data:{
                name: name,
                author: author,
                classr: classr,
                branch: branch,
                questions: st
            },
            success:function(data){
                var response = JSON.parse(data);
                if( response.status = "data inserted"){
                    //change modal to success one
                    $(".modal-title").text("Quiz uploaded succesfully");
                    $(".modal-body > p").text("");
                    $(".modal-body > p").append('The quiz can be viewed at this <a href="../view/?id='+response.id+'">link</a>');
                    $(".modal-body > p").append('<br><a type="button" href="../" class="btn btn-dark">Home</a>');
                    $(".close").css("display","none");
                    $('#modal').modal({
                        show: true,
                        backdrop: 'static',
                        keyboard: false
                    });
                }
            }
        });
        }
        else{
            //create fillAll modal
            $(".modal-title").text("Empty input fields found");
            $(".modal-body > p").text("Please fill all the empty fields and try again.");
            $(".close").css("display","block");
            $('#modal').modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
        }
    });

    $("#questions").on( "click",'.remove-question-btn', function() {
        var id = $(this).closest('div').attr('id').split(' ');

        var i = 1;
        var num_of_questions = 0;
        while( i <= max_q_number ){
            if ( $("#question-"+i).length == 1 ){
                num_of_questions++;
            }
            i++;
        }

        var q_num_start = parseInt(id[0][9]);
        if ( id[0][10]){
            q_num_start*=10 + parseInt(id[0][10]);
        }

        $("#"+id).fadeOut(400, function(){
            $("#"+id).remove();
        });
        
        q_number--;
        
        //re-number post questions
        for ( i = q_num_start; i <= num_of_questions; i++ ){
            
            for ( var j = 1; j <= 4; j++ ){
                var answer = $("#answer-"+(i+1)+"-"+j);
                var rightA = $("#right-answer-"+(i+1));
                answer.attr('id','answer-'+i+'-'+j);
                rightA.attr('id','right-answer-'+i);
            }
            $("#question-"+(i+1)).attr('id','question-'+i);
        }
      });

    $("#back-btn").click(function(){
        window.location.href = "../";
    });
    $("#reset-btn").click(function(){
        window.location.href = "";
    });
});

