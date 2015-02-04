(function (Firebase) {
  'use strict';

  var db,
      id,
      doughDB,
      members,
      expenses,
      firebaseBasePath = 'https://resplendent-torch-2867.firebaseio.com/';

  function getId()
  {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split('&');
      var sParameterName = sURLVariables[0].split('=');
      return sParameterName[0] || generateId();
  }

  function generateId() {
      // for local testing return "test"
      if(/localhost/.test(location.href)){
        return "test";
      }

      var id = Math.random().toString(36).replace(/[^a-z]+/g, '');
      history.replaceState(null, null, '?'+id);
      return id;
  }

  function loadInitialData(){
    console.log('load initial data');
    doughDB = db.child(id);

    doughDB.once('value', function (snap) {
      // Application is now loaded!
      $('body').removeClass('loading');
      var data = snap.val();
      console.log('application loaded', data);

      if(!data){
        // add entry via update()
        var tmpObject = {};
        tmpObject[id] = { members: "", expenses: ""};
        db.update(tmpObject, function (error) {
          doughDB = db.child(id);
        });
      }
      setUpListeners();
    });
  }

  function onAddMember(evt) {
    evt && evt.preventDefault();
    var name = $('.new-member-name').val();
    doughDB.child('members').push({name: name});
    $('.new-member-name').val('');
  }
  function onRemoveMember( e ) {
    var _id = e.target.id;
    var el = $('#'+_id);
    el.remove();
    members.child(_id).remove();
  }

  function onAddExpense(evt) {
    evt && evt.preventDefault();
    var name = $('.new-expense-name').val();
    var amount = $('.new-expense-amount').val();
    doughDB.child('expenses').push({name: name, value: amount});
    $('.new-expense-name').val('');
    $('.new-expense-amount').val('');
  }
  function onRemoveExpense( e ) {
    var _id = e.target.id;
    var el = $('#'+_id);
    el.remove();
    expenses.child(_id).remove();
  }

  // connect to firebase
  id = getId();
  db = new Firebase(firebaseBasePath);
  $('.dough-splash h2').text('Loading Project: ' + id);
  $('h1').text('Project: ' + id);

  loadInitialData();

  function setUpListeners() {
    // refereces
    members = doughDB.child('members');
    expenses = doughDB.child('expenses');

    // element listeners
    $('.members')
      .on('submit', 'form', onAddMember)
      .on('click', 'li', onRemoveMember);

    $('.expenses')
      .on('submit', 'form',  onAddExpense)
      .on('click', 'li', onRemoveExpense);

    // data listeners
    expenses.on('child_added', function (snap) {
      var data = snap.val();
      var key = snap.key();
      $('.expenses ul').append(strf(expenseTpl, key, data.value, data.name));
    });
    expenses.on('child_removed', function (snap) {
      var key = snap.key();
      onRemoveExpense({target:{id:key}});
    });

    members.on('child_added', function (snap) {
      var key = snap.key();
      var value = snap.val().name;
      console.log(value);
      $('.members ul').append(strf(personTpl, key, value));
    });
    members.on('child_removed', function (snap) {
      var key = snap.key();
      onRemoveMember({target:{id:key}});
    });
  }

  var personTpl = ['<li id="{0}">',
                      '<span class="glyphicon glyphicon-user" aria-hidden="true">&nbsp;</span>',
                      '<span>{1}</span>',
                    '</li>'
                  ].join('');
  var expenseTpl = ['<li id="{0}">',
                      '<span class="glyphicon glyphicon-usd" aria-hidden="true">&nbsp;</span>',
                      '<span>{1} : {2}</span>',
                    '</li>'
                  ].join('');

  function strf() {
    var args = [].slice.call(arguments, 0);
    console.log(args);
    var tpl = args.shift();
    var i = 0;
    args.forEach(function(param){
      tpl = tpl.replace('{x}'.replace('x',i), param);
      i++;
    });
    return tpl.toString();
  }

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
