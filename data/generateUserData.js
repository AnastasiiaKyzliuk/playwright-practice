
import { uuid } from 'uuidv4';

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
