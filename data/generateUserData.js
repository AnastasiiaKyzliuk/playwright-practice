import { v4 as uuidv4 } from 'uuid';

function generateRandomEmail() {
    const emailPrefix = 'torchovanastia+10';
    const domain = '@gmail.com';
    const uuid = uuidv4().substr(0, 8);
    const randomEmail = `${emailPrefix}${uuid}${domain}`;
    return randomEmail;

}
function generateRandomPassword() {
    const passwordPrefix = 'Ab1';
    const passwordSuffix = '17a' 
    const uuid = uuidv4().substr(0, 8);
    const randomPassword = `${passwordPrefix}${uuid}${passwordSuffix}`
    return randomPassword
}

export const correctEmail = generateRandomEmail();
export const correctPassword = generateRandomPassword();
export const incorrectPassword = 'wrongPassword';
export const registeredEmail = 'torchovanastia+111@gmail.com'
export const registeredPassword = 'Passwrd123'