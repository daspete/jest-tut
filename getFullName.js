const getFullName = (user) => {
    if(!user.firstName) throw new Error('No firstname defined')
    if(!user.lastName) throw new Error('No lastname defined')
    
    return `${ user.degrees.join(', ') } ${ user.firstName } ${ user.lastName }`
}

module.exports = getFullName