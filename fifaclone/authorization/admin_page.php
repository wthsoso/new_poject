<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$db = "project";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $db);

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

// Update user information if the update form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["user_id"])) {
    $userId = $_POST["user_id"];
    $newUsername = $_POST["new_username"];
    $newPassword = $_POST["new_password"];
    $newEmail = $_POST["new_email"];

    // Update user information
    $updateSql = "UPDATE users SET username='$newUsername', password='$newPassword', Email='$newEmail' WHERE id=$userId";

    if ($conn->query($updateSql) === TRUE) {
        echo "User information updated successfully!";
    } else {
        echo "Error updating user information: " . $conn->error;
    }
}

// Fetch all users from the database
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Display the table header
    echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
            </tr>";

    // Output data of each row with form for modification and deletion
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . $row["id"] . "</td>
                <td>" . $row["username"] . "</td>
                <td>" . $row["Email"] . "</td>
                <td>" . $row["password"] . "</td>
                <td>
                    <form method='post' action='" . htmlspecialchars($_SERVER["PHP_SELF"]) . "'>
                        <input type='hidden' name='user_id' value='" . $row["id"] . "'>
                        <label for='new_username'>New Username:</label>
                        <input type='text' name='new_username' value='" . $row["username"] . "'><br>
                        <label for='new_password'>New Password:</label>
                        <input type='text' name='new_password' value='" . ($_SERVER["REQUEST_METHOD"] == "POST" ? $_POST["new_password"] : "") . "'><br>
                        <label for='new_email'>New Email:</label>
                        <input type='email' name='new_email' value='" . $row["Email"] . "'><br>
                        <input type='submit' value='Update'>
                    </form>
                    <form method='post' action='" . htmlspecialchars($_SERVER["PHP_SELF"]) . "' onsubmit='return confirm(\"Are you sure you want to delete this user?\")'>
                        <input type='hidden' name='delete_user_id' value='" . $row["id"] . "'>
                        <input type='submit' value='Delete'>
                    </form>
                </td>
              </tr>";
    }

    echo "</table>";
} else {
    echo "No users found in the database.";
}

$conn->close();

?>
