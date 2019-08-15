<?php
 $class = $_POST['class'];
 $branch = $_POST['branch'];

 $connection = new mysqli("localhost", "root", "root", "form");
 if($connection->connect_error) {
   exit('Could not connect');
 }
 
 if( strcmp($class,"*") == 0 && strcmp($branch,"*") == 0 ){
   $query = "SELECT * from forms order by id desc";
 }
 elseif (strcmp($class,"*") != 0 && strcmp($branch,"*") == 0 ) {
    $query = "SELECT * from forms WHERE class = "."'$class'"." order by id desc";
 }
 elseif (strcmp($class,"*") == 0 && strcmp($branch,"*") != 0 ) {
  $query = "SELECT * from forms WHERE branch = "."'$branch'"." order by id desc";
 }
 else{
  $query = "SELECT * from forms WHERE branch = "."'$branch'"." AND class =  "."'$class'"." order by id desc";
 }
 

 $result = mysqli_query($connection,$query);
 
 while ( $row=mysqli_fetch_assoc($result)){
   echo '<div class="col-md-3 card" id="',$row['id'],'">';
   echo '<div class="card-body">';
   echo '<h5 class="card-title">',$row['name'],'</h5>';
   echo '<h6 class="card-subtitle mb-2 text-muted"> by ',$row['author'],' from ',$row['class'],'</h6>';
   echo '<p class="card-text">in ',$row['branch'],'</p>';
   echo '</div>';
   echo '</div>';
 }

 mysqli_close($connection);
?>