describe('UsersController', function() {
  var $controller, UsersController, UsersFactory;

  //Mock the list of users we expect to use in controller
  var userList = [
    { id: '1', name: 'Jane', role: 'Designer', location: 'New York', twitter: 'gijane' },
    { id: '2', name: 'Bob', role: 'Developer', location: 'New York', twitter: 'billbob' },
    { id: '3', name: 'Jim', role: 'Developer', location: 'Chicago', twitter: 'jimbo' },
    { id: '4', name: 'Bill', role: 'Designer', location: 'LA', twitter: 'dabill' }
  ];

  // Load ui.router and our components.users module which we'll create next
  beforeEach(angular.mock.module('ui.router'));
  beforeEach(angular.mock.module('components.users'));
  beforeEach(angular.mock.module('api.users'));

  // Inject the $controller service to create instances of the controller (UsersController) we want to test
  beforeEach(inject(function(_$controller_, _Users_) {
    $controller = _$controller_;
    UsersFactory = _Users_;

    //Spy and force the return value when UsersFactory.all() is called
    spyOn(UsersFactory, 'all').and.callFake(function() {
      return userList;
    });

    UsersController = $controller('UsersController', { Users: UsersFactory });
  }));

  // Verify our controller exists
  it('should be defined', function() {
    expect(UsersController).toBeDefined();
  });

  //test for our expected controller behavior
  it('should initialize with a call to Users.all()', function() {
    expect(UsersFactory.all).toHaveBeenCalled();
    expect(UsersController.users).toEqual(userList);
  });
});
