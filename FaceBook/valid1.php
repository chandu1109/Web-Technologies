<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$name=$_POST["uname"];
$pass=$_POST["pass"];
$sub=$_POST["login"];
if(!isset($name) or !isset($pass) or !isset($sub))
{
    header("Location: http://localhost/wt/facebook/index.html");
    exit;
}
else{
    $host = 'localhost';
        $username = 'root';
        $password = '';
        $dbname = 'facebook';

        $conn = mysqli_connect($host, $username, $password, $dbname);

        if ($conn) {
            $sql = "select firstname from users where uname='$name' and password='$pass'";
            $res = mysqli_query($conn,$sql);
            if(mysqli_num_rows($res)>0){
                $_SESSION['name']=mysqli_fetch_array($res)[0];
               header('Location:dash.php');
            }
            else{
                
                echo "<script> alert('Invalid Credentials...!');</script>"; ;
                echo "<script> location.href='index.html'; </script>";
            }
        }
        else{
            echo "Connection Failed.";
            die("Connection Failed:".mysqli_connect_error());
        }
}
}
?>