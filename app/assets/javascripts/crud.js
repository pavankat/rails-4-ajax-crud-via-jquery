var ready;
ready = function() {
    var footballPlayers = [];
    var editPlayerId = null;

    // Fill table with data
    function populateTable() {

        // Empty content string
        var tableContent = '';

        // jQuery AJAX call for JSON
        $.getJSON( '/football_players', function( data ) {

            //Object {id: 1, name: "Drew Brees", handSizeInches: 10, created_at: "2015-08-03T15:02:10.751Z", updated_at: "2015-08-03T15:02:10.751Z"}

            // For each item in our JSON, add a table row and cells to the content string
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td>' + this.name + '</td>';
                tableContent += '<td>' + this.handSizeInches + '</td>';
                tableContent += '<td><a href="#" class="linkEditPlayer" data-id="' + this.id + '">edit</a></td>';
                tableContent += '<td><a href="#" class="linkDeletePlayer" data-id="' + this.id + '">delete</a></td>';
                tableContent += '</tr>';
            });

            // Inject the whole content string into our existing HTML table
            $('#tablePlayersRows').html(tableContent);
        });
    };

    function deletePlayer(event) {

        event.preventDefault();

        // Pop up a confirmation dialog
        var confirmation = confirm('Are you sure you want to delete this player?');

        // Check and make sure they really want to delete
        if (confirmation === true) {

            // If they did, do our delete
            $.ajax({
                type: 'DELETE',
                url: '/football_players/' + $(this).data('id')
            }).done(function( response ) {
                //response is the object that was deleted because that's what we returned in the destroy controller method
                populateTable();
                
            });

        }
        else {

            // If they said no to the confirm, do nothing
            return false;

        }

    };

    function newPlayer(event) {
        event.preventDefault();
        $('#inputs').removeClass('hide');
        $('#savePlayerButton').removeClass('hide');
        $('#updatePlayerButton').addClass('hide');
    }

    function addPlayer(event) {
        event.preventDefault();

        var newPlayer = {
            'name': $('#name').val(),
            'handSizeInches': $('#handSizeInches').val()
        };

        var newPlayerFormatted = {
            'football_player' : newPlayer
        };

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newPlayerFormatted,
            url: '/football_players',
            dataType: 'JSON'
        }).done(function( response ) {

            // Clear the form inputs
            $('input').val('');

            // Update the table
            populateTable();
            $('#inputs').addClass('hide');
 
        }).fail(function( jqXHR, textStatus ) {
            alert(jqXHR.responseText);
        });
        
    };

    function editPlayer(event) {

        // Prevent Link from Firing
        event.preventDefault();

        $('#inputs').removeClass('hide')
        $('#savePlayerButton').addClass('hide');
        $('#updatePlayerButton').removeClass('hide');

        // Retrieve the id from the link
        var thisId = $(this).data('id');

        $.getJSON('/football_players/' + thisId).done(function(data) {
            //Populate Edit Form
            $('#name').val(data.name);
            $('#handSizeInches').val(data.handSizeInches);

            $('input').removeClass('hide');
            $('#savePlayerButton').addClass('hide');
            $('#updatePlayerButton').removeClass('hide');

            //we need this to update the player in the updatePlayer function
            editPlayerId = data.id;
         })
    }

    function cancel(){
        $('input').val('');
        $('#inputs').addClass('hide');
    }

    function updatePlayer(event){
        var editPlayer = {
            'name': $('#name').val(),
            'handSizeInches': $('#handSizeInches').val()
        };

        var editPlayerFormatted = {
            'football_player' : editPlayer
        };

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'PUT',
            data: editPlayerFormatted,
            url: '/football_players/' + editPlayerId, //editPlayerId is a global variable we set in the editPlayer function
            dataType: 'JSON'
        }).done(function( response ) {   

            // Update the table
            populateTable();

            //erase input
            $('input').val('');
            
            //set edit player id to null
            editPlayerId = null;

        }).fail(function( jqXHR, textStatus ) {
          alert(jqXHR.responseText);
        });
    }

    // Populate the user table on initial page load
    populateTable();

    // New Player link click
    $('#newFootballPlayer').on('click', newPlayer);

    // Save Player link click
    $('#savePlayerButton').on('click', addPlayer);

    // Delete Player link click
    $('#tablePlayersRows').on('click', '.linkDeletePlayer', deletePlayer);

    // Show Edit Form
    $('#tablePlayersRows').on('click', '.linkEditPlayer', editPlayer);

    // Update That Player
    $('#updatePlayerButton').on('click', updatePlayer);

    $('#cancelButton').on('click', cancel)
};

$(document).ready(ready);
$(document).on('page:load', ready);