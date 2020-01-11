require('babel-polyfill');
const SiteClient = require('datocms-client').SiteClient;
const client_id = 'c2afe34500c5de959544bb906fa129';

const client = new SiteClient(client_id);

async function createMember(title, first_name, middle_name, last_name, email, mobile_number, otp, state, voter_id) {
    try {
        // const path = await client.createUploadPath('https://imge.com/wp-content/uploads/2019/02/imge-new.png');
        // const image = await client.uploadFile('https://imge.com/wp-content/uploads/2019/02/imge-new.png');
        // console.log(image);
        const member = await client.items.create({
            itemType: '180848',
            title,
            first_name,
            middle_name,
            last_name,
            email,
            mobile_number,
            otp,
            state,
            voter_id,
            photo: null
        });
        return member;
    } catch (error) {
        throw error;
    }
}

module.exports = { createMember };