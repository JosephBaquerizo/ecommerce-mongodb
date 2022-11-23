export const getUserId = (userObject) => {
    const auth0Sub = userObject.sub.split('|');
    const id = auth0Sub[1];
    return id;
}
