const getFullName = require('./getFullName');

test('should return the full name with all degrees of the user', () => {
    const user = {
        firstName: 'John',
        lastName: 'Doe',
        degrees: ['M.Sc.', 'PhD']
    }

    expect(getFullName(user)).toBe('M.Sc., PhD John Doe');
})

test('should give an error, when no firstname or lastname is defined', () => {
    let user

    user = {
        firstName: 'John',
        degrees: ['M.Sc.', 'PhD']
    }

    expect(() => getFullName(user)).toThrow('No lastname defined');

    user = {
        lastName: 'Doe',
        degrees: ['M.Sc.', 'PhD']
    }

    expect(() => getFullName(user)).toThrow('No firstname defined');
})