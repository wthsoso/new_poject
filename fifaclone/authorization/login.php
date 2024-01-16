<?php
require('../db.php');
session_start();

if (isset($_POST['username'])) {
    $username = $_REQUEST['username'];
    $password = ($_REQUEST['password']);

    $query = "SELECT * FROM `users` WHERE `username`='$username' AND `password`='$password'";
    $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
    $rows = mysqli_num_rows($result);

    if ($rows == 1) {
        $user_data = mysqli_fetch_assoc($result);

        $_SESSION['username'] = $username;

        if ($user_data['is_admin'] == 1) {
            // Redirect admin to a different page
            header("Location: admin_page.php");
        } else {
            // Redirect non-admin users to the regular index page
            header("Location: ../index.php");
        }
    } else {
        echo "<div class='form'>
            <h3>Username/password is incorrect.</h3>
            <br/>Click here to <a href='login.php'>Login</a></div>";
    }
} else {
?>
    <div class="form">
        <h1>Log In</h1>
        <form action="" method="post" name="login">
            <input type="text" name="username" placeholder="Username" required /><br>
            <input type="password" name="password" placeholder="Password" required />
            <br>
            <input name="submit" type="submit" value="Login" />
        </form>
        <p>Not registered yet? <a href='registration.php'>Register Here</a></p>
    </div>
<?php } ?>
