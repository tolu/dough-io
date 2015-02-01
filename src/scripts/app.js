(function (Firebase) {
  'use strict';

  function getId()
  {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      var sParameterName = sURLVariables[0].split('=');
      return sParameterName[0] 
  }  
  function generateId() {
      return Math.random().toString(36).replace(/[^a-z]+/g, '');
  }

    var projectDatabase = new Firebase('https://resplendent-torch-2867.firebaseio.com//'+id);
    var s = 'Project: '
    var id = getId();
    if (!id) {
      id = generateId();
    }
    $("h1").text(s+id);

    // Application is now loaded!
    $('body').removeClass('loading');


  // SETUP

  // 1. connect to firebase db

  // 1.1. do we have a doughIO-id : ?{id}

  // 1.1.1 yes => get that reference data and go to step 2

  // 1.1.2 no  => allow user to create new doughIO-id

  // 1.2.1 make sure doughIO-id is not taken

  // 1.1.2 go to step 2

  // LOAD doughIO

  // 2. Get or create node for doughIO-id

  // 2.1 Render node data

  // 2.1.1 Display people in dough

  // 2.1.2 Display costs in dough

  // 2.2.1 Display form to add people

  // 2.2.2 Display form to add cost

  // INTERACT

  // 3.1 Add person

  // 3.1.1 Edit person

  // 3.1.2 Remove person

  // 3.2 Add cost

  // 3.2.1 Edit cost

  // 3.2.2 Remove cost


})(Firebase);
