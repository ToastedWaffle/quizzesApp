<?php
$id = $_GET['id'];
$connection = new mysqli("localhost", "root", "root", "form");
 if($connection->connect_error) {
   exit('Could not connect');
 }

 $query = "SELECT * FROM forms WHERE id = $id";
 $question_query = "SELECT * FROM questions WHERE form_id = $id";

 $result = mysqli_query($connection,$query);
 $question_result = mysqli_query($connection,$question_query);

 while ( $row=mysqli_fetch_assoc($result)){
   $form->name = $row['name'];
   $form->author = $row['author'];
   $form->class = $row['class'];
   $form->branch = $row['branch'];
 }

 $x = 1;
 while( $row=mysqli_fetch_assoc($question_result) ){
   $form->question->$x->text = $row['text'];
   $form->question->$x->img = $row['image_link'];
   $form->question->$x->crrct = $row['correct_answer'];
  
   $q_id = $row['id'];
   $answer_query = "SELECT * FROM answers WHERE answer_id = $q_id";
   $answer_result = mysqli_query($connection,$answer_query);

   $xy = 1;
   while($row2=mysqli_fetch_assoc($answer_result)){
     $temp = a.$xy;
    $form->question->$x->$temp = $row2['text'];
    $xy++;
   }

   $x++;
 }

 $JSON = json_encode($form);
 echo $JSON;
?>