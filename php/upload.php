<?php
     $connection = new mysqli("localhost", "root", "root", "form");
     if($connection->connect_error) {
       exit('Could not connect');
     }

     
      $name = $_POST['name'];
      $author = $_POST['author'];
      $class = $_POST['classr'];
      $branch = $_POST['branch'];

      $questions=json_decode($_POST['questions']);

     $sql = "INSERT INTO `forms` (`name`, `author`, `class`, `branch`) VALUES ('$name', '$author','$class','$branch')";
     
    if ($connection->query($sql) === TRUE) {
      //insert questions
      for ( $i = 0; $i < sizeof($questions); $i++ ){
        $text = $questions[$i]->questionText;
        $ra = $questions[$i]->rightAnswer;
        $pictureLink = $questions[$i]->pictureLink;
 
        $result = mysqli_query($connection,"SELECT MAX(id) FROM `forms`");
        $row = $result->fetch_assoc();
        $id = $row['MAX(id)'];
        if ( $id === NULL ) $id = 1;
        $inserQuestions = "INSERT INTO `questions` (`text`, `form_id`,`correct_answer`,`image_link`) VALUES ('$text',$id,$ra,'$pictureLink')";
        $connection->query($inserQuestions);

      //insert answers
      $a1 = $questions[$i]->a1;
      $a2 = $questions[$i]->a2;
      $a3 = $questions[$i]->a3;
      $a4 = $questions[$i]->a4;
      
      $result = mysqli_query($connection,"SELECT MAX(id) FROM `questions`");
      $row = $result->fetch_assoc();
      $qid = $row['MAX(id)'];
      if ( $id === NULL ) $id = 1;

      $inserAnswer = "INSERT INTO `answers` (`answer_id`, `text`) VALUES ($qid,'$a1')";
      $connection->query($inserAnswer);
      $inserAnswer = "INSERT INTO `answers` (`answer_id`, `text`) VALUES ($qid,'$a2')";
      $connection->query($inserAnswer);
      $inserAnswer = "INSERT INTO `answers` (`answer_id`, `text`) VALUES ($qid,'$a3')";
      $connection->query($inserAnswer);
      $inserAnswer = "INSERT INTO `answers` (`answer_id`, `text`) VALUES ($qid,'$a4')";
      $connection->query($inserAnswer);
     }

      $id_result = mysqli_query($connection,"SELECT MAX(id) FROM `forms`");
      $id_row = $id_result->fetch_assoc();
      $id_id = $id_row['MAX(id)'];

      echo json_encode([
        "status"=>"Data inserted.",
        "id"=>$id_id
      ]);
    }
    else 
    {
      echo json_encode(["status"=>"failed"]);
    }
?>