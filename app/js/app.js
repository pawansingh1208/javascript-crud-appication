function Controller($scope) {
    $scope.shortName = 'UserDatabase';
    $scope.version = '1.0';
    $scope.displayName = 'User Database';
    $scope.maxSizeInBytes = 4096;
    $scope.db = openDatabase($scope.shortName, $scope.version,
        $scope.displayName, $scope.maxSizeInBytes);
        $scope.createTableIfNotExists = function() {
        $scope.createsql = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, DOB Timestamp , Password TEXT , Email TEXT,  Gender TEXT,Language TEXT,Hobbies TEXT,Image ,AGE STRING)";
        $scope.db.transaction(function(transaction) {
            transaction.executeSql($scope.createsql, []);
        });
    };


    $scope.insertRecords = function() {
        $scope.createTableIfNotExists();
      $scope.DOB=document.getElementById('DOB').value;

        $scope.insertsql = 'INSERT INTO Contacts (Name, DOB ,Password ,Email,  Gender,Language ,Hobbies,Image,AGE) VALUES (?,?,?,?,?,?,?,?,?)';
        if ($scope.user.$valid) {
            $scope.db.transaction(function(transaction) {
                transaction.executeSql($scope.insertsql, [ $scope.Name,  $scope.DOB, $scope.Password,$scope.Email ,
                 $scope.Gender,$scope.Language,$scope.Hobbies, document.getElementById('uploadImg').src, $scope.AGE],
                window.location.reload());
                 });
        }
    };


    $scope.dropTable = function() {
        $scope.dropsql = "DROP TABLE Contacts";
        $scope.db.transaction(function(transaction) {
            transaction.executeSql($scope.dropsql, [], window.location.reload());
        });
    };


    $scope.showRecord = function() {
        $scope.fetchRecords = "SELECT * from Contacts";
        $scope.db
            .transaction(function(transaction) {
                transaction.executeSql($scope.fetchRecords, [],$scope.showRecords);
            });
    };

         $scope.showRecord();
    $scope.showRecords = function(transaction, result) {

        $scope.master = [];
        for ( var i = 0; i < result.rows.length; i++)
        {
            $scope.master.push(result.rows.item(i));
        }

    };


    $scope.deleteContact = function(id) {
        $scope.deleteStatement = "DELETE FROM Contacts where id=" + id;
        $scope.db.transaction(function(transaction) {
            transaction.executeSql($scope.deleteStatement, [], window.location.reload());
        });
        console.log("delete executed");
    };


    $scope.editContact = function(id) {
            for ( var i in $scope.master) {
            if ($scope.master[i].id == id) {
                console.log("log in here");
                $scope.id = id;
                $scope.Name = $scope.master[i].Name;
                $scope.DOB = $scope.master[i].DOB;
                $scope.Password = $scope.master[i].Password;
                $scope.Email = $scope.master[i].Email;
                $scope.Gender = $scope.master[i].Gender;
                $scope.Language = $scope.master[i].Language;
                $scope.Hobbies = $scope.master[i].Hobbies;
                $scope.imageSrc = $scope.tableData[i].Image;
                $scope.AGE=$scope.master[i].AGE;
                       }
        }
    };

        $scope.updateContact = function() {
        console.log("in here");
        $scope.updateStatement = "UPDATE Contacts SET Name = ?,DOB=?, Password = ?, Email=?, Gender=?,Language=?,Hobbies=?,Image=?, AGE=? WHERE id=?";
        $scope.db.transaction(function(transaction) {
        transaction.executeSql($scope.updateStatement,
                [ $scope.Name,$scope.DOB, $scope.Password,$scope.Email,$scope.Gender, $scope.Language, $scope.Hobbies,document.getElementById('uploadImg').src,$scope.AGE
                 , $scope.id], window.location.reload());
        });
    };

}





