<?php
session_start();
?>
<!DOCTYPE html>
<html>

<head>
    <style>
        form{
            width: 400px;
            height:400px;
            background-color: white;
            padding-left: 60px;
            border-radius: 10px;
            
        }
        form textarea{
            height:50px;
            width:300px;
            resize: none;
            border-radius: 5px;
            padding-left: 10px;
        }
        form button{
            margin-left: 100px;
            padding: 15px;
            font-size: medium;
            border-radius: 5px;
            border: none;
            color:white;
            background-color:#3b5998;
            cursor: pointer;
        }
    
            body{
                background-color:#3b5998;
            }
            h2 {
                text-align:center;
            font-size: large;
            }
            a {
                text-decoration:none;
                background-color:beige;
                padding:10px;
                border-radius:10px;
                margin-left:50%;
            }
            input {
                margin: 20px;
            }
            
        input[type=file]{
            border: none;
            border-radius: 10px;
            box-shadow: 0 3px 18px rgba(1,1,1,1);
            padding: 20px;
            background-color: #3b5998;
            color:whitesmoke;
            cursor: pointer;
        }
        .content {
            padding-top: 200px;
            padding-left:550px;
        }
        textarea::placeholder {
            opacity: 0.9;
            padding: 10px;
            font-size: medium;
            font-family: Arial, Helvetica, sans-serif;
        }
    </style>
</head>

<body>
    <div class="content">
    <form method="post" action="upload.php" enctype="multipart/form-data">
        <input type="hidden" name="userid" value="<?php echo $_SESSION['name']; ?>">
        <br><br>
        <input type="file" name="image" required>
        <br><br>
        <textarea name="comment" placeholder="Enter caption.."></textarea>
        <br><br>
        <button type="submit" name="submit">Upload</button>
    </form>
    </div>
</body>

</html>