// Client facing scripts here
$(document).ready(function() {

  // User Management: Fetch and display users
  $('#fetch-users').on('click', function() {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
      .done(function(response) {
        const $usersList = $('#users');
        $usersList.empty();

        for(const user of response.users) {
          $(`<li class="user">`).text(user.name).appendTo($usersList);
        }
      });
  });

  // Additional Dashboard Interactions and Features
  // Example: Password copying functionality
  $('.copy-button').on('click', function() {
    console.log('inside copy button jquery functionality')
    const password = $(this).data('password');
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy password: ', err);
    });
  });

  // Other dashboard-specific code can go here...

});
