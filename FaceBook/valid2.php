<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$fname=$_POST["fname"];
$lname=$_POST["lname"];
$uname=$_POST["uname"];
$mob=$_POST["mob"];
$dob=$_POST["dob"];
$gender=$_POST["gender"];
$pass=$_POST["pass"];
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'facebook';
if(!isset($fname) or !isset($lname) or !isset($uname) or !isset($mob) or !isset($dob) or !isset($gender) or !isset($pass))
{
    header("Location: http://localhost/Uploads/signup.html");
    exit;
}
else{
$conn = mysqli_connect($host, $username, $password, $dbname);
if ($conn) {
$search="SELECT * FROM users where uname='$uname'";
$ufound=mysqli_query($conn,$search);
if(mysqli_num_rows($ufound)>0)
{
	echo "<script> alert('User already exists...!');</script>";
	echo "<script> location.href='signup.html'; </script>";
}
else{
$sql ="INSERT INTO users(firstname,lastname,uname,mobile,dob,gender,password) VALUES('$fname','$lname', '$uname','$mob','$dob','$gender','$pass')";
$upload = mysqli_query($conn,$sql);
	if($upload)
	{
		echo "<script> alert('Registered successfully Click Ok to Login');</script>";
		echo "<script> location.href='index.html'; </script>";
	}
	else
	{
		echo "<script> alert('Oops Registration failed...! Click ok to Register again..');</script>";
		echo "<script> location.href='signup.html'; </script>";
	}
}
}
}
}
?>