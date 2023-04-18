<?php 
session_start();
if(empty($_SESSION['name']))
{
	header("Location: http://localhost/Uploads/index.html");
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Facebook Home Page</title>
    <style>
header {
	display: flex;
	align-items: center;
	justify-content:space-between;
	background: #1876f2;
	padding: 5px 5%;
	position: sticky	;
	top: -10px;
	z-index: 100;
	border-radius:10px;
    
    /* display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #3b5998;
    color: #fff;
    font-size: 18px;
	position:fixed; */
}

.logo img {
	width: 200px;
	margin-top: 10px;
	margin-bottom: 10px;
	margin-right: 45px;
	border-radius: 25px;
	cursor: pointer;
	height:90px;
}

.menu ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.menu li {
    margin-right: 10px;
}

.menu li a {
	font-family:'Consolas';
	font-size:18px;
    color: #fff;
    text-decoration: none;
    padding: 10px;
    border-radius: 10px;
    transition: background-color 0.3s ease;
}

.menu li a:hover {
    background-color:black;
}

.content {
    display: flex;
    justify-content: space-between;
    margin:10px;

}

.right-column{
	margin-left:200px;
	margin-right:0px;
	display:flex;
	flex-direction: row;
	flex-wrap:wrap;
	column-gap: 50px;
}
.post {
    background-color:#fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 3px 18px rgba(0,0,0,0.5);
    margin-bottom: 20px;
	width:500px;
	margin-left:0px;
}

.post h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

.post p {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
}

.post img {
    max-width: 100%;
    margin-bottom: 10px;
	padding-left:150px;
	width:250px;
	height:250px;
}

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.actions a {
    color: #3b5998;
    text-decoration: none;
    margin-right: 10px;
}

.actions a:hover {
    text-decoration: underline;
}

.actions span {
    font-size: 14px;
    color: #666;
}
#logout:hover{
	background-color:black;
}

    </style>
</head>
<body>
<header>
		<div class="logo" align="center">
		<img src="logo4.png" class="logo">
		</div>
		<div class="menu">
			<ul>
				<li><a href="dash.php">Home</a></li>
				<li><a href="uploadpage.php">Upload</a></li>
				<li><a href="myposts1.php">My Posts</a></li>
				<li><a href="topposts.php">Top Posts</a></li>
				<li><a id="logout" type="submit" href="destroy.php">Logout</a></li>
			</ul>
			
		</div>
	</header>
	<?php
			require_once('db.php');
				$username = $_SESSION['name']; 

				$sql = "SELECT * FROM images WHERE userid= '$username' ORDER BY time DESC";
				$result = mysqli_query($conn, $sql);

				if (mysqli_num_rows($result) > 0) {
					$row = mysqli_fetch_assoc($result);
				}

				mysqli_close($conn);
			?>	
	<div class="content">
		<div class="right-column">
			<?php
                $servername = "localhost";
				$uname = "root";
				$password = "";
				$dbname = "facebook";
				
				$conn = new mysqli($servername, $uname, $password, $dbname);
				
				if ($conn->connect_error) {
				  die("Connection failed: " . $conn->connect_error);
				}

				$sql = "SELECT * FROM images WHERE userid= '$username' ORDER BY time DESC";
	            $result = mysqli_query($conn, $sql);
	             if (mysqli_num_rows($result) > 0) {
	            while($row = mysqli_fetch_assoc($result)) {
					echo "<div class='post'>";
					echo  "<h2 align='center'>Uploaded by user:- ".$row["userid"]."</h2>";
	                echo "<img src='uploads/" . $row["image"] . "' alt='post'>";
                    echo  "<h3 align='center'>".$row["comment"]."</h3>";
					echo "<div class='actions'>";
					echo "<form  method='post' action='like.php'>";
					echo "<input name='uid' type='hidden' value=".$username.">";
					echo "<button type='submit' name='iid'  style='font:size 5px;height:30px; width:60px; cursor:pointer;' value=".$row["image"].">Like:<span id='out'>".$row['likes']."</span></button>";
					echo "</form>";
					echo "<span>".$row["time"]."</span>"; 
					echo "</div>";
					
					echo "</div>";
					
	               }
					} else {
					echo "No images found.";
					}

				mysqli_close($conn);
							?>
							
			
		</div>
	</div>
</body>
</html>