import  {user, userStore} from '../user';

const user = new userStore();

describe("User Model", () => {
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(user.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(user.index).toBeDefined();
  });


  it('should have a delete method', () => {
    expect(user.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await user.create("nour","karem","123");
   
    expect(result).toEqual({
      id :6,
      firstname :"nour",
      lastname :"karem",
      
    });
  });

  it('index method should return a list of users', async () => {
    const result = await user.index();
    
    expect(result).toEqual([{
      id :6,
      firstname :"nour",
      lastname :"karem",
     
     
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await user.show("6");
    expect(result).toEqual({
      id :6,
      firstname :"nour",
      lastname :"karem",
     
    });
  });

  it('delete method should remove the user', async () => {
    
    const result = await user.delete("6");

    expect(result).toEqual({
      id :6,
      firstname :"nour",
      lastname :"karem",
    });
  });
});