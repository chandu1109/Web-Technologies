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
	position: relative;
    justify-content: space-between;
    padding: 10px 0 0 50px;
    background-color: royalblue;
    color: #fff;
    font-size: 18px;
	 */
}
.logo

{
	width: 200px;
	margin-top: 10px;
	margin-bottom: 10px;
	margin-right: 45px;
	border-radius: 25px;
	cursor: pointer;
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
    background-color:#10101E;
}

.content {
    display: flex;
    justify-content: space-between;
    margin:10px;

}

.right-column{
	margin-left:200px;
	margin-right:100px;
	display:flex;
	flex-direction: row;
	flex-wrap:wrap;
	column-gap: 20px;
}
.post {
    background-color:#fff;
    padding: 50px 0 0 0px;
    border-radius:5px;
    box-shadow: 0px 3px 18px rgba(0,0,0,0.5);
    margin-bottom: 30px;
	width:450px;
	margin-left:50px;
	margin-right:50px;
}

.post h3 {
	font-family:Lucida Console;
    font-size: 20px;
    margin-bottom: 0px;
}

.post p {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
}

.post img {
    max-width: 90%;
	object-fit:fill;
    margin-bottom:0px;
	padding: 50px;
	width:350px;
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
	background-color:#10101E;
}
h2
{
	font-family:Comic Sans MS;
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

				$sql = "SELECT firstname,lastname FROM users WHERE firstname='$username'";
				$result = mysqli_query($conn, $sql);

				if (mysqli_num_rows($result) > 0) {
					$row = mysqli_fetch_assoc($result);
				}

				mysqli_close($conn);
			?>	
	<?php echo "<h2 name='userid' align='center'><marquee> ".$username." Your Posts ::-)</marquee></h2>";?>

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

				$sql = "SELECT * FROM images ORDER BY time desc";
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
	
</body>
</html>

