 <?php
$conn = mysqli_connect("localhost", "root", "", "facebook");
if(isset($_POST['submit'])){
   $image = $_FILES['image']['name'];
   $comment = $_POST['comment'];
   $username = $_POST['userid'];
   $upload_time = date('Y-m-d H:i:s');
   move_uploaded_file($_FILES['image']['tmp_name'], "uploads/".$image);
   $sql = "INSERT INTO images (image, comment,userid,time) VALUES ('$image', '$comment','$username','$upload_time')";
   mysqli_query($conn, $sql);
}
header('Location:dash.php');
?>